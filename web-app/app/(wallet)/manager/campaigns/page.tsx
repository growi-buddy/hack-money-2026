'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { pulse, scaleIn, staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/enums';
import { CampaignSummary } from '@/types';
import { motion } from 'framer-motion';
import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Download,
  Loader2,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: 'Views',
  [EventType.VIEW_ITEM]: 'Items',
  [EventType.ADD_TO_CART]: 'Cart',
  [EventType.CHECKOUT]: 'Checkout',
  [EventType.PURCHASE_SUCCESS]: 'Sales',
};

const EVENT_TYPE_ORDER: EventType[] = [
  EventType.LANDING_PAGE_VIEW,
  EventType.VIEW_ITEM,
  EventType.ADD_TO_CART,
  EventType.CHECKOUT,
  EventType.PURCHASE_SUCCESS,
];

function groupRewardEventsByType(rewardEvents: CampaignSummary['rewardEvents']) {
  const grouped = rewardEvents.reduce((acc, event) => {
    if (!acc[event.eventType]) {
      acc[event.eventType] = { trackedEventsCount: 0, totalAmount: 0 };
    }
    acc[event.eventType].trackedEventsCount += event.trackedEventsCount;
    acc[event.eventType].totalAmount += event.amount;
    return acc;
  }, {} as Record<EventType, { trackedEventsCount: number; totalAmount: number }>);
  
  return EVENT_TYPE_ORDER
    .filter(type => grouped[type])
    .map(type => ({
      eventType: type,
      label: EVENT_TYPE_LABELS[type],
      ...grouped[type],
    }));
}

function getTotalPurchases(campaign: CampaignSummary): number {
  const grouped = groupRewardEventsByType(campaign.rewardEvents);
  const purchases = grouped.find(e => e.eventType === EventType.PURCHASE_SUCCESS);
  return purchases?.trackedEventsCount ?? 0;
}

function calculateROI(campaign: CampaignSummary): number {
  if (campaign.budgetSpent === 0) return 0;
  const purchases = getTotalPurchases(campaign);
  const estimatedRevenue = purchases * 50;
  return Math.round((estimatedRevenue / campaign.budgetSpent) * 100);
}

const REFRESH_INTERVAL = 60_000;

