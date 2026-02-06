import { useWallet } from '@/contexts/wallet-context';
import { InfluencerVerificationStatus } from '@/lib/db/enums';
import { UserProfile } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export const useProfile = () => {
  
  const { address, isConnected } = useWallet();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isValidating, setIsValidating ] = useState(false);
  const [ profile, setProfile ] = useState<UserProfile>({
    id: '',
    walletAddress: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '',
    interests: [],
    affinities: [],
    socialMedias: [],
    influencerVerification: InfluencerVerificationStatus.NONE,
    budgetSpent: 0,
    _count: { participations: 0, campaignsCreated: 0 },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [ error, setError ] = useState<string | null>(null);
  const [ trigger, setTrigger ] = useState(0);
  
  const fetchProfile = useCallback(async () => {
    if (!address) {
      return;
    }
    
    try {
      setIsValidating(true);
      setError(null);
      const response = await fetch(`/api/users/profile?walletAddress=${address}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to fetch profile');
      }
      
      const user = data.data as UserProfile;
      setProfile(user);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsValidating(false);
    }
  }, [ address ]);
  
  useEffect(() => {
    if (isConnected && address) {
      void fetchProfile();
    }
  }, [ isConnected, address, fetchProfile, trigger ]);
  
  return {
    profile,
    error,
    isLoading,
    isValidating,
    reload: useCallback(() => setTrigger(Date.now()), []),
  };
};
