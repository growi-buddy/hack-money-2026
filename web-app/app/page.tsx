"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Users, TrendingUp, Shield, Zap, Globe, Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { FallingLeaves } from "@/components/falling-leaves"
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations"

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Earnings",
    description: "Earn instantly as you hit campaign milestones. No waiting for payouts."
  },
  {
    icon: Shield,
    title: "Transparent Tracking",
    description: "Every view, click, and purchase is tracked on-chain for full transparency."
  },
  {
    icon: Zap,
    title: "Instant Crypto Rewards",
    description: "Get paid in crypto directly to your wallet. Fast, secure, borderless."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with clients and influencers worldwide without barriers."
  }
]

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const bgShape1Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const bgShape2Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const cardsY = useTransform(scrollYProgress, [0.05, 0.25], [100, 0])
  const cardsOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  const cardsScale = useTransform(scrollYProgress, [0.05, 0.25], [0.95, 1])
  const featuresY = useTransform(scrollYProgress, [0.25, 0.5], [100, 0])
  const featuresOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1])
  const featuresScale = useTransform(scrollYProgress, [0.25, 0.5], [0.95, 1])
  const footerY = useTransform(scrollYProgress, [0.5, 0.75], [50, 0])
  const footerOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])

  return (
    <div ref={containerRef} className="bg-background">
      {/* Falling Leaves Animation */}
      <FallingLeaves />

      {/* Animated background shapes with parallax */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-growi-blue/5 blur-3xl"
          style={{ y: bgShape1Y }}
          animate={{
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-growi-lime/5 blur-3xl"
          style={{ y: bgShape2Y }}
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Fixed Navbar */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section - Full Viewport */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-screen items-center justify-center px-4 pt-14"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto grid w-full max-w-7xl items-center gap-4 md:grid-cols-[1fr_1.3fr] md:gap-6 lg:gap-8"
        >
          {/* Left Column - Text + Button */}
          <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Web3 Influencer Marketing{" "}
              <span className="text-growi-blue">Reimagined</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base md:mt-4 md:text-lg"
            >
              Connect clients with influencers through crypto-reward campaigns. 
              Create performance-based bounties and earn real-time as you hit goals.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={fadeUp}
              className="mt-5 md:mt-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-growi-blue px-6 py-5 text-base font-semibold text-white hover:bg-growi-blue-dark sm:px-8 sm:py-6 sm:text-lg"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Logo Image (Bigger) */}
          <motion.div
            variants={fadeUp}
            className="order-1 flex w-full justify-center md:order-2 md:col-span-1 md:justify-end lg:justify-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full"
            >
              <Image
                src="/growi-logo-full.png"
                alt="GROWI Mascot"
                width={900}
                height={360}
                className="h-auto w-full max-w-none"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll to Explore */}
        <motion.div 
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.span 
            className="text-sm font-medium text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Role Selection Cards - Appear on Scroll */}
      <motion.section 
        style={{ y: cardsY, opacity: cardsOpacity, scale: cardsScale }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Choose Your Path
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join as a marketing campaign manager or influencer
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
        >
          {/* Client Card */}
          <motion.div variants={staggerItem} className="h-full">
            <Link href="/client" className="block h-full">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group h-full cursor-pointer border-2 border-transparent bg-card transition-colors hover:border-growi-blue hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-growi-blue/10 sm:h-16 sm:w-16">
                      <Users className="h-7 w-7 text-growi-blue sm:h-8 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl text-foreground sm:text-2xl">I&apos;m a Marketing Campaign Manager</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Create crypto-reward campaigns and connect with influencers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Set up performance-based bounties</li>
                      <li>Track real-time campaign metrics</li>
                      <li>Pay only for verified results</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>

          {/* Influencer Card */}
          <motion.div variants={staggerItem} className="h-full">
            <Link href="/influencer" className="block h-full">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group h-full cursor-pointer border-2 border-transparent bg-card transition-colors hover:border-growi-lime hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-growi-lime/10 sm:h-16 sm:w-16">
                      <TrendingUp className="h-7 w-7 text-growi-lime sm:h-8 sm:w-8" />
                    </div>
                    <CardTitle className="text-xl text-foreground sm:text-2xl">I&apos;m an Influencer</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Earn crypto rewards by promoting products you love
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Browse available campaigns</li>
                      <li>Earn per view, click, or sale</li>
                      <li>Get paid instantly to your wallet</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section - Appear on Scroll */}
      <motion.section 
        style={{ y: featuresY, opacity: featuresOpacity, scale: featuresScale }}
        className="relative z-10 bg-card/50 pb-8 pt-16 md:pb-12 md:pt-20"
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Why Choose GROWI?
            </h2>
            <p className="mt-3 text-muted-foreground md:mt-4">
              The future of influencer marketing is here
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={staggerItem}>
                <Card className="h-full bg-background transition-all hover:border-growi-blue/50 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-growi-blue/10 sm:h-12 sm:w-12">
                      <feature.icon className="h-5 w-5 text-growi-blue sm:h-6 sm:w-6" />
                    </div>
                    <CardTitle className="text-base text-foreground sm:text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        style={{ y: footerY, opacity: footerOpacity }}
        className="relative z-10 border-t border-border bg-background py-4 md:py-6"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Image
            src="/growi-logo-full.png"
            alt="GROWI"
            width={100}
            height={32}
            className="mx-auto mb-3 h-8 w-auto opacity-60 md:mb-4"
          />
          <p className="text-xs text-muted-foreground sm:text-sm">
            2026 GROWI. Web3 Influencer Marketing Platform.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            an{" "}
            <a 
              href="https://ethglobal.com/events/hackmoney2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-growi-blue hover:underline"
            >
              ETH Global - Hack Money 2026
            </a>{" "}
            Project
          </p>
        </div>
      </motion.footer>
    </div>
  )
}
