import { useWallet } from '@/contexts/wallet-context';
import { CampaignStatus } from '@/lib/db/enums';
import { ApiListResponse, CampaignResponseDTO, UserRoleType } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export function useCampaigns(statuses: CampaignStatus[], userRole: UserRoleType, isDeleted: boolean, deps?: (number | Date | string)[]) {
  
  const { address } = useWallet();
  const [ campaigns, setCampaigns ] = useState<CampaignResponseDTO[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isRevalidating, setIsRevalidating ] = useState(false);
  const [ error, setError ] = useState('');
  
  const status = statuses.join(',');
  
  const fetchCampaigns = useCallback(async () => {
    if (!address) {
      setCampaigns([]);
      setIsRevalidating(false);
      return;
    }
    
    try {
      setIsRevalidating(true);
      setError('');
      const response = await fetch(
        `/api/campaigns/all?walletAddress=${address}${status ? `&status=${status}` : ''}${isDeleted ? `&isDeleted=true` : ''}`,
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Failed to fetch campaigns');
      }
      
      const result: ApiListResponse<CampaignResponseDTO> = await response.json();
      
      const filteredCampaigns = result.data.filter((campaign) => campaign.userRole === userRole);
      
      const sortedCampaigns = filteredCampaigns.sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
      
      setCampaigns(sortedCampaigns);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRevalidating(false);
    }
  }, [ address, status, userRole ]);
  
  const depsString = JSON.stringify(deps);
  useEffect(() => {
    void fetchCampaigns();
  }, [ fetchCampaigns, depsString ]);
  
  return {
    campaigns,
    setCampaigns,
    isLoading,
    isRevalidating,
    error,
  };
}
