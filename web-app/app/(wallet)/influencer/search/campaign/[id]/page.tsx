'use client';

import { BackButton } from '@/components/ui/back-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { useWallet } from '@/contexts/wallet-context';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { SiteEventType } from '@/lib/db/enums';
import { CampaignResponseDTO, TrackedSiteEventSummaryResponseDTO } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  Eye,
  Flame,
  Loader2,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EVENT_TYPE_ICONS: Record<SiteEventType, typeof Eye> = {
  [SiteEventType.LANDING_PAGE_VIEW]: Eye,
  [SiteEventType.VIEW_ITEM]: Package,
  [SiteEventType.ADD_TO_CART]: ShoppingCart,
  [SiteEventType.CHECKOUT]: CreditCard,
  [SiteEventType.PURCHASE_SUCCESS]: DollarSign,
};

const formatDate = (dateStr: string | number | null) => {
  if (!dateStr) return 'TBD';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;
  const { address } = useWallet();
  
  const [ campaign, setCampaign ] = useState<CampaignResponseDTO | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string>('');
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ isApplying, setIsApplying ] = useState(false);
  
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/campaigns/${campaignId}?walletAddress=${address}`);
        const data = await response.json();
        
        if (data.success) {
          setCampaign(data.data);
        } else {
          setError(data.error?.message || 'Failed to load campaign');
        }
      } catch (err) {
        console.error('Error fetching campaign:', err);
        setError('Failed to load campaign');
      } finally {
        setLoading(false);
      }
    };
    
    if (campaignId) {
      void fetchCampaign();
    }
  }, [ campaignId, address ]);
  
  const handleApply = async () => {
    setIsApplying(true);
    setError('');
    
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/apply?walletAddress=${address}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const chatRoomId = data.data?.chatRoomId;
        router.push(chatRoomId ? `/influencer/inbox?roomId=${chatRoomId}` : `/influencer/inbox`);
      } else {
        setError(data.error?.message || 'Failed to apply');
      }
    } catch (err) {
      console.error('Error applying:', err);
      setError('Failed to apply to campaign');
    } finally {
      setIsApplying(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!campaign) {
    return (
      <div className="mx-auto max-w-3xl text-center py-20">
        <ErrorCard error={error} />
        <Button onClick={() => router.back()} variant="outline" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }
  
  if (!campaign) return null;
  
  const slotsProgress = campaign.slots > 0 ? Math.round((campaign.participants.length / campaign.slots) * 100) : 0;
  const isParticipant = campaign.participants.some(({ walletAddress }) => walletAddress === address);
  
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <BackButton href="/influencer/search" label="Back to Search" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Badge className="bg-growi-blue/20 text-growi-blue hover:bg-growi-blue/30">Campaign</Badge>
        {campaign.isHot && (
          <Badge variant="outline" className="border-orange-500/50 text-orange-500">
            <Flame className="mr-1 h-3 w-3" />
            HOT
          </Badge>
        )}
        {isParticipant && (
          <Badge className="bg-growi-success/20 text-growi-success">
            <Check className="mr-1 h-3 w-3" />
            Participating
          </Badge>
        )}
      </motion.div>
      
      <ErrorCard error={error} />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={campaign.owner.avatar || '/growi-mascot.png'}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl text-foreground">{campaign.title}</CardTitle>
                <CardDescription className="mt-1">
                  by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 8) + '...'}
                </CardDescription>
                {campaign.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{campaign.description}</p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
              {/* Campaign Info */}
              <motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Start Date
                  </div>
                  <p className="mt-1 font-semibold text-foreground">{formatDate(campaign.startDate)}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    End Date
                  </div>
                  <p className="mt-1 font-semibold text-foreground">{formatDate(campaign.endDate)}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    Total Budget
                  </div>
                  <p className="mt-1 font-semibold text-growi-money">${campaign.budgetTotal.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Slots
                  </div>
                  <p className="mt-1 font-semibold text-foreground">
                    {campaign.participants.length}/{campaign.slots}
                  </p>
                </div>
              </motion.div>
              
              {/* Slots Progress */}
              <motion.div variants={staggerItem}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Slots filled</span>
                  <span className="text-foreground">{slotsProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full bg-growi-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${slotsProgress}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
                  />
                </div>
              </motion.div>
              
              {/* Interests */}
              {campaign.interests.length > 0 && (
                <motion.div variants={staggerItem}>
                  <h3 className="mb-3 font-semibold text-foreground">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {campaign.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <motion.div variants={staggerItem}>
                <h3 className="mb-3 font-semibold text-foreground">Available Bounties</h3>
                <div className="space-y-3">
                  {campaign.sites.reduce((sum, { trackedSiteEventsGroupedByType }) => [ ...sum, ...trackedSiteEventsGroupedByType ], [] as TrackedSiteEventSummaryResponseDTO[]).map(event => {
                    const Icon = EVENT_TYPE_ICONS[event.siteEventType] || Eye;
                    return (
                      <div
                        key={event.siteEventType}
                        className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4"
                      >
                        <Icon className="h-5 w-5 text-growi-blue" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{SITE_EVENT_TYPE_LABELS[event.siteEventType]}</p>
                        </div>
                        <p className="text-sm font-semibold text-growi-money">
                          ${event.amount.toFixed(3)}/event
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                {isParticipant ? (
                  <Button
                    onClick={() => router.push(`/influencer/campaign/${campaignId}/active`)}
                    className="w-full bg-growi-success text-white hover:bg-growi-success/90"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    View Active Campaign
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : campaign.participants.length >= campaign.slots ? (
                  <Button disabled className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Campaign Full
                  </Button>
                ) : (
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      onClick={handleApply}
                      disabled={isApplying || !address}
                      className="relative w-full overflow-hidden bg-growi-blue text-white hover:bg-growi-blue/90"
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Applying...
                        </>
                      ) : (
                        <>
                          <motion.div
                            className="absolute inset-0 bg-growi-lime/30"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                          Apply
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Card className="w-80 text-center">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [ 0, 1.3, 1 ] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
                  >
                    <Check className="h-8 w-8 text-growi-success" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">Application Submitted!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Generating your tracking links...</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
