import { useWallet } from '@/contexts/wallet-context';
import { ApiListResponse, SiteResponseDTO } from '@/types';
import { useEffect, useState } from 'react';

export const useSite = () => {
  
  const { address } = useWallet();
  const [ hasSiteEvents, setHasSiteEvents ] = useState(false);
  const [ sites, setSites ] = useState<Array<SiteResponseDTO>>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  useEffect(() => {
    const fetchRewardEvents = async () => {
      if (!address) {
        setSites([]);
        setHasSiteEvents(false);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/sites?walletAddress=${address}`);
        const data: ApiListResponse<SiteResponseDTO> = await response.json();
        
        if (response.ok) {
          setSites(data?.data || []);
          const totalSiteEvents = data?.data?.reduce((sum, site) => sum + (site?.events?.length || 0), 0);
          setHasSiteEvents(totalSiteEvents >= 0);
        } else {
          setHasSiteEvents(false);
        }
      } catch {
        setHasSiteEvents(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    void fetchRewardEvents();
  }, [ address ]);
  
  return {
    sites,
    isLoading,
    hasSiteEvents,
  };
};
