"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Copy, Check, Code, Eye, ShoppingCart, ArrowRight, Sparkles, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { staggerContainer, staggerItem, slideRight, scaleIn } from "@/lib/animations"

interface TrackingEvent {
  id: string
  name: string
  selector: string
  type: "landing_page_view" | "view_item" | "add_to_cart" | "checkout" | "purchase"
}

const eventTypeConfig: Record<string, { icon: typeof Eye; defaultName: string; defaultSelector: string; selectorLabel: string }> = {
  landing_page_view: { icon: Eye, defaultName: "Landing Page View", defaultSelector: "/landing", selectorLabel: "Page URL" },
  view_item: { icon: Eye, defaultName: "View Item", defaultSelector: "/product/*", selectorLabel: "Product Page URL" },
  add_to_cart: { icon: ShoppingCart, defaultName: "Add to Cart", defaultSelector: "#btn-add-cart", selectorLabel: "Button Selector" },
  checkout: { icon: ShoppingCart, defaultName: "Checkout", defaultSelector: "/checkout", selectorLabel: "Checkout Page URL" },
  purchase: { icon: ShoppingCart, defaultName: "Purchase Complete", defaultSelector: "/thank-you", selectorLabel: "Thank You Page URL" }
}

const eventTypeIcons = {
  landing_page_view: Eye,
  view_item: Eye,
  click: MousePointer,
  add_to_cart: ShoppingCart,
  checkout: ShoppingCart,
  purchase: ShoppingCart
}

export default function SetupPage() {
  const router = useRouter()
  const [events, setEvents] = useState<TrackingEvent[]>([
    { id: "1", name: "Landing Page View", selector: "/landing", type: "landing_page_view" },
    { id: "2", name: "View Item", selector: "/product/*", type: "view_item" },
    { id: "3", name: "Add to Cart", selector: "#btn-add-cart", type: "add_to_cart" },
    { id: "4", name: "Checkout", selector: "/checkout", type: "checkout" },
    { id: "5", name: "Purchase Complete", selector: "/thank-you", type: "purchase" }
  ])
  const [showScript, setShowScript] = useState(false)
  const [copied, setCopied] = useState(false)
  const [displayedScript, setDisplayedScript] = useState("")

  const addEvent = () => {
    const newEvent: TrackingEvent = {
      id: Date.now().toString(),
      name: "Landing Page View",
      selector: "/landing",
      type: "landing_page_view"
    }
    setEvents([...events, newEvent])
  }

  const handleTypeChange = (id: string, newType: string) => {
    const config = eventTypeConfig[newType]
    setEvents(events.map(e => 
      e.id === id ? { 
        ...e, 
        type: newType as TrackingEvent["type"],
        name: config.defaultName,
        selector: config.defaultSelector
      } : e
    ))
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  const updateEvent = (id: string, field: keyof TrackingEvent, value: string) => {
    setEvents(events.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ))
  }

  const generateScript = () => {
    const script = `<script src="https://cdn.growi.io/tracker.js"></script>
<script>
  GROWI.init({
    apiKey: 'YOUR_API_KEY',
    events: [
${events.map(e => `      { name: '${e.name}', selector: '${e.selector}', type: '${e.type}' }`).join(',\n')}
    ]
  });
</script>`
    
    setShowScript(true)
    setDisplayedScript("")
    
    // Typewriter effect
    let i = 0
    const interval = setInterval(() => {
      if (i < script.length) {
        setDisplayedScript(script.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 10)
  }

  const copyScript = async () => {
    const script = `<script src="https://cdn.growi.io/tracker.js"></script>
<script>
  GROWI.init({
    apiKey: 'YOUR_API_KEY',
    events: [
${events.map(e => `      { name: '${e.name}', selector: '${e.selector}', type: '${e.type}' }`).join(',\n')}
    ]
  });
</script>`
    
    await navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Setup Event Tracking</h1>
        <p className="mt-2 text-muted-foreground">
          Configure the events you want to track on your website
        </p>
      </motion.div>

      {/* Add Events Section */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Tracking Events</CardTitle>
                <CardDescription>
                  Define the user actions you want to track and reward
                </CardDescription>
              </div>
              <Button
                onClick={addEvent}
                variant="outline"
                size="sm"
                className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {events.map((event) => {
                  const config = eventTypeConfig[event.type]
                  const IconComponent = config?.icon || Eye
                  return (
                    <motion.div
                      key={event.id}
                      variants={slideRight}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      layout
                      className="flex flex-col gap-4 rounded-lg border border-border bg-secondary/30 p-4 md:flex-row md:items-end"
                    >
                      <div className="w-full space-y-2 md:w-44">
                        <Label className="text-foreground">Event Type</Label>
                        <Select
                          value={event.type}
                          onValueChange={(value) => handleTypeChange(event.id, value)}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="landing_page_view">
                              <span className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> Landing Page View
                              </span>
                            </SelectItem>
                            <SelectItem value="view_item">
                              <span className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Item
                              </span>
                            </SelectItem>
                            <SelectItem value="add_to_cart">
                              <span className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                              </span>
                            </SelectItem>
                            <SelectItem value="checkout">
                              <span className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" /> Checkout
                              </span>
                            </SelectItem>
                            <SelectItem value="purchase">
                              <span className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" /> Purchase
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`name-${event.id}`} className="text-foreground">Event Name</Label>
                        <Input
                          id={`name-${event.id}`}
                          placeholder="e.g. Add to Cart"
                          value={event.name}
                          onChange={(e) => updateEvent(event.id, "name", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`selector-${event.id}`} className="text-foreground">{config?.selectorLabel || "Selector"}</Label>
                        <Input
                          id={`selector-${event.id}`}
                          placeholder={config?.defaultSelector || "/page-url"}
                          value={event.selector}
                          onChange={(e) => updateEvent(event.id, "selector", e.target.value)}
                          className="bg-background font-mono text-sm"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEvent(event.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {events.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No events added yet. Click &quot;Add Event&quot; to get started.
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Generate Script Section */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Code className="h-5 w-5 text-growi-blue" />
              Generate Tracking Script
            </CardTitle>
            <CardDescription>
              Generate your custom tracking script and add it to your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={generateScript}
                disabled={events.length === 0}
                className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90"
              >
                <motion.div
                  className="absolute inset-0 bg-growi-lime/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <Code className="mr-2 h-4 w-4" />
                Generate Tracking Script
              </Button>
            </motion.div>

            <AnimatePresence>
              {showScript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <pre className="max-h-64 overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
                      <code>{displayedScript}</code>
                    </pre>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-2"
                    >
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={copyScript}
                        className="bg-slate-800 text-slate-100 hover:bg-slate-700"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-1"
                            >
                              <Check className="h-4 w-4 text-growi-success" />
                              Copied!
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="flex items-center gap-1"
                            >
                              <Copy className="h-4 w-4" />
                              Copy
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-lg border border-growi-yellow/30 bg-growi-yellow/10 p-4"
                  >
                    <p className="text-sm text-foreground">
                      <strong>Instructions:</strong> Paste this script before the closing{" "}
                      <code className="rounded bg-secondary px-1 py-0.5 font-mono text-growi-blue">{"</head>"}</code>{" "}
                      tag in your website.
                    </p>
                  </motion.div>

                  {/* Continue to Campaign Creation Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      onClick={() => router.push("/client/create")}
                      className="w-full bg-growi-lime text-foreground hover:bg-growi-lime/90"
                      size="lg"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Campaign with AI Assistant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
