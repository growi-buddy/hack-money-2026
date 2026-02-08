import { SITE_EVENT_TYPE_ICONS } from '@/app/(wallet)/manager/campaigns/[id]/site-event-icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription';
import { SITE_EVENT_FUNNEL_COLOR, SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { SiteEventType } from '@/lib/db/enums';
import { useRealtimeStore } from '@/store/realtime-store';
import { CampaignResponseDTO } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Radio, Zap } from 'lucide-react';
import { useCallback, useState } from 'react';

interface LiveTrackedEvent {
  id: string;
  eventType: SiteEventType;
  eventName: string;
  amount: number;
  timestamp: string;
  data?: Record<string, unknown>;
}

export const CampaignLiveEventsCard = ({ campaign }: { campaign: CampaignResponseDTO }) => {
  
  const [ liveEvents, setLiveEvents ] = useState<LiveTrackedEvent[]>([]);
  const connectionState = useRealtimeStore((state) => state.connectionState);
  
  const handleTrackedEvent = useCallback((event: LiveTrackedEvent) => {
    console.log({ event });
    setLiveEvents((prev) => [ event, ...prev ].slice(0, 20)); // Keep last 20 events
  }, []);
  
  const { isSubscribed } = useRealtimeSubscription<LiveTrackedEvent>(
    `campaign:${campaign.id}`,
    'tracked_event',
    handleTrackedEvent,
    { enabled: !!campaign.id, autoConnect: true },
  );
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Radio className="h-5 w-5 text-growi-blue" />
            Live Transmissions
            {isSubscribed && (
              <motion.div
                animate={{ scale: [ 1, 1.2, 1 ] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-growi-success"
              />
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                connectionState === 'connected'
                  ? 'border-growi-success/50 text-growi-success'
                  : connectionState === 'connecting'
                    ? 'border-yellow-500/50 text-yellow-500'
                    : 'border-muted-foreground/50 text-muted-foreground'
              }
            >
              {connectionState === 'connected' ? '● Live' : connectionState === 'connecting' ? '● Connecting...' : '○ Offline'}
            </Badge>
            <Badge variant="outline">{liveEvents.length} events</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {liveEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Zap className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">
                {isSubscribed ? 'Waiting for live events...' : 'Connect to see live events'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Events will appear here in real-time as they happen
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {liveEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${SITE_EVENT_TYPE_LABELS[event.eventType]}20` }}
                  >
                    <span style={{ color: SITE_EVENT_TYPE_LABELS[event.eventType] }}>
                      {SITE_EVENT_TYPE_ICONS[event.eventType]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground text-sm truncate">
                        {event.eventName}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                        style={{
                          borderColor: SITE_EVENT_FUNNEL_COLOR[event.eventType],
                          color: SITE_EVENT_FUNNEL_COLOR[event.eventType],
                        }}
                      >
                        {SITE_EVENT_TYPE_LABELS[event.eventType].split(' ')[0]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <motion.div
                    initial={index === 0 ? { scale: 1.5 } : {}}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <p className={`font-semibold ${index === 0 ? 'text-growi-money' : 'text-foreground'}`}>
                      +${event.amount.toFixed(4)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
