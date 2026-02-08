import { SiteEventType } from '@/lib/db/enums';
import { SelectorDTO } from '@/types/campaign.dto';

export interface SiteEventDTO {
  id: string;
  name: string;
  eventType: SiteEventType;
  selectors: SelectorDTO[];
}
