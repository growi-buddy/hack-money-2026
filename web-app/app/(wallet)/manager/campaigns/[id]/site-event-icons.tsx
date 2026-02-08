import { SiteEventType } from '@/lib/db/enums';
import { CreditCard, DollarSign, Eye, Package, ShoppingCart } from 'lucide-react';
import { ReactNode } from 'react';

export const SITE_EVENT_TYPE_ICONS: Record<SiteEventType, ReactNode> = {
  [SiteEventType.LANDING_PAGE_VIEW]: <Eye className="h-5 w-5" />,
  [SiteEventType.VIEW_ITEM]: <Package className="h-5 w-5" />,
  [SiteEventType.ADD_TO_CART]: <ShoppingCart className="h-5 w-5" />,
  [SiteEventType.CHECKOUT]: <CreditCard className="h-5 w-5" />,
  [SiteEventType.PURCHASE_SUCCESS]: <DollarSign className="h-5 w-5" />,
};
