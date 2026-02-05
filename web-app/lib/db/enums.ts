// Client-safe enums - these mirror Prisma enums but can be imported in client components

export const EventType = {
  LANDING_PAGE_VIEW: 'LANDING_PAGE_VIEW',
  VIEW_ITEM: 'VIEW_ITEM',
  ADD_TO_CART: 'ADD_TO_CART',
  CHECKOUT: 'CHECKOUT',
  PURCHASE_SUCCESS: 'PURCHASE_SUCCESS',
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

export const SelectorEventType = {
  ONCLICK: 'ONCLICK',
  HOVER: 'HOVER',
  DOUBLE_CLICK: 'DOUBLE_CLICK',
} as const;

export type SelectorEventType = (typeof SelectorEventType)[keyof typeof SelectorEventType];

export const CampaignStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DEPLETED: 'DEPLETED',
  DELETED: 'DELETED',
} as const;

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus];
