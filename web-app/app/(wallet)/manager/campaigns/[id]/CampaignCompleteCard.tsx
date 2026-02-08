'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles, Star, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const stats = {
  totalSpent: 4850.00,
  totalConversions: 342,
  totalViews: 125000,
  roi: 285,
  campaignName: 'Nike Summer Collection',
};

const campaignInfluencers = [
  { id: 1, name: 'Alex Chen', avatar: '/growi-mascot.png', conversions: 98, earned: '$686', rating: null },
  { id: 2, name: 'Sarah Kim', avatar: '/growi-mascot.png', conversions: 75, earned: '$525', rating: null },
  { id: 3, name: 'Jordan Lee', avatar: '/growi-mascot.png', conversions: 112, earned: '$784', rating: null },
  { id: 4, name: 'Emma Wilson', avatar: '/growi-mascot.png', conversions: 57, earned: '$399', rating: null },
];

function CountUpNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (prefix === '$') {
      return `${prefix}${latest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${prefix}${Math.round(latest).toLocaleString()}`;
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

export function CampaignCompleteCard() {
  
  const [ showConfetti, setShowConfetti ] = useState(true);
  const [ influencerRatings, setInfluencerRatings ] = useState<Record<number, number>>({});
  const [ showRatingModal, setShowRatingModal ] = useState(false);
  const [ selectedInfluencer, setSelectedInfluencer ] = useState<typeof campaignInfluencers[0] | null>(null);
  const [ rating, setRating ] = useState(0);
  const [ hoverRating, setHoverRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ ratingSubmitted, setRatingSubmitted ] = useState(false);
  const colors = [ '#4A90E2', '#FFB347', '#9ACD32', '#34d399', '#f97316' ];
  
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleRateInfluencer = (influencer: typeof campaignInfluencers[0]) => {
    setSelectedInfluencer(influencer);
    setShowRatingModal(true);
    setRating(0);
    setHoverRating(0);
    setReview('');
    setRatingSubmitted(false);
  };
  
  const handleSubmitRating = () => {
    if (selectedInfluencer) {
      setInfluencerRatings(prev => ({
        ...prev,
        [selectedInfluencer.id]: rating,
      }));
    }
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {[ ...Array(50) ].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 720 - 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
              className="absolute h-3 w-3 rounded-sm"
              style={{
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              }}
            />
          ))}
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full max-w-2xl"
      >
        <Card className="overflow-hidden border-growi-blue/30">
          <CardContent className="p-8 text-center">
            {/* Trophy Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-growi-blue/20"
            >
              <motion.div
                animate={{
                  rotate: [ 0, 10, -10, 0 ],
                  scale: [ 1, 1.1, 1 ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Trophy className="h-12 w-12 text-growi-blue" />
              </motion.div>
            </motion.div>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-foreground">Campaign Complete!</h1>
              <p className="mt-2 text-muted-foreground">{stats.campaignName}</p>
            </motion.div>
            
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="mt-1 text-2xl font-bold text-growi-blue">
                  <CountUpNumber value={stats.totalSpent} prefix="$" />
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Total Conversions</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  <CountUpNumber value={stats.totalConversions} />
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  <CountUpNumber value={stats.totalViews} />
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="mt-1 text-2xl font-bold text-growi-success">
                  <CountUpNumber value={stats.roi} />%
                </p>
              </div>
            </motion.div>
            
            {/* Rate Influencers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <Card className="border-growi-yellow/30 bg-growi-yellow/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-growi-yellow" />
                    Rate Your Influencers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Help other campaign managers by rating your influencer partners
                  </p>
                  <div className="space-y-3">
                    {campaignInfluencers.map((influencer) => (
                      <div
                        key={influencer.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={influencer.avatar || '/placeholder.svg'}
                            alt={influencer.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="text-left">
                            <p className="font-medium text-foreground">{influencer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {influencer.conversions} conversions | {influencer.earned}
                            </p>
                          </div>
                        </div>
                        {influencerRatings[influencer.id] ? (
                          <div className="flex items-center gap-1">
                            {[ ...Array(5) ].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < influencerRatings[influencer.id]
                                    ? 'fill-growi-yellow text-growi-yellow'
                                    : 'text-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => handleRateInfluencer(influencer)}
                          >
                            <Star className="mr-1 h-4 w-4" />
                            Rate
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Return Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Link href="/client">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-growi-blue text-white hover:bg-growi-blue/90">
                    Return to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Influencer</DialogTitle>
            <DialogDescription>
              Share your experience working with {selectedInfluencer?.name}
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
                  <Image
                    src={selectedInfluencer.avatar || '/placeholder.svg'}
                    alt={selectedInfluencer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">{selectedInfluencer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedInfluencer.conversions} conversions | {selectedInfluencer.earned}
                    </p>
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
    </div>
  );
}
