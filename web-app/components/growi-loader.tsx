"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function GrowiLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          opacity: 1,
          y: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <Image
          src="/growi-mascot.png"
          alt="Growi Loading"
          width={150}
          height={150}
          className="drop-shadow-xl"
        />
        <motion.div
          className="absolute -bottom-2 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-growi-blue/20 blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <motion.p
        className="text-lg font-medium text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  )
}

export function GrowiLoaderFullScreen({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <GrowiLoader text={text} />
    </div>
  )
}
