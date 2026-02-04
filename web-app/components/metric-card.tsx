"use client"

import React from "react"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { scaleIn } from "@/lib/animations"

interface MetricCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    positive: boolean
  }
  className?: string
  decimals?: number
}

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (decimals > 0) {
      return `${prefix}${latest.toFixed(decimals)}${suffix}`
    }
    return `${prefix}${Math.round(latest).toLocaleString()}${suffix}`
  })

  useEffect(() => {
    const controls = animate(count, value, {
      type: "spring",
      stiffness: 100,
      damping: 30,
      duration: 1
    })
    return controls.stop
  }, [count, value])

  return <motion.span>{rounded}</motion.span>
}

export function MetricCard({ 
  title, 
  value, 
  prefix = "", 
  suffix = "",
  icon,
  trend,
  className,
  decimals = 0
}: MetricCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
    >
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="text-growi-blue">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </div>
          {trend && (
            <p className={cn(
              "mt-1 text-xs",
              trend.positive ? "text-growi-success" : "text-destructive"
            )}>
              {trend.positive ? "+" : "-"}{Math.abs(trend.value)}% from last period
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
