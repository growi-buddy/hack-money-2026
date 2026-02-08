/**
 * Yellow Treasury Manager
 * Maneja la conexión WebSocket y autenticación con Yellow Sandbox
 */

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import WebSocket from "ws";
import { getYellowEnv } from "./env";
import type { YellowEnvConfig } from "./env";

export interface TreasuryState {
  status: "disconnected" | "connected" | "authenticated";
  sessionKey: `0x${string}` | null;
  sessionKeyAddress: `0x${string}` | null;
  expiresAt: Date | null;
  treasuryAddress: `0x${string}`;
}

interface AuthChallenge {
  message: string;
  domain: any;
  types: any;
}

/**
 * Singleton Treasury Manager
 */
class TreasuryManager {
  private config: YellowEnvConfig;
  private ws: WebSocket | null = null;
  private state: TreasuryState;
  private publicClient: any;
  private walletClient: any;
  private treasuryAccount: any;
  private sessionAccount: any;
  private messageHandlers: Map<string, (data: any) => void> = new Map();
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.config = getYellowEnv();
    this.treasuryAccount = privateKeyToAccount(this.config.treasuryPrivateKey);
    
    this.state = {
      status: "disconnected",
      sessionKey: null,
      sessionKeyAddress: null,
      expiresAt: null,
      treasuryAddress: this.treasuryAccount.address,
    };

