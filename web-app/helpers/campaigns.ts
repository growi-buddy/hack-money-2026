import { SITE_EVENT_TYPE_ORDER } from '@/lib/constants';
import { SiteEventType } from '@/lib/db/enums';
import { CampaignResponseDTO, TrackedSiteEventSummaryResponseDTO } from '@/types';

export function groupTrackedEventsByType(sites: CampaignResponseDTO['sites']) {
  const allTrackedEvents: TrackedSiteEventSummaryResponseDTO[] = sites.flatMap(site => site.trackedSiteEventsGroupedByType);
  
  const grouped = allTrackedEvents.reduce((acc, event) => {
    if (!acc[event.siteEventType]) {
      acc[event.siteEventType] = { trackedEventsCount: 0, totalAmount: 0 };
    }
    acc[event.siteEventType].trackedEventsCount += event.trackedEventsCount;
    acc[event.siteEventType].totalAmount += event.amount;
    return acc;
  }, {} as Record<SiteEventType, { trackedEventsCount: number; totalAmount: number }>);
  
  return SITE_EVENT_TYPE_ORDER
    .filter(type => grouped[type])
    .map(type => ({
      eventType: type,
      ...grouped[type],
    }));
}
