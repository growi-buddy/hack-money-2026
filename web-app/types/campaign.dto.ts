import { CampaignStatus, EventType, SelectorEventType } from '@/lib/db/enums';
import { z } from 'zod';

export const EventTypeEnum = z.nativeEnum(EventType);

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
  rewardEventId: z.string().cuid('Invalid reward event ID'),
  amount: z.number().positive('Amount must be greater than 0'),
  volumeStep: z.number().int().positive().optional().default(1),
});

export type CampaignRewardEventInput = z.infer<typeof CampaignRewardEventSchema>;

export const CreateCampaignDTO = z.object({
  walletAddress: z.string(),
  title: z.string(),
  budgetTotal: z.string().or(z.number()),
  rewardEvents: z.array(CampaignRewardEventSchema),
});

export type CreateCampaignInput = z.infer<typeof CreateCampaignDTO>;

export const CreateLinkDTO = z.object({
  participationId: z.string().cuid(),
  url: z.string().url(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export const UpdateCampaignDTO = CreateCampaignDTO.extend({
  status: z.nativeEnum(CampaignStatus).optional(),
});

export type UpdateCampaignInput = z.infer<typeof UpdateCampaignDTO>;

export type SelectorDTO = z.infer<typeof SelectorSchema>;

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

// Schema for reward event summary with tracked events count
export const RewardEventSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  eventType: EventTypeEnum,
  amount: z.number(),
  volumeStep: z.number(),
  trackedEventsCount: z.number(),
});

export type RewardEventSummary = z.infer<typeof RewardEventSummarySchema>;

// Schema for campaign summary (used in dashboard)
export const CampaignSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.nativeEnum(CampaignStatus),
  budgetTotal: z.number(),
  budgetSpent: z.number(),
  rewardEvents: z.array(RewardEventSummarySchema),
  participationsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CampaignSummary = z.infer<typeof CampaignSummarySchema>;

// Schema for user campaigns list response
export const UserCampaignsResponseSchema = z.object({
  campaigns: z.array(CampaignSummarySchema),
  total: z.number(),
})

export type UserCampaignsResponse = z.infer<typeof UserCampaignsResponseSchema>;
