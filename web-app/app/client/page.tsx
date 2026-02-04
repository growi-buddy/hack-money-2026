"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Download, Plus, ArrowRight, Sparkles, Archive, CheckCircle, RotateCcw, Eye, Package, ShoppingCart, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { staggerContainer, staggerItem, scaleIn, pulse } from "@/lib/animations"


// Mock campaigns data
const mockCampaigns = [
  {
    id: "1",
    title: "Nike Summer Collection",
    status: "active",
    budget: 5000,
    spent: 2450,
    landingViews: 125000,
    viewItems: 67500,
    addToCart: 8500,
    checkout: 2100,
    purchases: 342,
    interests: ["Fashion", "Sports", "Lifestyle"]
  },
  {
    id: "2",
    title: "Adidas Winter Drop",
    status: "active",
    budget: 3000,
    spent: 1200,
    landingViews: 45000,
    viewItems: 24000,
    addToCart: 3200,
    checkout: 890,
    purchases: 128,
    interests: ["Fitness", "Sports", "Streetwear"]
  }
]

// Completed campaigns
const completedCampaigns = [
  {
    id: "c1",
    title: "Puma Rush Campaign",
    budget: 4000,
    spent: 3850,
    purchases: 428,
    roi: "215%",
    endDate: "Jan 30, 2026"
  },
  {
    id: "c2",
    title: "Under Armour Training",
    budget: 3500,
    spent: 3200,
    purchases: 312,
    roi: "185%",
    endDate: "Jan 15, 2026"
  }
]

// Initially archived campaigns
const initialArchivedCampaigns = [
  {
    id: "a1",
    title: "Reebok Classic",
    budget: 2500,
    spent: 2100,
    purchases: 156,
    roi: "142%",
    endDate: "Dec 20, 2025"
  }
]

export default function ClientDashboard() {
  const hasCampaigns = mockCampaigns.length > 0
  const [archivedCampaigns, setArchivedCampaigns] = useState(initialArchivedCampaigns)
  const [activeCompleted, setActiveCompleted] = useState(completedCampaigns)

  const archiveCampaign = (campaign: typeof completedCampaigns[0]) => {
    setActiveCompleted(prev => prev.filter(c => c.id !== campaign.id))
    setArchivedCampaigns(prev => [...prev, campaign])
  }

  const restoreCampaign = (campaign: typeof completedCampaigns[0]) => {
    setArchivedCampaigns(prev => prev.filter(c => c.id !== campaign.id))
    setActiveCompleted(prev => [...prev, campaign])
  }

  return (
    <div className="space-y-6">
      {/* Install CTA Card */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-growi-blue/50 bg-growi-blue/10">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                variants={pulse}
                initial="initial"
                animate="animate"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-growi-blue/20"
              >
                <Download className="h-6 w-6 text-growi-blue" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">Install GROWI to Create Campaigns</h3>
                <p className="text-sm text-muted-foreground">
                  Set up event tracking on your website to start creating campaigns
                </p>
              </div>
            </div>
            <Link href="/client/setup">
              <Button className="bg-growi-blue text-white hover:bg-growi-blue/90">
                Setup Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Campaigns Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Your Campaigns</h2>
          <Link href="/client/create">
            <Button variant="outline" size="sm" className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>

        {hasCampaigns ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {mockCampaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/client/campaign/${campaign.id}`}>
                  <Card className="cursor-pointer transition-colors hover:border-growi-blue/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        <span className="rounded-full bg-growi-success/20 px-2 py-1 text-xs font-medium text-growi-success">
                          Active
                        </span>
                      </div>
                      <CardDescription>
                        Budget: ${campaign.budget.toLocaleString()} | Spent: ${campaign.spent.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <p className="text-lg font-bold text-foreground">{(campaign.landingViews / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{(campaign.addToCart / 1000).toFixed(1)}k</p>
                          <p className="text-xs text-muted-foreground">Cart</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">{(campaign.checkout / 1000).toFixed(1)}k</p>
                          <p className="text-xs text-muted-foreground">Checkout</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-growi-money">{campaign.purchases}</p>
                          <p className="text-xs text-muted-foreground">Sales</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>Budget Used</span>
                          <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="h-full bg-growi-blue"
                            initial={{ width: 0 }}
                            animate={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
                >
                  <Sparkles className="h-10 w-10 text-growi-blue" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">Your Campaigns Will Show Here</h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Once you create your first campaign, it will appear in this section. 
                  Use our AI assistant to set up performance-based bounties and start connecting with influencers.
                </p>
                <Link href="/client/create" className="mt-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="bg-growi-blue text-white hover:bg-growi-blue/90">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Campaign
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Completed Campaigns Section */}
      {activeCompleted.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <CheckCircle className="h-5 w-5 text-growi-success" />
              Completed Campaigns
            </h2>
            <Badge variant="outline">{activeCompleted.length} completed</Badge>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {activeCompleted.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="transition-colors hover:border-growi-success/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                      <Badge className="bg-growi-success/20 text-growi-success">Completed</Badge>
                    </div>
                    <CardDescription>
                      Budget: ${campaign.budget.toLocaleString()} | Spent: ${campaign.spent.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{campaign.purchases}</p>
                        <p className="text-xs text-muted-foreground">Purchases</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-growi-success">{campaign.roi}</p>
                        <p className="text-xs text-muted-foreground">ROI</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{campaign.endDate}</p>
                        <p className="text-xs text-muted-foreground">End Date</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/client/campaign/${campaign.id}/complete`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Summary
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => archiveCampaign(campaign)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Archived Campaigns Section */}
      {archivedCampaigns.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <Archive className="h-5 w-5" />
              Archived Campaigns
            </h2>
            <Badge variant="secondary">{archivedCampaigns.length} archived</Badge>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {archivedCampaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="opacity-60 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-foreground">{campaign.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">Archived</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Ended: {campaign.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{campaign.purchases}</span>
                        <span className="text-muted-foreground"> purchases</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => restoreCampaign(campaign)}
                        className="h-8 text-xs"
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Restore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
