"use client";

import { motion } from "framer-motion";
import { Briefcase, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function RoleSelection() {
  const router = useRouter();

  const handleRoleSelect = (role: "client" | "influencer") => {
    // For now, hardcoded navigation - will be dynamic later
    if (role === "client") {
      router.push("/dashboard/client");
    } else {
      router.push("/dashboard/influencer");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        Wallet Connected
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-foreground md:text-3xl text-center text-balance"
        variants={itemVariants}
      >
        Choose your role
      </motion.h2>

      <div className="flex flex-col gap-4 w-full max-w-md md:flex-row md:max-w-2xl">
        <motion.button
          onClick={() => handleRoleSelect("client")}
          className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 text-card-foreground shadow-sm transition-all hover:border-secondary hover:shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 transition-colors group-hover:bg-secondary/30">
            <Briefcase className="h-8 w-8 text-secondary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Marketing Campaign Manager</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              I want to launch campaigns and find creators
            </p>
          </div>
        </motion.button>

        <motion.button
          onClick={() => handleRoleSelect("influencer")}
          className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border-2 border-border bg-card p-8 text-card-foreground shadow-sm transition-all hover:border-accent hover:shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 transition-colors group-hover:bg-accent/30">
            <Users className="h-8 w-8 text-accent" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Content Creator</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              I want to discover campaigns and earn rewards
            </p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
