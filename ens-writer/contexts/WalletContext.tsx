"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { initializeWaaP, getWaaP } from "@/lib/waap/initWaap";

type WalletStatus = "idle" | "ready" | "connected" | "error";

interface WalletContextValue {
  status: WalletStatus;
  address: string | null;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>("idle");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize WaaP on mount
  useEffect(() => {
    try {
      initializeWaaP();
      setStatus("ready");

      // Try to auto-reconnect if already connected
      const tryAutoConnect = async () => {
        try {
          const waap = getWaaP();
          const accounts = await waap.request({
            method: "eth_requestAccounts",
          });

          if (accounts && accounts.length > 0) {
            const addr = accounts[0].toLowerCase();
            setAddress(addr);
            setStatus("connected");
            console.log("[Wallet] Auto-connected:", addr);
          }
        } catch (err) {
          // No auto-connect available, user needs to connect manually
          console.log("[Wallet] No auto-connect available");
        }
      };

      tryAutoConnect();
    } catch (err) {
      console.error("[Wallet] Initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize");
      setStatus("error");
    }
  }, []);

  const connect = useCallback(async () => {
    try {
      setStatus("ready");
      setError(null);

      const waap = getWaaP();

      // 1. Login with WaaP
      console.log("[Wallet] Requesting login...");
      await waap.login();

      // 2. Get address
      console.log("[Wallet] Requesting accounts...");
      const accounts = await waap.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned");
      }

      const addr = accounts[0].toLowerCase();
      setAddress(addr);
      setStatus("connected");
      console.log("[Wallet] Connected:", addr);
    } catch (err) {
      console.error("[Wallet] Connection error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect");
      setStatus("error");
      throw err;
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setStatus("ready");
    setError(null);
    console.log("[Wallet] Disconnected");
  }, []);

  const value: WalletContextValue = {
    status,
    address,
    error,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
