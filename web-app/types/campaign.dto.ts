import { CampaignStatus, SelectorEventType, SiteEventType } from '@/lib/db/enums';
import { CampaignUserRole } from '@/types/user';
import { BasicUserResponseDTO } from '@/types/user.dto';
import { z } from 'zod';

export const EventTypeEnum = z.nativeEnum(SiteEventType);

export const SelectorEventTypeEnum = z.nativeEnum(SelectorEventType);

export const SelectorSchema = z.object({
  id: z.string().cuid().optional(),
  selector: z.string().min(1, 'Selector cannot be empty'),
  eventType: SelectorEventTypeEnum,
  isActive: z.boolean().optional().default(true),
});

// Schema for creating a standalone RewardEvent (template)
export const CreateRewardEventSchema = z.object({
  walletAddress: z.string(),
  name: z.string().min(1, 'Name is required'),
  eventType: EventTypeEnum,
  selectors: z.array(SelectorSchema).optional().default([]),
});

export type CreateRewardEventInput = z.infer<typeof CreateRewardEventSchema>;

// Schema for RewardEvent data (without amount/volumeStep)
export const RewardEventSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, 'Name is required'),
  eventType: EventTypeEnum,
  selectors: z.array(SelectorSchema).optional().default([]),
});

export type RewardEventInput = z.infer<typeof RewardEventSchema>;

// Schema for linking RewardEvent to Campaign with amount and volumeStep
export const CampaignRewardEventSchema = z.object({
  id: z.string().cuid().optional(),
  siteEventId: z.string().cuid('Invalid site event ID'),
  amount: z.number().positive('Amount must be greater than 0'),
  volumeStep: z.number().int().positive().optional().default(1),
});

export type CampaignRewardEventInput = z.infer<typeof CampaignRewardEventSchema>;

export const CreateCampaignDTO = z.object({
  title: z.string(),
  description: z.string().optional(),
  budgetTotal: z.string().or(z.number()),
  slots: z.number().int().positive().optional().default(10),
  interests: z.array(z.string()).optional().default([]),
  demographics: z.array(z.string()).optional().default([]),
  regions: z.array(z.string()).optional().default([]),
  countries: z.array(z.string()).optional().default([]),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  siteEvents: z.array(CampaignRewardEventSchema),
});

export type CreateCampaignInput = z.infer<typeof CreateCampaignDTO>;

export const CreateLinkDTO = z.object({
  participationId: z.string().cuid(),
  url: z.string().url(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export const UpdateCampaignDTO = CreateCampaignDTO.partial().extend({
  status: z.nativeEnum(CampaignStatus).optional(),
  isHot: z.boolean().optional(),
});

export type UpdateCampaignInput = z.infer<typeof UpdateCampaignDTO>;

export type  SelectorDTO = z.infer<typeof SelectorSchema>;

export type RewardEventDTO = z.infer<typeof RewardEventSchema>;

export type CampaignRewardEventDTO = z.infer<typeof CampaignRewardEventSchema>;

export const UpdateCampaignRewardEventsSchema = z.object({
  campaignId: z.string().cuid('Invalid campaign ID'),
  rewardEvents: z.array(CampaignRewardEventSchema).min(1, 'At least one reward event is required'),
});

export type UpdateCampaignRewardEventsDTO = z.infer<typeof UpdateCampaignRewardEventsSchema>;

export const CampaignRewardEventsSchema = z.object({
  campaignId: z.string(),
  rewardEvents: z.array(CampaignRewardEventSchema),
});

export type CampaignRewardEventsDTO = z.infer<typeof CampaignRewardEventsSchema>;

export interface TrackedSiteEventSummaryResponseDTO {
  siteEventType: SiteEventType,
  amount: number,
  volumeStep: number,
  trackedEventsCount: number,
}

export interface SiteWithEventsResponseDTO {
  id: string,
  name: string,
  url: string,
  description: string,
  trackedSiteEventsGroupedByType: TrackedSiteEventSummaryResponseDTO[],
}

export interface OwnerResponseDTO extends BasicUserResponseDTO {

}

export interface CampaignParticipantResponseDTO extends BasicUserResponseDTO {

}

export interface CampaignResponseDTO {
  title: string;
  description: string;
  status: CampaignStatus;
  budgetTotal: number;
  budgetSpent: number;
  isHot: boolean;
  slots: number;
  interests: string[];
  demographics: string[];
  regions: string[];
  countries: string[];
  startDate: number,
  endDate: number,
  sites: SiteWithEventsResponseDTO[];
  participants: CampaignParticipantResponseDTO[];
  owner: OwnerResponseDTO;
  userRole: CampaignUserRole,
  
  id: string;
  createdAt: number,
  updatedAt: number,
  isDeleted: boolean,
}

export interface InfluencerCampaignSummaryResponseDTO extends CampaignResponseDTO {
  participationId: string,
}
