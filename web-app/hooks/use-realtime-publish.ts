import { useCallback, useState } from 'react';
import { useRealtimeStore } from '@/store/realtime-store';

interface PublishResult {
  success: boolean;
  error?: unknown;
}

export function useRealtimePublish() {
  const client = useRealtimeStore((state) => state.client);
  const isConnected = useRealtimeStore((state) => state.isConnected);
  const [isPublishing, setIsPublishing] = useState(false);

  const publish = useCallback(
    async <T = unknown>(
      channelName: string,
      event: string,
      data: T
    ): Promise<PublishResult> => {
      if (!client) {
        console.error('[Publish] Client not initialized');
        return { success: false, error: 'Client not initialized' };
      }

      if (!isConnected) {
        console.error('[Publish] Client not connected');
        return { success: false, error: 'Client not connected' };
      }

      setIsPublishing(true);

      try {
        await client.publish(channelName, event, data);
        console.log(`[Publish] Published to ${channelName}:${event}`);
        return { success: true };
      } catch (error) {
        console.error('[Publish] Failed to publish message:', error);
        return { success: false, error };
      } finally {
        setIsPublishing(false);
      }
    },
    [client, isConnected]
  );

  return { publish, isPublishing, isConnected };
}