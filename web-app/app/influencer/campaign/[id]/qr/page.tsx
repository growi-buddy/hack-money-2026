"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { QrCode, Copy, Check, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { staggerContainer, staggerItem } from "@/lib/animations"

const trackingLink = "growi.ws/sku/8x4k2m"

const instructions = [
  "Share this link in your content bio or description",
  "When users scan the QR or click the link, their actions are tracked",
  "You earn rewards for every verified view, add-to-cart, and checkout",
  "Monitor your earnings in real-time on the active campaign page"
]

export default function QRGeneratorPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("qr")
  const [qrDrawn, setQrDrawn] = useState(false)

  useEffect(() => {
    // Simulate QR drawing animation
    const timer = setTimeout(() => setQrDrawn(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${trackingLink}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Your Tracking Links</h1>
        <p className="mt-2 text-muted-foreground">
          Share these links to start earning rewards
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-secondary">
                <TabsTrigger value="qr" className="flex-1">QR Code</TabsTrigger>
                <TabsTrigger value="link" className="flex-1">URL Link</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6">
            <AnimatePresence mode="wait">
              {activeTab === "qr" ? (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  {/* QR Code placeholder with draw animation */}
                  <motion.div
                    className="relative flex h-64 w-64 items-center justify-center rounded-xl border-2 border-dashed border-growi-blue/30 bg-white p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: qrDrawn ? 1 : 0, rotate: qrDrawn ? 0 : -180 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="grid h-48 w-48 grid-cols-8 grid-rows-8 gap-1"
                    >
                      {/* Generate QR-like pattern */}
                      {[...Array(64)].map((_, i) => {
                        const isCorner = 
                          (i < 24 && i % 8 < 3) || 
                          (i < 24 && i % 8 > 4) ||
                          (i > 39 && i % 8 < 3)
                        const shouldFill = isCorner || Math.random() > 0.5
                        return (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.01 }}
                            className={`rounded-sm ${shouldFill ? "bg-slate-900" : "bg-transparent"}`}
                          />
                        )
                      })}
                    </motion.div>
                    {/* Center logo */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: qrDrawn ? 1 : 0 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className="absolute flex h-12 w-12 items-center justify-center rounded-lg bg-growi-blue"
                    >
                      <QrCode className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Scan this code to access your tracking link
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="link"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full space-y-4"
                >
                  <div className="flex gap-2">
                    <Input
                      value={`https://${trackingLink}`}
                      readOnly
                      className="flex-1 bg-secondary font-mono text-sm"
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={copyLink}
                        variant="outline"
                        className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="flex items-center gap-1"
                            >
                              <Check className="h-4 w-4 text-growi-success" />
                              Copied!
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-1"
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </div>
                  <Button variant="ghost" className="w-full text-muted-foreground" asChild>
                    <a href={`https://${trackingLink}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in new tab
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">How It Works</CardTitle>
            <CardDescription>
              Follow these steps to start earning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  variants={staggerItem}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-growi-blue/20 text-sm font-bold text-growi-blue">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm text-muted-foreground">{instruction}</p>
                </motion.li>
              ))}
            </motion.ol>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/influencer/campaign/1/active">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90">
              <motion.div
                className="absolute inset-0 bg-growi-lime/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              Go to Active Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  )
}
