/**
 * Yellow RPC Client
 * Maneja comunicación WebSocket con Yellow ClearNode
 */

import WebSocket from "ws";

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
  private messageHandlers: Map<string, (response: any) => void> = new Map();
  private connectionPromise: Promise<void> | null = null;

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

    // Buscar handler por ID de mensaje
    if (message.id && this.messageHandlers.has(message.id)) {
      const handler = this.messageHandlers.get(message.id)!;
      this.messageHandlers.delete(message.id);
      handler(message);
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

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.messageHandlers.clear();
  }
}
