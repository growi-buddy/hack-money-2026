'use client';

import { initWaaP } from '@human.tech/waap-sdk';
import { useEffect } from 'react';

export function WaaPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const wcProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
    
    initWaaP({
      config: {
        authenticationMethods: [ 'social', 'wallet', 'email' ],
        allowedSocials: [ 'google' ],
        styles: {
          darkMode: false,
        },
        showSecured: true,
      },
      walletConnectProjectId: wcProjectId,
      useStaging: false,
    });
  }, []);
  
  return <>{children}</>;
}
