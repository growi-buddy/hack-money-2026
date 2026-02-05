"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Youtube,
  Link as LinkIcon,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Star,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations"

interface SocialMedia {
  id: string
  platform: "instagram" | "tiktok" | "youtube" | "twitter" | "other"
  username: string
  followers: string
  url: string
}

const platformIcons = {
  instagram: Instagram,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  youtube: Youtube,
  twitter: Twitter,
  other: LinkIcon
}

const interestOptions = [
  "Fashion", "Sports", "Fitness", "Gaming", "Tech", "Beauty", "Lifestyle", 
  "Food", "Travel", "Music", "Art", "Photography", "Health", "Finance"
]

const affinityOptions = [
  "Gen Z", "Millennials", "Young Professionals", "Parents", "Students", 
  "Entrepreneurs", "Gamers", "Athletes", "Artists", "Tech Enthusiasts"
]

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  // Show welcome modal on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("growi-influencer-welcome-seen")
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true)
    }
  }, [])

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false)
    localStorage.setItem("growi-influencer-welcome-seen", "true")
  }

  const [profile, setProfile] = useState({
    fullName: "Alex Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    bio: "Fashion & lifestyle content creator with a passion for sneakers and streetwear. I help brands connect with Gen Z audiences through authentic storytelling.",
    avatar: "/growi-mascot.png",
    rating: 4.8,
    reviewCount: 24,
    completedCampaigns: 18
  })

  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([
    { id: "1", platform: "instagram", username: "@alexchen", followers: "125K", url: "https://instagram.com/alexchen" },
    { id: "2", platform: "tiktok", username: "@alexchen", followers: "89K", url: "https://tiktok.com/@alexchen" },
    { id: "3", platform: "youtube", username: "Alex Chen", followers: "45K", url: "https://youtube.com/@alexchen" },
  ])

  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Fashion", "Sports", "Lifestyle", "Tech"])
  const [selectedAffinities, setSelectedAffinities] = useState<string[]>(["Gen Z", "Young Professionals", "Gamers"])

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  const addSocialMedia = () => {
    const newSocial: SocialMedia = {
      id: Date.now().toString(),
      platform: "instagram",
      username: "",
      followers: "",
      url: ""
    }
    setSocialMedias([...socialMedias, newSocial])
  }

  const removeSocialMedia = (id: string) => {
    setSocialMedias(socialMedias.filter(s => s.id !== id))
  }

  const updateSocialMedia = (id: string, field: keyof SocialMedia, value: string) => {
    setSocialMedias(socialMedias.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const toggleAffinity = (affinity: string) => {
    setSelectedAffinities(prev => 
      prev.includes(affinity) 
        ? prev.filter(a => a !== affinity)
        : [...prev, affinity]
    )
  }

  const totalFollowers = socialMedias.reduce((acc, s) => {
    const num = Number.parseFloat(s.followers.replace(/[^0-9.]/g, "")) || 0
    const multiplier = s.followers.toLowerCase().includes("k") ? 1000 : 
                       s.followers.toLowerCase().includes("m") ? 1000000 : 1
    return acc + (num * multiplier)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeWelcomeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative mx-4 w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeWelcomeModal}
                className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-blue/10">
                  <User className="h-8 w-8 text-growi-blue" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Welcome to the Influencer Portal
                </h2>
                <p className="text-muted-foreground">
                  Complete your profile details
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground">Manage your public profile visible to brands</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-growi-blue text-white hover:bg-growi-blue/90"
          >
            {isSaving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Profile Preview Card */}
        <motion.div variants={staggerItem} className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto mb-4 relative"
              >
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.fullName}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-growi-blue/20"
                />
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-growi-success text-white">
                  Verified
                </Badge>
              </motion.div>
              <CardTitle className="text-foreground">{profile.fullName}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {profile.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Star Rating */}
              <div className="text-center">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(profile.rating) ? "fill-growi-yellow text-growi-yellow" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.rating} ({profile.reviewCount} reviews)
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-growi-blue">
                    {totalFollowers >= 1000000 
                      ? `${(totalFollowers / 1000000).toFixed(1)}M` 
                      : `${(totalFollowers / 1000).toFixed(0)}K`}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-growi-money">{profile.completedCampaigns}</p>
                  <p className="text-xs text-muted-foreground">Campaigns</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Connected Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {socialMedias.map((social) => {
                    const IconComponent = platformIcons[social.platform]
                    return (
                      <a 
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs hover:bg-secondary/80 transition-colors"
                      >
                        <IconComponent className="h-3 w-3" />
                        {social.followers}
                      </a>
                    )
                  })}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Interests</p>
                <div className="flex flex-wrap gap-1">
                  {selectedInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Audience</p>
                <div className="flex flex-wrap gap-1">
                  {selectedAffinities.map((affinity) => (
                    <Badge key={affinity} className="bg-growi-blue/20 text-growi-blue text-xs">
                      {affinity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Form */}
        <motion.div variants={staggerItem} className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-growi-blue" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  placeholder="Tell brands about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <LinkIcon className="h-5 w-5 text-growi-blue" />
                  Social Media Accounts
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addSocialMedia}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Account
                </Button>
              </div>
              <CardDescription>
                Connect your social media accounts to show your reach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialMedias.map((social, index) => {
                const IconComponent = platformIcons[social.platform]
                return (
                  <motion.div
                    key={social.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 sm:flex-row sm:items-end"
                  >
                    <div className="w-full space-y-2 sm:w-32">
                      <Label>Platform</Label>
                      <select
                        value={social.platform}
                        onChange={(e) => updateSocialMedia(social.id, "platform", e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="instagram">Instagram</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">YouTube</option>
                        <option value="twitter">Twitter/X</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Username</Label>
                      <Input
                        value={social.username}
                        onChange={(e) => updateSocialMedia(social.id, "username", e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                    <div className="w-full space-y-2 sm:w-28">
                      <Label>Followers</Label>
                      <Input
                        value={social.followers}
                        onChange={(e) => updateSocialMedia(social.id, "followers", e.target.value)}
                        placeholder="125K"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Profile URL</Label>
                      <Input
                        value={social.url}
                        onChange={(e) => updateSocialMedia(social.id, "url", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialMedia(social.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>

          {/* Interests & Affinities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Interests & Audience Affinities</CardTitle>
              <CardDescription>
                Select tags to help brands find you for relevant campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Content Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <motion.button
                      key={interest}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedInterests.includes(interest)
                          ? "bg-growi-blue text-white"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Audience Demographics</Label>
                <div className="flex flex-wrap gap-2">
                  {affinityOptions.map((affinity) => (
                    <motion.button
                      key={affinity}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleAffinity(affinity)}
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedAffinities.includes(affinity)
                          ? "bg-growi-money text-white"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {affinity}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
