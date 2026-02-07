'use client';

import { useEnsName } from '@/hooks/useEnsName';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

interface WalletContextType {
  address: string | null,
  ensName: string | null,
  displayName: string | null,
  loginType: 'human' | 'walletconnect' | 'injected' | null,
  error: string,
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [ address, setAddress ] = useState<string | null>(null);
  const [ isConnecting, setIsConnecting ] = useState(false);
  const [ loginType, setLoginType ] = useState<'human' | 'walletconnect' | 'injected' | null>(null);
  const [ error, setError ] = useState<string>('');
  const { ensName, displayName } = useEnsName(address);
  
  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError('');
    try {
      if (!window.waap) {
        throw new Error('WaaP no está inicializado');
      }

      // Abre el modal de WaaP - el usuario elige Google, MetaMask, Email, etc.
      const type = await window.waap.login();
      setLoginType(type);
      localStorage.setItem('waap_login_type', type);
      console.log('Login type:', type);
      const accounts = await window.waap.request({
        method: 'eth_requestAccounts',
      });

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al conectar wallet';
      setError(message);
      console.error('Connect error:', error);
    } finally {
      setIsConnecting(false);
    }
  }, []);
  
  const disconnect = useCallback(async () => {
    try {
      if (window.waap) {
        await window.waap.logout();
      }

      setAddress('');
      setError('');
      setLoginType(null);
      localStorage.removeItem('waap_login_type');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al desconectar';
      setError(message);
      console.error('Logout error:', error);
    }
  }, []);

  // Auto-reconnect on mount if WaaP has an active session
  useEffect(() => {
    const tryAutoConnect = async () => {
      if (!window.waap) {
        console.log('[Wallet] WaaP not initialized yet');
        return;
      }

      try {
        console.log('[Wallet] Attempting auto-reconnect...');
        const accounts = await window.waap.request({
          method: 'eth_requestAccounts',
        });

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);

          // Restore login type from localStorage if available
          const savedType = localStorage.getItem('waap_login_type');
          if (savedType) {
            setLoginType(savedType as 'human' | 'walletconnect' | 'injected');
          }

          console.log('[Wallet] Auto-reconnected:', accounts[0]);
        }
      } catch (error) {
        // Silently fail - user needs to connect manually
        console.log('[Wallet] No active session available');
      }
    };

    // Small delay to ensure WaaP is initialized
    const timer = setTimeout(tryAutoConnect, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        ensName,
        displayName,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
        loginType,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
