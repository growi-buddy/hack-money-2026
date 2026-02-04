"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Sparkles, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { scaleIn, float } from "@/lib/animations"

const placeholderText = `Example: Create a 2-week campaign for our summer shoe collection.

- Start date: February 10, 2026
- End date: February 24, 2026
- Budget: $5,000 total
- Pay $0.01 per view
- Pay $0.02 per view item
- Pay $0.05 per add-to-cart
- Pay $0.10 per checkout
- Target audience: Fashion-forward Gen Z and millennials
- Focus on TikTok and Instagram creators
- Interests: Sneakers, Streetwear, Sports, Lifestyle`

export default function CreateCampaignPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [response, setResponse] = useState("")
  const [displayedResponse, setDisplayedResponse] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setResponse("")
    setDisplayedResponse("")
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const aiResponse = `Great! I've analyzed your campaign requirements and created the following campaign structure:

**Campaign: Summer Collection Launch**

- Duration: February 10 - February 24, 2026 (14 days)
- Total Budget: $5,000

**Reward Structure:**
- Views: $0.01 per verified view
- View Item: $0.02 per product view
- Add to Cart: $0.05 per action
- Checkout: $0.10 per completed purchase

**Target Metrics:**
- Estimated reach: 500,000+ views
- Expected conversions: 1,000+ checkouts
- ROI projection: 3.5x

**Interests & Affinities (Auto-Generated):**
- Fashion & Apparel
- Sports & Fitness
- Lifestyle & Wellness
- Gen Z & Millennials
- Sneakerheads
- Streetwear Culture

**Recommended Influencer Tiers:**
- Micro-influencers (10k-50k followers): 15 slots
- Mid-tier (50k-200k followers): 5 slots
- Macro-influencers (200k+): 2 slots

These tags will help influencers find your campaign based on their content style and audience. Click "Create Campaign" to make it live!`

    setResponse(aiResponse)
    setIsGenerating(false)
    
    // Typewriter effect
    let i = 0
    const interval = setInterval(() => {
      if (i < aiResponse.length) {
        setDisplayedResponse(aiResponse.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 15)
  }

  const handleCreateCampaign = async () => {
    setShowSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push("/client/campaign/1")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">AI Campaign Creator</h1>
        <p className="mt-2 text-muted-foreground">
          Tell our AI about your campaign goals and let it create the perfect structure for you
        </p>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border bg-secondary/30">
            <div className="flex items-center gap-4">
              <motion.div
                variants={float}
                initial="initial"
                animate="animate"
                className="relative"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-growi-blue/20">
                  <Image
                    src="/growi-mascot.png"
                    alt="AI Assistant"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-growi-blue"
                >
                  <Sparkles className="h-3 w-3 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <CardTitle className="text-foreground">GROWI AI Assistant</CardTitle>
                <CardDescription>
                  I&apos;ll help you create the perfect campaign
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Describe your campaign goals
                </label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Textarea
                    placeholder={placeholderText}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px] resize-none bg-background transition-shadow focus:ring-2 focus:ring-growi-blue/50"
                  />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isGenerating}
                  className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Campaign...
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-growi-lime/30"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <Send className="mr-2 h-4 w-4" />
                      Generate Campaign
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Typing dots indicator */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-muted-foreground"
                  >
                    <span className="text-sm">AI is thinking</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >.</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >.</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    >.</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Response */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="rounded-lg border border-growi-blue/30 bg-growi-blue/10 p-4">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                        {displayedResponse}
                      </pre>
                    </div>

                    {displayedResponse === response && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Button
                          onClick={handleCreateCampaign}
                          className="w-full bg-growi-success text-white hover:bg-growi-success/90"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Create Campaign
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Success Modal with Particle Burst */}
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
              className="relative"
            >
              {/* Particle burst effect */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-growi-yellow"
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              ))}
              <Card className="w-80 text-center">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
                  >
                    <Sparkles className="h-8 w-8 text-growi-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Campaign Created!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Redirecting to your campaign dashboard...
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
