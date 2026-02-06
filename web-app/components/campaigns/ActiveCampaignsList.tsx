'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { LoadingCard } from '@/components/ui/loading-card';
import { useWallet } from '@/contexts/wallet-context';
import { groupRewardEventsByType } from '@/helpers/campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponse, UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, Flame, Sparkles, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface MyCampaignsListProps {
  userRole: UserRoleType,
  deps?: (number | Date | string)[],
}

// Helper function to calculate campaign duration
function getCampaignDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // If dates are the same, it's ongoing
  if (start.getTime() === end.getTime()) return 'Ongoing';

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Same day';
  if (diffDays < 7) return `${diffDays}d`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo`;
  return `${Math.ceil(diffDays / 365)}y`;
}

// Helper function to format date range
function getDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // If dates are the same, show as ongoing
  if (start.getTime() === new Date(endDate).getTime()) {
    return `${startStr} - Ongoing`;
  }

  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${startStr} - ${endStr}`;
}

export const ActiveCampaignsList = ({ userRole, deps }: MyCampaignsListProps) => {
  
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponse[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  
  const fetchCampaigns = useCallback(async (isManualRefresh = false) => {
    if (!address) {
      setCampaigns([]);
      return;
    }
    
    try {
      if (isManualRefresh) {
        setIsLoading(true);
      } else {
        setIsLoading(true);
      }
      setError('');
      
      const response = await fetch(`/api/wallet/${address}/all-campaigns?status=${CampaignStatus.ACTIVE}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      
      const result: ApiListResponse<CampaignResponse> = await response.json();
      
      // Filter campaigns by userRole (manager or influencer)
      const filteredCampaigns = result.data.filter(
        campaign => campaign.userRole === userRole,
      );
      
      // Sort by startDate (newest first)
      const sortedCampaigns = filteredCampaigns.sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
      
      setCampaigns(sortedCampaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [ address, userRole ]);
  
  // Define color scheme based on user role
  const isManager = userRole === 'manager';
  const primaryColorClass = isManager ? 'text-growi-blue' : 'text-growi-success';
  const primaryBgLight = isManager ? 'bg-growi-blue/5' : 'bg-growi-success/5';
  const primaryBgMedium = isManager ? 'bg-growi-blue/10' : 'bg-growi-success/10';
  const primaryBg = isManager ? 'bg-growi-blue' : 'bg-growi-success';
  const primaryBgHover = isManager ? 'hover:bg-growi-blue/90' : 'hover:bg-growi-success/90';
  const primaryBorder = isManager ? 'border-growi-blue/30' : 'border-growi-success/30';
  const primaryBorderHover = isManager ? 'hover:border-growi-blue/50' : 'hover:border-growi-success/50';
  const primaryBadge = isManager ? 'bg-growi-blue/20 text-growi-blue' : 'bg-growi-success/20 text-growi-success';
  
  const [ togglingHot, setTogglingHot ] = useState<string | null>(null);
  
  const handleToggleHot = useCallback(async (campaignId: string, isCurrentlyHot: boolean) => {
    setTogglingHot(campaignId);
    
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isHot: !isCurrentlyHot }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle hot status');
      }
      
      // Update local state
      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === campaignId
            ? { ...campaign, isHot: !isCurrentlyHot }
            : campaign,
        ),
      );
    } catch (err) {
      console.error('Error toggling hot:', err);
      // setError(err instanceof Error ? err.message : 'Failed to toggle hot status');
    } finally {
      setTogglingHot(null);
    }
  }, []);
  
  const depsString = JSON.stringify(deps);
  useEffect(() => {
    void fetchCampaigns();
  }, [ fetchCampaigns, depsString ]);
  
  const hasCampaigns = campaigns.length > 0;
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <TrendingUp className={`h-5 w-5 ${primaryColorClass}`} />
          Active Campaigns
        </h2>
        {hasCampaigns && (
          <Badge className={`${primaryBadge} border-transparent`}>{campaigns.length} active</Badge>
        )}
      </div>
      
      <ErrorCard error={error} />
      
      {isLoading ? <LoadingCard userRole={userRole} /> : hasCampaigns ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2"
        >
          {campaigns.map((campaign) => {
            const progress = campaign.budgetTotal > 0
              ? Math.round((campaign.budgetSpent / campaign.budgetTotal) * 100)
              : 0;
            
            return (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/${userRole}/campaigns/${campaign.id}`}>
                  <Card className={`cursor-pointer transition-colors ${primaryBorderHover}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <CampaignStatusBadge status={campaign.status} />
                          {campaign.status === CampaignStatus.ACTIVE && userRole === 'manager' && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                void handleToggleHot(campaign.id, campaign.isHot ?? false);
                              }}
                              disabled={togglingHot === campaign.id}
                              className={`p-1.5 rounded-full transition-all ${
                                campaign.isHot ?? false
                                  ? 'bg-amber-500/20 text-amber-600 hover:bg-amber-500/30'
                                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                              } disabled:opacity-50`}
                              title={campaign.isHot ? 'Remove from Hot' : 'Mark as Hot'}
                            >
                              <Flame className={`h-4 w-4 ${togglingHot === campaign.id ? 'animate-spin' : ''}`} />
                            </button>
                          )}
                          {campaign.status === CampaignStatus.ACTIVE && userRole === 'influencer' && campaign.isHot && (
                            <div
                              className="p-1.5 rounded-full bg-amber-500/20"
                              title="Hot Campaign"
                            >
                              <Flame className="h-4 w-4 text-amber-600" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/*<CardDescription>*/}
                      {/*  Earned: ${item.currentBalance.toFixed(2)} | Events: {item.totalEvents}*/}
                      {/*</CardDescription>*/}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Campaign Period and Duration */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{getDateRange(campaign.startDate, campaign.endDate)}</span>
                        </div>
                        <span className="font-medium">{getCampaignDuration(campaign.startDate, campaign.endDate)}</span>
                      </div>
                      
                      {/* Influencers Count */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{campaign.participationsCount} influencer{campaign.participationsCount !== 1 ? 's' : ''}</span>
                      </div>
                      
                      {/* Event Stats */}
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
                      
                      {/* Tags - Interests & Demographics */}
                      {(campaign.interests.length > 0 || campaign.demographics.length > 0) && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {campaign.interests.slice(0, 2).map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 bg-muted/50 text-muted-foreground border-transparent"
                            >
                              {interest}
                            </Badge>
                          ))}
                          {campaign.demographics.slice(0, 2).map((demo) => (
                            <Badge
                              key={demo}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 bg-muted/50 text-muted-foreground border-transparent"
                            >
                              {demo}
                            </Badge>
                          ))}
                          {(campaign.interests.length + campaign.demographics.length) > 4 && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 bg-muted/50 text-muted-foreground border-transparent"
                            >
                              +{(campaign.interests.length + campaign.demographics.length) - 4}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {/* Progress bar */}
                      <div className="pt-1">
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>Budget Used</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full ${primaryBg}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={`border-2 border-dashed ${primaryBorder} ${primaryBgLight}`}>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <motion.div
                animate={{
                  y: [ 0, -8, 0 ],
                  rotate: [ 0, 5, -5, 0 ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${primaryBgMedium}`}
              >
                <Sparkles className={`h-10 w-10 ${primaryColorClass}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">Your Campaigns Will Show Here</h3>
              <p className="mt-3 max-w-md text-muted-foreground">
                Once you join your first campaign, it will appear in this section.
                Browse available campaigns and start earning by promoting brands you love.
              </p>
              <Link href="/influencer/discover" className="mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" className={`${primaryBg} text-white ${primaryBgHover}`}>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Browse Campaigns
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
