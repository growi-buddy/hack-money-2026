"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Search, Users, Send, X, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { staggerContainer, staggerItem } from "@/lib/animations"

const influencers = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "/growi-mascot.png",
    followers: "125K",
    engagement: "4.2%",
    status: "online",
    rating: 4.8,
    reviewCount: 24,
    audienceSegments: ["Gen Z", "Millennials", "Urban"],
    affinities: ["Fashion", "Streetwear", "Sneakers"],
    interests: ["Sports", "Music", "Gaming"],
    bio: "Fashion & lifestyle creator focused on streetwear and sneaker culture."
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "/growi-mascot.png",
    followers: "89K",
    engagement: "5.8%",
    status: "online",
    rating: 4.9,
    reviewCount: 18,
    audienceSegments: ["Millennials", "Women 25-34", "Suburban"],
    affinities: ["Beauty", "Wellness", "Fitness"],
    interests: ["Yoga", "Skincare", "Travel"],
    bio: "Wellness advocate sharing healthy lifestyle tips and beauty secrets."
  },
  {
    id: "3",
    name: "Mike Ross",
    avatar: "/growi-mascot.png",
    followers: "256K",
    engagement: "3.9%",
    status: "away",
    rating: 4.5,
    reviewCount: 31,
    audienceSegments: ["Gen Z", "Men 18-24", "Global"],
    affinities: ["Tech", "Gaming", "Electronics"],
    interests: ["Esports", "Gadgets", "Software"],
    bio: "Tech reviewer and gaming enthusiast with a passion for the latest gadgets."
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "/growi-mascot.png",
    followers: "178K",
    engagement: "6.1%",
    status: "online",
    rating: 4.7,
    reviewCount: 22,
    audienceSegments: ["Women 18-34", "Urban", "High Income"],
    affinities: ["Luxury", "Fashion", "Travel"],
    interests: ["Designer Brands", "Fine Dining", "Art"],
    bio: "Luxury lifestyle content creator showcasing high-end fashion and travel."
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: "/growi-mascot.png",
    followers: "92K",
    engagement: "7.2%",
    status: "online",
    rating: 5.0,
    reviewCount: 15,
    audienceSegments: ["Gen Z", "Athletes", "Students"],
    affinities: ["Sports", "Fitness", "Nutrition"],
    interests: ["Basketball", "Training", "Supplements"],
    bio: "Fitness coach and athlete sharing workout routines and nutrition tips."
  },
  {
    id: "6",
    name: "Lisa Park",
    avatar: "/growi-mascot.png",
    followers: "145K",
    engagement: "5.4%",
    status: "away",
    rating: 4.6,
    reviewCount: 27,
    audienceSegments: ["Millennials", "Parents", "Suburban"],
    affinities: ["Home", "Family", "Cooking"],
    interests: ["Recipes", "Home Decor", "Parenting"],
    bio: "Family lifestyle blogger sharing recipes, home tips, and parenting advice."
  }
]

const mockCampaigns = [
  { id: "1", title: "Nike Summer Collection", status: "active" },
  { id: "2", title: "Adidas Winter Drop", status: "active" },
  { id: "3", title: "New Balance Pro", status: "draft" }
]

export default function InfluencersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInfluencer, setSelectedInfluencer] = useState<typeof influencers[0] | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [inviteSent, setInviteSent] = useState(false)

  const filteredInfluencers = influencers.filter(inf =>
    inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.affinities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
    inf.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleInvite = (influencer: typeof influencers[0]) => {
    setSelectedInfluencer(influencer)
    setShowInviteModal(true)
    setInviteSent(false)
    setSelectedCampaign("")
  }

  const sendInvite = () => {
    setInviteSent(true)
    setTimeout(() => {
      setShowInviteModal(false)
      setInviteSent(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Browse Influencers</h1>
        <p className="mt-2 text-muted-foreground">
          Find and invite influencers to your campaigns
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, interests, or affinities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <Badge variant="secondary" className="gap-1">
          <Users className="h-3 w-3" />
          {filteredInfluencers.length} influencers
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-growi-success/10 text-growi-success">
          {influencers.filter(i => i.status === "online").length} online
        </Badge>
      </motion.div>

      {/* Influencer Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredInfluencers.map((influencer) => (
          <motion.div key={influencer.id} variants={staggerItem}>
            <Card className="h-full transition-all hover:border-growi-blue/50 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Image
                      src={influencer.avatar || "/placeholder.svg"}
                      alt={influencer.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                      influencer.status === "online" ? "bg-growi-success" : "bg-growi-yellow"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base text-foreground">{influencer.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{influencer.followers} followers</span>
                      <span>|</span>
                      <span>{influencer.engagement} eng.</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(influencer.rating) ? "fill-growi-yellow text-growi-yellow" : "text-muted-foreground/30"}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {influencer.rating} ({influencer.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{influencer.bio}</p>
                
                {/* Audience Segments */}
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Audience</p>
                  <div className="flex flex-wrap gap-1">
                    {influencer.audienceSegments.map((segment) => (
                      <Badge key={segment} variant="outline" className="text-xs">
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Affinities */}
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Affinities</p>
                  <div className="flex flex-wrap gap-1">
                    {influencer.affinities.map((affinity) => (
                      <Badge key={affinity} className="bg-growi-blue/10 text-growi-blue text-xs hover:bg-growi-blue/20">
                        {affinity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {influencer.interests.map((interest) => (
                      <Badge key={interest} className="bg-growi-lime/10 text-growi-lime text-xs hover:bg-growi-lime/20">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Invite Button */}
                <Button
                  onClick={() => handleInvite(influencer)}
                  className="mt-2 w-full bg-growi-blue text-white hover:bg-growi-blue/90"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Invite to Campaign
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to Campaign</DialogTitle>
            <DialogDescription>
              Select a campaign to invite {selectedInfluencer?.name}
            </DialogDescription>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {inviteSent ? (
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
                  <Check className="h-8 w-8 text-growi-success" />
                </motion.div>
                <p className="text-lg font-medium text-foreground">Invitation Sent!</p>
                <p className="text-sm text-muted-foreground">
                  {selectedInfluencer?.name} will be notified
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 py-4"
              >
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
                      <p className="text-sm text-muted-foreground">{selectedInfluencer.followers} followers</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select Campaign</label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a campaign..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCampaigns.filter(c => c.status === "active").map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                    disabled={!selectedCampaign}
                    onClick={sendInvite}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Invite
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}
