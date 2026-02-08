import { useWallet } from '@/contexts/wallet-context';
import { ApiListResponse, UserResponseDTO, UserRoleType } from '@/types';
import { useEffect, useState } from 'react';

export const useUsers = (userRole?: UserRoleType) => {
  
  const { address } = useWallet();
  const [ users, setUsers ] = useState<Array<UserResponseDTO>>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isRevalidating, setIsRevalidating ] = useState(false);
  
  useEffect(() => {
    const fetchRewardEvents = async () => {
      if (!address) {
        setUsers([]);
        setIsRevalidating(false);
        return;
      }
      
      try {
        setIsRevalidating(true);
        
        const response = await fetch(userRole ? `/api/users?userRole=${userRole}` : '/api/users');
        const data: ApiListResponse<UserResponseDTO> = await response.json();
        
        setUsers(data?.data || []);
        setIsLoading(true);
      } catch {
      } finally {
        setIsRevalidating(false);
      }
    };
    
    void fetchRewardEvents();
  }, [ address ]);
  
  return {
    users,
    isLoading,
    isRevalidating,
  };
};
