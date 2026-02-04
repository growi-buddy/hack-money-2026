import { z } from 'zod';

export const CampaignFormDataSchema = z.object({
  // Información básica
  name: z.string().optional(),
  description: z.string().optional(),
  
  // Duración
  duration: z.number().optional(), // en días
  startDate: z.string().optional(), // ISO date
  endDate: z.string().optional(), // ISO date
  
  // Público objetivo
  targetAudience: z.object({
    gender: z.array(z.enum(['male', 'female', 'non-binary', 'all'])).optional(),
    ageMin: z.number().optional(),
    ageMax: z.number().optional(),
  }).optional(),
  
  // Geográfico
  geographic: z.object({
    regions: z.array(z.string()).optional(), // ej: ['North America', 'Europe']
    countries: z.array(z.string()).optional(), // ej: ['US', 'CA', 'MX']
  }).optional(),
  
  // Intereses y afinidades
  interests: z.array(z.string()).optional(), // tags
  
  // Budget
  budget: z.number().optional(),
  
  // Rewards
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
});

export type CampaignFormData = z.infer<typeof CampaignFormDataSchema>;
