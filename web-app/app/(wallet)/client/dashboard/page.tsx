'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { DollarSign, Eye, MoreVertical, ShoppingCart, CreditCard, Users } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for the dashboard
const campaignData = {
  name: 'nike summer',
  totalBudget: 2000.00,
  investedBudget: 14.60,
  availableBudget: 1985.40,
};

// Last 24h metrics
const last24hMetrics = [
  { label: 'VIEWS', icon: Eye, value: 45.0, suffix: '00K', progress: 85, color: 'bg-foreground' },
  { label: 'ADD TO CART', icon: ShoppingCart, value: 48.0, suffix: '00K', progress: 90, color: 'bg-growi-lime' },
  { label: 'BUY', icon: CreditCard, value: 45.0, suffix: '00K', progress: 40, color: 'bg-growi-blue' },
];

// Weekly timeline data
const timelineData = [
  { day: 'Lun', value: 4800 },
  { day: 'Mar', value: 5200 },
  { day: 'Mié', value: 6800 },
  { day: 'Jue', value: 7200 },
  { day: 'Vie', value: 8500 },
  { day: 'Sáb', value: 6200 },
  { day: 'Dom', value: 7800 },
];

// Funnel data
const funnelData = [
  { stage: 'Views', value: 45000, color: '#6B7280' },
  { stage: 'Add to Cart', value: 28000, color: '#9CA3AF' },
  { stage: 'Checkout', value: 12000, color: '#D1D5DB' },
  { stage: 'Buy', value: 8000, color: '#1F2937' },
];

// Campaign cards data
const campaigns = [
  {
    id: '1',
    name: 'nike summer',
    expiresIn: 3,
    status: 'activo',
    lastUpdate: 'Mar 27 2026 6:00am',
    influencers: 2,
  },
  {
    id: '2',
    name: 'Nombre de la campaña 2',
    expiresIn: 5,
    status: 'activo',
    lastUpdate: 'Mar 27 2026 6:00am',
    influencers: 2,
  },
  {
    id: '3',
    name: 'Nombre de la campaña 3',
    expiresIn: 5,
    status: 'activo',
    lastUpdate: 'Mar 27 2026 6:00am',
    influencers: 2,
  },
];

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{campaignData.name}</p>
        </div>
        <Badge className="bg-foreground text-background hover:bg-foreground/90">
          <span className="mr-1.5 h-2 w-2 rounded-full bg-growi-lime animate-pulse" />
          En vivo
        </Badge>
      </div>

      {/* Budget Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Presupuesto Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {campaignData.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Presupuesto Invertido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {campaignData.investedBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-foreground text-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-background/70">
                Budget Disponible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center text-3xl font-bold">
                <DollarSign className="h-6 w-6" />
                {campaignData.availableBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Last 24h Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Últimas 24h</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {last24hMetrics.map((metric, index) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{metric.value}</span>
                    <span className="ml-1 text-sm text-muted-foreground">{metric.suffix}</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className={metric.color}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline and Funnel Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Timeline</CardTitle>
              <p className="text-sm text-muted-foreground">Rendimiento semanal</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {timelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#6B7280" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Funnel Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Funnel</CardTitle>
              <p className="text-sm text-muted-foreground">Conversión por etapa</p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical">
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* My Campaigns Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">Mis Campañas</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Link href={`/client/campaign/${campaign.id}`}>
                <Card className="cursor-pointer transition-colors hover:border-growi-blue/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold text-foreground">
                            {campaign.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            Expira en {campaign.expiresIn} días
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      index === 0
                        ? 'bg-foreground text-background'
                        : 'border border-border text-muted-foreground'
                    }`}>
                      Estado: {campaign.status}
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Última actualización</p>
                      <p className="text-xs text-muted-foreground">{campaign.lastUpdate}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
