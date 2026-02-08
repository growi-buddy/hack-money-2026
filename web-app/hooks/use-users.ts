import { useWallet } from '@/contexts/wallet-context';
import { ApiListResponse, UserResponseDTO, UserRoleType } from '@/types';
import { useEffect, useState } from 'react';

export const useUsers = (userRole?: UserRoleType) => {
  
  const { address } = useWallet();
  const [ users, setUsers ] = useState<Array<UserResponseDTO>>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState('');
  const [ isRevalidating, setIsRevalidating ] = useState(false);
  
  useEffect(() => {
    const fetchRewardEvents = async () => {
      if (!address) {
        setUsers([]);
        setError('');
        setIsRevalidating(false);
        return;
      }
      
      try {
        setError('');
        setIsRevalidating(true);
        
        const response = await fetch(userRole ? `/api/users?userRole=${userRole}` : '/api/users');
        const data: ApiListResponse<UserResponseDTO> = await response.json();
        
        setUsers(data?.data || []);
        setIsLoading(true);
      } catch (error) {
        setError((error as Error)?.message || 'Something went wrong when get users');
      } finally {
        setIsRevalidating(false);
      }
    };
    
    void fetchRewardEvents();
  }, [ address, userRole ]);
  
  return {
    users,
    error,
    isLoading,
    isRevalidating,
  };
};
