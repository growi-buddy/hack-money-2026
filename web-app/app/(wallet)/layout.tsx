'use client';

import { WaaPProvider } from '@/components/WaaPProvider';
import { WalletProvider } from '@/contexts/wallet-context';

import React, { PropsWithChildren } from 'react';

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <WaaPProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </WaaPProvider>
  );
}
