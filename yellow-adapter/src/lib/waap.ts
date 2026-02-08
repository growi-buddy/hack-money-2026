// WAAP (Wallet as a Protocol) configuration
// Docs: https://docs.waap.xyz/

import { initWaaP } from '@human.tech/waap-sdk';

// WAAP instance (initialized on client-side only)
let waapInstance: any = null;

export function getWaap() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!waapInstance) {
    waapInstance = initWaaP({
      authMethods: ['email', 'social', 'wallet'],
      socialProviders: ['google', 'twitter'],
      styles: {
        darkMode: true,
      },
    });
  }
  
  return waapInstance;
}
