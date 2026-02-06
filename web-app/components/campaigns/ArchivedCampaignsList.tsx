'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { LoadingCard } from '@/components/ui/loading-card';
import { useWallet } from '@/contexts/wallet-context';
import { groupRewardEventsByType } from '@/helpers/campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponse, UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Archive, Flame, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ArchivedCampaignsListProps {
  userRole: UserRoleType;
  onRestore?: (campaignId: string) => void;
  deps?: (number | Date | string)[],
}

function getTotalPurchases(campaign: CampaignResponse): number {
  const grouped = groupRewardEventsByType(campaign.rewardEvents);
  const purchases = grouped.find(e => e.eventType === EventType.PURCHASE_SUCCESS);
  return purchases?.trackedEventsCount ?? 0;
}

export const ArchivedCampaignsList = ({ userRole, onRestore, deps }: ArchivedCampaignsListProps) => {
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponse[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  
  const fetchCampaigns = useCallback(async () => {
    if (!address) {
      setCampaigns([]);
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`/api/wallet/${address}/all-campaigns?status=${CampaignStatus.DELETED}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      
      const result: ApiListResponse<CampaignResponse> = await response.json();
      
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
  
  // Define if manager or influencer
  const isManager = userRole === 'manager';
  
  if (!hasCampaigns) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
          <Archive className="h-5 w-5" />
          Archived Campaigns
        </h2>
        <Badge variant="secondary">{campaigns.length} archived</Badge>
      </div>
      
      <ErrorCard error={error} />
      
      {isLoading ? <LoadingCard userRole={userRole} /> : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {campaigns.map((campaign) => {
            const totalPurchases = getTotalPurchases(campaign);
            
            return (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Card className="opacity-60 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-foreground">{campaign.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <CampaignStatusBadge status={campaign.status} className="text-xs" />
                        {campaign.isHot && (
                          <div className="p-1 rounded-full bg-amber-500/20" title="Hot Campaign">
                            <Flame className="h-3 w-3 text-amber-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-xs">
                      Ended: {new Date(campaign.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {isManager ? (
                          <>
                            <span className="font-semibold text-foreground">{totalPurchases}</span>
                            <span className="text-muted-foreground"> purchases</span>
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-foreground">${campaign.budgetSpent.toFixed(2)}</span>
                            <span className="text-muted-foreground"> earned</span>
                          </>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => onRestore?.(campaign.id)}
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Restore
                      </Button>
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
