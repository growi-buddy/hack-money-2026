'use client';

import { useEffect } from 'react';
import { useRealtimeStore } from '@/store/realtime-store';

interface RealtimeProviderProps {
  children: React.ReactNode;
  autoConnect?: boolean;
}

export function RealtimeProvider({ children, autoConnect = false }: RealtimeProviderProps) {
  const initialize = useRealtimeStore((state) => state.initialize);
  const disconnect = useRealtimeStore((state) => state.disconnect);

  useEffect(() => {
    if (autoConnect) {
      // Auto-connect on mount
      initialize().catch((error) => {
        console.error('[Provider] Failed to initialize:', error);
      });

      // Cleanup on unmount
      return () => {
        disconnect();
      };
    }
  }, [autoConnect, initialize, disconnect]);

  return <>{children}</>;
}