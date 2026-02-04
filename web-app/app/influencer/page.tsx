"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Wallet, Copy, Check, ExternalLink, TrendingUp, Eye, ShoppingCart, Play, Archive, Clock, CheckCircle, DollarSign, Star, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { staggerContainer, staggerItem } from "@/lib/animations"

// Running campaigns (applied and accepted)
const runningCampaigns = [
  {
    id: "1",
    title: "Nike Summer Collection",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.007/units",
    image: "/growi-mascot.png",
    progress: 65,
    status: "active",
    earnings: 245.67,
    manager: "Nike Marketing",
    startDate: "Feb 10, 2026"
  },
  {
    id: "2",
    title: "Adidas Winter Drop",
    type: "AFFILIATE",
    rate: "$0.005/units",
    image: "/growi-mascot.png",
    progress: 32,
    status: "active",
    earnings: 87.50,
    manager: "Adidas Global",
    startDate: "Feb 15, 2026"
  },
  {
    id: "3",
    title: "Puma Rush Campaign",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.010/units",
    image: "/growi-mascot.png",
    progress: 0,
    status: "applied",
    earnings: 0,
    manager: "Puma Agency",
    startDate: "Pending"
  }
]

// Completed campaigns
const completedCampaigns = [
  {
    id: "c1",
    title: "Under Armour Training",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.009/units",
    image: "/growi-mascot.png",
    totalEarnings: 1245.67,
    manager: "Under Armour",
    endDate: "Jan 30, 2026",
    archived: false,
    landingViews: 45000,
    purchases: 156,
    rating: null as number | null
  },
  {
    id: "c2",
    title: "Reebok Classic",
    type: "AFFILIATE",
    rate: "$0.006/units",
    image: "/growi-mascot.png",
    totalEarnings: 567.89,
    manager: "Reebok Classics",
    endDate: "Jan 15, 2026",
    archived: false,
    landingViews: 28000,
    purchases: 89,
    rating: 4.5 as number | null
  },
  {
    id: "c3",
    title: "New Balance Heritage",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.008/units",
    image: "/growi-mascot.png",
    totalEarnings: 892.34,
    manager: "New Balance Pro",
    endDate: "Dec 20, 2025",
    archived: true,
    landingViews: 35000,
    purchases: 112,
    rating: 4.8 as number | null
  }
]

// Recent Activity data
const recentActivity = [
  {
    id: "a1",
    platform: "Instagram",
    link: "example.com/post1",
    clicks: 120,
    scans: 45
  },
  {
    id: "a2",
    platform: "Facebook",
    link: "example.com/post2",
    clicks: 90,
    scans: 30
  },
  {
    id: "a3",
    platform: "Twitter",
    link: "example.com/post3",
    clicks: 60,
    scans: 15
  }
]

// Available Campaigns data
const availableCampaigns = [
  {
    id: "av1",
    title: "Jordan Sneakers",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.008/units",
    image: "/growi-mascot.png",
    progress: 45,
    isHot: true,
    interests: ["Sports", "Fashion", "Men"]
  },
  {
    id: "av2",
    title: "Saucony Running Shoes",
    type: "AFFILIATE",
    rate: "$0.006/units",
    image: "/growi-mascot.png",
    progress: 20,
    isHot: false,
    interests: ["Sports", "Running", "Fitness"]
  },
  {
    id: "av3",
    title: "Vans Classic Skates",
    type: "UGC PAID PER CONFIRM",
    rate: "$0.007/units",
    image: "/growi-mascot.png",
    progress: 0,
    isHot: true,
    interests: ["Fashion", "Skating", "Youth"]
  }
]

