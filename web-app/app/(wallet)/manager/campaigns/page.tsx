'use client';

import { ActiveCampaignsList } from '@/components/campaigns/ActiveCampaignsList';
import { ArchivedCampaignsList } from '@/components/campaigns/ArchivedCampaignsList';
import { CompletedCampaignsList } from '@/components/campaigns/CompletedCampaignsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { pulse, scaleIn } from '@/lib/animations';
import { EventType } from '@/lib/db/enums';
import { CampaignResponse } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

function groupRewardEventsByType(rewardEvents: CampaignResponse['rewardEvents']) {
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

function getTotalPurchases(campaign: CampaignResponse): number {
  const grouped = groupRewardEventsByType(campaign.rewardEvents);
  const purchases = grouped.find(e => e.eventType === EventType.PURCHASE_SUCCESS);
  return purchases?.trackedEventsCount ?? 0;
}

function calculateROI(campaign: CampaignResponse): number {
  if (campaign.budgetSpent === 0) return 0;
  const purchases = getTotalPurchases(campaign);
  const estimatedRevenue = purchases * 50;
  return Math.round((estimatedRevenue / campaign.budgetSpent) * 100);
}

const REFRESH_INTERVAL = 60_000;

export default function ClientDashboard() {
  const { address } = useWallet();
  const [ lastUpdated, setLastUpdated ] = useState<Date>(new Date());
  const [ hasRewardEvents, setHasRewardEvents ] = useState<boolean | null>(null);
  
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
  
  useEffect(() => {
    if (!address) {
      return;
    }
    
    const interval = setInterval(() => {
      void setLastUpdated(new Date());
    }, REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [ address ]);
  
  const refreshing = false;
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">My Campaigns</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLastUpdated(new Date())}
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
      
      <ActiveCampaignsList userRole="manager" deps={[ lastUpdated ]} />
      
      <CompletedCampaignsList userRole="manager" deps={[ lastUpdated ]} />
      
      <ArchivedCampaignsList userRole="manager" deps={[ lastUpdated ]} />
    </div>
  );
}
