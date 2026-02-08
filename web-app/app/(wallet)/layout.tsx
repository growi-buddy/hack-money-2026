'use client';

import { WaaPProvider } from '@/components/WaaPProvider';
import { useWallet, WalletProvider } from '@/contexts/wallet-context';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{
            scale: [ 1, 1.05, 1 ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <Image
            src="/growi-mascot.png"
            alt="Growi"
            width={120}
            height={120}
            className="rounded-full"
            priority
          />
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-2 -right-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growi-blue">
              <Loader2 className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </motion.div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Connecting Wallet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please wait a moment...</p>
        </div>
      </motion.div>
    </div>
  );
};

const Redirection = ({ children }: PropsWithChildren) => {
  const { isConnected, isConnecting } = useWallet();
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
  
  if (isChecking || isConnecting) {
    return <LoadingScreen />;
  }
  
  return <>{children}</>;
};

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <WaaPProvider>
      <WalletProvider>
        <Redirection>
          {children}
        </Redirection>
      </WalletProvider>
    </WaaPProvider>
  );
}