export default function ClientDashboard() {
  const { address, isConnected, connect } = useWallet();
  const [ activeCampaigns, setActiveCampaigns ] = useState<CampaignSummary[]>([]);
  const [ completedCampaigns, setCompletedCampaigns ] = useState<CampaignSummary[]>([]);
  const [ deletedCampaigns, setDeletedCampaigns ] = useState<CampaignSummary[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ lastUpdated, setLastUpdated ] = useState<Date | null>(null);
  const [ hasRewardEvents, setHasRewardEvents ] = useState<boolean | null>(null);
  
  // Fetch reward events to check if user has any configured
  useEffect(() => {
    const fetchRewardEvents = async () => {
      if (!address) {
        setHasRewardEvents(null);
        return;
      }
      
      try {
        const response = await fetch(`/api/reward-events?walletAddress=${address}`);
        const data = await response.json();
        
        if (response.ok) {
          setHasRewardEvents(data.data && data.data.length > 0);
        } else {
          setHasRewardEvents(false);
        }
      } catch {
        setHasRewardEvents(false);
      }
    };
    
    void fetchRewardEvents();
  }, [ address ]);
  
  const fetchCampaigns = useCallback(async (isManualRefresh = false) => {
    if (!address) {
      setActiveCampaigns([]);
      setCompletedCampaigns([]);
      setDeletedCampaigns([]);
      return;
    }
    
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // Fetch all campaign statuses in parallel (ACTIVE + DEPLETED shown together)
      const [ activeRes, depletedRes, completedRes, deletedRes ] = await Promise.all([
        fetch(`/api/users/wallet/${address}/campaigns?status=${CampaignStatus.ACTIVE}`),
        fetch(`/api/users/wallet/${address}/campaigns?status=${CampaignStatus.DEPLETED}`),
        fetch(`/api/users/wallet/${address}/campaigns?status=${CampaignStatus.COMPLETED}`),
        fetch(`/api/users/wallet/${address}/campaigns?status=${CampaignStatus.DELETED}`),
      ]);
      
      const [ activeData, depletedData, completedData, deletedData ] = await Promise.all([
        activeRes.json(),
        depletedRes.json(),
        completedRes.json(),
        deletedRes.json(),
      ]);
      
      // Combine ACTIVE and DEPLETED campaigns
      const activeCampaignsList: CampaignSummary[] = [];
      
      if (activeRes.ok) {
        activeCampaignsList.push(...(activeData.data?.campaigns ?? []));
      } else if (activeRes.status !== 404) {
        throw new Error(activeData.error?.message || 'Failed to fetch active campaigns');
      }
      
      if (depletedRes.ok) {
        activeCampaignsList.push(...(depletedData.data?.campaigns ?? []));
      }
      
      setActiveCampaigns(activeCampaignsList);
      
      if (completedRes.ok) {
        setCompletedCampaigns(completedData.data?.campaigns ?? []);
      }
      
      if (deletedRes.ok) {
        setDeletedCampaigns(deletedData.data?.campaigns ?? []);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [ address ]);
  
  // Initial fetch and auto-refresh every minute
  useEffect(() => {
    if (!address) {
      setActiveCampaigns([]);
      setCompletedCampaigns([]);
      setDeletedCampaigns([]);
      setLoading(false);
      return;
    }
    
    void fetchCampaigns();
    
    const interval = setInterval(() => {
      void fetchCampaigns(true);
    }, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [ address, fetchCampaigns ]);
  
  const hasActiveCampaigns = activeCampaigns.length > 0;
  const hasCompletedCampaigns = completedCampaigns.length > 0;
  const hasDeletedCampaigns = deletedCampaigns.length > 0;
  
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
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">My Campaigns</h1>
          <div className="flex items-center gap-3">
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
            <Link href="/manager/campaigns/create">
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
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage all your campaigns in one place
        </p>
      </div>
      
      {/* Install CTA Card - Show full card only if no reward events configured */}
      {hasRewardEvents === false && (
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
              <Link href="/manager/sites-tracking">
                <Button className="bg-growi-blue text-white hover:bg-growi-blue/90">
                  Setup Tracking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <TrendingUp className="h-5 w-5 text-growi-success" />
            Active Campaigns
          </h2>
          {hasActiveCampaigns && (
            <Badge className="bg-growi-success/20 text-growi-success border-transparent">{activeCampaigns.length} active</Badge>
          )}
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
        ) : hasActiveCampaigns ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {activeCampaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/manager/campaigns/${campaign.id}`}>
                  <Card className="cursor-pointer transition-colors hover:border-growi-blue/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        {campaign.status === CampaignStatus.DEPLETED ? (
                          <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-600">
                            Depleted
                          </span>
                        ) : (
                          <span className="rounded-full bg-growi-success/20 px-2 py-1 text-xs font-medium text-growi-success">
                            Active
                          </span>
                        )}
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
                <Link href="/manager/create" className="mt-6">
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
      
      {/* Completed Campaigns Section */}
      {hasCompletedCampaigns && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <CheckCircle2 className="h-5 w-5 text-growi-blue" />
              Completed Campaigns
            </h2>
            <Badge className="bg-growi-blue/20 text-growi-blue border-transparent">{completedCampaigns.length} completed</Badge>
          </div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2"
          >
            {completedCampaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="transition-colors hover:border-growi-success/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                      <Badge className="bg-growi-blue/20 text-growi-blue border-transparent">
                        Completed
                      </Badge>
                    </div>
                    <CardDescription>
                      Budget: ${campaign.budgetTotal.toLocaleString()} | Spent: ${campaign.budgetSpent.toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{getTotalPurchases(campaign)}</p>
                        <p className="text-xs text-muted-foreground">Purchases</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-growi-success">{calculateROI(campaign)}%</p>
                        <p className="text-xs text-muted-foreground">ROI</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">End Date</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/manager/campaigns/${campaign.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Summary
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
      
      {/* Archived/Deleted Campaigns Section */}
      {hasDeletedCampaigns && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <Archive className="h-5 w-5" />
              Archived Campaigns
            </h2>
            <Badge variant="secondary">{deletedCampaigns.length} archived</Badge>
          </div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {deletedCampaigns.map((campaign) => (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="opacity-60 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-foreground">{campaign.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">Archived</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Ended: {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{getTotalPurchases(campaign)}</span>
                        <span className="text-muted-foreground"> purchases</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs">
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Restore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
