'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Eye, Filter, Link2, ShoppingCart, CreditCard, User, Wallet, DollarSign } from 'lucide-react';
import Link from 'next/link';

const earningsData = {
  totalEarnings: 12450.00,
};

const performanceMetrics = [
  { label: 'Landing Page View', icon: Eye, value: '45K', progress: 90, color: 'bg-foreground' },
  { label: 'View Item', icon: Eye, value: '38K', progress: 75, color: 'bg-foreground' },
  { label: 'Add to Cart', icon: ShoppingCart, value: '24K', progress: 55, color: 'bg-growi-lime' },
  { label: 'Checkout', icon: CreditCard, value: '12K', progress: 35, color: 'bg-growi-blue' },
  { label: 'Purchase', icon: DollarSign, value: '8K', progress: 25, color: 'bg-growi-lime' },
];

const availableCampaigns = [
  {
    id: '1',
    name: 'nike Summer',
    tag: 'HOT',
    brand: 'Nike Fashion',
    earning: '$10.957',
    sales: '421',
    progress: 65,
  },
  {
    id: '2',
    name: 'nike Summer',
    tag: 'HOT',
    brand: 'Nike Fashion',
    earning: '$10.957',
    sales: '421',
    progress: 45,
  },
  {
    id: '3',
    name: 'nike Summer',
    tag: 'HOT',
    brand: 'Nike Fashion',
    earning: '$10.957',
    sales: '421',
    progress: 55,
  },
];

export default function InfluencerDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold text-foreground">Influencer Dashboard</h1>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="relative overflow-hidden bg-growi-lime text-foreground hover:bg-growi-lime/90">
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <Wallet className="mr-2 h-4 w-4" />
            Withdraw to Wallet
          </Button>
        </motion.div>
      </div>

      {/* Total Earnings Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="w-fit bg-foreground text-background">
          <CardContent className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-background/70">
              Total Earnings
            </p>
            <p className="mt-2 text-4xl font-bold">
              {earningsData.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-lg font-medium text-foreground">Activity</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {activityLinks.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="cursor-pointer transition-colors hover:border-growi-lime/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.url}</p>
                    {activity.clicks && (
                      <p className="text-sm text-muted-foreground">{activity.clicks}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Performance
        </h2>
        <div className="space-y-4">
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
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-foreground">
            Available Campaigns
          </h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {availableCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Link href={`/influencer/campaigns/${campaign.id}`}>
                <Card className="cursor-pointer transition-colors hover:border-growi-lime/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Link2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{campaign.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {campaign.tag}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                      <p className="text-sm text-muted-foreground">
                        {campaign.earning} / {campaign.sales}
                      </p>
                      <p className="text-sm text-muted-foreground">sales</p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
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
