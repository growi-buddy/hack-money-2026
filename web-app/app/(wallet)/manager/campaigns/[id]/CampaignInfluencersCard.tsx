import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { WalletDisplayName } from '@/components/ui/WalletDisplayName';
import { useWallet } from '@/contexts/wallet-context';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { PARTICIPATION_STATUS, SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { ParticipationStatus, SiteEventType } from '@/lib/db/enums';
import { CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { Check, Clock, MessageSquare, Sparkles, Star, Users, X } from 'lucide-react';
import { useState } from 'react';

export const CampaignInfluencersCard = ({ campaign, onUpdate }: {
  campaign: CampaignResponseDTO;
  onUpdate?: () => void
}) => {
  const { address } = useWallet();
  
  const [ showRatingModal, setShowRatingModal ] = useState(false);
  const [ selectedInfluencer, setSelectedInfluencer ] = useState<CampaignResponseDTO['participants'][number] | null>(null);
  const [ rating, setRating ] = useState(0);
  const [ hoverRating, setHoverRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ ratingSubmitted, setRatingSubmitted ] = useState(false);
  const [ processingParticipationId, setProcessingParticipationId ] = useState<string | null>(null);
  
  const handleSubmitRating = () => {
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
    }, 1500);
  };
  
  const handleRateInfluencer = (influencer: CampaignResponseDTO['participants'][number]) => {
    setSelectedInfluencer(influencer);
    setShowRatingModal(true);
    setRating(0);
    setHoverRating(0);
    setReview('');
    setRatingSubmitted(false);
  };
  
  const handleAcceptParticipant = async (participationId: string) => {
    setProcessingParticipationId(participationId);
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/accept?participationId=${participationId}&walletAddress=${address}`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        onUpdate?.();
      } else {
        console.error('Failed to accept participant:', data.error);
      }
    } catch (error) {
      console.error('Error accepting participant:', error);
    } finally {
      setProcessingParticipationId(null);
    }
  };
  
  const handleRejectParticipant = async (participationId: string) => {
    setProcessingParticipationId(participationId);
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/reject?participationId=${participationId}&walletAddress=${address}`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        onUpdate?.();
      } else {
        console.error('Failed to reject participant:', data.error);
      }
    } catch (error) {
      console.error('Error rejecting participant:', error);
    } finally {
      setProcessingParticipationId(null);
    }
  };
  
  const isOwner = address && campaign.owner.walletAddress === address;
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-growi-blue" />
              Influencers
            </CardTitle>
            <Badge variant="outline">{campaign.participants.length} active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {campaign.participants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No influencers have joined this campaign yet</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {campaign.participants.map((participation) => {
                const displayName = participation.name || participation.walletAddress;
                
                return (
                  <motion.div
                    key={participation.id}
                    variants={staggerItem}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:border-growi-blue/50"
                  >
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-growi-blue/20 text-growi-blue font-semibold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          {participation.name && (
                            <h4 className="font-medium text-foreground">{participation.name}</h4>
                          )}
                          <p className="text-xs text-muted-foreground">
                            <WalletDisplayName address={participation.walletAddress} />
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            participation.status === ParticipationStatus.ACCEPTED
                              ? 'border-growi-success/50 text-growi-success bg-growi-success/10'
                              : participation.status === ParticipationStatus.APPLY_PENDING
                                ? 'border-growi-yellow/50 text-growi-yellow bg-growi-yellow/10'
                                : participation.status === ParticipationStatus.INVITATION_SENT
                                  ? 'border-growi-blue/50 text-growi-blue bg-growi-blue/10'
                                  : 'border-destructive/50 text-destructive bg-destructive/10'
                          }`}
                        >
                          {PARTICIPATION_STATUS[participation.status]}
                        </Badge>
                      </div>
                      {Object.keys(participation.summaryTrackedSiteEvents).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(participation.summaryTrackedSiteEvents).map(([ eventType, data ]) => {
                            const lastUpdatedDate = data.lastUpdated > 0 ? new Date(data.lastUpdated) : null;
                            const isRecent = data.lastUpdated > 0 && Date.now() - data.lastUpdated < 3600000;
                            
                            return (
                              <div
                                key={eventType}
                                className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2"
                              >
                                <div>
                                  <p className="text-xs font-medium text-foreground">
                                    {SITE_EVENT_TYPE_LABELS[eventType as SiteEventType]}
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                                    <p className="text-[10px] text-muted-foreground">
                                      {lastUpdatedDate
                                        ? `${lastUpdatedDate.toLocaleDateString()} ${lastUpdatedDate.toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}`
                                        : '-'
                                      }
                                    </p>
                                  </div>
                                </div>
                                <Badge
                                  className={`text-xs ${isRecent ? 'bg-growi-success/20 text-growi-success' : 'bg-growi-blue/20 text-growi-blue'}`}
                                >
                                  {data.total}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No events tracked yet</p>
                      )}
                      
                      {isOwner && participation.status === ParticipationStatus.APPLY_PENDING && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcceptParticipant(participation.id)}
                            disabled={processingParticipationId === participation.id}
                            className="flex-1 border-growi-success/50 text-growi-success hover:bg-growi-success/10"
                          >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectParticipant(participation.id)}
                            disabled={processingParticipationId === participation.id}
                            className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-3.5 w-3.5 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Influencer</DialogTitle>
            <DialogDescription>
              Share your experience working
              with {selectedInfluencer?.name || selectedInfluencer?.walletAddress.slice(0, 10)}
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
              {/* Selected Influencer Info */}
              {selectedInfluencer && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growi-blue/20 text-growi-blue font-semibold">
                    {(selectedInfluencer.name || selectedInfluencer.walletAddress).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedInfluencer.name || `${selectedInfluencer.walletAddress.slice(0, 6)}...${selectedInfluencer.walletAddress.slice(-4)}`}
                    </p>
                    <p className="text-sm text-muted-foreground">Balance:
                      ${selectedInfluencer.toLocaleString()}</p>
                  </div>
                </div>
              )}
              
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
                  placeholder="Share your experience working with this influencer..."
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
    </>
  );
};
