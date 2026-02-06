'use client';

import { FallingLeaves } from '@/components/falling-leaves';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletButton } from '@/components/wallet-button';
import { useWallet } from '@/contexts/wallet-context';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { isConnected } = useWallet();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);

  const handleCardClick = (e: React.MouseEvent, path: string) => {
    if (!isConnected) {
      e.preventDefault();
      setShowWarning(true);
      return;
    }
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Falling Leaves Animation */}
      <FallingLeaves />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Image
                src="/growi-logo-full.png"
                alt="GROWI"
                width={140}
                height={45}
                className="h-10 w-auto md:h-11"
                priority
              />
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl"
        >
          {/* Connect Wallet Section */}
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Connect your wallet to start
            </h2>
            <div className="mt-6 flex justify-center">
              <WalletButton />
            </div>
            <AnimatePresence>
              {showWarning && !isConnected && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-sm font-medium text-red-500"
                >
                  Please connect your wallet to continue
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Choose Your Path Section */}
          <motion.div variants={fadeUp} className="mb-10 text-center">
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
            animate="visible"
            className="grid gap-4 sm:gap-6 md:grid-cols-2"
          >
            {/* Client Card */}
            <motion.div variants={staggerItem} className="h-full">
              <div
                onClick={(e) => handleCardClick(e, '/client/profile')}
                className="block h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card className="group h-full cursor-pointer border-2 border-transparent bg-card transition-colors hover:border-growi-blue hover:shadow-lg">
                    <CardHeader className="text-center">
                      <motion.div
                        className="mx-auto mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Image
                          src="/growi-manager.png"
                          alt="Manager"
                          width={160}
                          height={160}
                          className="h-32 w-32 object-contain sm:h-40 sm:w-40"
                        />
                      </motion.div>
                      <CardTitle className="text-xl text-foreground sm:text-2xl">
                        I&apos;m a Marketing Campaign Manager
                      </CardTitle>
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
              </div>
            </motion.div>

            {/* Influencer Card */}
            <motion.div variants={staggerItem} className="h-full">
              <div
                onClick={(e) => handleCardClick(e, '/influencer/profile')}
                className="block h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card className="group h-full cursor-pointer border-2 border-transparent bg-card transition-colors hover:border-growi-lime hover:shadow-lg">
                    <CardHeader className="text-center">
                      <motion.div
                        className="mx-auto mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Image
                          src="/growi-influencer.png"
                          alt="Influencer"
                          width={160}
                          height={160}
                          className="h-32 w-32 object-contain sm:h-40 sm:w-40"
                        />
                      </motion.div>
                      <CardTitle className="text-xl text-foreground sm:text-2xl">
                        I&apos;m an Influencer
                      </CardTitle>
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
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
