"use client"

import React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"

export default function InfluencerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar 
        showMenu 
        onMenuClick={() => setSidebarOpen(true)} 
        connected 
        address="0x1234...5678" 
      />
      
      <AppSidebar
        type="influencer"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto p-4 md:ml-56 md:p-6 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
