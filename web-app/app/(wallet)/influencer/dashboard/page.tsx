'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Eye, Filter, Link2, Loader2, ShoppingCart, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PerformanceMetric {
  label: string;
  value: string;
  progress: number;
}

interface ActivityLink {
  id: string;
  name: string;
  url: string;
  clicks: string;
  campaignTitle: string;
}

interface AvailableCampaign {
  id: string;
  name: string;
  tag: string;
  brand: string;
  earning: string;
  sales: string;
  progress: number;
}

interface DashboardData {
  totalEarnings: number;
  activityLinks: ActivityLink[];
  performanceMetrics: PerformanceMetric[];
  availableCampaigns: AvailableCampaign[];
}

const iconMap = {
  'Landing Page View': Eye,
  'View Item': Eye,
  'Add to Cart': ShoppingCart,
  'Checkout': CreditCard,
  'Purchase': DollarSign,
};

const colorMap = {
  'Landing Page View': 'bg-foreground',
  'View Item': 'bg-foreground',
  'Add to Cart': 'bg-growi-lime',
  'Checkout': 'bg-growi-blue',
  'Purchase': 'bg-growi-lime',
};

export default function InfluencerDashboardPage() {
  const { address, isConnected } = useWallet();
  const [ data, setData ] = useState<DashboardData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isConnected || !address) {
      setLoading(false);
      return;
    }
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/influencer/${address}/dashboard`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [ address, isConnected ]);
  
  if (!isConnected) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Please connect your wallet to view your dashboard</p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-destructive">{error || 'Failed to load dashboard data'}</p>
      </div>
    );
  }
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
              animate={{ x: [ '-100%', '100%' ] }}
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
              {data.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Activity Section */}
      {data.activityLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-4 text-lg font-medium text-foreground">Activity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.activityLinks.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="cursor-pointer transition-colors hover:border-growi-lime/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
                      <Link2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-foreground">{activity.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{activity.url}</p>
                      <p className="text-sm text-muted-foreground">{activity.clicks}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
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
          {data.performanceMetrics.map((metric, index) => {
            const Icon = iconMap[metric.label as keyof typeof iconMap] || Eye;
            const colorClass = colorMap[metric.label as keyof typeof colorMap] || 'bg-foreground';
            
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{metric.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className={colorClass}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-foreground">
            My Active Campaigns
          </h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        {data.availableCampaigns.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {data.availableCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Link href={`/influencer/campaign/${campaign.id}`}>
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
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No available campaigns at the moment</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
