'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCampaigns } from '@/hooks/use-campaigns';
import { useUsers } from '@/hooks/use-users';
import { staggerContainer } from '@/lib/animations';
import { CampaignStatus } from '@/lib/db/enums';
import { UserResponseDTO } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Facebook, Instagram, Linkedin, Music2, Search, Send, Twitter, Users, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Helper function to get social media icon
const getSocialIcon = (platform: string) => {
  const normalizedPlatform = platform.toLowerCase();
  switch (normalizedPlatform) {
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'twitter':
    case 'x':
      return <Twitter className="h-4 w-4" />;
    case 'youtube':
      return <Youtube className="h-4 w-4" />;
    case 'tiktok':
      return <Music2 className="h-4 w-4" />;
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

// Helper function to format followers count
const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const mockCampaigns = [
  { id: '1', title: 'Nike Summer Collection', status: 'active' },
  { id: '2', title: 'Adidas Winter Drop', status: 'active' },
  { id: '3', title: 'New Balance Pro', status: 'draft' },
];

export default function InfluencersPage() {
  
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ selectedInfluencer, setSelectedInfluencer ] = useState<UserResponseDTO | null>(null);
  const [ showInviteModal, setShowInviteModal ] = useState(false);
  const [ selectedCampaign, setSelectedCampaign ] = useState('');
  const [ inviteSent, setInviteSent ] = useState(false);
  const [ isSending, setIsSending ] = useState(false);
  const [ inviteError, setInviteError ] = useState<string | null>(null);

  const { users } = useUsers('influencer');
  const { campaigns } = useCampaigns([ CampaignStatus.PUBLISHED ], 'manager', false);

  const filteredInfluencers = users.filter(inf =>
    inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.affinities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
    inf.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleInvite = (influencer: UserResponseDTO) => {
    setSelectedInfluencer(influencer);
    setShowInviteModal(true);
    setInviteSent(false);
    setSelectedCampaign('');
    setInviteError(null);
  };

  const sendInvite = async () => {
    if (!selectedInfluencer || !selectedCampaign) return;

    setIsSending(true);
    setInviteError(null);

    try {
      const response = await fetch(
        `/api/campaigns/${selectedCampaign}/invite?walletAddress=${selectedInfluencer.walletAddress}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Failed to send invite');
      }

      setInviteSent(true);
      setTimeout(() => {
        setShowInviteModal(false);
        setInviteSent(false);
        setSelectedCampaign('');
      }, 1500);
    } catch (error) {
      setInviteError(error instanceof Error ? error.message : 'Failed to send invite');
    } finally {
      setIsSending(false);
    }
  };

  console.log({ users, filteredInfluencers });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Search Influencers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find and invite influencers to your campaigns
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, interests, or affinities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <Badge variant="secondary" className="gap-1">
          <Users className="h-3 w-3" />
          {filteredInfluencers.length} influencers
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-growi-success/10 text-growi-success">
          {users.filter(i => i.isOnline).length} online
        </Badge>
      </motion.div>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredInfluencers.map((influencer) => (
          <motion.div key={influencer.id}>
            <Card className="h-full transition-all hover:border-growi-blue/50 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={influencer.avatar || '/placeholder.svg'}
                      alt={influencer.name}
                      width={60}
                      height={60}
                      className="rounded-full ring-2 ring-border"
                    />
                    {influencer.influencerVerification && (
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-growi-success ring-2 ring-card">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base text-foreground truncate">
                      {influencer.name}
                    </CardTitle>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      {influencer.location || 'Location not specified'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Bio */}
                {influencer.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {influencer.bio}
                  </p>
                )}
                
                {/* Social Media Stats */}
                {influencer.socialMedias && influencer.socialMedias.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Social Media
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {influencer.socialMedias.map((social, index) => (
                        <a
                          key={index}
                          href={social.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium transition-all hover:border-growi-blue/50 hover:bg-growi-blue/5 hover:shadow-sm"
                        >
                          <span className="text-muted-foreground">
                            {getSocialIcon(social.platform)}
                          </span>
                          <span className="text-foreground">
                            {formatFollowers(social.followers)}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Affinities */}
                {influencer.affinities && influencer.affinities.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Affinities
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {influencer.affinities.slice(0, 3).map((affinity) => (
                        <Badge
                          key={affinity}
                          className="bg-growi-blue/10 text-growi-blue border-growi-blue/20 text-xs hover:bg-growi-blue/20"
                        >
                          {affinity}
                        </Badge>
                      ))}
                      {influencer.affinities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{influencer.affinities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Interests */}
                {influencer.interests && influencer.interests.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {influencer.interests.slice(0, 3).map((interest) => (
                        <Badge
                          key={interest}
                          className="bg-growi-lime/10 text-growi-lime border-growi-lime/20 text-xs hover:bg-growi-lime/20"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {influencer.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{influencer.interests.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={() => handleInvite(influencer)}
                  className="w-full bg-growi-blue text-white hover:bg-growi-blue/90 shadow-sm"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Invite to Campaign
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to Campaign</DialogTitle>
            <DialogDescription>
              Select a campaign to invite {selectedInfluencer?.name}
            </DialogDescription>
          </DialogHeader>
          
          <AnimatePresence mode="wait">
            {inviteSent ? (
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
                  <Check className="h-8 w-8 text-growi-success" />
                </motion.div>
                <p className="text-lg font-medium text-foreground">Invitation Sent!</p>
                <p className="text-sm text-muted-foreground">
                  {selectedInfluencer?.name} will be notified
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 py-4"
              >
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
                      {/*<p className="text-sm text-muted-foreground">{selectedInfluencer.followers} followers</p>*/}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select Campaign</label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a campaign..." />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          {campaign.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {inviteError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                    {inviteError}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowInviteModal(false)}
                    disabled={isSending}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                    disabled={!selectedCampaign || isSending}
                    onClick={sendInvite}
                  >
                    {isSending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invite
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
