"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Send, Check, CheckCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface Message {
  id: string
  text: string
  sender: "client" | "influencer"
  timestamp: string
  status?: "sent" | "delivered" | "read"
}

interface Conversation {
  id: string
  clientName: string
  clientAvatar: string
  campaignId: string
  campaignTitle: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  status: "applied" | "invited" | "accepted" | "active"
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: "1",
    clientName: "Nike Brand Team",
    clientAvatar: "/growi-mascot.png",
    campaignId: "1",
    campaignTitle: "Nike Summer Collection",
    lastMessage: "The campaign runs Feb 10-24. You'll earn $0.007 per verified view.",
    lastMessageTime: "2 min ago",
    unreadCount: 1,
    status: "accepted",
    messages: [
      { id: "1", text: "Hi! I saw your campaign invitation for Nike Summer Collection. I'd love to participate!", sender: "influencer", timestamp: "10:30 AM", status: "read" },
      { id: "2", text: "Hey! Thanks for your interest. Your profile looks great for this campaign.", sender: "client", timestamp: "10:35 AM" },
      { id: "3", text: "Thank you! I have a strong following in the sneaker community. What's the expected timeline?", sender: "influencer", timestamp: "10:38 AM", status: "read" },
      { id: "4", text: "The campaign runs Feb 10-24. You'll earn $0.007 per verified view and $0.10 per checkout.", sender: "client", timestamp: "10:42 AM" },
    ]
  },
  {
    id: "2",
    clientName: "Adidas Marketing",
    clientAvatar: "/growi-mascot.png",
    campaignId: "2",
    campaignTitle: "Adidas Winter Drop",
    lastMessage: "Welcome to the campaign! Your tracking link is ready.",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    status: "active",
    messages: [
      { id: "1", text: "I applied for the Adidas Winter campaign. My audience loves athletic wear!", sender: "influencer", timestamp: "Yesterday", status: "read" },
      { id: "2", text: "Hi! We reviewed your application and would love to have you on board.", sender: "client", timestamp: "Yesterday" },
      { id: "3", text: "That's wonderful news! When do I get my tracking link?", sender: "influencer", timestamp: "Yesterday", status: "read" },
      { id: "4", text: "Welcome to the campaign! Your tracking link is ready.", sender: "client", timestamp: "1 hour ago" },
    ]
  },
  {
    id: "3",
    clientName: "Puma Sports",
    clientAvatar: "/growi-mascot.png",
    campaignId: "3",
    campaignTitle: "Puma Rush Campaign",
    lastMessage: "We'd love to invite you to our new campaign!",
    lastMessageTime: "3 hours ago",
    unreadCount: 1,
    status: "invited",
    messages: [
      { id: "1", text: "Hi! We noticed your great engagement rates and fitness content. We'd love to invite you to our new campaign!", sender: "client", timestamp: "3 hours ago" },
    ]
  }
]

const campaignDetails = {
  "1": {
    title: "Nike Summer Collection",
    budget: "$5,000",
    duration: "Feb 10 - Feb 24",
    rates: {
      view: "$0.007",
      addToCart: "$0.05",
      checkout: "$0.10"
    },
    interests: ["Fashion", "Sports", "Lifestyle"]
  },
  "2": {
    title: "Adidas Winter Drop",
    budget: "$3,000",
    duration: "Feb 15 - Mar 1",
    rates: {
      view: "$0.005",
      addToCart: "$0.04",
      checkout: "$0.08"
    },
    interests: ["Fitness", "Sports", "Streetwear"]
  },
  "3": {
    title: "Puma Rush Campaign",
    budget: "$4,000",
    duration: "Feb 20 - Mar 5",
    rates: {
      view: "$0.010",
      addToCart: "$0.06",
      checkout: "$0.12"
    },
    interests: ["Running", "Sports", "Health"]
  }
}

export default function InfluencerInboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv)
    setShowMobileChat(true)
  }

  const handleBack = () => {
    setShowMobileChat(false)
  }

  const campaign = selectedConversation 
    ? campaignDetails[selectedConversation.campaignId as keyof typeof campaignDetails] 
    : null

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
      {/* Conversations List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "w-full shrink-0 overflow-y-auto rounded-lg border border-border bg-card md:w-80",
          showMobileChat && "hidden md:block"
        )}
      >
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-foreground">Messages</h2>
          <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="divide-y divide-border"
        >
          {conversations.map((conv) => (
            <motion.div
              key={conv.id}
              variants={staggerItem}
              onClick={() => handleSelectConversation(conv)}
              className={cn(
                "flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-secondary/50",
                selectedConversation?.id === conv.id && "bg-secondary/50"
              )}
            >
              <div className="relative shrink-0">
                <Image
                  src={conv.clientAvatar || "/placeholder.svg"}
                  alt={conv.clientName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {conv.unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-growi-blue text-xs font-medium text-white">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{conv.clientName}</p>
                  <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                </div>
                <p className="text-xs text-growi-blue">{conv.campaignTitle}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card",
          !showMobileChat && "hidden md:flex"
        )}
      >
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Image
                src={selectedConversation.clientAvatar || "/placeholder.svg"}
                alt={selectedConversation.clientName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{selectedConversation.clientName}</p>
                <Badge
                  className={cn(
                    "text-xs",
                    selectedConversation.status === "accepted" && "bg-growi-success/20 text-growi-success",
                    selectedConversation.status === "active" && "bg-growi-blue/20 text-growi-blue",
                    selectedConversation.status === "invited" && "bg-growi-yellow/20 text-growi-yellow"
                  )}
                >
                  {selectedConversation.status}
                </Badge>
              </div>
            </div>

            {/* Campaign Details Card */}
            {campaign && (
              <div className="border-b border-border p-4">
                <Card className="bg-growi-blue/5 border-growi-blue/20">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{campaign.title}</p>
                        <p className="text-sm text-muted-foreground">{campaign.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">Budget: {campaign.budget}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">View: </span>
                        <span className="font-medium text-growi-money">{campaign.rates.view}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Add to Cart: </span>
                        <span className="font-medium text-growi-money">{campaign.rates.addToCart}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Checkout: </span>
                        <span className="font-medium text-growi-money">{campaign.rates.checkout}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {campaign.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Messages - Influencer messages on RIGHT for desktop */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {selectedConversation.messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex",
                      message.sender === "influencer" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2",
                        message.sender === "influencer"
                          ? "bg-growi-blue text-white rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={cn(
                        "mt-1 flex items-center justify-end gap-1 text-xs",
                        message.sender === "influencer" ? "text-white/70" : "text-muted-foreground"
                      )}>
                        <span>{message.timestamp}</span>
                        {message.sender === "influencer" && message.status && (
                          message.status === "read" ? (
                            <CheckCheck className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setNewMessage("")
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-growi-blue text-white hover:bg-growi-blue/90">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
