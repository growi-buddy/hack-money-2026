'use client';

import { ActiveCampaignsList } from '@/components/campaigns/ActiveCampaignsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Eye, ShoppingCart } from 'lucide-react';

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

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your campaign performance and key metrics
        </p>
      </div>
      
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
      
      <ActiveCampaignsList userRole="manager" />
    </div>
  );
}
