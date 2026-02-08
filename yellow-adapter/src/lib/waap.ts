// WAAP (Wallet as a Protocol) configuration
// Docs: https://docs.wallet.human.tech/

import { initWaaP } from '@human.tech/waap-sdk';

// Flag para saber si ya se inicializó
let isInitialized = false;

/**
 * Inicializa WaaP una sola vez
 * Según la documentación oficial, initWaaP configura window.waap automáticamente
 * Docs: https://docs.wallet.human.tech/quick-start
 */
export function initializeWaap() {
  if (typeof window === 'undefined' || isInitialized) {
    return;
  }
  
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  
  // initWaaP configura window.waap automáticamente
  initWaaP({
    config: {
      authenticationMethods: ['email', 'social', 'wallet'],
      allowedSocials: ['google', 'twitter', 'discord'],
      styles: {
        darkMode: true,
      },
      showSecured: true,
    },
    useStaging: false,
    // walletConnectProjectId solo si agregas 'wallet' en authenticationMethods
    ...(walletConnectProjectId && { walletConnectProjectId }),
  });
  
  isInitialized = true;
  console.log('✅ WaaP initialized - window.waap is ready');
}

/**
 * Obtiene la instancia de window.waap
 * Debe usarse DESPUÉS de llamar initializeWaap()
 */
export function getWaap() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  // Usar window.waap directamente como indica la documentación
  return (window as any).waap || null;
}
