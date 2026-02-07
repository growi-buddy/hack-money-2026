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
import { SiteEventType } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponseDTO, UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Archive, Flame, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ArchivedCampaignsListProps {
  userRole: UserRoleType;
  deps?: (number | Date | string)[],
  onReload: () => void,
}

function getTotalPurchases(campaign: CampaignResponseDTO): number {
  const grouped = groupTrackedEventsByType(campaign.sites);
  const purchases = grouped.find(e => e.eventType === SiteEventType.PURCHASE_SUCCESS);
  return purchases?.trackedEventsCount ?? 0;
}

export const ArchivedCampaignsList = ({ userRole, deps, onReload }: ArchivedCampaignsListProps) => {
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponseDTO[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ restoringId, setRestoringId ] = useState<string | null>(null);
  
  const handleRestoreCampaign = async (campaignId: string) => {
    try {
      setRestoringId(campaignId);
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'restore' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to restore campaign');
      }
      
      // Remove the restored campaign from the archived list
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      
      // Call onReload to refresh other campaign lists
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore campaign');
    } finally {
      setRestoringId(null);
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
      
      // Fetch expired and completed campaigns as archived
      const response = await fetch(`/api/campaigns/all?walletAddress=${address}&isDeleted=true`);
      
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
      
      {(isLoading && !hasCampaigns) ? <LoadingCard userRole={userRole} /> : (
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
                      {isManager && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleRestoreCampaign(campaign.id)}
                          disabled={restoringId === campaign.id}
                        >
                          <RotateCcw className="mr-1 h-3 w-3" />
                          Restore
                        </Button>
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
