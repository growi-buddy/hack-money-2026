'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/contexts/wallet-context';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/enums';
import { InfluencerCampaignSummary } from '@/types';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Archive,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  MessageSquare,
  Play,
  RefreshCw,
  Sparkles,
  Star,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
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

function groupRewardEventsByType(rewardEvents: InfluencerCampaignSummary['campaign']['rewardEvents']) {
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

const REFRESH_INTERVAL = 60_000;

function CountUpMoney({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return `$${latest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  });
  
  useEffect(() => {
    const controls = animate(count, value, {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      duration: 2,
    });
    return controls.stop;
  }, [ count, value ]);
  
  return <motion.span>{rounded}</motion.span>;
}

export default function InfluencerDashboard() {
  const { address } = useWallet();
  const [ myCampaigns, setMyCampaigns ] = useState<InfluencerCampaignSummary[]>([]);
  const [ completedCampaigns, setCompletedCampaigns ] = useState<InfluencerCampaignSummary[]>([]);
  const [ archivedCampaigns, setArchivedCampaigns ] = useState<InfluencerCampaignSummary[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ lastUpdated, setLastUpdated ] = useState<Date | null>(null);
  
  const [ showRatingModal, setShowRatingModal ] = useState(false);
  const [ selectedCampaign, setSelectedCampaign ] = useState<InfluencerCampaignSummary | null>(null);
  const [ rating, setRating ] = useState(0);
  const [ hoverRating, setHoverRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ ratingSubmitted, setRatingSubmitted ] = useState(false);
  
  const fetchCampaigns = useCallback(async (isManualRefresh = false) => {
    if (!address) {
      setMyCampaigns([]);
      setCompletedCampaigns([]);
      setArchivedCampaigns([]);
      return;
    }
    
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      // Fetch all campaign statuses in parallel
      // My Campaigns = ACTIVE + DEPLETED
      // Completed Campaigns = COMPLETED
      // Archived Campaigns = DELETED
      const [ activeRes, depletedRes, completedRes, deletedRes ] = await Promise.all([
        fetch(`/api/influencer/${address}/campaigns?status=${CampaignStatus.ACTIVE}`),
        fetch(`/api/influencer/${address}/campaigns?status=${CampaignStatus.DEPLETED}`),
        fetch(`/api/influencer/${address}/campaigns?status=${CampaignStatus.COMPLETED}`),
        fetch(`/api/influencer/${address}/campaigns?status=${CampaignStatus.DELETED}`),
      ]);
      
      const [ activeData, depletedData, completedData, deletedData ] = await Promise.all([
        activeRes.json(),
        depletedRes.json(),
        completedRes.json(),
        deletedRes.json(),
      ]);
      
      // My Campaigns: combine ACTIVE + DEPLETED
      const myList: InfluencerCampaignSummary[] = [];
      if (activeRes.ok) {
        myList.push(...(activeData.data?.campaigns ?? []));
      } else if (activeRes.status !== 404) {
        throw new Error(activeData.error?.message || 'Failed to fetch active campaigns');
      }
      if (depletedRes.ok) {
        myList.push(...(depletedData.data?.campaigns ?? []));
      }
      setMyCampaigns(myList);
      
      if (completedRes.ok) {
        setCompletedCampaigns(completedData.data?.campaigns ?? []);
      }
      
      if (deletedRes.ok) {
        setArchivedCampaigns(deletedData.data?.campaigns ?? []);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [ address ]);
  
  useEffect(() => {
    if (!address) {
      setMyCampaigns([]);
      setCompletedCampaigns([]);
      setArchivedCampaigns([]);
      setLoading(false);
      return;
    }
    
    void fetchCampaigns();
    
    const interval = setInterval(() => {
      void fetchCampaigns(true);
    }, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [ address, fetchCampaigns ]);
  
  // Total earnings = sum of currentBalance across all participations
  const totalEarnings = [ ...myCampaigns, ...completedCampaigns, ...archivedCampaigns ]
    .reduce((sum, p) => sum + p.currentBalance, 0);
  
  const handleRateCampaign = (item: InfluencerCampaignSummary) => {
    setSelectedCampaign(item);
    setShowRatingModal(true);
    setRating(0);
    setHoverRating(0);
    setReview('');
    setRatingSubmitted(false);
  };
  
  const handleSubmitRating = () => {
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
    }, 1500);
  };
  
  const hasMyCampaigns = myCampaigns.length > 0;
  const hasCompletedCampaigns = completedCampaigns.length > 0;
  const hasArchivedCampaigns = archivedCampaigns.length > 0;
  
  return (
    <div className="space-y-6">
      {/* Earnings Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-growi-blue/30 bg-growi-blue/5">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <motion.h2
                className="text-4xl font-bold text-growi-blue md:text-5xl"
              >
                <CountUpMoney value={totalEarnings} />
              </motion.h2>
            </div>
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
                  {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="relative overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90">
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
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
          </CardContent>
        </Card>
      )}
      
      {/* Error State */}
      {error && (
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
      )}
      
      {/* My Campaigns (ACTIVE + DEPLETED) */}
      {!loading && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Play className="h-5 w-5 text-growi-blue" />
                My Campaigns
              </CardTitle>
              <Badge variant="outline">{myCampaigns.length} campaigns</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {hasMyCampaigns ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {myCampaigns.map((item) => {
                  const campaign = item.campaign;
                  const isActive = campaign.status === CampaignStatus.ACTIVE;
                  const isDepleted = campaign.status === CampaignStatus.DEPLETED;
                  const progress = campaign.budgetTotal > 0
                    ? Math.round((campaign.budgetSpent / campaign.budgetTotal) * 100)
                    : 0;
                  
                  return (
                    <motion.div
                      key={item.participationId}
                      variants={staggerItem}
                      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                    >
                      <Link href={isActive ? `/influencer/campaign/${campaign.id}/active` : `/influencer/campaign/${campaign.id}`}>
                        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50">
                          <div className="relative aspect-video overflow-hidden bg-secondary">
                            <Image
                              src="/growi-mascot.png"
                              alt={campaign.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute right-2 top-2">
                              {isActive ? (
                                <Badge className="bg-growi-success text-white">
                                  <Play className="mr-1 h-3 w-3" />
                                  Live
                                </Badge>
                              ) : isDepleted ? (
                                <Badge className="bg-amber-500/90 text-white">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Depleted
                                </Badge>
                              ) : (
                                <Badge className="bg-growi-yellow text-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {campaign.status}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                              by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 6) + '...' + campaign.owner.walletAddress.slice(-4)}
                            </p>
                            
                            {/* Reward events summary */}
                            <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                              {groupRewardEventsByType(campaign.rewardEvents).slice(0, 3).map((event) => (
                                <div key={event.eventType} className="rounded bg-secondary/50 px-1 py-1">
                                  <p className="text-xs font-bold text-foreground">
                                    {event.trackedEventsCount >= 1000
                                      ? `${(event.trackedEventsCount / 1000).toFixed(1)}k`
                                      : event.trackedEventsCount}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground truncate">{event.label}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-sm font-semibold text-growi-blue">
                                +${item.currentBalance.toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.totalEvents} events
                              </p>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="mt-3">
                              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                                <span>Budget</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                <motion.div
                                  className="h-full bg-growi-blue"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
                                />
                              </div>
                            </div>
                            
                            <p className="mt-2 text-xs text-muted-foreground">
                              Started: {new Date(campaign.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  animate={{ y: [ 0, -8, 0 ], rotate: [ 0, 5, -5, 0 ] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-blue/10"
                >
                  <Sparkles className="h-8 w-8 text-growi-blue" />
                </motion.div>
                <p className="text-sm text-muted-foreground">No active campaigns yet</p>
                <Link href="/influencer/campaigns" className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10"
                  >
                    Browse Campaigns
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Completed Campaigns */}
      {hasCompletedCampaigns && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <CheckCircle className="h-5 w-5 text-growi-success" />
                Completed Campaigns
              </CardTitle>
              <Badge variant="outline">{completedCampaigns.length} completed</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {completedCampaigns.map((item) => {
                const campaign = item.campaign;
                const grouped = groupRewardEventsByType(campaign.rewardEvents);
                const views = grouped.find(e => e.eventType === EventType.LANDING_PAGE_VIEW);
                const purchases = grouped.find(e => e.eventType === EventType.PURCHASE_SUCCESS);
                
                return (
                  <motion.div
                    key={item.participationId}
                    variants={staggerItem}
                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative aspect-video overflow-hidden bg-secondary">
                        <Image
                          src="/growi-mascot.png"
                          alt={campaign.title}
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute right-2 top-2">
                          <Badge className="bg-growi-success/90 text-white">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 6) + '...' + campaign.owner.walletAddress.slice(-4)}
                        </p>
                        
                        {/* Metrics Grid */}
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-lg bg-secondary/50 p-2">
                            <p className="text-sm font-bold text-foreground">
                              {views ? (views.trackedEventsCount >= 1000 ? `${(views.trackedEventsCount / 1000).toFixed(1)}K` : views.trackedEventsCount) : '0'}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Views</p>
                          </div>
                          <div className="rounded-lg bg-secondary/50 p-2">
                            <p className="text-sm font-bold text-foreground">{purchases?.trackedEventsCount ?? 0}</p>
                            <p className="text-[10px] text-muted-foreground">Purchases</p>
                          </div>
                          <div className="rounded-lg bg-growi-blue/10 p-2">
                            <p className="text-sm font-bold text-growi-blue">${item.currentBalance.toFixed(0)}</p>
                            <p className="text-[10px] text-muted-foreground">Earned</p>
                          </div>
                        </div>
                        
                        {/* Rate Campaign Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full bg-transparent border-growi-yellow/50 text-growi-yellow hover:bg-growi-yellow/10"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRateCampaign(item);
                          }}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Rate Campaign
                        </Button>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Ended: {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </CardContent>
        </Card>
      )}
      
      {/* Archived Campaigns */}
      {hasArchivedCampaigns && (
        <Card className="border-muted">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Archive className="h-5 w-5" />
                Archived Campaigns
              </CardTitle>
              <Badge variant="secondary">{archivedCampaigns.length} archived</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {archivedCampaigns.map((item) => {
                const campaign = item.campaign;
                
                return (
                  <motion.div
                    key={item.participationId}
                    variants={staggerItem}
                  >
                    <Card className="overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                      <div className="relative aspect-video overflow-hidden bg-secondary">
                        <Image
                          src="/growi-mascot.png"
                          alt={campaign.title}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 6) + '...' + campaign.owner.walletAddress.slice(-4)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-bold">${item.currentBalance.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </CardContent>
        </Card>
      )}
      
      {/* Empty state when nothing exists */}
      {!loading && !error && !hasMyCampaigns && !hasCompletedCampaigns && !hasArchivedCampaigns && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-2 border-dashed border-growi-blue/30 bg-growi-blue/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <motion.div
                animate={{ y: [ 0, -8, 0 ], rotate: [ 0, 5, -5, 0 ] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-growi-blue/10"
              >
                <Sparkles className="h-10 w-10 text-growi-blue" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">No Campaigns Yet</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Browse available campaigns and apply to start earning.
              </p>
              <Link href="/influencer/campaigns" className="mt-6">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="bg-growi-blue text-white hover:bg-growi-blue/90">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Browse Campaigns
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Campaign</DialogTitle>
            <DialogDescription>
              Share your experience
              with {selectedCampaign?.campaign.title} by {selectedCampaign?.campaign.owner.name || 'the campaign manager'}
            </DialogDescription>
          </DialogHeader>
          
          {ratingSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
              >
                <Sparkles className="h-8 w-8 text-growi-success" />
              </motion.div>
              <p className="text-lg font-medium text-foreground">Thank You!</p>
              <p className="text-sm text-muted-foreground">Your review has been submitted</p>
            </motion.div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Star Rating */}
              <div className="text-center">
                <p className="mb-3 text-sm font-medium text-foreground">Your Rating</p>
                <div className="flex justify-center gap-2">
                  {[ 1, 2, 3, 4, 5 ].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-growi-yellow text-growi-yellow'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-muted-foreground"
                  >
                    {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                  </motion.p>
                )}
              </div>
              
              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Review (Optional)</label>
                <Textarea
                  placeholder="Share your experience working with this campaign manager..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowRatingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                  disabled={rating === 0}
                  onClick={handleSubmitRating}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
