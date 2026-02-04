import { CampaignStatus, EventType, SelectorEventType } from '@/lib/db/prisma/generated';
import { z } from 'zod';

export const EventTypeEnum = z.enum(Object.values(EventType));

export const SelectorEventTypeEnum = z.enum(Object.values(SelectorEventType));

export const SelectorSchema = z.object({
  id: z.string().cuid().optional(),
  selector: z.string().min(1, 'Selector cannot be empty'),
  eventType: SelectorEventTypeEnum,
  isActive: z.boolean().optional().default(true),
});

export const RewardEventSchema = z.object({
  id: z.string().cuid().optional(),
  eventType: EventTypeEnum,
  amount: z.number().positive('Amount must be greater than 0'),
  volumeStep: z.number().int().positive().optional().default(1),
  selectors: z.array(SelectorSchema).optional().default([]),
});

export type RewardEventInput = z.infer<typeof RewardEventSchema>;

export const CreateCampaignDTO = z.object({
  ownerId: z.string().cuid2(),
  title: z.string().min(3),
  escrowAddress: z.string().startsWith('0x'),
  budgetTotal: z.number().positive(),
  rewardEvents: z.array(RewardEventSchema).min(1),
});

export type CreateCampaignInput = z.infer<typeof CreateCampaignDTO>;

export const CreateLinkDTO = z.object({
  participationId: z.string().cuid(),
  url: z.string().url(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export const UpdateCampaignDTO = CreateCampaignDTO.extend({
  status: z.enum(Object.values(CampaignStatus)).optional(),
});

export type UpdateCampaignInput = z.infer<typeof UpdateCampaignDTO>;

export type SelectorDTO = z.infer<typeof SelectorSchema>;

export type RewardEventDTO = z.infer<typeof RewardEventSchema>;

export const UpdateCampaignRewardEventsSchema = z.object({
  campaignId: z.string().cuid('Invalid campaign ID'),
  rewardEvents: z.array(RewardEventSchema).min(1, 'At least one reward event is required'),
});

export type UpdateCampaignRewardEventsDTO = z.infer<typeof UpdateCampaignRewardEventsSchema>;

export const CampaignRewardEventsSchema = z.object({
  campaignId: z.string(),
  rewardEvents: z.array(RewardEventSchema),
});

export type CampaignRewardEventsDTO = z.infer<typeof CampaignRewardEventsSchema>;
