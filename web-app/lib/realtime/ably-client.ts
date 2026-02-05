import * as Ably from 'ably';

export type RealtimeEventCallback<T = unknown> = (data: T) => void;

export interface RealtimeMessage<T = unknown> {
  channel: string;
  event: string;
  data: T;
  timestamp: number;
}

export class AblyRealtimeClient {
  private client: Ably.Realtime | null = null;
  private channels: Map<string, Ably.RealtimeChannel> = new Map();
  private subscriptions: Map<string, Set<RealtimeEventCallback>> = new Map();
  private connectionStateCallbacks: Set<(state: Ably.ConnectionState) => void> = new Set();

  async connect(): Promise<void> {
    if (this.client) {
      return;
    }

    try {
      this.client = new Ably.Realtime({
        authCallback: async (_, callback) => {
          try {
            const token = await this.getTokenRequest();
            callback(null, token);
          } catch (error) {
            callback(error as Ably.ErrorInfo, null);
          }
        },
        echoMessages: false,
      });

      // Monitor connection state
      this.client.connection.on((stateChange) => {
        console.log('[Ably] Connection state:', stateChange.current);
        this.connectionStateCallbacks.forEach((callback) => {
          callback(stateChange.current);
        });
      });

      await new Promise<void>((resolve, reject) => {
        this.client!.connection.once('connected', () => resolve());
        this.client!.connection.once('failed', (error) => reject(error));
        this.client!.connection.once('suspended', (error) => reject(error));
      });

      console.log('[Ably] Connected successfully');
    } catch (error) {
      console.error('[Ably] Failed to connect:', error);
      throw error;
    }
  }

  private async getTokenRequest(): Promise<Ably.TokenRequest> {
    const response = await fetch('/api/realtime/auth');
    if (!response.ok) {
      throw new Error('Failed to get token');
    }
    const data = await response.json();
    return data.data;
  }

  disconnect(): void {
    if (this.client) {
      this.channels.forEach((channel) => {
        channel.unsubscribe();
        channel.detach();
      });
      this.channels.clear();
      this.subscriptions.clear();
      this.client.close();
      this.client = null;
      console.log('[Ably] Disconnected');
    }
  }

  private getOrCreateChannel(channelName: string): Ably.RealtimeChannel {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    if (!this.channels.has(channelName)) {
      const channel = this.client.channels.get(channelName);
      this.channels.set(channelName, channel);
    }

    return this.channels.get(channelName)!;
  }

  subscribe<T = unknown>(
    channelName: string,
    event: string,
    callback: RealtimeEventCallback<T>
  ): () => void {
    const key = `${channelName}:${event}`;

    if (!this.subscriptions.has(key)) {
      this.subscriptions.set(key, new Set());

      // Subscribe to Ably channel
      const channel = this.getOrCreateChannel(channelName);

      channel.subscribe(event, (message: Ably.Message) => {
        const callbacks = this.subscriptions.get(key);
        if (callbacks) {
          callbacks.forEach((cb) => {
            try {
              cb(message.data);
            } catch (error) {
              console.error('[Ably] Error in callback:', error);
            }
          });
        }
      });
    }

    this.subscriptions.get(key)!.add(callback as RealtimeEventCallback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscriptions.get(key);
      if (callbacks) {
        callbacks.delete(callback as RealtimeEventCallback);

        if (callbacks.size === 0) {
          this.subscriptions.delete(key);
          const channel = this.channels.get(channelName);
          if (channel) {
            channel.unsubscribe(event);
          }
        }
      }
    };
  }

  async publish<T = unknown>(
    channelName: string,
    event: string,
    data: T
  ): Promise<void> {
    if (!this.client) {
      throw new Error('Client not connected. Call connect() first.');
    }

    try {
      const channel = this.getOrCreateChannel(channelName);
      await channel.publish(event, data);
    } catch (error) {
      console.error('[Ably] Error publishing message:', error);
      throw error;
    }
  }

  onConnectionStateChange(callback: (state: Ably.ConnectionState) => void): () => void {
    this.connectionStateCallbacks.add(callback);

    // Call immediately with current state
    if (this.client) {
      callback(this.client.connection.state);
    }

    return () => {
      this.connectionStateCallbacks.delete(callback);
    };
  }

  isConnected(): boolean {
    return this.client?.connection.state === 'connected';
  }

  getConnectionState(): Ably.ConnectionState | null {
    return this.client?.connection.state ?? null;
  }

  getSubscriptionCount(): number {
    return this.subscriptions.size;
  }

  getChannelCount(): number {
    return this.channels.size;
  }
}