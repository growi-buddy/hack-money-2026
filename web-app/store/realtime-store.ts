import { create } from 'zustand';
import { AblyRealtimeClient } from '@/lib/realtime/ably-client';

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'failed' | 'suspended';

interface RealtimeStore {
  client: AblyRealtimeClient | null;
  connectionState: ConnectionState;
  isConnected: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  disconnect: () => void;
  setConnectionState: (state: ConnectionState) => void;
  setError: (error: string | null) => void;
}

export const useRealtimeStore = create<RealtimeStore>((set, get) => ({
  client: null,
  connectionState: 'disconnected',
  isConnected: false,
  error: null,

  initialize: async () => {
    const { client } = get();

    if (client) {
      console.log('[Store] Client already initialized');
      return;
    }

    try {
      set({ connectionState: 'connecting', error: null });

      const newClient = new AblyRealtimeClient();

      // Setup connection state listener
      newClient.onConnectionStateChange((state) => {
        const stateMap: Record<string, ConnectionState> = {
          connected: 'connected',
          connecting: 'connecting',
          disconnected: 'disconnected',
          failed: 'failed',
          suspended: 'suspended',
          closing: 'disconnected',
          closed: 'disconnected',
        };

        const mappedState = stateMap[state] || 'disconnected';
        set({
          connectionState: mappedState,
          isConnected: mappedState === 'connected',
          error: ['failed', 'suspended'].includes(mappedState)
            ? `Connection ${mappedState}`
            : null,
        });
      });

      await newClient.connect();

      set({
        client: newClient,
        connectionState: 'connected',
        isConnected: true,
      });

      console.log('[Store] Client initialized and connected');
    } catch (error) {
      console.error('[Store] Failed to initialize client:', error);
      set({
        connectionState: 'failed',
        isConnected: false,
        error: error instanceof Error ? error.message : 'Failed to connect',
      });
      throw error;
    }
  },

  disconnect: () => {
    const { client } = get();
    if (client) {
      client.disconnect();
      set({
        client: null,
        connectionState: 'disconnected',
        isConnected: false,
        error: null,
      });
    }
  },

  setConnectionState: (state) => set({
    connectionState: state,
    isConnected: state === 'connected',
  }),

  setError: (error) => set({ error }),
}));