'use client';

import { WaaPProvider } from '@/components/WaaPProvider';
import { useWallet, WalletProvider } from '@/contexts/wallet-context';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

const Redirection = () => {
  const { isConnected } = useWallet();
  const pathname = usePathname();
  const router = useRouter();
  const [ isChecking, setIsChecking ] = React.useState(true);

  // Wait a moment for auto-reconnect to attempt restoration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500); // Give WaaP 500ms to restore session

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only redirect if we've finished checking AND user is not connected
    if (!isChecking && !isConnected && pathname !== '/login' && pathname !== '/' && pathname !== '') {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [ isConnected, isChecking, pathname, router ]);

  return null;
};

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <WaaPProvider>
      <WalletProvider>
        <Redirection />
        {children}
      </WalletProvider>
    </WaaPProvider>
  );
}
