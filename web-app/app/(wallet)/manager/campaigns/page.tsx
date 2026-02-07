'use client';

import { ActiveCampaignsList } from '@/components/campaigns/ActiveCampaignsList';
import { ArchivedCampaignsList } from '@/components/campaigns/ArchivedCampaignsList';
import { CompletedCampaignsList } from '@/components/campaigns/CompletedCampaignsList';
import { DraftCampaignsList } from '@/components/campaigns/DraftCampaignsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '@/contexts/wallet-context';
import { useSite } from '@/hooks';
import { pulse, scaleIn } from '@/lib/animations';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const REFRESH_INTERVAL = 60_000;

export default function CampaignsPage() {
  
  const { address } = useWallet();
  const [ lastUpdated, setLastUpdated ] = useState<Date>(new Date());
  const { hasSiteEvents } = useSite();
  
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
      
      {!hasSiteEvents && (
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
                  <h3 className="font-semibold text-foreground">Create Site Events to Create Campaigns</h3>
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
      
      <DraftCampaignsList userRole="manager" deps={[ lastUpdated ]} />
      
      <ActiveCampaignsList userRole="manager" deps={[ lastUpdated ]} />
      
      <CompletedCampaignsList userRole="manager" deps={[ lastUpdated ]} onReload={() => setLastUpdated(new Date())} />
      
      <ArchivedCampaignsList userRole="manager" deps={[ lastUpdated ]} onReload={() => setLastUpdated(new Date())} />
    </div>
  );
}
