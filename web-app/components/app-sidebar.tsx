"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  PlusCircle,
  X,
  Cog,
  Send,
  Users,
  UserCircle,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AppSidebarProps {
  type: "client" | "influencer"
  isOpen?: boolean
  onClose?: () => void
}

// Mock live influencers data
const liveInfluencers = [
  { id: "1", name: "Alex Chen", avatar: "/growi-mascot.png", followers: "125K", status: "online" },
  { id: "2", name: "Sarah Kim", avatar: "/growi-mascot.png", followers: "89K", status: "online" },
  { id: "3", name: "Mike Ross", avatar: "/growi-mascot.png", followers: "256K", status: "away" },
]

// Mock live campaign managers data
const liveCampaignManagers = [
  { id: "1", name: "Nike Marketing", avatar: "/growi-mascot.png", campaigns: 5, status: "online" },
  { id: "2", name: "Adidas Global", avatar: "/growi-mascot.png", campaigns: 3, status: "online" },
  { id: "3", name: "Puma Agency", avatar: "/growi-mascot.png", campaigns: 2, status: "away" },
]

const clientLinks = [
  { href: "/client", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/client/setup", icon: Cog, label: "Setup Tracking" },
  { href: "/client/create", icon: PlusCircle, label: "Create Campaign" },
  { href: "/client/influencers", icon: Users, label: "Influencers" },
  { href: "/client/inbox", icon: Inbox, label: "Inbox" },
]

const influencerLinks = [
  { href: "/influencer", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/influencer/campaigns", icon: Package, label: "Campaigns" },
  { href: "/influencer/managers", icon: Users, label: "Campaign Managers" },
  { href: "/influencer/inbox", icon: Inbox, label: "Inbox" },
  { href: "/influencer/profile", icon: UserCircle, label: "Profile" },
]

export function AppSidebar({ type, isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const links = type === "client" ? clientLinks : influencerLinks

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-background shadow-xl md:hidden"
          >
            {/* Close button for mobile */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-semibold text-foreground">
                {type === "client" ? "Client Menu" : "Influencer Menu"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex-1 space-y-1 p-4"
            >
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/client" && link.href !== "/influencer" && pathname.startsWith(link.href))
                return (
                  <motion.div key={link.href} variants={staggerItem}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-growi-blue/10 text-growi-blue"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:block lg:w-64">
        <nav className="space-y-1 p-4">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/client" && link.href !== "/influencer" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-growi-blue/10 text-growi-blue"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Live Influencers Section (Client only) */}
        {type === "client" && (
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Live Influencers</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {liveInfluencers.filter(i => i.status === "online").length} online
              </Badge>
            </div>
            <div className="space-y-2">
              {liveInfluencers.map((influencer) => (
                <motion.div
                  key={influencer.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-secondary"
                >
                  <div className="relative">
                    <Image
                      src={influencer.avatar || "/placeholder.svg"}
                      alt={influencer.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card",
                      influencer.status === "online" ? "bg-growi-success" : "bg-growi-yellow"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{influencer.name}</p>
                    <p className="text-xs text-muted-foreground">{influencer.followers} followers</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <Send className="h-3.5 w-3.5 text-growi-blue" />
                  </Button>
                </motion.div>
              ))}
            </div>
            <Link href="/client/influencers">
              <Button variant="ghost" size="sm" className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground">
                View All Influencers
              </Button>
            </Link>
          </div>
        )}

        {/* Live Campaign Managers Section (Influencer only) */}
        {type === "influencer" && (
          <div className="border-t border-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Live Campaign Managers</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {liveCampaignManagers.filter(m => m.status === "online").length} online
              </Badge>
            </div>
            <div className="space-y-2">
              {liveCampaignManagers.map((manager) => (
                <motion.div
                  key={manager.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-secondary"
                >
                  <div className="relative">
                    <Image
                      src={manager.avatar || "/placeholder.svg"}
                      alt={manager.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card",
                      manager.status === "online" ? "bg-growi-success" : "bg-growi-yellow"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{manager.name}</p>
                    <p className="text-xs text-muted-foreground">{manager.campaigns} campaigns</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <Send className="h-3.5 w-3.5 text-growi-blue" />
                  </Button>
                </motion.div>
              ))}
            </div>
            <Link href="/influencer/managers">
              <Button variant="ghost" size="sm" className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground">
                View All Campaign Managers
              </Button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            {type === "client" ? "Campaign Manager Portal" : "Influencer Portal"}
          </p>
        </div>
      </aside>
    </>
  )
}
