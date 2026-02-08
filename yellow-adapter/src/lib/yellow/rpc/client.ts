/**
 * Yellow RPC Client
 * Maneja comunicación WebSocket con Yellow ClearNode
 */

import WebSocket from "ws";
import { createAuthRequestMessage, createAuthVerifyMessageFromChallenge } from "@erc7824/nitrolite";

export interface RpcMessage {
  id?: string;
  method?: string;
  params?: any;
  result?: any;
  error?: any;
}

export class YellowRpcClient {
  private ws: WebSocket | null = null;
  private wsUrl: string;
  private messageHandlers: Map<string | number, (response: any) => void> = new Map();
  private connectionPromise: Promise<void> | null = null;
  private isAuthenticated: boolean = false;
  private authenticationPromise: Promise<void> | null = null;

  constructor(wsUrl: string) {
    this.wsUrl = wsUrl;
  }

  async ensureConnected(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      console.log(`[RpcClient] Connecting to ${this.wsUrl}...`);

      this.ws = new WebSocket(this.wsUrl);

      const timeout = setTimeout(() => {
        reject(new Error("WebSocket connection timeout"));
        this.ws?.close();
      }, 15000);

      this.ws.on("open", () => {
        clearTimeout(timeout);
        console.log("[RpcClient] WebSocket connected");
        this.connectionPromise = null;
        resolve();
      });

      this.ws.on("message", (data: WebSocket.Data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (error) {
          console.error("[RpcClient] Error parsing message:", error);
        }
      });

      this.ws.on("error", (error) => {
        console.error("[RpcClient] WebSocket error:", error);
        clearTimeout(timeout);
        this.connectionPromise = null;
        reject(error);
      });

      this.ws.on("close", () => {
        console.log("[RpcClient] WebSocket closed");
        this.ws = null;
        this.connectionPromise = null;
      });
    });

    return this.connectionPromise;
  }

  private handleMessage(message: any): void {
    console.log("[RpcClient] Received:", JSON.stringify(message, null, 2));

    // Extraer ID del mensaje (puede estar en message.id, message.res[0] o message.req[0])
    let messageId: string | number | undefined;
    
    if (message.id) {
      messageId = message.id;
    } else if (message.res && Array.isArray(message.res) && message.res.length > 0) {
      messageId = message.res[0]; // Formato Yellow: { res: [id, status, result, timestamp] }
    } else if (message.req && Array.isArray(message.req) && message.req.length > 0) {
      messageId = message.req[0]; // Formato Yellow: { req: [id, method, params, timestamp] }
    }

    console.log("[RpcClient] Extracted message ID:", messageId, "(type:", typeof messageId, ")");

    // Normalizar ID (string -> number si es necesario)
    const normalizedId = typeof messageId === 'string' ? parseInt(messageId, 10) : messageId;

    // Buscar handler por ID
    if (normalizedId !== undefined && !isNaN(normalizedId as number) && this.messageHandlers.has(normalizedId)) {
      const handler = this.messageHandlers.get(normalizedId)!;
      this.messageHandlers.delete(normalizedId);
      handler(message);
    } else if (normalizedId !== undefined) {
      console.warn("[RpcClient] No handler found for message ID:", normalizedId);
    } else {
      console.warn("[RpcClient] Could not extract ID from message");
    }
  }

  async send(message: RpcMessage, timeoutMs = 30000): Promise<any> {
    await this.ensureConnected();

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket not connected");
    }

    const id = message.id || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullMessage = { ...message, id };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.messageHandlers.delete(id);
        reject(new Error(`Request timeout: ${message.method || "unknown"}`));
      }, timeoutMs);

      this.messageHandlers.set(id, (response) => {
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(response.error.message || "RPC request failed"));
        } else {
          resolve(response.result || response);
        }
      });

      this.ws!.send(JSON.stringify(fullMessage));
      console.log("[RpcClient] Sent:", fullMessage.method, id);
    });
  }

  /**
   * Authenticate with ClearNode
   * Required before sending any app session or channel operations
   */
  async authenticate(
    signer: (payload: any) => Promise<`0x${string}`>,
    clientAddress: `0x${string}`
  ): Promise<void> {
    // Si ya está autenticado, no hacer nada
    if (this.isAuthenticated) {
      console.log("[RpcClient] Already authenticated");
      return;
    }

    // Si ya hay una autenticación en progreso, esperarla
    if (this.authenticationPromise) {
      console.log("[RpcClient] Authentication in progress, waiting...");
      return this.authenticationPromise;
    }

    console.log("[RpcClient] Starting authentication for:", clientAddress);

    this.authenticationPromise = (async () => {
      try {
        await this.ensureConnected();

        // Paso 1: Enviar auth_request
        console.log("[RpcClient] Step 1: Sending auth_request...");
        console.log("[RpcClient] Client address:", clientAddress);
        
        // Generar session key
        const { privateKeyToAccount, generatePrivateKey } = await import('viem/accounts');
        const sessionKeyPk = generatePrivateKey();
        const sessionKey = privateKeyToAccount(sessionKeyPk);
        
        // MessageSigner para auth_request
        const requestMessageSigner = async (payload: unknown) => {
          const payloadString = JSON.stringify(payload);
          return await sessionKey.signMessage({ message: payloadString });
        };
        
        // API v0.4.0: recibe objeto con messageSigner incluido
        const authRequestMessage = await createAuthRequestMessage({
          address: clientAddress,
          session_key: sessionKey.address,
          application: 'growi-campaign-manager',
          expires_at: (Math.floor(Date.now() / 1000) + 86400).toString(),
          scope: 'console',
          allowances: [],
          messageSigner: requestMessageSigner
        } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        
        console.log("[RpcClient] Generated auth request message:", authRequestMessage);
        
        const authRequestParsed = JSON.parse(authRequestMessage);
        const authRequestId = authRequestParsed.req?.[0];
        
        console.log("[RpcClient] Auth request message structure:", {
          hasReq: !!authRequestParsed.req,
          hasSig: !!authRequestParsed.sig,
          requestId: authRequestId,
          method: authRequestParsed.req?.[1],
          params: authRequestParsed.req?.[2],
        });
        
        console.log("[RpcClient] Full parsed message:", JSON.stringify(authRequestParsed, null, 2));
        
        const challengeResponse = await new Promise<any>((resolve, reject) => {
          const timeout = setTimeout(() => {
            this.messageHandlers.delete(authRequestId);
            console.error("[RpcClient] ❌ Auth request timeout. No response from Clearnode.");
            reject(new Error("Auth request timeout"));
          }, 30000);

          this.messageHandlers.set(authRequestId, (response) => {
            clearTimeout(timeout);
            console.log("[RpcClient] ✅ Auth request response received");
            resolve(response);
          });

          this.ws!.send(authRequestMessage);
          console.log("[RpcClient] Auth request sent, waiting for response...");
        });

        console.log("[RpcClient] Auth request response:", JSON.stringify(challengeResponse, null, 2));

        // Extraer challenge de la respuesta
        // Intentar diferentes formatos posibles
        let challenge: string | undefined;
        
        if (challengeResponse.res && Array.isArray(challengeResponse.res)) {
          console.log("[RpcClient] Response format: res array");
          console.log("[RpcClient] res[0]:", challengeResponse.res[0]); // ID
          console.log("[RpcClient] res[1]:", challengeResponse.res[1]); // status
          console.log("[RpcClient] res[2]:", challengeResponse.res[2]); // data
          console.log("[RpcClient] res[3]:", challengeResponse.res[3]); // timestamp
          
          // Formato 1: { res: [ID, "result", {challenge: "..."}, timestamp] }
          if (challengeResponse.res[2]?.challenge) {
            challenge = challengeResponse.res[2].challenge;
            console.log("[RpcClient] Found challenge in res[2].challenge");
          }
          // Formato 2: { res: [ID, "result", "challenge_string", timestamp] }
          else if (typeof challengeResponse.res[2] === 'string') {
            challenge = challengeResponse.res[2];
            console.log("[RpcClient] Found challenge in res[2] (string)");
          }
        }
        
        if (!challenge) {
          console.error("[RpcClient] ❌ Could not extract challenge from response");
          console.error("[RpcClient] Full response:", JSON.stringify(challengeResponse, null, 2));
          throw new Error("No challenge received from ClearNode. Check logs for response format.");
        }

        console.log("[RpcClient] Received challenge:", challenge);

        // Paso 2: Firmar challenge y enviar auth_verify
        console.log("[RpcClient] Step 2: Sending auth_verify...");
        const authVerifyMessage = await createAuthVerifyMessageFromChallenge(
          signer,
          clientAddress,
          challenge as any // eslint-disable-line @typescript-eslint/no-explicit-any
        );

        const authVerifyParsed = JSON.parse(authVerifyMessage);
        const authVerifyId = authVerifyParsed.req?.[0];

        const verifyResponse = await new Promise<any>((resolve, reject) => {
          const timeout = setTimeout(() => {
            this.messageHandlers.delete(authVerifyId);
            reject(new Error("Auth verify timeout"));
          }, 30000);

          this.messageHandlers.set(authVerifyId, (response) => {
            clearTimeout(timeout);
            resolve(response);
          });

          this.ws!.send(authVerifyMessage);
          console.log("[RpcClient] Auth verify sent, ID:", authVerifyId);
        });

        console.log("[RpcClient] Auth verify response:", verifyResponse);

        // Verificar que la autenticación fue exitosa
        if (verifyResponse.res?.[1] === "error") {
          throw new Error(`Authentication failed: ${JSON.stringify(verifyResponse.res[2])}`);
        }

        this.isAuthenticated = true;
        console.log("[RpcClient] ✅ Authentication successful!");
      } catch (error) {
        console.error("[RpcClient] ❌ Authentication failed:", error);
        throw error;
      } finally {
        this.authenticationPromise = null;
      }
    })();

    return this.authenticationPromise;
  }

  /**
   * Send raw signed message (for SDK-generated messages like createAppSessionMessage)
   */
  async sendRaw(rawMessage: string, timeoutMs = 30000): Promise<any> {
    await this.ensureConnected();

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket not connected");
    }

    // Parse the signed message to extract the ID
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(rawMessage);
      console.log("[RpcClient] Parsed message structure:", {
        hasReq: !!parsedMessage.req,
        hasSig: !!parsedMessage.sig,
        reqLength: parsedMessage.req?.length,
      });
    } catch (error) {
      throw new Error("Invalid raw message format");
    }

    // Extract ID from the request payload (Yellow format: { req: [id, method, params, timestamp] })
    const id = parsedMessage.req?.[0];
    
    if (!id) {
      throw new Error("Could not extract request ID from signed message");
    }

    console.log("[RpcClient] Registering handler for ID:", id, "Timeout:", timeoutMs, "ms");

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.messageHandlers.delete(id);
        console.error("[RpcClient] ❌ Timeout waiting for response. Registered handlers:", Array.from(this.messageHandlers.keys()));
        reject(new Error(`Request timeout: raw message (ID: ${id})`));
      }, timeoutMs);

      this.messageHandlers.set(id, (response) => {
        clearTimeout(timeout);
        console.log("[RpcClient] ✅ Handler executed for ID:", id);
        
        if (response.res && response.res[1] === "error") {
          const errorDetail = response.res[2];
          reject(new Error(errorDetail?.error || JSON.stringify(errorDetail) || "RPC request failed"));
        } else {
          resolve(response);
        }
      });

      this.ws!.send(rawMessage);
      console.log("[RpcClient] ✅ Sent raw message, ID:", id);
    });
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.messageHandlers.clear();
  }
}
