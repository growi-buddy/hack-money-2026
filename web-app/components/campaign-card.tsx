"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { staggerItem, hoverLift, tapScale } from "@/lib/animations"

interface CampaignCardProps {
  id: string
  title: string
  image: string
  type: string
  rate: string
  progress: number
  isHot?: boolean
  href: string
}

export function CampaignCard({
  id,
  title,
  image,
  type,
  rate,
  progress,
  isHot = false,
  href
}: CampaignCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={hoverLift}
      whileTap={tapScale}
    >
      <Link href={href}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {isHot && (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute right-2 top-2"
              >
                <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                  HOT
                </Badge>
              </motion.div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground uppercase">{type}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium text-growi-money">{rate}</span>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3 }}
              >
                <Progress value={progress} className="h-2" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
