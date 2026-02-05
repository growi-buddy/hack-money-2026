import { useEffect, useRef, useSyncExternalStore, useCallback } from 'react';
import { useRealtimeStore } from '@/store/realtime-store';
import type { RealtimeEventCallback } from '@/lib/realtime/ably-client';

interface UseRealtimeSubscriptionOptions {
  enabled?: boolean;
  autoConnect?: boolean;
}

export function useRealtimeSubscription<T = unknown>(
  channelName: string,
  event: string,
  callback: RealtimeEventCallback<T>,
  options: UseRealtimeSubscriptionOptions = {}
) {
  const { enabled = true, autoConnect = true } = options;
  const client = useRealtimeStore((state) => state.client);
  const isConnected = useRealtimeStore((state) => state.isConnected);
  const initialize = useRealtimeStore((state) => state.initialize);

  const callbackRef = useRef(callback);
  const isSubscribedRef = useRef(false);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Auto-connect if needed
  useEffect(() => {
    if (autoConnect && !client && enabled) {
      initialize().catch((error) => {
        console.error('[Hook] Failed to initialize client:', error);
      });
    }
  }, [autoConnect, client, enabled, initialize]);

  // Subscribe to channel
  useEffect(() => {
    if (!enabled || !client || !isConnected) {
      isSubscribedRef.current = false;
      return;
    }

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = client.subscribe<T>(
        channelName,
        event,
        (data) => callbackRef.current(data)
      );

      isSubscribedRef.current = true;
      console.log(`[Hook] Subscribed to ${channelName}:${event}`);
    } catch (error) {
      console.error('[Hook] Failed to subscribe:', error);
      isSubscribedRef.current = false;
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
        isSubscribedRef.current = false;
        console.log(`[Hook] Unsubscribed from ${channelName}:${event}`);
      }
    };
  }, [client, channelName, event, enabled, isConnected]);

  // Use sync external store to track subscription state without causing re-renders
  const subscribe = useCallback(() => () => {}, []);
  const getSnapshot = useCallback(() => isSubscribedRef.current, []);
  const isSubscribed = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return { isSubscribed, isConnected };
}