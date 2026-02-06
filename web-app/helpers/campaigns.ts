import { EventType } from '@/lib/db/enums';
import { CampaignResponse } from '@/types';

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: 'Views',
  [EventType.VIEW_ITEM]: 'Items',
  [EventType.ADD_TO_CART]: 'Cart',
  [EventType.CHECKOUT]: 'Checkout',
  [EventType.PURCHASE_SUCCESS]: 'Sales',
};

const EVENT_TYPE_ORDER: EventType[] = [
  EventType.LANDING_PAGE_VIEW,
  EventType.VIEW_ITEM,
  EventType.ADD_TO_CART,
  EventType.CHECKOUT,
  EventType.PURCHASE_SUCCESS,
];

export function groupRewardEventsByType(rewardEvents: CampaignResponse['rewardEvents']) {
  const grouped = rewardEvents.reduce((acc, event) => {
    if (!acc[event.eventType]) {
      acc[event.eventType] = { trackedEventsCount: 0, totalAmount: 0 };
    }
    acc[event.eventType].trackedEventsCount += event.trackedEventsCount;
    acc[event.eventType].totalAmount += event.amount;
    return acc;
  }, {} as Record<EventType, { trackedEventsCount: number; totalAmount: number }>);
  
  return EVENT_TYPE_ORDER
    .filter(type => grouped[type])
    .map(type => ({
      eventType: type,
      label: EVENT_TYPE_LABELS[type],
      ...grouped[type],
    }));
}
