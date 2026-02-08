import { InfluencerVerificationStatus } from '@/lib/db/enums';
import { z } from 'zod';

export const CreateUserDTO = z.object({
  walletAddress: z.string().startsWith('0x').length(42),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const UpdateUserDTO = CreateUserDTO.partial().extend({
  influencerVerification: z.nativeEnum(InfluencerVerificationStatus).optional(),
});

export interface BasicUserResponseDTO {
  id: string,
  name: string,
  walletAddress: string,
  avatar: string,
}

export interface UserResponseDTO extends BasicUserResponseDTO {
  email: string,
  phone: string,
  location: string,
  bio: string,
  avatar: string
  interests: string[],
  affinities: string[],
  influencerVerification: boolean,
  influencerVerificationStatus: string,
  socialMedias: {
    platform: string,
    username: string,
    followers: number,
    url: string,
  }[]
}