    // Crear clients de viem para Base Sepolia
    this.publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(this.config.treasuryRpcUrl),
    });

    this.walletClient = createWalletClient({
      account: this.treasuryAccount,
      chain: baseSepolia,
      transport: http(this.config.treasuryRpcUrl),
    });
  }

  /**
   * Obtiene el estado actual
   */
  getState(): TreasuryState {
    return { ...this.state };
  }

  /**
   * Conecta al WebSocket si no está conectado
   */
  async ensureWsConnected(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    // Si ya hay una conexión en proceso, esperar
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      console.log(`[Treasury] Connecting to ${this.config.wsUrl}...`);
      
      this.ws = new WebSocket(this.config.wsUrl);

      const timeout = setTimeout(() => {
        reject(new Error("WebSocket connection timeout"));
        this.ws?.close();
      }, 10000);

      this.ws.on("open", () => {
        clearTimeout(timeout);
        console.log("[Treasury] WebSocket connected");
        this.state.status = "connected";
        this.initPromise = null;
        resolve();
      });

      this.ws.on("message", (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          console.log("[Treasury] Received:", JSON.stringify(message, null, 2));
          
          // Yellow responde con formato: { res: [timestamp, type, data, nonce], sig: [...] }
          if (message.res && Array.isArray(message.res)) {
            const [timestamp, messageType, payload, nonce] = message.res;
            
            // Si es un error, buscar handler pendiente y rechazar
            if (messageType === 'error') {
              console.error("[Treasury] Yellow error:", payload);
              // Rechazar cualquier handler pendiente
              const handlers = Array.from(this.messageHandlers.entries());
              if (handlers.length > 0) {
                const [reqId, handler] = handlers[0];
                this.messageHandlers.delete(reqId);
                handler({ error: payload });
              }
              return;
            }
            
            // Para otros tipos de mensajes, buscar handler pendiente
            const handlers = Array.from(this.messageHandlers.entries());
            if (handlers.length > 0) {
              const [reqId, handler] = handlers[0];
              this.messageHandlers.delete(reqId);
              handler({ type: messageType, data: payload, raw: message });
            }
          }
          
          // Formato legacy (por si acaso)
          if (message.requestId && this.messageHandlers.has(message.requestId)) {
            const handler = this.messageHandlers.get(message.requestId);
            this.messageHandlers.delete(message.requestId);
            handler!(message);
          }
        } catch (error) {
          console.error("[Treasury] Error parsing message:", error);
        }
      });

      this.ws.on("error", (error) => {
        console.error("[Treasury] WebSocket error:", error);
        this.state.status = "disconnected";
        this.initPromise = null;
        clearTimeout(timeout);
        reject(error);
      });

      this.ws.on("close", () => {
        console.log("[Treasury] WebSocket closed");
        this.state.status = "disconnected";
        this.state.sessionKey = null;
        this.state.sessionKeyAddress = null;
        this.state.expiresAt = null;
        this.ws = null;
        this.initPromise = null;
      });
    });

    return this.initPromise;
  }

  /**
   * Envía un mensaje y espera respuesta
   */
  private async sendAndWait<T = any>(message: any, timeoutMs = 10000): Promise<T> {
    await this.ensureWsConnected();

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket not connected");
    }

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    message.requestId = requestId;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.messageHandlers.delete(requestId);
        reject(new Error(`Request timeout: ${message.type}`));
      }, timeoutMs);

      this.messageHandlers.set(requestId, (response) => {
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(response.error.message || "Request failed"));
        } else {
          resolve(response);
        }
      });

      this.ws!.send(JSON.stringify(message));
      console.log("[Treasury] Sent:", message.type, requestId);
    });
  }

  /**
   * Autentica la treasury wallet con Yellow
   */
  async ensureTreasuryAuthenticated(): Promise<TreasuryState> {
    // Si ya está autenticado y no ha expirado, retornar
    if (
      this.state.status === "authenticated" &&
      this.state.expiresAt &&
      this.state.expiresAt > new Date()
    ) {
      return this.getState();
    }

    await this.ensureWsConnected();

    // Generar session key temporal
    const sessionPrivateKey = `0x${Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}` as `0x${string}`;
    
    this.sessionAccount = privateKeyToAccount(sessionPrivateKey);
    this.state.sessionKey = sessionPrivateKey;
    this.state.sessionKeyAddress = this.sessionAccount.address;

    console.log("[Treasury] Starting authentication...");
    console.log("[Treasury] Treasury address:", this.treasuryAccount.address);
    console.log("[Treasury] Session key address:", this.sessionAccount.address);

    // Paso 1: auth_request
    const authRequest = await this.sendAndWait({
      type: "auth_request",
      userAddress: this.treasuryAccount.address,
      sessionKeyAddress: this.sessionAccount.address,
      expiresAt: Date.now() + 3600000, // 1 hora
    });

    if (!authRequest.challenge) {
      throw new Error("No challenge received from auth_request");
    }

    console.log("[Treasury] Received auth challenge");

    // Paso 2: Firmar el challenge con EIP-712
    const { message, domain, types } = authRequest.challenge;
    
    const signature = await this.walletClient.signTypedData({
      account: this.treasuryAccount,
      domain,
      types,
      primaryType: "AuthChallenge",
      message,
    });

    console.log("[Treasury] Signed challenge");

    // Paso 3: auth_verify
    const authVerify = await this.sendAndWait({
      type: "auth_verify",
      userAddress: this.treasuryAccount.address,
      sessionKeyAddress: this.sessionAccount.address,
      signature,
    });

    if (!authVerify.success) {
      throw new Error("Authentication failed");
    }

    console.log("[Treasury] Authentication successful!");

    this.state.status = "authenticated";
    this.state.expiresAt = new Date(Date.now() + 3600000);

    return this.getState();
  }

  /**
   * Obtiene la configuración de Yellow (assets y networks)
   */
  async getConfig(): Promise<any> {
    await this.ensureWsConnected();

    const response = await this.sendAndWait({
      type: "get_config",
    });

    return response.config || response;
  }

  /**
   * Obtiene los balances del ledger
   */
  async getLedgerBalances(): Promise<any> {
    if (this.state.status !== "authenticated") {
      throw new Error("Treasury not authenticated");
    }

    const response = await this.sendAndWait({
      type: "get_ledger_balances",
      userAddress: this.treasuryAccount.address,
    });

    return response.balances || response;
  }

  /**
   * Solicita tokens del faucet
   */
  async requestFaucetTokens(): Promise<any> {
    const response = await fetch(this.config.faucetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress: this.treasuryAccount.address,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Faucet request failed: ${error}`);
    }

    return response.json();
  }

  /**
   * Cierra la conexión WebSocket
   */
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.state.status = "disconnected";
    this.state.sessionKey = null;
    this.state.sessionKeyAddress = null;
    this.state.expiresAt = null;
  }
}

// Singleton instance
let treasuryManager: TreasuryManager | null = null;

export function getTreasuryManager(): TreasuryManager {
  if (!treasuryManager) {
    treasuryManager = new TreasuryManager();
  }
  return treasuryManager;
}
