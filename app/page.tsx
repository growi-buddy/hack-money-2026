"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Briefcase, Users, Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fdf8] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#4ade80]/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#fbbf24]/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%202%2C%202026%2C%2011_18_06%20AM-DKlnAmqTLVr3Xut7NnhBBOfuFBksue.png"
                alt="Growi Logo"
                className="w-64 sm:w-80 md:w-96 h-auto"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#64748b] text-center text-lg sm:text-xl max-w-md"
            >
              Connect creators with campaigns
            </motion.p>

            {/* Connect Wallet Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsConnected(true)}
              className="flex items-center gap-3 bg-[#1a2e1a] text-white px-8 py-4 rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="roles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 w-full max-w-3xl"
          >
            {/* Connected indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-[#4ade80]/20 text-[#1a2e1a] px-4 py-2 rounded-full"
            >
              <Check className="w-4 h-4 text-[#4ade80]" />
              <span className="text-sm font-medium">Wallet Connected</span>
            </motion.div>

            {/* Logo smaller */}
            <motion.img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%202%2C%202026%2C%2011_18_06%20AM-DKlnAmqTLVr3Xut7NnhBBOfuFBksue.png"
              alt="Growi Logo"
              className="w-32 sm:w-40 h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Question */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#1a2e1a] text-2xl sm:text-3xl font-semibold text-center"
            >
              How would you like to use Growi?
            </motion.h2>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {/* Campaign Manager Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/dashboard/client">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border-2 border-[#e2e8f0] rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-[#4ade80] hover:shadow-lg transition-all h-full"
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="w-16 h-16 bg-[#4ade80]/20 rounded-2xl flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-[#1a2e1a]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1a2e1a]">
                        {"I'm a Marketing Campaign Manager"}
                      </h3>
                      <p className="text-[#64748b] text-sm">
                        Create campaigns and connect with influencers to promote your brand
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Content Creator Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/dashboard/influencer">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border-2 border-[#e2e8f0] rounded-2xl p-6 sm:p-8 cursor-pointer hover:border-[#fbbf24] hover:shadow-lg transition-all h-full"
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="w-16 h-16 bg-[#fbbf24]/20 rounded-2xl flex items-center justify-center">
                        <Users className="w-8 h-8 text-[#1a2e1a]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1a2e1a]">
                        {"I'm a Content Creator"}
                      </h3>
                      <p className="text-[#64748b] text-sm">
                        Find campaigns and collaborate with brands to monetize your content
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsConnected(false)}
              className="text-[#64748b] text-sm hover:text-[#1a2e1a] transition-colors mt-4"
            >
              Disconnect wallet
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
