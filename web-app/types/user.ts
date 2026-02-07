export type UserRoleType = 'manager' | 'influencer';

export type CampaignUserRole = 'manager' | 'influencer' | 'guest';

export interface UserResponseDTO {
  id: string,
  name: string,
  walletAddress: string,
}
