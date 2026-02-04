"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Eye, ShoppingCart, DollarSign, TrendingUp, Users, Package, CreditCard, Star, MessageSquare, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MetricCard } from "@/components/metric-card"
import { staggerContainer, staggerItem } from "@/lib/animations"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"

const timelineData = [
  { date: "Feb 10", landingViews: 5000, viewItems: 2800, addToCart: 320, checkout: 120, purchases: 12 },
  { date: "Feb 11", landingViews: 12000, viewItems: 6500, addToCart: 780, checkout: 290, purchases: 28 },
  { date: "Feb 12", landingViews: 18000, viewItems: 9800, addToCart: 1100, checkout: 420, purchases: 45 },
  { date: "Feb 13", landingViews: 25000, viewItems: 13500, addToCart: 1600, checkout: 580, purchases: 62 },
  { date: "Feb 14", landingViews: 35000, viewItems: 18900, addToCart: 2200, checkout: 810, purchases: 85 },
  { date: "Feb 15", landingViews: 48000, viewItems: 26000, addToCart: 3100, checkout: 1100, purchases: 120 },
  { date: "Feb 16", landingViews: 62000, viewItems: 33500, addToCart: 4000, checkout: 1450, purchases: 158 },
]

const funnelData = [
  { name: "Landing Page Views", value: 125000, color: "#4A90E2" },
  { name: "View Items", value: 67500, color: "#60a5fa" },
  { name: "Add to Cart", value: 8500, color: "#FFB347" },
  { name: "Checkout", value: 2100, color: "#9ACD32" },
  { name: "Purchase", value: 342, color: "#34d399" },
]

const influencers = [
  { id: 1, name: "Alex Chen", avatar: "/growi-mascot.png", rate: "$0.007/unit", progress: 100, isHot: true, completed: true, rating: 4.8 },
  { id: 2, name: "Sarah Kim", avatar: "/growi-mascot.png", rate: "$0.005/unit", progress: 45, isHot: false, completed: false, rating: null },
  { id: 3, name: "Jordan Lee", avatar: "/growi-mascot.png", rate: "$0.008/unit", progress: 100, isHot: true, completed: true, rating: null },
  { id: 4, name: "Emma Wilson", avatar: "/growi-mascot.png", rate: "$0.006/unit", progress: 33, isHot: false, completed: false, rating: null },
]

export default function CampaignDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<typeof influencers[0] | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  const handleRateInfluencer = (influencer: typeof influencers[0]) => {
    setSelectedInfluencer(influencer)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaign Dashboard</h1>
          <p className="text-muted-foreground">Nike Summer Collection</p>
        </div>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Badge className="bg-growi-success/20 text-growi-success hover:bg-growi-success/30">
            Active
          </Badge>
          <Badge variant="outline" className="border-growi-blue/50 text-growi-blue">
            Budget: $5,000
          </Badge>
        </motion.div>
      </motion.div>

      {/* Metrics - All Event Types */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        <MetricCard
          title="Landing Page Views"
          value={125000}
          icon={<Eye className="h-5 w-5" />}
          trend={{ value: 23.5, positive: true }}
        />
        <MetricCard
          title="View Items"
          value={67500}
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 19.2, positive: true }}
        />
        <MetricCard
          title="Add to Cart"
          value={8500}
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: 18.2, positive: true }}
        />
        <MetricCard
          title="Checkout"
          value={2100}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 15.1, positive: true }}
        />
        <MetricCard
          title="Purchases"
          value={342}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 12.8, positive: true }}
        />
        <MetricCard
          title="Budget Spent"
          value={2450}
          prefix="$"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "#f1f5f9" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="landingViews"
                        stroke="#4A90E2"
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px"
                        }}
                        labelStyle={{ color: "#f1f5f9" }}
                      />
                      <Bar dataKey="landingViews" fill="#4A90E2" name="Landing Views" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="viewItems" fill="#60a5fa" name="View Items" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="addToCart" fill="#FFB347" name="Add to Cart" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="checkout" fill="#9ACD32" name="Checkout" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="purchases" fill="#34d399" name="Purchases" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#4A90E2" }} />
                    <span className="text-xs text-muted-foreground">Landing Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#60a5fa" }} />
                    <span className="text-xs text-muted-foreground">View Items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#FFB347" }} />
                    <span className="text-xs text-muted-foreground">Add to Cart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#9ACD32" }} />
                    <span className="text-xs text-muted-foreground">Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#34d399" }} />
                    <span className="text-xs text-muted-foreground">Purchases</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funnel" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  <div className="h-[300px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={funnelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {funnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "8px"
                          }}
                          labelStyle={{ color: "#f1f5f9" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-4">
                    {funnelData.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">{item.name}</span>
                            <span className="font-medium text-foreground">{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>

      {/* Influencer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-growi-blue" />
              Active Influencers
            </CardTitle>
            <Badge variant="outline">{influencers.length} active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {influencers.map((influencer) => (
              <motion.div
                key={influencer.id}
                variants={staggerItem}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:border-growi-blue/50"
              >
                <div className="relative">
                  <Image
                    src={influencer.avatar || "/placeholder.svg"}
                    alt={influencer.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  {influencer.isHot && (
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -right-1 -top-1"
                    >
                      <Badge className="bg-orange-500 px-1 py-0 text-[10px] text-white hover:bg-orange-600">
                        HOT
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{influencer.name}</h4>
                    {influencer.completed && (
                      <Badge className="bg-growi-success/20 text-growi-success text-xs">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-growi-money">{influencer.rate}</p>
                  {influencer.rating ? (
                    <div className="mt-1 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(influencer.rating!) ? "fill-growi-yellow text-growi-yellow" : "text-muted-foreground/30"}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">{influencer.rating}</span>
                    </div>
                  ) : influencer.completed ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 h-7 text-xs bg-transparent"
                      onClick={() => handleRateInfluencer(influencer)}
                    >
                      <Star className="mr-1 h-3 w-3" />
                      Rate Influencer
                    </Button>
                  ) : (
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{influencer.progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className="h-full bg-growi-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${influencer.progress}%` }}
                          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Influencer</DialogTitle>
            <DialogDescription>
              Share your experience working with {selectedInfluencer?.name}
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
              {/* Selected Influencer Info */}
              {selectedInfluencer && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                  <Image
                    src={selectedInfluencer.avatar || "/placeholder.svg"}
                    alt={selectedInfluencer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">{selectedInfluencer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedInfluencer.rate}</p>
                  </div>
                </div>
              )}

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
                  placeholder="Share your experience working with this influencer..."
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

      {/* Complete Campaign Demo Button */}
      <Link href="/client/campaign/1/complete">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button variant="outline" className="w-full border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent">
            View Campaign Complete Screen (Demo)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </Link>
    </div>
  )
}
