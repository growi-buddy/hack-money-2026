'use client';

import { ChatClient } from '@ably/chat';
import { AvatarProvider, ChatSettingsProvider, ThemeProvider } from '@ably/chat-react-ui-kit';
import { ChatClientProvider } from '@ably/chat/react';
import * as Ably from 'ably';
import { useEffect, useMemo, useState } from 'react';

// import '@ably/chat-react-ui-kit/dist/style.css';

interface AblyChatProviderProps {
  children: React.ReactNode;
  clientId: string;
}

export function AblyChatProvider({ children, clientId }: AblyChatProviderProps) {
  const [ ready, setReady ] = useState(false);
  
  const chatClient = useMemo(() => {
    if (!clientId) return null;
    
    const realtimeClient = new Ably.Realtime({
      authCallback: async (_tokenParams, callback) => {
        try {
          const res = await fetch(`/api/realtime/auth?clientId=${encodeURIComponent(clientId)}`);
          const data = await res.json();
          if (!res.ok || !data.success) {
            callback(new Error('Failed to get token') as unknown as Ably.ErrorInfo, null);
            return;
          }
          callback(null, data.data);
        } catch (err) {
          callback(err as Ably.ErrorInfo, null);
        }
      },
      clientId,
    });
    
    return new ChatClient(realtimeClient);
  }, [ clientId ]);
  
  useEffect(() => {
    if (chatClient) {
      setReady(true);
    }
    return () => {
      setReady(false);
    };
  }, [ chatClient ]);
  
  if (!chatClient || !ready) {
    return <div>Loading...</div>;
  }
  
  return (
    <ThemeProvider options={{ defaultTheme: 'light' }}>
      <AvatarProvider
        options={{
          persist: true,
          customColors: [ 'bg-blue-500', 'bg-red-500', 'bg-green-500' ],
          maxCacheSize: 50,
          onError: (error) => console.error('Avatar error:', error),
        }}
      >
        <ChatSettingsProvider>
          <ChatClientProvider client={chatClient}>
            {children}
          </ChatClientProvider>
        </ChatSettingsProvider>
      </AvatarProvider>
    </ThemeProvider>
  );
}
