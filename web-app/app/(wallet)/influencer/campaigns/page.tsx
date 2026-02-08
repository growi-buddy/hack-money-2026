'use client';

import { ActiveCampaignsList } from '@/components/campaigns/ActiveCampaignsList';
import { ArchivedCampaignsList } from '@/components/campaigns/ArchivedCampaignsList';
import { CompletedCampaignsList } from '@/components/campaigns/CompletedCampaignsList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/contexts/wallet-context';
import { scaleIn } from '@/lib/animations';
import { InfluencerCampaignSummaryResponseDTO } from '@/types';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { MessageSquare, RefreshCw, Sparkles, Star, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function InfluencerCampaigns() {
  
  const { address } = useWallet();
  const [ lastUpdated, setLastUpdated ] = useState<Date>(new Date());
  const [ showRatingModal, setShowRatingModal ] = useState(false);
  const [ selectedCampaign, setSelectedCampaign ] = useState<InfluencerCampaignSummaryResponseDTO | null>(null);
  const [ rating, setRating ] = useState(0);
  const [ hoverRating, setHoverRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ ratingSubmitted, setRatingSubmitted ] = useState(false);
  
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
  
  // Total earnings = sum of currentBalance across all participations
  const totalEarnings = 0;
  // [ ...activeCampaigns, ...completedCampaigns, ...archivedCampaigns ]
  //   .reduce((sum, p) => sum + p.currentBalance, 0);
  
  const handleRateCampaign = (item: InfluencerCampaignSummaryResponseDTO) => {
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
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your campaign participation and earnings
        </p>
      </div>
      
      {/* Earnings Header */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-growi-success/30 bg-growi-success/5">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <motion.h2
                className="text-4xl font-bold text-growi-success md:text-5xl"
              >
                <CountUpMoney value={totalEarnings} />
              </motion.h2>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="relative overflow-hidden bg-growi-success text-white hover:bg-growi-success/90">
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: [ '-100%', '100%' ] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <Wallet className="mr-2 h-4 w-4" />
                Withdraw to Wallet
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      <ActiveCampaignsList userRole="influencer" deps={[ lastUpdated ]} />
      
      <CompletedCampaignsList
        userRole="influencer"
        deps={[ lastUpdated ]}
        onReload={() => setLastUpdated(new Date())}
      />
      
      <ArchivedCampaignsList userRole="influencer" deps={[ lastUpdated ]} onReload={() => setLastUpdated(new Date())} />
      
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Campaign</DialogTitle>
            <DialogDescription>
              Share your experience
              with {selectedCampaign?.title} by {selectedCampaign?.owner?.name || 'the campaign manager'}
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
                  className="flex-1 bg-growi-success text-white hover:bg-growi-success/90"
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
