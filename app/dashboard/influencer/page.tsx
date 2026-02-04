"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

export default function InfluencerDashboard() {
  return (
    <main className="min-h-screen bg-[#f8fdf8] p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-[#64748b] hover:text-[#1a2e1a] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
        </Link>

        <div className="bg-white rounded-2xl border-2 border-[#e2e8f0] p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#fbbf24]/20 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-[#1a2e1a]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a2e1a]">
              Content Creator Dashboard
            </h1>
          </div>
          <p className="text-[#64748b] text-lg">
            Welcome to your creator dashboard. This is a placeholder page - the full dashboard is coming soon.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
