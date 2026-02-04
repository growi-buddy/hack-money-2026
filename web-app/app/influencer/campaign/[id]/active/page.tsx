"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import Link from "next/link"
import { Eye, ShoppingCart, DollarSign, Zap, ArrowRight, Package, CreditCard, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { staggerContainer, staggerItem } from "@/lib/animations"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

const timelineData = [
  { date: "Feb 10", landingViews: 500, viewItems: 280, addToCart: 32, checkout: 12, purchases: 3, earnings: 15.50 },
  { date: "Feb 11", landingViews: 1200, viewItems: 650, addToCart: 78, checkout: 29, purchases: 8, earnings: 42.30 },
  { date: "Feb 12", landingViews: 1800, viewItems: 980, addToCart: 110, checkout: 42, purchases: 12, earnings: 58.20 },
  { date: "Feb 13", landingViews: 2500, viewItems: 1350, addToCart: 160, checkout: 58, purchases: 18, earnings: 78.90 },
  { date: "Feb 14", landingViews: 3500, viewItems: 1890, addToCart: 220, checkout: 81, purchases: 25, earnings: 105.40 },
  { date: "Feb 15", landingViews: 4800, viewItems: 2600, addToCart: 310, checkout: 110, purchases: 35, earnings: 145.60 },
  { date: "Feb 16", landingViews: 6200, viewItems: 3350, addToCart: 400, checkout: 145, purchases: 48, earnings: 185.70 },
]

const dailyPerformance = [
  { day: "Monday", views: 1250, conversions: 45, earnings: 38.50 },
  { day: "Tuesday", views: 1890, conversions: 67, earnings: 52.30 },
  { day: "Wednesday", views: 2100, conversions: 78, earnings: 61.20 },
  { day: "Thursday", views: 1650, conversions: 52, earnings: 45.80 },
  { day: "Friday", views: 2450, conversions: 89, earnings: 72.40 },
  { day: "Saturday", views: 3200, conversions: 112, earnings: 95.60 },
  { day: "Sunday", views: 2800, conversions: 98, earnings: 82.30 },
]

const funnelData = [
  { name: "Landing Views", value: 12500, color: "#4A90E2" },
  { name: "View Items", value: 6750, color: "#60a5fa" },
  { name: "Add to Cart", value: 850, color: "#FFB347" },
  { name: "Checkout", value: 210, color: "#9ACD32" },
  { name: "Purchase", value: 98, color: "#34d399" },
]

interface Transaction {
  id: string
  type: "view" | "cart" | "checkout"
  user: string
  amount: number
  timestamp: Date
}

const initialTransactions: Transaction[] = [
  { id: "1", type: "checkout", user: "ALICE VERTE", amount: 12.50, timestamp: new Date() },
  { id: "2", type: "view", user: "BOB SMITH", amount: 0.01, timestamp: new Date(Date.now() - 5000) },
  { id: "3", type: "cart", user: "CHARLIE BROWN", amount: 0.05, timestamp: new Date(Date.now() - 12000) },
  { id: "4", type: "view", user: "DIANA ROSS", amount: 0.01, timestamp: new Date(Date.now() - 20000) },
  { id: "5", type: "checkout", user: "EVE WILSON", amount: 10.00, timestamp: new Date(Date.now() - 35000) },
]

const mockNames = ["ALEX JONES", "MAYA PATEL", "LUCAS CHEN", "SOFIA GARCIA", "NOAH WILLIAMS", "EMMA JOHNSON"]

function CountUpMoney({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return `$${latest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  })

  useEffect(() => {
    const controls = animate(count, value, {
      type: "spring",
      stiffness: 50,
      damping: 20
    })
    return controls.stop
  }, [count, value])

  return <motion.span>{rounded}</motion.span>
}

export default function ActiveCampaignPage() {
  const [earnings, setEarnings] = useState(245.67)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [metrics, setMetrics] = useState({
    landingViews: { count: 12500, earned: 87.50 },
    viewItems: { count: 6750, earned: 33.75 },
    addToCart: { count: 850, earned: 42.50 },
    checkout: { count: 210, earned: 21.00 },
    purchases: { count: 98, earned: 98.17 }
  })

  // Simulate real-time transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ("view" | "cart" | "checkout")[] = ["view", "view", "view", "cart", "checkout"]
      const type = types[Math.floor(Math.random() * types.length)]
      const amounts = { view: 0.007, cart: 0.05, checkout: Math.random() * 15 + 5 }
      const amount = type === "checkout" ? Number(amounts[type].toFixed(2)) : amounts[type]
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type,
        user: mockNames[Math.floor(Math.random() * mockNames.length)],
        amount,
        timestamp: new Date()
      }

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
      setEarnings(prev => Number((prev + amount).toFixed(2)))
      
      const metricKey = type === "view" ? "landingViews" : type === "cart" ? "addToCart" : "purchases"
      setMetrics(prev => ({
        ...prev,
        [metricKey]: {
          count: prev[metricKey].count + 1,
          earned: Number((prev[metricKey].earned + amount).toFixed(2))
        }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "view": return <Eye className="h-4 w-4" />
      case "cart": return <ShoppingCart className="h-4 w-4" />
      case "checkout": return <DollarSign className="h-4 w-4" />
      default: return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "view": return "text-growi-blue"
      case "cart": return "text-growi-yellow"
      case "checkout": return "text-growi-success"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Earnings Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-growi-blue/30 bg-growi-blue/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Campaign Earnings</p>
            <motion.h1
              className="mt-2 text-5xl font-bold text-growi-blue md:text-6xl"
              key={earnings}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.3 }}
            >
              <CountUpMoney value={earnings} />
            </motion.h1>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-2 flex items-center justify-center gap-1 text-sm text-growi-success"
            >
              <Zap className="h-4 w-4" />
              Live updating
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics - All Event Types */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-blue/20">
                  <Eye className="h-4 w-4 text-growi-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.landingViews.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Landing Views</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.landingViews.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/20">
                  <Package className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.viewItems.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">View Items</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.viewItems.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-yellow/20">
                  <ShoppingCart className="h-4 w-4 text-growi-yellow" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.addToCart.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Add to Cart</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.addToCart.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-lime/20">
                  <CreditCard className="h-4 w-4 text-growi-lime" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.checkout.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Checkout</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.checkout.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-success/20">
                  <DollarSign className="h-4 w-4 text-growi-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.purchases.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Purchases</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.purchases.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Performance Overview - Timeline, Funnel & Daily */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-growi-blue" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="funnel">Funnel</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#f1f5f9"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorEarnings)"
                      strokeWidth={2}
                      name="Earnings ($)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="daily">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "#f1f5f9"
                      }}
                      formatter={(value, name) => {
                        const labels: Record<string, string> = {
                          landingViews: "Landing Views",
                          viewItems: "View Items",
                          addToCart: "Add to Cart",
                          checkout: "Checkout",
                          purchases: "Purchases"
                        }
                        return [Number(value).toLocaleString(), labels[name as string] || name]
                      }}
                    />
                    <Bar dataKey="landingViews" fill="#4A90E2" name="landingViews" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="viewItems" fill="#60a5fa" name="viewItems" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="addToCart" fill="#FFB347" name="addToCart" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="checkout" fill="#9ACD32" name="checkout" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="purchases" fill="#34d399" name="purchases" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#4A90E2" }} />
                  <span className="text-xs text-muted-foreground">Landing Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#60a5fa" }} />
                  <span className="text-xs text-muted-foreground">View Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#FFB347" }} />
                  <span className="text-xs text-muted-foreground">Add to Cart</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#9ACD32" }} />
                  <span className="text-xs text-muted-foreground">Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#34d399" }} />
                  <span className="text-xs text-muted-foreground">Purchases</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="funnel">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="h-64 flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={funnelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                          color: "#f1f5f9"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 md:w-48">
                  {funnelData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="flex-1 text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-medium text-foreground">{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Live Transmissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
                className="h-2 w-2 rounded-full bg-red-500"
              />
              Live Transmissions
            </CardTitle>
            <Badge variant="outline" className="text-growi-success">
              Real-time
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 space-y-2 overflow-auto">
            <AnimatePresence initial={false}>
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`flex items-center justify-between rounded-lg border border-border p-3 ${
                    index === 0 ? "border-growi-money/50 bg-growi-money/10" : "bg-secondary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-secondary ${getTypeColor(tx.type)}`}>
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.user}</p>
                      <p className="text-xs capitalize text-muted-foreground">{tx.type}</p>
                    </div>
                  </div>
                  <motion.div
                    initial={index === 0 ? { scale: 1.5 } : {}}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <p className={`font-semibold ${index === 0 ? "text-growi-money" : "text-foreground"}`}>
                      +${tx.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.timestamp.toLocaleTimeString()}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Complete Campaign Button (for demo) */}
      <Link href="/influencer/campaign/1/complete">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button variant="outline" className="w-full border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent">
            View Campaign Complete Screen (Demo)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </Link>
    </div>
  )
}
