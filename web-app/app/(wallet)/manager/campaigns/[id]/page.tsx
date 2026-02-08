'use client';

import { CampaignCompleteCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignCompleteCard';
import { CampaignInfluencersCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignInfluencersCard';
import { CampaignInfoCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignInfoCard';
import { CampaignLiveEventsCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignLiveEventsCard';
import { CampaignMetricsCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignMetricsCard';
import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWallet } from '@/contexts/wallet-context';
import { CampaignStatus } from '@/lib/db/enums';
import { sendFunds } from '@/lib/web3';
import { CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Edit, Loader2, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CampaignDashboardPage() {
  
  const { address } = useWallet();
  const params = useParams();
  const campaignId = params.id as string;
  
  const [ campaign, setCampaign ] = useState<CampaignResponseDTO | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ showPublishModal, setShowPublishModal ] = useState(false);
  const [ isPublishing, setIsPublishing ] = useState(false);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/campaigns/${campaignId}?walletAddress=${address}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch campaign');
      }

      setCampaign(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId) {
      void fetchCampaign();
    }
  }, [ campaignId, address ]);
  
  const handlePublishCampaign = async () => {
    try {
      setIsPublishing(true);
      
      const {
        success,
        error,
        txHash,
      } = await sendFunds('0x75a26Ca9e3Ef85d8e118Ec2b260c143f8738BA19', '0.01');
      
      if (success) {
        console.log('Transacción exitosa en Base Sepolia:', txHash);
        const response = await fetch(`/api/campaigns/${campaignId}?walletAddress=${address}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: CampaignStatus.PUBLISHED }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to publish campaign');
        }
        
        // Update local state
        setCampaign(prev => prev ? { ...prev, status: CampaignStatus.PUBLISHED } : null);
        setShowPublishModal(false);
      } else {
        console.error('Error:', error);
        setError(error);
      }
    } catch (err) {
      console.error('Failed to publish campaign:', err);
      alert(err instanceof Error ? err.message : 'Failed to publish campaign');
    } finally {
      setIsPublishing(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (error || !campaign) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-destructive">{error || 'Campaign not found'}</p>
          <Link href="/client">
            <Button variant="outline" className="mt-4">
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Link href="/manager/campaigns">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Button>
        </Link>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
            <p className="text-sm text-muted-foreground">Campaign Dashboard</p>
          </div>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <CampaignStatusBadge status={campaign.status} />
            <Badge variant="outline" className="border-growi-blue/50 text-growi-blue">
              Budget: ${campaign.budgetTotal.toLocaleString()}
            </Badge>
            {campaign.status === CampaignStatus.DRAFT && (
              <>
                <Link href={`/manager/campaigns/${campaignId}/edit`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="bg-growi-success text-white hover:bg-growi-success/90"
                  onClick={() => setShowPublishModal(true)}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Publish Campaign
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {campaign.status !== CampaignStatus.COMPLETED && <CampaignInfoCard campaign={campaign} />}
      
      {campaign.status === CampaignStatus.COMPLETED && <CampaignCompleteCard />}
      {campaign.status === CampaignStatus.COMPLETED && <CampaignInfoCard campaign={campaign} />}
      
      {(campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.PUBLISHED) && (
        <CampaignMetricsCard campaign={campaign} />
      )}
      
      {(campaign.status === CampaignStatus.PUBLISHED || campaign.status === CampaignStatus.ACTIVE) && (
        <CampaignInfluencersCard campaign={campaign} onUpdate={fetchCampaign} />
      )}
      
      {campaign.status === CampaignStatus.ACTIVE && <CampaignLiveEventsCard campaign={campaign} />}
      
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-growi-success" />
              Publish Campaign
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this campaign?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Warning Card */}
            <div className="rounded-lg border border-orange-500/50 bg-orange-500/10 p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                    <span className="text-orange-500 text-xl">⚠️</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Important Notice</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                      <span>Once activated, <strong className="text-foreground">the campaign cannot be edited</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                      <span>The campaign will be <strong className="text-foreground">visible to all influencers</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                      <span>Influencers will be able to apply</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <h4 className="font-medium text-foreground mb-2">{campaign.title}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="font-semibold text-growi-money">${campaign.budgetTotal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Slots</p>
                  <p className="font-semibold text-foreground">{campaign.slots}</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setShowPublishModal(false)}
                disabled={isPublishing}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-growi-success text-white hover:bg-growi-success/90"
                onClick={handlePublishCampaign}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    Publish Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
