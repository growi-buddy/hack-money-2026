"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { User, MapPin, Save, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { staggerContainer, staggerItem } from "@/lib/animations"

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  // Show welcome modal on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("growi-client-welcome-seen")
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true)
    }
  }, [])

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false)
    localStorage.setItem("growi-client-welcome-seen", "true")
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

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

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
                  Welcome to the Campaign Manager Portal
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
        className="grid gap-6 lg:grid-cols-3 items-stretch"
      >
        {/* Profile Preview Card */}
        <motion.div variants={staggerItem} className="lg:col-span-1 h-full">
          <Card className="h-full">
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
                  <p className="text-2xl font-bold text-growi-blue">$12.5K</p>
                  <p className="text-xs text-muted-foreground">Budget Spent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-growi-money">{profile.completedCampaigns}</p>
                  <p className="text-xs text-muted-foreground">Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Form */}
        <motion.div variants={staggerItem} className="lg:col-span-2 h-full">
          {/* Personal Information */}
          <Card className="h-full">
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

        </motion.div>
      </motion.div>
    </div>
  )
}
