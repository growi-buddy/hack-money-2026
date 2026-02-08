/**
 * Yellow Treasury Manager - Simplified Version
 * Maneja conexión y operaciones básicas sin auth complejo
 */

import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import WebSocket from "ws";
import { getYellowEnv } from "./env";
import type { YellowEnvConfig } from "./env";

export interface TreasuryState {
  status: "disconnected" | "connected" | "ready";
  treasuryAddress: `0x${string}`;
  chainId: number;
}

class SimpleTreasuryManager {
  private config: YellowEnvConfig;
  private ws: WebSocket | null = null;
  private state: TreasuryState;
  private publicClient: any;
  private walletClient: any;
  private treasuryAccount: any;
  private connectPromise: Promise<void> | null = null;

  constructor() {
    this.config = getYellowEnv();
    this.treasuryAccount = privateKeyToAccount(this.config.treasuryPrivateKey);
    
    this.state = {
      status: "disconnected",
      treasuryAddress: this.treasuryAccount.address,
      chainId: this.config.chainId,
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

  getState(): TreasuryState {
    return { ...this.state };
  }

  async ensureConnected(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise((resolve, reject) => {
      console.log(`[Treasury] Connecting to ${this.config.wsUrl}...`);
      
      this.ws = new WebSocket(this.config.wsUrl);

      const timeout = setTimeout(() => {
        reject(new Error("WebSocket connection timeout"));
        this.ws?.close();
      }, 15000);

      this.ws.on("open", () => {
        clearTimeout(timeout);
        console.log("[Treasury] WebSocket connected successfully");
        this.state.status = "connected";
        this.connectPromise = null;
        resolve();
      });

      this.ws.on("message", (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          console.log("[Treasury] Received message:", JSON.stringify(message, null, 2));
        } catch (error) {
          console.error("[Treasury] Error parsing message:", error);
        }
      });

      this.ws.on("error", (error) => {
        console.error("[Treasury] WebSocket error:", error);
        this.state.status = "disconnected";
        this.connectPromise = null;
        clearTimeout(timeout);
        reject(error);
      });

      this.ws.on("close", () => {
        console.log("[Treasury] WebSocket closed");
        this.state.status = "disconnected";
        this.ws = null;
        this.connectPromise = null;
      });
    });

    return this.connectPromise;
  }

  async getChainBalance(): Promise<bigint> {
    const balance = await this.publicClient.getBalance({
      address: this.treasuryAccount.address,
    });
    return balance;
  }

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

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.state.status = "disconnected";
  }
}

let simpleTreasuryManager: SimpleTreasuryManager | null = null;

export function getSimpleTreasuryManager(): SimpleTreasuryManager {
  if (!simpleTreasuryManager) {
    simpleTreasuryManager = new SimpleTreasuryManager();
  }
  return simpleTreasuryManager;
}
