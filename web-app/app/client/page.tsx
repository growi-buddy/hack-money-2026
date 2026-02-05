'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { pulse, scaleIn, staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/prisma/generated';
import { CampaignSummary } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Loader2, Plus, RefreshCw, Sparkles, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Labels for each EventType
const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: 'Views',
  [EventType.VIEW_ITEM]: 'Items',
  [EventType.ADD_TO_CART]: 'Cart',
  [EventType.CHECKOUT]: 'Checkout',
  [EventType.PURCHASE_SUCCESS]: 'Sales',
};

// Order for displaying event types
const EVENT_TYPE_ORDER: EventType[] = [
  EventType.LANDING_PAGE_VIEW,
  EventType.VIEW_ITEM,
  EventType.ADD_TO_CART,
  EventType.CHECKOUT,
  EventType.PURCHASE_SUCCESS,
];

// Helper to group reward events by eventType and sum trackedEventsCount
function groupRewardEventsByType(rewardEvents: CampaignSummary['rewardEvents']) {
  const grouped = rewardEvents.reduce((acc, event) => {
    if (!acc[event.eventType]) {
      acc[event.eventType] = { trackedEventsCount: 0, totalAmount: 0 };
    }
    acc[event.eventType].trackedEventsCount += event.trackedEventsCount;
    acc[event.eventType].totalAmount += event.amount;
    return acc;
  }, {} as Record<EventType, { trackedEventsCount: number; totalAmount: number }>);
  
  // Return in order
  return EVENT_TYPE_ORDER
    .filter(type => grouped[type])
    .map(type => ({
      eventType: type,
      label: EVENT_TYPE_LABELS[type],
      ...grouped[type],
    }));
}

const REFRESH_INTERVAL = 60000; // 1 minute

export default function ClientDashboard() {
  const { address, isConnected, connect } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignSummary[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ lastUpdated, setLastUpdated ] = useState<Date | null>(null);
  
  // Fetch campaigns function
  const fetchCampaigns = async (isManualRefresh = false) => {
    if (!address) {
      setCampaigns([]);
      return;
    }
    
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await fetch(`/api/users/wallet/${address}/campaigns?status=${CampaignStatus.ACTIVE}`);
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          setCampaigns([]);
          return;
        }
        throw new Error(data.error?.message || 'Failed to fetch campaigns');
      }
      
      setCampaigns(data.data.campaigns);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Initial fetch and auto-refresh every minute
  useEffect(() => {
    if (!address) {
      setCampaigns([]);
      setLoading(false);
      return;
    }
    
    fetchCampaigns();
    
    const interval = setInterval(() => {
      fetchCampaigns(true);
    }, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [ address ]);
  
  const hasCampaigns = campaigns.length > 0;
  
  // Show connect wallet prompt if not connected
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <motion.div
                animate={{
                  scale: [ 1, 1.05, 1 ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
              >
                <Wallet className="h-10 w-10 text-growi-blue" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">Connect Your Wallet</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Connect your wallet to view and manage your campaigns.
                Your campaigns are linked to your wallet address.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6"
              >
                <Button
                  size="lg"
                  className="bg-growi-blue text-white hover:bg-growi-blue/90"
                  onClick={connect}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Install CTA Card */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-growi-blue/50 bg-growi-blue/10">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                variants={pulse}
                initial="initial"
                animate="animate"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-growi-blue/20"
              >
                <Download className="h-6 w-6 text-growi-blue" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">Install GROWI to Create Campaigns</h3>
                <p className="text-sm text-muted-foreground">
                  Set up event tracking on your website to start creating campaigns
                </p>
              </div>
            </div>
            <Link href="/client/events-tracking">
              <Button className="bg-growi-blue text-white hover:bg-growi-blue/90">
                Setup Events Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Campaigns Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Your Campaigns</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fetchCampaigns(true)}
              disabled={refreshing}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title="Refresh campaigns"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <Link href="/client/create">
            <Button
              variant="outline"
              size="sm"
              className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-destructive/50">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-destructive">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : hasCampaigns ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {campaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/client/campaign/${campaign.id}`}>
                  <Card className="cursor-pointer transition-colors hover:border-growi-blue/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        <span className="rounded-full bg-growi-success/20 px-2 py-1 text-xs font-medium text-growi-success">
                          {campaign.status}
                        </span>
                      </div>
                      <CardDescription>
                        Budget: ${campaign.budgetTotal.toLocaleString()} | Spent:
                        ${campaign.budgetSpent.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {(() => {
                          const grouped = groupRewardEventsByType(campaign.rewardEvents);
                          return grouped.slice(0, 4).map((event, index) => {
                            const isLast = index === grouped.length - 1 || event.eventType === EventType.PURCHASE_SUCCESS;
                            const count = event.trackedEventsCount;
                            const displayCount = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k` : count.toString();
                            return (
                              <div key={event.eventType}>
                                <p className={`text-lg font-bold ${isLast ? 'text-growi-money' : 'text-foreground'}`}>
                                  {displayCount}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">{event.label}</p>
                              </div>
                            );
                          });
                        })()}
                      </div>
                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>Budget Used</span>
                          <span>{campaign.budgetTotal > 0 ? Math.round((campaign.budgetSpent / campaign.budgetTotal) * 100) : 0}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="h-full bg-growi-blue"
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.budgetTotal > 0 ? (campaign.budgetSpent / campaign.budgetTotal) * 100 : 0}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <motion.div
                  animate={{
                    y: [ 0, -8, 0 ],
                    rotate: [ 0, 5, -5, 0 ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
                >
                  <Sparkles className="h-10 w-10 text-growi-blue" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">Your Campaigns Will Show Here</h3>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Once you create your first campaign, it will appear in this section.
                  Use our AI assistant to set up performance-based bounties and start connecting with influencers.
                </p>
                <Link href="/client/create" className="mt-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="bg-growi-blue text-white hover:bg-growi-blue/90">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create Campaign
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
