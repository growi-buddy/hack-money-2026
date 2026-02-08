import { SelectorEventType, SiteEventType } from '@/lib/db/enums';
import { z } from 'zod';

const SelectorSchema = z.object({
  selector: z.string().min(1, 'Selector cannot be empty'),
  eventType: z.nativeEnum(SelectorEventType),
  isActive: z.boolean().optional().default(true),
});

export const UpsertSiteEventSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  eventType: z.nativeEnum(SiteEventType),
  selectors: z.array(SelectorSchema).min(1, 'At least one selector is required'),
});

export type UpsertSiteEventInput = z.infer<typeof UpsertSiteEventSchema>;

export const UpsertSiteSchema = z.object({
  name: z.string().min(1, 'Site name is required'),
  url: z.string().url('Must be a valid URL'),
  description: z.string(),
});

export type UpsertSiteInput = z.infer<typeof UpsertSiteSchema>;

export interface SiteEventSelectorDTO {
  selector: string
  eventType: SelectorEventType,
  isActive: boolean
  
  id: string,
  createdAt: number,
  updatedAt: number,
}

export interface SiteEventResponseDTO {
  name: string,
  eventType: SiteEventType,
  selectors: SiteEventSelectorDTO[],
  
  id: string,
  createdAt: number,
  updatedAt: number,
}

export interface SiteResponseDTO {
  name: string;
  url: string;
  description: string,
  events: SiteEventResponseDTO[]
  
  id: string,
  createdAt: number,
  updatedAt: number,
}
