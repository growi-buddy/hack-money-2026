"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InfluencerDashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link 
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%202%2C%202026%2C%2011_18_06%20AM-hxIj6sgFqbplvywTd544X8IEnoLcjo.png"
            alt="Growi Logo"
            width={120}
            height={60}
            className="h-auto w-24"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <Users className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Content Creator Dashboard
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Welcome! This is where you will discover campaigns and earn rewards for your content.
          </p>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-card/50 p-12">
            <p className="text-muted-foreground">Dashboard features coming soon...</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
