"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Leaf {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  flip: boolean
  swayAmount: number
}

function generateLeaves(count: number): Leaf[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 8,
    size: 16 + Math.random() * 12,
    rotation: Math.random() * 360,
    flip: Math.random() > 0.5,
    swayAmount: 30 + Math.random() * 40,
  }))
}

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    setLeaves(generateLeaves(20))
  }, [])

  if (leaves.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute -top-8"
          style={{
            left: `${leaf.x}%`,
            fontSize: leaf.size,
            transform: leaf.flip ? "scaleX(-1)" : "scaleX(1)",
          }}
          initial={{ y: -50, rotate: leaf.rotation, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [
              0,
              leaf.swayAmount,
              -leaf.swayAmount * 0.5,
              leaf.swayAmount * 0.7,
              -leaf.swayAmount * 0.3,
              0,
            ],
            rotate: [
              leaf.rotation,
              leaf.rotation + 45,
              leaf.rotation - 30,
              leaf.rotation + 60,
              leaf.rotation - 20,
              leaf.rotation + 30,
            ],
            opacity: [0, 0.6, 0.6, 0.6, 0.5, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        >
          <span 
            className="block select-none text-growi-lime drop-shadow-sm"
            style={{ 
              filter: "hue-rotate(-10deg)",
              opacity: 0.7,
            }}
          >
            🍃
          </span>
        </motion.div>
      ))}
    </div>
  )
}
