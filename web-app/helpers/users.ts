import { InfluencerVerificationStatus } from '@/lib/db/enums';
import { UserResponseDTO } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUserResponseDTO = (user: any): UserResponseDTO => {
  return {
    id: user?.id || '',
    name: user?.name || '',
    walletAddress: user?.walletAddress || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    interests: user?.interests || [],
    affinities: user?.affinities || [],
    influencerVerification: user?.influencerVerification === InfluencerVerificationStatus.VERIFIED,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socialMedias: (Array.isArray(user?.socialMedias) ? user?.socialMedias : []).map((sm: any) => ({
      platform: sm?.platform || '',
      username: sm?.username || '',
      followers: sm?.followers || 0,
      url: sm?.url || '',
    })),
  };
};
