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
      <div className="px-4 py-2 bg-red-900/20 border border-red-500 rounded-lg text-red-300 text-sm">
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
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  // Conectado
  return (
    <div className="flex items-center gap-3">
      <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-mono text-sm">{formatAddress(address)}</span>
        </div>
      </div>
      <button
        onClick={handleDisconnect}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}
