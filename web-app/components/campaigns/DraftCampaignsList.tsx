'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { LoadingCard } from '@/components/ui/loading-card';
import { useWallet } from '@/contexts/wallet-context';
import { groupTrackedEventsByType } from '@/helpers/campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SITE_EVENT_TYPE_SHORT_LABELS } from '@/lib/constants';
import { CampaignStatus } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponseDTO, UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Eraser, Flame, Users } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface MyCampaignsListProps {
  userRole: UserRoleType,
  deps?: (number | Date | string)[],
}

function getCampaignDuration(startDate: string | number, endDate: string | number): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getTime() === end.getTime()) return 'Ongoing';
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'Same day';
  if (diffDays < 7) return `${diffDays}d`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo`;
  return `${Math.ceil(diffDays / 365)}y`;
}

function getDateRange(startDate: string | number, endDate: string | number): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  if (start.getTime() === new Date(endDate).getTime()) {
    return `${startStr} - Ongoing`;
  }
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return `${startStr} - ${endStr}`;
}

export const DraftCampaignsList = ({ userRole, deps }: MyCampaignsListProps) => {
  
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponseDTO[]>([]);
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
      
      const response = await fetch(`/api/campaigns/all?walletAddress=${address}&status=${CampaignStatus.DRAFT}`);
      
      if (!response.ok) {
        // 1. Intentamos obtener el mensaje de error del body
        const errorData = await response.json().catch(() => ({}));
        
        // 2. Lanzamos el error usando el mensaje del backend o uno por defecto
        throw new Error(errorData?.error?.message || 'Failed to fetch campaigns');
      }
      
      const result: ApiListResponse<CampaignResponseDTO> = await response.json();
      
      const filteredCampaigns = result.data.filter(
        campaign => campaign.userRole === userRole,
      );
      
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
  
  if (!hasCampaigns) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Eraser className={`h-5 w-5 ${primaryColorClass}`} />
          Draft Campaigns
        </h2>
        {hasCampaigns && (
          <Badge className={`${primaryBadge} border-transparent`}>{campaigns.length} draft</Badge>
        )}
      </div>
      
      <ErrorCard error={error} />
      
      {isLoading ? <LoadingCard userRole={userRole} /> : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2"
        >
          {campaigns.map((campaign) => {
            return (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/${userRole}/campaigns/${campaign.id}`}>
                  <Card className={`cursor-pointer transition-colors ${primaryBorderHover}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <CampaignStatusBadge status={campaign.status} />
                          {campaign.status === CampaignStatus.PUBLISHED && userRole === 'manager' && (
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
                          {campaign.status === CampaignStatus.PUBLISHED && userRole === 'influencer' && campaign.isHot && (
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
                      
                      <div
                        className="flex justify-evenly text-xs text-muted-foreground w-full"
                        style={{ justifyContent: 'space-evenly' }}
                      >
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>Slots:</span>
                          aaaa
                          <span className="font-medium text-foreground">{campaign.slots}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>Budget:</span>
                          <span className="font-medium text-foreground">{campaign.budgetTotal}</span>
                        </div>
                      </div>
                      
                      {/* Event Stats */}
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {(() => {
                          const grouped = groupTrackedEventsByType(campaign.sites);
                          return grouped.slice(0, 4).map((event, index) => {
                            return (
                              <div key={event.eventType}>
                                <p className="text-xs text-muted-foreground truncate">{SITE_EVENT_TYPE_SHORT_LABELS[event.eventType]}</p>
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
