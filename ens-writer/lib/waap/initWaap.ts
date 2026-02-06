/**
 * WaaP Initialization (Client-Side Only)
 * 
 * Initializes human.tech WaaP SDK for wallet connection.
 * This file should only be imported in client components.
 */

import { initWaaP } from "@human.tech/waap-sdk";

// Global flag to prevent multiple initializations
declare global {
  interface Window {
    __waapInitialized?: boolean;
    waap?: any;
  }
}

/**
 * Initializes WaaP SDK (client-only)
 * 
 * This function is idempotent - it only initializes once.
 */
export function initializeWaaP(): void {
  // Prevent execution on server
  if (typeof window === "undefined") {
    console.warn("[WaaP] Cannot initialize on server");
    return;
  }

  // Prevent multiple initializations
  if (window.__waapInitialized) {
    console.log("[WaaP] Already initialized");
    return;
  }

  try {
    const appId = process.env.NEXT_PUBLIC_WAAP_APP_ID;
    const env = process.env.NEXT_PUBLIC_WAAP_ENV || "production";

    if (!appId) {
      throw new Error("NEXT_PUBLIC_WAAP_APP_ID is not configured");
    }

    console.log("[WaaP] Initializing with config:", { appId, env });

    // Initialize WaaP with configuration
    initWaaP({
      appId,
      env: env as "production" | "staging",
    } as any);

    // Mark as initialized
    window.__waapInitialized = true;
    console.log("[WaaP] Initialized successfully");
  } catch (error) {
    console.error("[WaaP] Initialization failed:", error);
    throw error;
  }
}

/**
 * Gets the WaaP instance (must be initialized first)
 */
export function getWaaP(): any {
  if (typeof window === "undefined") {
    throw new Error("WaaP only available on client");
  }

  if (!window.waap) {
    throw new Error("WaaP not initialized. Call initializeWaaP() first.");
  }

  return window.waap;
}
