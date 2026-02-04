"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, ShoppingCart, DollarSign, Check, ArrowRight, Package, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { staggerContainer, staggerItem } from "@/lib/animations"

const campaignDetails = {
  id: "1",
  title: "Nike Summer Collection",
  brand: "Nike",
  description: "Promote our new summer shoe collection through engaging content. Create authentic reviews, try-on videos, or styling content.",
  image: "/growi-loading.png",
  startDate: "Feb 10, 2026",
  endDate: "Feb 24, 2026",
  totalBudget: "$5,000",
  requirements: [
    "Minimum 10k followers",
    "Fashion/lifestyle niche",
    "Must show product in use",
    "Include unique tracking link"
  ],
  bounties: [
    { id: "landing", label: "LANDING PAGE VIEW", rate: "$0.007 per view", icon: Eye },
    { id: "viewItem", label: "VIEW ITEM", rate: "$0.01 per view", icon: Package },
    { id: "cart", label: "ADD TO CART", rate: "$0.05 per action", icon: ShoppingCart },
    { id: "checkout", label: "CHECKOUT", rate: "$0.10 per checkout", icon: CreditCard },
    { id: "purchase", label: "PURCHASE (THANK YOU PAGE)", rate: "$0.50 per purchase", icon: DollarSign }
  ]
}

export default function CampaignDetailsPage() {
  const router = useRouter()
  const [selectedBounties, setSelectedBounties] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const toggleBounty = (id: string) => {
    setSelectedBounties(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const handleApply = async () => {
    if (selectedBounties.length === 0) return
    setShowSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push(`/influencer/campaign/${campaignDetails.id}/qr`)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Badge className="bg-growi-blue/20 text-growi-blue hover:bg-growi-blue/30">
          Campaign
        </Badge>
        <Badge variant="outline" className="border-orange-500/50 text-orange-500">
          HOT
        </Badge>
      </motion.div>

      {/* Campaign Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={campaignDetails.image || "/placeholder.svg"}
                  alt={campaignDetails.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl text-foreground">{campaignDetails.title}</CardTitle>
                <CardDescription className="mt-1">by {campaignDetails.brand}</CardDescription>
                <p className="mt-3 text-sm text-muted-foreground">{campaignDetails.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Campaign Info */}
              <motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="mt-1 font-semibold text-foreground">{campaignDetails.startDate}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="mt-1 font-semibold text-foreground">{campaignDetails.endDate}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                  <p className="mt-1 font-semibold text-growi-money">{campaignDetails.totalBudget}</p>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div variants={staggerItem}>
                <h3 className="mb-3 font-semibold text-foreground">Requirements</h3>
                <ul className="space-y-2">
                  {campaignDetails.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-growi-success" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Bounty Selection */}
              <motion.div variants={staggerItem}>
                <h3 className="mb-3 font-semibold text-foreground">Select Bounties</h3>
                <div className="space-y-3">
                  {campaignDetails.bounties.map((bounty) => {
                    const isSelected = selectedBounties.includes(bounty.id)
                    return (
                      <motion.div
                        key={bounty.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleBounty(bounty.id)}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                          isSelected
                            ? "border-growi-blue bg-growi-blue/10"
                            : "border-border bg-secondary/30 hover:border-growi-blue/50"
                        }`}
                      >
                        <motion.div
                          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <Checkbox
                            checked={isSelected}
                            className="border-growi-blue data-[state=checked]:bg-growi-blue"
                          />
                        </motion.div>
                        <bounty.icon className={`h-5 w-5 ${isSelected ? "text-growi-blue" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <p className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                            {bounty.label}
                          </p>
                          <p className="text-sm text-growi-money">{bounty.rate}</p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-growi-blue"
                          >
                            <Check className="h-4 w-4 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Apply Button */}
              <motion.div variants={staggerItem}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    onClick={handleApply}
                    disabled={selectedBounties.length === 0}
                    className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90 disabled:opacity-50"
                  >
                    <motion.div
                      className="absolute inset-0 bg-growi-lime/30"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Apply for Bounty
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="w-80 text-center">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
                  >
                    <Check className="h-8 w-8 text-growi-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Generating your tracking links...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
