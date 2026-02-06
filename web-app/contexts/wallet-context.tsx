'use client';

import { useEnsName } from '@/hooks/useEnsName';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al desconectar';
      setError(message);
      console.error('Logout error:', error);
    }
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
