'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Eye, MoreVertical, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

// Mock data for the dashboard
const campaignData = {
  name: 'nike summer',
  totalBudget: 2000.00,
  investedBudget: 14.60,
  availableBudget: 1985.40,
};

// Performance metrics
const performanceMetrics = [
  { label: 'Landing Page View', icon: Eye, value: '45K', progress: 90, color: 'bg-foreground' },
  { label: 'View Item', icon: Eye, value: '38K', progress: 75, color: 'bg-foreground' },
  { label: 'Add to Cart', icon: ShoppingCart, value: '24K', progress: 55, color: 'bg-growi-lime' },
  { label: 'Checkout', icon: CreditCard, value: '12K', progress: 35, color: 'bg-growi-blue' },
  { label: 'Purchase', icon: DollarSign, value: '8K', progress: 25, color: 'bg-growi-lime' },
];

// Weekly timeline data
const timelineData = [
  { day: 'Mon', value: 4800 },
  { day: 'Tue', value: 5200 },
  { day: 'Wed', value: 6800 },
  { day: 'Thu', value: 7200 },
  { day: 'Fri', value: 8500 },
  { day: 'Sat', value: 6200 },
  { day: 'Sun', value: 7800 },
];

// Funnel data
const funnelData = [
  { stage: 'Landing Page View', value: 45000, color: '#6B7280' },
  { stage: 'View Item', value: 38000, color: '#9CA3AF' },
  { stage: 'Add to Cart', value: 24000, color: '#D1D5DB' },
  { stage: 'Checkout', value: 12000, color: '#6B7280' },
  { stage: 'Purchase', value: 8000, color: '#1F2937' },
];

// Campaign cards data
const campaigns = [
  {
    id: '1',
    name: 'Nike Summer',
    expiresIn: 3,
    status: 'active',
    lastUpdate: 'Mar 27 2026 6:00am',
    influencers: 2,
  },
  {
    id: '2',
    name: 'Campaign 2',
    expiresIn: 5,
    status: 'active',
    lastUpdate: 'Mar 27 2026 6:00am',
    influencers: 2,
  },
  {
    id: '3',
    name: 'Campaign 3',
    expiresIn: 5,
    status: 'active',
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
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        </div>
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
                Total Budget
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
                Invested Budget
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
                Available Budget
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
            <CardTitle className="text-lg font-semibold">Total Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{metric.value}</span>
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">My Campaigns</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Link href={`/manager/campaign/${campaign.id}`}>
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
                            Expires in {campaign.expiresIn} days
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        index === 0
                          ? 'bg-foreground text-background'
                          : 'border border-border text-muted-foreground'
                      }`}
                    >
                      Status: {campaign.status}
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground">Last Update</p>
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
