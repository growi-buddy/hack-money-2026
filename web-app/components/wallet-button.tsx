"use client"

import { motion } from "framer-motion"
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useCallback } from "react"

interface WalletButtonProps {
  connected?: boolean
  address?: string
  onConnect?: () => void
  onDisconnect?: () => void
}

export function WalletButton({ 
  connected = false, 
  address = "0x1234...5678",
  onConnect,
  onDisconnect 
}: WalletButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyAddress = useCallback(async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }, [address])

  if (!connected) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onConnect}
          className="relative overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ 
              x: isHovered ? "100%" : "-100%",
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.5 }}
          />
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </motion.div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-growi-blue/50 text-foreground bg-transparent">
          <Wallet className="mr-2 h-4 w-4 text-growi-blue" />
          {address}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDisconnect} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
