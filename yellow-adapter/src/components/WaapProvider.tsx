'use client';

import React, { useEffect, useState } from 'react';
import { getWaap } from '@/src/lib/waap';

interface WaapContextType {
  address: string | null;
  isConnected: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const WaapContext = React.createContext<WaapContextType>({
  address: null,
  isConnected: false,
  login: async () => {},
  logout: async () => {},
});

export function WaapProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const getAddressFromWaap = async (waap: Awaited<ReturnType<typeof getWaap>>) => {
    if (!waap) return null;
    try {
      const accounts = (await waap.request({ method: 'eth_accounts' })) as string[] | undefined;
      return accounts?.[0] ?? null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // Check if user is already connected
    const checkConnection = async () => {
      const waap = getWaap();
      if (!waap) return;
      if (!waap.isConnected?.()) return;

      try {
        const addr = await getAddressFromWaap(waap);
        if (addr) {
          setAddress(addr);
          setIsConnected(true);
        }
      } catch {
        // Not connected
      }
    };

    checkConnection();
  }, []);

  const login = async () => {
    const waap = getWaap();
    if (!waap) return;

    try {
      await waap.login();
      const addr = await getAddressFromWaap(waap);
      if (addr) {
        setAddress(addr);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    const waap = getWaap();
    if (!waap) return;
    
    try {
      await waap.logout();
      setAddress(null);
      setIsConnected(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <WaapContext.Provider value={{ address, isConnected, login, logout }}>
      {children}
    </WaapContext.Provider>
  );
}

export function useWaap() {
  const context = React.useContext(WaapContext);
  if (!context) {
    throw new Error('useWaap must be used within WaapProvider');
  }
  return context;
}
