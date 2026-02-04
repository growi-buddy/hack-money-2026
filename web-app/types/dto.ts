import { CampaignStatus, EventType } from '@/lib/db/prisma/generated/enums';
import { z } from 'zod';

export type ApiDataResponse<T = never> = {
  success: true;
  data: T;
};

export type ApiListResponse<T = never> = {
  success: true;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

const PayoutRateSchema = z.object({
  eventType: z.enum(Object.values(EventType)),
  amount: z.number().positive(),
  volumeStep: z.number().int().min(1).default(1),
});

export const CreateCampaignDTO = z.object({
  brandId: z.string().cuid2(),
  title: z.string().min(3),
  escrowAddress: z.string().startsWith('0x'),
  budgetTotal: z.number().positive(),
  payoutRates: z.array(PayoutRateSchema).min(1),
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
