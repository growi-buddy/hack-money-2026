'use client';

import { FallingLeaves } from '@/components/falling-leaves';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Globe, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Earnings',
    description: 'Earn instantly as you hit campaign milestones. No waiting for payouts.',
  },
  {
    icon: Shield,
    title: 'Transparent Tracking',
    description: 'Every view, click, and purchase is tracked on-chain for full transparency.',
  },
  {
    icon: Zap,
    title: 'Instant Crypto Rewards',
    description: 'Get paid in crypto directly to your wallet. Fast, secure, borderless.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with clients and influencers worldwide without barriers.',
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [ 'start start', 'end end' ],
  });
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [ 0, 0.3 ], [ 0, -100 ]);
  const heroOpacity = useTransform(scrollYProgress, [ 0, 0.2 ], [ 1, 0 ]);
  const heroScale = useTransform(scrollYProgress, [ 0, 0.2 ], [ 1, 0.95 ]);
  const bgShape1Y = useTransform(scrollYProgress, [ 0, 1 ], [ 0, -200 ]);
  const bgShape2Y = useTransform(scrollYProgress, [ 0, 1 ], [ 0, -150 ]);
  const featuresY = useTransform(scrollYProgress, [ 0.1, 0.35 ], [ 100, 0 ]);
  const featuresOpacity = useTransform(scrollYProgress, [ 0.1, 0.25 ], [ 0, 1 ]);
  const featuresScale = useTransform(scrollYProgress, [ 0.1, 0.35 ], [ 0.95, 1 ]);
  const footerY = useTransform(scrollYProgress, [ 0.35, 0.6 ], [ 50, 0 ]);
  const footerOpacity = useTransform(scrollYProgress, [ 0.35, 0.5 ], [ 0, 1 ]);
  
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
            x: [ 0, 50, 0 ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-growi-lime/5 blur-3xl"
          style={{ y: bgShape2Y }}
          animate={{
            x: [ 0, -50, 0 ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
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
              className="max-w-xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl"
            >
              Marketing 
              <br />
              <span className="text-growi-blue">Reimagined</span>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base md:mt-4 md:text-lg"
            >
              Connect marketing campaign managers with influencers through crypto-reward campaigns.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6">
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-growi-blue text-white hover:bg-growi-blue/90 px-8 py-6 text-lg">
                    Start Now
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Logo Image (Bigger) */}
          <motion.div
            variants={fadeUp}
            className="order-1 flex w-full justify-center md:order-2 md:col-span-1 md:justify-end lg:justify-center"
          >
            <motion.div
              animate={{
                y: [ 0, -15, 0 ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full"
            >
              <Image
                src="/growi-main-logo.png"
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
            animate={{ opacity: [ 0.5, 1, 0.5 ] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            animate={{ y: [ 0, 8, 0 ] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Features Section - Appear on Scroll */}
      <motion.section
        style={{ y: featuresY, opacity: featuresOpacity, scale: featuresScale }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-card/50"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16">
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
            src="/growi-main-logo.png"
            alt="GROWI"
            width={100}
            height={32}
            className="mx-auto mb-3 h-8 w-auto opacity-60 md:mb-4"
          />
          <div className="mb-3 flex items-center justify-center gap-4">
            <a href="https://x.com/growi_app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.instagram.com/growi_app/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            2026 GROWI. Marketing Reimagined.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            an{' '}
            <a
              href="https://ethglobal.com/events/hackmoney2026"
              target="_blank"
              rel="noopener noreferrer"
              className="text-growi-blue hover:underline"
            >
              ETH Global - Hack Money 2026
            </a>{' '}
            Project
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
