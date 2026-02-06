import { InfluencerVerificationStatus, SocialMediaPlatform } from '@/lib/db/enums';

export interface SocialMedia {
  id: string;
  platform: SocialMediaPlatform;
  username: string;
  followers: string;
  url: string;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  avatar: string | null;
  interests: string[];
  affinities: string[];
  socialMedias: SocialMedia[];
  influencerVerification?: InfluencerVerificationStatus;
  budgetSpent?: number; // For clients - total budget spent on campaigns
  _count?: {
    participations: number; // For influencers
    campaignsCreated?: number; // For clients
  };
  updatedAt: Date;
  createdAt: Date;
}
