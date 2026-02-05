"use client"

import React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { WalletProvider, useWallet } from "@/contexts/wallet-context"

function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { address, isConnected, connect, disconnect } = useWallet()

  // Format address for display
  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : undefined

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar
        showMenu
        onMenuClick={() => setSidebarOpen(true)}
        connected={isConnected}
        address={displayAddress}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      <div className="flex flex-1">
        <AppSidebar
          type="client"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </WalletProvider>
  )
}
