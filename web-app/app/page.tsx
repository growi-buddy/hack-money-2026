"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WalletConnect } from "@/components/wallet-connect";
import { RoleSelection } from "@/components/role-selection";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    // Simulate wallet connection for mockup
    setIsWalletConnected(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="flex w-full max-w-4xl flex-col items-center gap-12">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%202%2C%202026%2C%2011_18_06%20AM-hxIj6sgFqbplvywTd544X8IEnoLcjo.png"
              alt="Growi Logo"
              width={320}
              height={160}
              priority
              className="h-auto w-64 md:w-80"
            />
          </motion.div>
          
          <motion.p
            className="max-w-md text-center text-lg text-muted-foreground text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Connect creators with campaigns. Grow together.
          </motion.p>
        </motion.div>

        {/* Connection / Role Selection Section */}
        <AnimatePresence mode="wait">
          {!isWalletConnected ? (
            <motion.div
              key="wallet-connect"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <WalletConnect onConnect={handleWalletConnect} />
            </motion.div>
          ) : (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <RoleSelection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Background Elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </main>
  );
}
