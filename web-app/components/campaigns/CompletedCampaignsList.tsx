'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { LoadingCard } from '@/components/ui/loading-card';
import { useWallet } from '@/contexts/wallet-context';
import { groupTrackedEventsByType } from '@/helpers/campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, SiteEventType } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponseDTO, UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Archive, CheckCircle2, Flame, Star } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface CompletedCampaignsListProps {
  userRole: UserRoleType;
  onRateCampaign?: (campaign: CampaignResponseDTO) => void;
  deps?: (number | Date | string)[],
  onReload: () => void;
}

function getTotalPurchases(campaign: CampaignResponseDTO): number {
  const grouped = groupTrackedEventsByType(campaign.sites);
  const purchases = grouped.find(e => e.eventType === SiteEventType.PURCHASE_SUCCESS);
  return purchases?.trackedEventsCount ?? 0;
}

function calculateROI(campaign: CampaignResponseDTO): number {
  if (campaign.budgetSpent === 0) return 0;
  const purchases = getTotalPurchases(campaign);
  const estimatedRevenue = purchases * 50;
  return Math.round((estimatedRevenue / campaign.budgetSpent) * 100);
}

export const CompletedCampaignsList = ({ userRole, onRateCampaign, deps, onReload }: CompletedCampaignsListProps) => {
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponseDTO[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ archivingId, setArchivingId ] = useState<string | null>(null);
  
  const handleArchiveCampaign = async (campaignId: string) => {
    try {
      setArchivingId(campaignId);
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to archive campaign');
      }
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to archive campaign');
    } finally {
      setArchivingId(null);
    }
  };
  
  const fetchCampaigns = useCallback(async () => {
    if (!address) {
      setCampaigns([]);
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`/api/campaigns/all?walletAddress=${address}&status=${CampaignStatus.COMPLETED},${CampaignStatus.EXPIRED}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      
      const result: ApiListResponse<CampaignResponseDTO> = await response.json();
      
      // Filter campaigns by userRole (manager or influencer)
      const filteredCampaigns = result.data.filter(
        campaign => campaign.userRole === userRole,
      );
      
      setCampaigns(filteredCampaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [ address, userRole ]);
  
  const depsString = JSON.stringify(deps);
  useEffect(() => {
    void fetchCampaigns();
  }, [ fetchCampaigns, depsString ]);
  
  const hasCampaigns = campaigns.length > 0;
  
  const isManager = userRole === 'manager';
  const primaryColorClass = isManager ? 'text-growi-blue' : 'text-growi-success';
  
  if (!hasCampaigns) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <CheckCircle2 className={`h-5 w-5 ${primaryColorClass}`} />
          Completed Campaigns
        </h2>
        <Badge className={`${isManager ? 'bg-growi-blue/20 text-growi-blue' : 'bg-growi-success/20 text-growi-success'} border-transparent`}>
          {campaigns.length} completed
        </Badge>
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
            const totalPurchases = getTotalPurchases(campaign);
            const roi = calculateROI(campaign);
            
            return (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="transition-colors hover:border-growi-success/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <CampaignStatusBadge status={campaign.status} />
                        {campaign.isHot && (
                          <div className="p-1.5 rounded-full bg-amber-500/20" title="Hot Campaign">
                            <Flame className="h-4 w-4 text-amber-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <CardDescription>
                      {isManager ? (
                        <>Budget: ${campaign.budgetTotal.toLocaleString()} | Spent:
                          ${campaign.budgetSpent.toLocaleString()}</>
                      ) : (
                        <>Earned: ${campaign.budgetSpent.toFixed(2)}</>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{totalPurchases}</p>
                        <p className="text-xs text-muted-foreground">Purchases</p>
                      </div>
                      <div>
                        {isManager ? (
                          <>
                            <p className="text-lg font-bold text-growi-success">{roi}%</p>
                            <p className="text-xs text-muted-foreground">ROI</p>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-bold text-growi-money">${campaign.budgetSpent.toFixed(0)}</p>
                            <p className="text-xs text-muted-foreground">Earned</p>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">End Date</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {isManager ? (
                        <>
                          <Link href={`/manager/campaigns/${campaign.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              View Summary
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => handleArchiveCampaign(campaign.id)}
                            disabled={archivingId === campaign.id}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent border-growi-yellow/50 text-growi-yellow hover:bg-growi-yellow/10"
                            onClick={() => onRateCampaign?.(campaign)}
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Rate Campaign
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
