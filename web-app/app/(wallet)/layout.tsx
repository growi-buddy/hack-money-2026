'use client';

import { WaaPProvider } from '@/components/WaaPProvider';
import { useWallet, WalletProvider } from '@/contexts/wallet-context';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const Redirection = () => {
  const { isConnected } = useWallet();
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    if (!isConnected && pathname !== '/login' && pathname !== '/' && pathname !== '') {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [ isConnected, pathname, router ]);
  
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
