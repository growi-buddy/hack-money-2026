'use client';

import type { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

export const slideBottom: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
}

export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
}

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
}

export const shimmer: Variants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
}

export const countUpSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 30
}

export const hoverLift = {
  y: -4,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

export const tapScale = {
  scale: 0.95
}

export const progressFill: Variants = {
  hidden: { width: "0%" },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.3 }
  })
}

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
}

export const rotateGlow: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 5, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
}

export const flashScale: Variants = {
  initial: { scale: 1, backgroundColor: "transparent" },
  flash: {
    scale: [1, 1.05, 1],
    backgroundColor: ["transparent", "rgba(74, 144, 226, 0.2)", "transparent"],
    transition: { duration: 0.5 }
  }
}

export const typewriter: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 1, ease: "linear" }
  }
}

export const confettiBurst: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const multiBounce: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.3, 0.9, 1.1, 1],
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}