function CountUpMoney({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return `$${latest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  })

  useEffect(() => {
    const controls = animate(count, value, {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 2
    })
    return controls.stop
  }, [count, value])

  return <motion.span>{rounded}</motion.span>
}

export default function InfluencerDashboard() {
  const [earnings] = useState(12450.00)
  const [archivedCampaigns, setArchivedCampaigns] = useState<string[]>(
    completedCampaigns.filter(c => c.archived).map(c => c.id)
  )
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<typeof completedCampaigns[0] | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  const toggleArchive = (campaignId: string) => {
    setArchivedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const handleRateCampaign = (campaign: typeof completedCampaigns[0]) => {
    setSelectedCampaign(campaign)
    setShowRatingModal(true)
    setRating(0)
    setHoverRating(0)
    setReview("")
    setRatingSubmitted(false)
  }

  const handleSubmitRating = () => {
    setRatingSubmitted(true)
    setTimeout(() => {
      setShowRatingModal(false)
      setRatingSubmitted(false)
    }, 1500)
  }

  const activeCampaigns = completedCampaigns.filter(c => !archivedCampaigns.includes(c.id))
  const archivedList = completedCampaigns.filter(c => archivedCampaigns.includes(c.id))

  return (
    <div className="space-y-6">
      {/* Earnings Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-growi-blue/30 bg-growi-blue/5">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <motion.h2
                className="text-4xl font-bold text-growi-blue md:text-5xl"
              >
                <CountUpMoney value={earnings} />
              </motion.h2>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="relative overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90">
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <Wallet className="mr-2 h-4 w-4" />
                Withdraw to Wallet
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Running & Applied Campaigns */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Play className="h-5 w-5 text-growi-blue" />
              My Campaigns
            </CardTitle>
            <Badge variant="outline">{runningCampaigns.length} campaigns</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {runningCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              >
                <Link href={campaign.status === "active" ? `/influencer/campaign/${campaign.id}/active` : `/influencer/campaign/${campaign.id}`}>
                  <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute right-2 top-2">
                        {campaign.status === "active" ? (
                          <Badge className="bg-growi-success text-white">
                            <Play className="mr-1 h-3 w-3" />
                            Live
                          </Badge>
                        ) : (
                          <Badge className="bg-growi-yellow text-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            Applied
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">by {campaign.manager}</p>
                      <p className="mt-1 text-xs uppercase text-muted-foreground">{campaign.type}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="font-medium text-growi-blue">{campaign.rate}</p>
                        {campaign.status === "active" && (
                          <p className="text-sm font-semibold text-growi-blue">
                            +${campaign.earnings.toFixed(2)}
                          </p>
                        )}
                      </div>
                      {campaign.status === "active" && (
                        <div className="mt-3">
                          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              className="h-full bg-growi-blue"
                              initial={{ width: 0 }}
                              animate={{ width: `${campaign.progress}%` }}
                              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                            />
                          </div>
                        </div>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground">
                        {campaign.status === "active" ? `Started: ${campaign.startDate}` : campaign.startDate}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      {/* Completed Campaigns */}
      {activeCampaigns.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle className="h-5 w-5 text-growi-success" />
                Completed Campaigns
              </CardTitle>
              <Badge variant="outline">{activeCampaigns.length} completed</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {activeCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  variants={staggerItem}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover opacity-80"
                      />
                      <div className="absolute right-2 top-2">
                        <Badge className="bg-growi-success/90 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">by {campaign.manager}</p>
                      
                      {/* Metrics Grid */}
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-secondary/50 p-2">
                          <p className="text-sm font-bold text-foreground">{(campaign.landingViews / 1000).toFixed(1)}K</p>
                          <p className="text-[10px] text-muted-foreground">Views</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-2">
                          <p className="text-sm font-bold text-foreground">{campaign.purchases}</p>
                          <p className="text-[10px] text-muted-foreground">Purchases</p>
                        </div>
                        <div className="rounded-lg bg-growi-blue/10 p-2">
                          <p className="text-sm font-bold text-growi-blue">${campaign.totalEarnings.toFixed(0)}</p>
                          <p className="text-[10px] text-muted-foreground">Earned</p>
                        </div>
                      </div>

                      {/* Rating Display or Button */}
                      {campaign.rating ? (
                        <div className="mt-3 flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(campaign.rating!) ? "fill-growi-yellow text-growi-yellow" : "text-muted-foreground/30"}`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-muted-foreground">{campaign.rating}</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full bg-transparent border-growi-yellow/50 text-growi-yellow hover:bg-growi-yellow/10"
                          onClick={(e) => {
                            e.preventDefault()
                            handleRateCampaign(campaign)
                          }}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Rate Campaign
                        </Button>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">Ended: {campaign.endDate}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleArchive(campaign.id)
                          }}
                        >
                          <Archive className="mr-1 h-3 w-3" />
                          Archive
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Archived Campaigns */}
      {archivedList.length > 0 && (
        <Card className="border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Archive className="h-5 w-5" />
                Archived Campaigns
              </CardTitle>
              <Badge variant="secondary">{archivedList.length} archived</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {archivedList.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  variants={staggerItem}
                >
                  <Card className="overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">by {campaign.manager}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-bold">${campaign.totalEarnings.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{campaign.endDate}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleArchive(campaign.id)
                        }}
                      >
                        Restore
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Campaign</DialogTitle>
            <DialogDescription>
              Share your experience with {selectedCampaign?.title} by {selectedCampaign?.manager}
            </DialogDescription>
          </DialogHeader>
          
          {ratingSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
              >
                <Sparkles className="h-8 w-8 text-growi-success" />
              </motion.div>
              <p className="text-lg font-medium text-foreground">Thank You!</p>
              <p className="text-sm text-muted-foreground">Your review has been submitted</p>
            </motion.div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Star Rating */}
              <div className="text-center">
                <p className="mb-3 text-sm font-medium text-foreground">Your Rating</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-growi-yellow text-growi-yellow"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-muted-foreground"
                  >
                    {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                  </motion.p>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Review (Optional)</label>
                <Textarea
                  placeholder="Share your experience working with this campaign manager..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowRatingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                  disabled={rating === 0}
                  onClick={handleSubmitRating}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
