"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const WALLET_STORAGE_KEY = "growi_wallet_address"

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Load wallet from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem(WALLET_STORAGE_KEY)
    if (savedAddress) {
      setAddress(savedAddress)
    }
  }, [])

  const connect = useCallback(async () => {
    setIsConnecting(true)
    try {
      // Check if MetaMask or other wallet is available
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }) as string[] | null
        if (accounts && accounts.length > 0) {
          const walletAddress = accounts[0]
          setAddress(walletAddress)
          localStorage.setItem(WALLET_STORAGE_KEY, walletAddress)
        }
      } else {
        // Fallback: generate a mock address for development
        const mockAddress = "0x" + Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("")
        setAddress(mockAddress)
        localStorage.setItem(WALLET_STORAGE_KEY, mockAddress)
        console.warn("No wallet provider found. Using mock address for development.")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    localStorage.removeItem(WALLET_STORAGE_KEY)
  }, [])

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on?: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}