"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/wallet-button"
import { motion } from "framer-motion"

interface NavbarProps {
  showBack?: boolean
  onMenuClick?: () => void
  showMenu?: boolean
  connected?: boolean
  address?: string
}

export function Navbar({ 
  showBack = false, 
  onMenuClick, 
  showMenu = false,
  connected = false,
  address
}: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Determine if we should show back button
  const isSubPage = pathname !== "/" && pathname.split("/").length > 2

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {/* Menu button for mobile */}
          {showMenu && onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          )}
          
          {/* Back button */}
          {(showBack || isSubPage) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/growi-logo-full.png"
                alt="GROWI"
                width={140}
                height={45}
                className="h-10 w-auto md:h-11"
                priority
              />
            </motion.div>
          </Link>
        </div>
        
        <WalletButton connected={connected} address={address} />
      </div>
    </header>
  )
}
