"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Link from "next/link"
import { Trophy, Star, ArrowRight, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const stats = {
  totalEarned: 1245.67,
  views: 125000,
  carts: 4500,
  checkouts: 982,
  goalProgress: 100,
  campaignName: "Nike Summer Collection",
  managerName: "Nike Marketing"
}

function CountUpMoney({ value, delay = 0 }: { value: number; delay?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return `$${latest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(count, value, {
        type: "spring",
        stiffness: 30,
        damping: 20,
        duration: 2
      })
    }, delay)
    return () => clearTimeout(timer)
  }, [count, value, delay])

  return <motion.span>{rounded}</motion.span>
}

function CountUpNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(count, value, {
        type: "spring",
        stiffness: 30,
        damping: 20,
        duration: 2
      })
    }, delay)
    return () => clearTimeout(timer)
  }, [count, value, delay])

  return <motion.span>{rounded}</motion.span>
}

// Confetti particle component
function ConfettiParticle({ index, color }: { index: number; color: string }) {
  const randomX = Math.random() * 400 - 200
  const randomDelay = Math.random() * 0.5
  const randomDuration = 2 + Math.random() * 2
  const randomRotation = Math.random() * 720 - 360

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-3 w-3"
      style={{ backgroundColor: color, borderRadius: index % 2 === 0 ? "50%" : "0" }}
      initial={{ 
        x: 0, 
        y: 0, 
        scale: 0, 
        rotate: 0,
        opacity: 1 
      }}
      animate={{ 
        x: randomX, 
        y: [0, -200, 400], 
        scale: [0, 1, 0.5],
        rotate: randomRotation,
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: randomDuration, 
        delay: randomDelay,
        ease: "easeOut"
      }}
    />
  )
}

export default function CampaignCompletePage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const colors = ["#4A90E2", "#FFB347", "#9ACD32", "#34d399", "#f97316"]

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmitRating = () => {
    setRatingSubmitted(true)
    setTimeout(() => {
      setShowRatingModal(false)
      setRatingSubmitted(false)
    }, 1500)
  }

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center">
      {/* Animated gradient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(154, 205, 50, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 70%, rgba(255, 179, 71, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <ConfettiParticle key={i} index={i} color={colors[i % colors.length]} />
          ))}
        </div>
      )}

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="overflow-hidden border-growi-money/30">
          <CardContent className="p-8 text-center">
            {/* Trophy Icon */}
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
              className="relative mx-auto mb-6"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 179, 71, 0.3)",
                    "0 0 40px rgba(255, 179, 71, 0.5)",
                    "0 0 20px rgba(255, 179, 71, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-growi-yellow/20"
              >
                <Trophy className="h-12 w-12 text-growi-yellow" />
              </motion.div>
              {/* Stars */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.2, type: "spring" }}
                  className="absolute"
                  style={{
                    top: i === 0 ? -10 : i === 1 ? 0 : 10,
                    left: i === 0 ? 10 : i === 1 ? -15 : 80,
                  }}
                >
                  <Star className="h-4 w-4 fill-growi-yellow text-growi-yellow" />
                </motion.div>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-3xl font-bold text-foreground"
            >
              Campaign Complete!
            </motion.h1>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6"
            >
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>Goal Progress</span>
                <span>100%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full bg-growi-success"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Goal Achieved Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 0.9, 1.1, 1] }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-growi-success/20 px-4 py-2 text-growi-success"
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">GOAL ACHIEVED</span>
            </motion.div>

            {/* Total Earnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="mt-1 text-4xl font-bold text-growi-money">
                <CountUpMoney value={stats.totalEarned} delay={2000} />
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-lg font-bold text-foreground">
                  <CountUpNumber value={stats.views} delay={2400} />
                </p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-lg font-bold text-foreground">
                  <CountUpNumber value={stats.carts} delay={2600} />
                </p>
                <p className="text-xs text-muted-foreground">Add to Cart</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-lg font-bold text-foreground">
                  <CountUpNumber value={stats.checkouts} delay={2800} />
                </p>
                <p className="text-xs text-muted-foreground">Checkouts</p>
              </div>
            </motion.div>

            {/* Rating and Return Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="mt-8 space-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => setShowRatingModal(true)}
                  className="w-full bg-growi-yellow text-foreground hover:bg-growi-yellow/90"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Rate This Campaign
                </Button>
              </motion.div>
              <Link href="/influencer">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    Return to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Campaign & Manager</DialogTitle>
            <DialogDescription>
              Share your experience with {stats.campaignName} by {stats.managerName}
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
