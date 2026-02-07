"use client";

import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";

export function ConnectButton() {
  const { status, address, connect, disconnect, error } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (err) {
      console.error("Failed to connect:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Estado de error
  if (status === "error") {
    return (
      <div 
        className="px-4 py-2 rounded-full text-sm font-medium"
        style={{
          backgroundColor: "rgba(255, 99, 71, 0.1)",
          border: "2px solid rgba(255, 99, 71, 0.3)",
          color: "#DC3545"
        }}
      >
        Error: {error}
      </div>
    );
  }

  // No conectado
  if (!address) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting || status === "idle"}
        className="px-6 py-2 rounded-full font-bold text-sm lg:text-base transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          backgroundColor: "#B0D74C",
          color: "#2D3436",
          boxShadow: "0 2px 10px rgba(176, 215, 76, 0.4)"
        }}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  // Conectado
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div 
        className="px-4 py-2 rounded-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          border: "1px solid rgba(176, 215, 76, 0.2)"
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: "#B0D74C" }}
          ></div>
          <span 
            className="font-mono text-xs lg:text-sm font-medium"
            style={{ color: "#2D3436" }}
          >
            {formatAddress(address)}
          </span>
        </div>
      </div>
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 rounded-full text-xs lg:text-sm font-bold transition-all hover:scale-105"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#636E72",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}
      >
        Disconnect
      </button>
    </div>
  );
}
