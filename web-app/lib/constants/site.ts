import { SelectorEventType, SiteEventType } from '@/lib/db/enums';

export const SITE_EVENT_FUNNEL_COLOR: Record<SiteEventType, string> = {
  [SiteEventType.LANDING_PAGE_VIEW]: '#4A90E2',
  [SiteEventType.VIEW_ITEM]: '#60a5fa',
  [SiteEventType.ADD_TO_CART]: '#FFB347',
  [SiteEventType.CHECKOUT]: '#9ACD32',
  [SiteEventType.PURCHASE_SUCCESS]: '#34d399',
};

export const SITE_EVENT_TYPE_ORDER: SiteEventType[] = [
  SiteEventType.LANDING_PAGE_VIEW,
  SiteEventType.VIEW_ITEM,
  SiteEventType.ADD_TO_CART,
  SiteEventType.CHECKOUT,
  SiteEventType.PURCHASE_SUCCESS,
];

export const SITE_EVENT_TYPE_LABELS: Record<SiteEventType, string> = {
  [SiteEventType.LANDING_PAGE_VIEW]: 'Landing Page View',
  [SiteEventType.VIEW_ITEM]: 'View Item',
  [SiteEventType.ADD_TO_CART]: 'Add to Cart',
  [SiteEventType.CHECKOUT]: 'Checkout',
  [SiteEventType.PURCHASE_SUCCESS]: 'Purchase Success',
};

export const SITE_EVENT_TYPE_SHORT_LABELS: Record<SiteEventType, string> = {
  [SiteEventType.LANDING_PAGE_VIEW]: 'Views',
  [SiteEventType.VIEW_ITEM]: 'Items',
  [SiteEventType.ADD_TO_CART]: 'Cart',
  [SiteEventType.CHECKOUT]: 'Checkout',
  [SiteEventType.PURCHASE_SUCCESS]: 'Sales',
};

export const SELECTOR_SITE_EVENT_TYPE_LABELS: Record<SelectorEventType, string> = {
  [SelectorEventType.ONCLICK]: 'Click',
  [SelectorEventType.HOVER]: 'Hover',
  [SelectorEventType.DOUBLE_CLICK]: 'Double Click',
};
