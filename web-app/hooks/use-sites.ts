import { useWallet } from '@/contexts/wallet-context';
import { ApiListResponse, SiteResponseDTO } from '@/types';
import { useEffect, useState } from 'react';

export const useSites = () => {
  
  const { address } = useWallet();
  const [ hasSiteEvents, setHasSiteEvents ] = useState(false);
  const [ sites, setSites ] = useState<Array<SiteResponseDTO>>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isRevalidating, setIsRevalidating ] = useState(false);
  
  useEffect(() => {
    const fetchRewardEvents = async () => {
      if (!address) {
        setSites([]);
        setHasSiteEvents(false);
        setIsRevalidating(false);
        return;
      }
      
      try {
        setIsRevalidating(true);
        
        const response = await fetch(`/api/sites?walletAddress=${address}`);
        const data: ApiListResponse<SiteResponseDTO> = await response.json();
        
        if (response.ok) {
          setSites(data?.data || []);
          const totalSiteEvents = data?.data?.reduce((sum, site) => sum + (site?.events?.length || 0), 0);
          setHasSiteEvents(totalSiteEvents >= 0);
          setIsLoading(false);
        }
      } catch {
        setHasSiteEvents(false);
      } finally {
        setIsRevalidating(false);
      }
    };
    
    void fetchRewardEvents();
  }, [ address ]);
  
  return {
    sites,
    isLoading,
    isRevalidating,
    hasSiteEvents,
  };
};
