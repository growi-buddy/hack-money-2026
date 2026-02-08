import { z } from 'zod';

export const CampaignFormDataSchema = z.object({
  // Información básica
  name: z.string().optional(),
  description: z.string().optional(),
  
  // Duración
  startDate: z.string().optional(), // ISO date
  endDate: z.string().optional(), // ISO date
  
  // Público objetivo
  demographics: z.array(z.string()).optional(), // ej: ['Gen Z', 'Millennials']
  
  // Geográfico
  geographic: z.object({
    regions: z.array(z.string()).optional(), // ej: ['North America', 'Europe']
    countries: z.array(z.string()).optional(), // ej: ['US', 'CA', 'MX']
  }).optional(),
  
  // Intereses y afinidades
  interests: z.array(z.string()).optional(), // tags
  
  // Budget
  budget: z.number().optional(),
  
  // Slots - number of influencers that can join
  slots: z.number().int().positive().optional(),
  
  // Legacy rewards (deprecated - use selectedRewardEvents instead)
  rewards: z.object({
    landingPageView: z.object({
      enabled: z.boolean().optional(),
      pricePerView: z.number().optional(),
    }).optional(),
    itemView: z.object({
      enabled: z.boolean().optional(),
      pricePerClick: z.number().optional(),
    }).optional(),
    addToCart: z.object({
      enabled: z.boolean().optional(),
      pricePerClick: z.number().optional(),
    }).optional(),
    checkout: z.object({
      enabled: z.boolean().optional(),
      pricePerClick: z.number().optional(),
    }).optional(),
    thankYouView: z.object({
      enabled: z.boolean().optional(),
      pricePerView: z.number().optional(),
    }).optional(),
  }).optional(),
  
  // Selected reward events to link with the campaign
  selectedRewardEvents: z.array(z.object({
    rewardEventId: z.string(),
    amount: z.number().positive(),
    volumeStep: z.number().int().positive().optional(),
  })).optional(),
});

export type CampaignFormData = z.infer<typeof CampaignFormDataSchema>;
