'use client';

import React, { useEffect, useState } from 'react';
import { initializeWaap, getWaap } from '@/src/lib/waap';

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

  useEffect(() => {
    // Inicializar WaaP una sola vez
    // Esto configura window.waap automáticamente
    initializeWaap();

    // Intentar auto-connect (si el usuario estaba conectado previamente)
    // Según la docs: eth_requestAccounts tiene auto-connect functionality
    const checkAutoConnect = async () => {
      const waap = getWaap();
      if (!waap) return;

      try {
        // eth_requestAccounts intenta auto-connect automáticamente
        // Si falla, simplemente no conecta (no muestra popup)
        const accounts = await waap.request({ 
          method: 'eth_accounts' // Usar eth_accounts (sin popup) para check inicial
        }) as string[];
        
        if (accounts && accounts.length > 0) {
          console.log('🔄 Auto-connected:', accounts[0]);
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        // No hay auto-connect disponible, usuario debe hacer login manual
        console.log('ℹ️ No previous session found');
      }
    };

    checkAutoConnect();

    // Setup event listeners según la documentación oficial
    // Docs: https://docs.wallet.human.tech/guides/methods#event-listeners
    const waap = getWaap();
    if (!waap) return;

    const handleAccountsChanged = (accounts: string[]) => {
      console.log('🔄 Account changed:', accounts[0] || 'disconnected');
      if (accounts.length === 0) {
        setAddress(null);
        setIsConnected(false);
      } else {
        setAddress(accounts[0]);
        setIsConnected(true);
      }
    };

    const handleDisconnect = () => {
      console.log('🔌 Wallet disconnected');
      setAddress(null);
      setIsConnected(false);
    };

    // Registrar listeners
    waap.on('accountsChanged', handleAccountsChanged);
    waap.on('disconnect', handleDisconnect);

    // Cleanup al desmontar
    return () => {
      const waap = getWaap();
      if (waap) {
        waap.removeListener('accountsChanged', handleAccountsChanged);
        waap.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const login = async () => {
    const waap = getWaap();
    if (!waap) {
      throw new Error('WaaP not initialized');
    }

    try {
      // 1. Abrir el modal de login de WaaP
      console.log('🔐 Opening WaaP login modal...');
      const loginType = await waap.login();
      
      if (!loginType) {
        console.log('ℹ️ User cancelled login');
        return;
      }
      
      console.log('✅ User logged in with:', loginType);
      
      // 2. Solicitar cuentas (esto autoriza eth_sendTransaction automáticamente)
      // Según docs: "When granted, it also provides access to eth_sendTransaction, 
      // personal_sign, and eth_signTypedData_v4"
      console.log('🔐 Requesting account authorization...');
      const accounts = await waap.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      console.log('✅ Accounts authorized:', accounts);
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
      } else {
        throw new Error('No accounts available after authorization');
      }
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    const waap = getWaap();
    if (!waap) return;
    
    try {
      await waap.logout();
      setAddress(null);
      setIsConnected(false);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout failed:', error);
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

  // Agregar métodos para transacciones on-chain
  const sendTransaction = async (tx: {
    to: string;
    data: string;
    value?: string;
    gas?: string;
    chainId?: number; // Agregar chainId opcional
  }): Promise<string> => {
    if (typeof window === 'undefined') {
      throw new Error('Window not available');
    }
    
    if (!context.isConnected || !context.address) {
      throw new Error('Wallet not connected');
    }

    const waap = getWaap();
    if (!waap) {
      throw new Error('WaaP not initialized. Please refresh the page.');
    }

    try {
      // CRÍTICO: Cambiar a la red correcta antes de enviar transacción
      // Por defecto, usar Base Sepolia (84532) donde están los contratos de Yellow
      const targetChainId = tx.chainId || 84532; // Base Sepolia por defecto
      const chainIdHex = `0x${targetChainId.toString(16)}`;
      
      console.log(`🔄 Cambiando a red: Chain ID ${targetChainId} (${chainIdHex})...`);
      
      try {
        // Intentar cambiar a la red
        await waap.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
        console.log('✅ Red cambiada exitosamente');
      } catch (switchError: any) {
        // Si la red no está agregada, agregarla
        if (switchError.code === 4902 || switchError.message?.includes('Unrecognized chain')) {
          console.log('⚠️ Red no encontrada, agregándola...');
          
          // Configuración de Base Sepolia
          await waap.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainIdHex,
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.base.org'],
              blockExplorerUrls: ['https://sepolia.basescan.org'],
            }],
          });
          console.log('✅ Red agregada y cambiada exitosamente');
        } else {
          throw switchError;
        }
      }
      
      console.log('📤 Sending transaction via WaaP:', { 
        from: context.address,
        to: tx.to, 
        value: tx.value,
        chainId: targetChainId,
        data: tx.data.substring(0, 10) + '...' // Log solo los primeros bytes
      });
      
      // Usar window.waap.request según la documentación oficial
      // Docs: https://docs.wallet.human.tech/guides/methods#request
      const txHash = await waap.request({
        method: 'eth_sendTransaction',
        params: [{
          from: context.address,
          to: tx.to,
          data: tx.data,
          value: tx.value || '0x0',
          ...(tx.gas && { gas: tx.gas }),
        }],
      }) as string;

      console.log('✅ Transaction sent successfully:', txHash);
      return txHash;
    } catch (error: any) {
      console.error('❌ Send transaction error:', error);
      
      // Errores comunes según la documentación
      if (error.message?.includes('not been authorized') || error.message?.includes('must match')) {
        throw new Error('⚠️ Wallet no autorizada. Por favor, desconéctate (logout) y vuelve a conectar tu wallet.');
      }
      
      if (error.message?.includes('User rejected')) {
        throw new Error('❌ Transacción rechazada por el usuario');
      }
      
      throw new Error(error.message || 'Transaction failed');
    }
  };

  const signTypedData = async (typedData: {
    domain: any;
    types: any;
    message: any;
    primaryType: string;
  }): Promise<string> => {
    console.log('🔍 signTypedData called');
    
    if (typeof window === 'undefined') {
      console.error('❌ Window not available');
      throw new Error('Window not available');
    }
    
    if (!context.isConnected || !context.address) {
      console.error('❌ Wallet not connected', { 
        isConnected: context.isConnected, 
        address: context.address 
      });
      throw new Error('Wallet not connected');
    }

    const waap = getWaap();
    if (!waap) {
      console.error('❌ WaaP not initialized');
      throw new Error('WaaP not initialized. Please refresh the page.');
    }

    console.log('✅ All checks passed, proceeding to sign...');

    try {
      console.log('✍️ Signing typed data (EIP-712) with WaaP...');
      console.log('📝 TypedData structure:', {
        hasDomain: !!typedData.domain,
        hasTypes: !!typedData.types,
        hasMessage: !!typedData.message,
        primaryType: typedData.primaryType,
      });
      
      // WaaP implementa EIP-712 vía eth_signTypedData_v4
      console.log('🔐 Calling waap.request with eth_signTypedData_v4...');
      const signature = await waap.request({
        method: 'eth_signTypedData_v4',
        params: [
          context.address,
          JSON.stringify({
            domain: typedData.domain,
            types: typedData.types,
            primaryType: typedData.primaryType,
            message: typedData.message,
          }),
        ],
      }) as string;

      console.log('✅ Signature obtained:', signature.substring(0, 10) + '...');
      return signature;
    } catch (error: any) {
      console.error('❌ Sign typed data error:', error);
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      
      if (error.message?.includes('User rejected')) {
        throw new Error('❌ Firma rechazada por el usuario');
      }
      
      throw new Error(error.message || 'Signature failed');
    }
  };

  return {
    ...context,
    sendTransaction,
    signTypedData,
  };
}
