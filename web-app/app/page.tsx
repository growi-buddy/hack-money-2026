"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Users, Megaphone, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Connect with the perfect influencers or clients in seconds using our smart matching algorithm.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Blockchain-powered escrow ensures safe and transparent transactions for all parties.",
  },
  {
    icon: TrendingUp,
    title: "Track Performance",
    description: "Real-time analytics and insights to measure campaign success and ROI.",
  },
];

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#162033] to-background animate-gradient">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/growi-logo.png"
              alt="Growi Logo"
              width={320}
              height={160}
              className="mx-auto"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
          >
            Connect{" "}
            <span className="text-primary">Brands</span> with{" "}
            <span className="text-secondary">Influencers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl leading-relaxed text-muted max-w-2xl mx-auto"
          >
            The decentralized platform for seamless influencer marketing partnerships. 
            Secure, transparent, and powered by blockchain technology.
          </motion.p>

          <AnimatePresence mode="wait">
            {!walletConnected ? (
              <motion.div
                key="wallet-button"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10"
              >
                <motion.button
                  onClick={handleConnectWallet}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(74, 144, 226, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-foreground bg-primary rounded-full transition-all hover:bg-primary/90"
                >
                  <Wallet className="w-6 h-6" />
                  Connect Wallet
                </motion.button>
              </motion.div>
            ) : !selectedRole ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                <p className="mb-6 text-lg text-muted">Choose your role to get started</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
                  <motion.button
                    onClick={() => handleRoleSelect("client")}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center gap-3 px-10 py-8 bg-card rounded-2xl border border-primary/30 transition-all hover:border-primary hover:bg-card-hover"
                  >
                    <Users className="w-12 h-12 text-primary" />
                    <span className="text-xl font-semibold text-foreground">I'm a Client</span>
                    <span className="text-sm text-muted">Find influencers for your brand</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleRoleSelect("influencer")}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center gap-3 px-10 py-8 bg-card rounded-2xl border border-secondary/30 transition-all hover:border-secondary hover:bg-card-hover"
                  >
                    <Megaphone className="w-12 h-12 text-secondary" />
                    <span className="text-xl font-semibold text-foreground">I'm an Influencer</span>
                    <span className="text-sm text-muted">Monetize your audience</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="selected-role"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-10 p-6 bg-card rounded-2xl border border-accent/50"
              >
                <p className="text-lg text-foreground">
                  Welcome! You've selected:{" "}
                  <span className="font-bold text-accent">
                    {selectedRole === "client" ? "Client" : "Influencer"}
                  </span>
                </p>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="mt-4 text-sm text-muted hover:text-foreground transition-colors"
                >
                  Change selection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground md:text-5xl">
              Why Choose <span className="text-accent">Us</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              Built for the future of influencer marketing
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="p-8 bg-card rounded-2xl border border-foreground/10 transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-primary/20">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted text-sm">
            2026 InfluencerConnect. Built on blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
