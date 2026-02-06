'use client';

import { CampaignDashboardData } from '@/app/api/campaigns/services';
import { MetricCard } from '@/components/metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus, EventType } from '@/lib/db/prisma/generated';
import { useRealtimeStore } from '@/store/realtime-store';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  Loader2,
  MessageSquare,
  Package,
  Radio,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Type for live tracked events from WebSocket
interface LiveTrackedEvent {
  id: string;
  eventType: EventType;
  eventName: string;
  amount: number;
  timestamp: string;
  data?: Record<string, unknown>;
}

// Event type order and labels
const EVENT_TYPE_ORDER: EventType[] = [
  EventType.LANDING_PAGE_VIEW,
  EventType.VIEW_ITEM,
  EventType.ADD_TO_CART,
  EventType.CHECKOUT,
  EventType.PURCHASE_SUCCESS,
];

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: 'Landing Page Views',
  [EventType.VIEW_ITEM]: 'View Items',
  [EventType.ADD_TO_CART]: 'Add to Cart',
  [EventType.CHECKOUT]: 'Checkout',
  [EventType.PURCHASE_SUCCESS]: 'Purchases',
};

const EVENT_TYPE_ICONS: Record<EventType, React.ReactNode> = {
  [EventType.LANDING_PAGE_VIEW]: <Eye className="h-5 w-5" />,
  [EventType.VIEW_ITEM]: <Package className="h-5 w-5" />,
  [EventType.ADD_TO_CART]: <ShoppingCart className="h-5 w-5" />,
  [EventType.CHECKOUT]: <CreditCard className="h-5 w-5" />,
  [EventType.PURCHASE_SUCCESS]: <DollarSign className="h-5 w-5" />,
};

const FUNNEL_COLORS: Record<EventType, string> = {
  [EventType.LANDING_PAGE_VIEW]: '#4A90E2',
  [EventType.VIEW_ITEM]: '#60a5fa',
  [EventType.ADD_TO_CART]: '#FFB347',
  [EventType.CHECKOUT]: '#9ACD32',
  [EventType.PURCHASE_SUCCESS]: '#34d399',
};

const STATUS_STYLES: Record<CampaignStatus, { bg: string; text: string }> = {
  [CampaignStatus.ACTIVE]: { bg: 'bg-growi-success/20', text: 'text-growi-success' },
  [CampaignStatus.PAUSED]: { bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
  [CampaignStatus.DRAFT]: { bg: 'bg-gray-500/20', text: 'text-gray-500' },
  [CampaignStatus.DEPLETED]: { bg: 'bg-amber-500/20', text: 'text-amber-500' },
  [CampaignStatus.COMPLETED]: { bg: 'bg-growi-blue/20', text: 'text-growi-blue' },
  [CampaignStatus.DELETED]: { bg: 'bg-red-500/20', text: 'text-red-500' },
};

// Helper to aggregate reward events by type
function aggregateEventsByType(rewardEvents: CampaignDashboardData['rewardEvents']) {
  const aggregated = rewardEvents.reduce((acc, event) => {
    if (!acc[event.eventType]) {
      acc[event.eventType] = { count: 0, amount: 0 };
    }
    acc[event.eventType].count += event.trackedEventsCount;
    acc[event.eventType].amount += event.amount;
    return acc;
  }, {} as Record<EventType, { count: number; amount: number }>);
  
  return EVENT_TYPE_ORDER.map(type => ({
    eventType: type,
    label: EVENT_TYPE_LABELS[type],
    icon: EVENT_TYPE_ICONS[type],
    count: aggregated[type]?.count ?? 0,
    amount: aggregated[type]?.amount ?? 0,
    color: FUNNEL_COLORS[type],
  })).filter(e => e.count > 0 || rewardEvents.some(re => re.eventType === e.eventType));
}

export default function CampaignDashboardPage() {
  const params = useParams();
  const campaignId = params.id as string;
  
  const [ campaign, setCampaign ] = useState<CampaignDashboardData | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ activeTab, setActiveTab ] = useState('overview');
  const [ showRatingModal, setShowRatingModal ] = useState(false);
  const [ selectedInfluencer, setSelectedInfluencer ] = useState<CampaignDashboardData['participations'][0] | null>(null);
  const [ rating, setRating ] = useState(0);
  const [ hoverRating, setHoverRating ] = useState(0);
  const [ review, setReview ] = useState('');
  const [ ratingSubmitted, setRatingSubmitted ] = useState(false);
  
  // Live events from WebSocket
  const [ liveEvents, setLiveEvents ] = useState<LiveTrackedEvent[]>([]);
  const connectionState = useRealtimeStore((state) => state.connectionState);
  
  // Handle new tracked event from WebSocket
  const handleTrackedEvent = useCallback((event: LiveTrackedEvent) => {
    setLiveEvents((prev) => [ event, ...prev ].slice(0, 20)); // Keep last 20 events
  }, []);
  
  // Subscribe to campaign tracked events
  const { isSubscribed } = useRealtimeSubscription<LiveTrackedEvent>(
    `campaign:${campaignId}`,
    'tracked_event',
    handleTrackedEvent,
    { enabled: !!campaignId, autoConnect: true },
  );
  
  // Fetch campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/campaigns/${campaignId}?dashboard=true`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch campaign');
        }
        
        setCampaign(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (campaignId) {
      fetchCampaign();
    }
  }, [ campaignId ]);
  
  // Aggregated metrics
  const metrics = useMemo(() => {
    if (!campaign) return [];
    return aggregateEventsByType(campaign.rewardEvents);
  }, [ campaign ]);
  
  // Funnel data for charts
  const funnelData = useMemo(() => {
    return metrics.map(m => ({
      name: m.label,
      value: m.count,
      color: m.color,
    }));
  }, [ metrics ]);
  
  // Timeline data (placeholder - would need actual time-series data from backend)
  const timelineData = useMemo(() => {
    // For now, create a simple distribution based on total counts
    const dates = [ 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7' ];
    return dates.map((date, i) => {
      const factor = (i + 1) / 7;
      const result: Record<string, string | number> = { date };
      metrics.forEach(m => {
        result[m.eventType] = Math.round(m.count * factor * (0.8 + Math.random() * 0.4));
      });
      return result;
    });
  }, [ metrics ]);
  
  const handleRateInfluencer = (influencer: CampaignDashboardData['participations'][0]) => {
    setSelectedInfluencer(influencer);
    setShowRatingModal(true);
    setRating(0);
    setHoverRating(0);
    setReview('');
    setRatingSubmitted(false);
  };
  
  const handleSubmitRating = () => {
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
    }, 1500);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
      </div>
    );
  }
  
  // Error state
  if (error || !campaign) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-destructive">{error || 'Campaign not found'}</p>
          <Link href="/client">
            <Button variant="outline" className="mt-4">
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  const statusStyle = STATUS_STYLES[campaign.status];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaign Dashboard</h1>
          <p className="text-muted-foreground">{campaign.title}</p>
        </div>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg}`}>
            {campaign.status}
          </Badge>
          <Badge variant="outline" className="border-growi-blue/50 text-growi-blue">
            Budget: ${campaign.budgetTotal.toLocaleString()}
          </Badge>
          {campaign.status === CampaignStatus.DRAFT && (
            <Link href={`/manager/campaigns/${campaignId}/edit`}>
              <Button
                variant="outline"
                size="sm"
                className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* Campaign Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Description */}
            {campaign.description && (
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                <p className="text-foreground text-sm leading-relaxed">{campaign.description}</p>
              </div>
            )}

            {/* Duration */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
              </div>
              <div className="text-sm text-foreground">
                {campaign.startDate && campaign.endDate ? (
                  <>
                    <p>{new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} → {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">Not specified</p>
                )}
              </div>
            </div>

            {/* Budget & Slots */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-growi-money" />
                <h4 className="text-sm font-medium text-muted-foreground">Budget & Slots</h4>
              </div>
              <div className="text-sm text-foreground space-y-1">
                <p>Budget: <span className="font-semibold">${campaign.budgetTotal.toLocaleString()}</span></p>
                <p>Slots: <span className="font-semibold">{campaign.slots}</span></p>
              </div>
            </div>

            {/* Interests */}
            {campaign.interests.length > 0 && (
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-growi-blue" />
                  <h4 className="text-sm font-medium text-muted-foreground">Interests</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {campaign.interests.map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Target Demographics */}
            {campaign.demographics.length > 0 && (
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-growi-blue" />
                  <h4 className="text-sm font-medium text-muted-foreground">Target Demographics</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {campaign.demographics.map((demographic) => (
                    <Badge
                      key={demographic}
                      className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                    >
                      {demographic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Geographic */}
            {(campaign.regions.length > 0 || campaign.countries.length > 0) && (
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-growi-blue" />
                  <h4 className="text-sm font-medium text-muted-foreground">Geographic</h4>
                </div>
                <div className="space-y-2">
                  {campaign.regions.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Regions</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.regions.map((region) => (
                          <Badge
                            key={region}
                            className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                          >
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {campaign.countries.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Countries</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.countries.map((country) => (
                          <Badge
                            key={country}
                            className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                          >
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metrics - All Event Types */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {metrics.map((metric) => (
          <MetricCard
            key={metric.eventType}
            title={metric.label}
            value={metric.count}
            icon={metric.icon}
          />
        ))}
        <MetricCard
          title="Budget Spent"
          value={campaign.budgetSpent}
          prefix="$"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </motion.div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="funnel">Funnel</TabsTrigger>
        </TabsList>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <defs>
                        {metrics.map((m) => (
                          <linearGradient key={m.eventType} id={`color-${m.eventType}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#f1f5f9' }}
                      />
                      {metrics.slice(0, 1).map((m) => (
                        <Area
                          key={m.eventType}
                          type="monotone"
                          dataKey={m.eventType}
                          stroke={m.color}
                          fillOpacity={1}
                          fill={`url(#color-${m.eventType})`}
                          strokeWidth={2}
                          name={m.label}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#f1f5f9' }}
                      />
                      {metrics.map((m) => (
                        <Bar
                          key={m.eventType}
                          dataKey={m.eventType}
                          fill={m.color}
                          name={m.label}
                          radius={[ 2, 2, 0, 0 ]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {metrics.map((m) => (
                    <div key={m.eventType} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: m.color }} />
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="funnel" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  <div className="h-[300px] flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={funnelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {funnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: '#f1f5f9' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-4">
                    {funnelData.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">{item.name}</span>
                            <span className="font-medium text-foreground">{item.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
      
      {/* Influencer List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5 text-growi-blue" />
              Active Influencers
            </CardTitle>
            <Badge variant="outline">{campaign.participations.length} active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {campaign.participations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No influencers have joined this campaign yet</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-4 md:grid-cols-2"
            >
              {campaign.participations.map((participation) => {
                const isTopPerformer = participation.totalEvents > 100;
                const displayName = participation.influencer.name || `${participation.influencer.walletAddress.slice(0, 6)}...${participation.influencer.walletAddress.slice(-4)}`;
                
                return (
                  <motion.div
                    key={participation.id}
                    variants={staggerItem}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:border-growi-blue/50"
                  >
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-growi-blue/20 text-growi-blue font-semibold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      {isTopPerformer && (
                        <motion.div
                          animate={{
                            scale: [ 1, 1.1, 1 ],
                            rotate: [ 0, 5, -5, 0 ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute -right-1 -top-1"
                        >
                          <Badge className="bg-orange-500 px-1 py-0 text-[10px] text-white hover:bg-orange-600">
                            TOP
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{displayName}</h4>
                        {participation.totalEvents > 0 && (
                          <Badge className="bg-growi-blue/20 text-growi-blue text-xs">
                            {participation.totalEvents} events
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-growi-money">
                        Balance: ${participation.currentBalance.toLocaleString()}
                      </p>
                      {participation.events.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {participation.events.slice(0, 3).map((event) => (
                            <Badge
                              key={event.type}
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {EVENT_TYPE_LABELS[event.type].split(' ')[0]}: {event.count}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      {/* Live Transmissions */}
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
                {liveEvents.map((event) => (
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
                      style={{ backgroundColor: `${FUNNEL_COLORS[event.eventType]}20` }}
                    >
                      <span style={{ color: FUNNEL_COLORS[event.eventType] }}>
                        {EVENT_TYPE_ICONS[event.eventType]}
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
                          style={{ borderColor: FUNNEL_COLORS[event.eventType], color: FUNNEL_COLORS[event.eventType] }}
                        >
                          {EVENT_TYPE_LABELS[event.eventType].split(' ')[0]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-growi-money text-sm">
                        +${event.amount.toFixed(3)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Influencer</DialogTitle>
            <DialogDescription>
              Share your experience working
              with {selectedInfluencer?.influencer.name || selectedInfluencer?.influencer.walletAddress.slice(0, 10)}
            </DialogDescription>
          </DialogHeader>
          
          {ratingSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growi-success/20"
              >
                <Sparkles className="h-8 w-8 text-growi-success" />
              </motion.div>
              <p className="text-lg font-medium text-foreground">Thank You!</p>
              <p className="text-sm text-muted-foreground">Your review has been submitted</p>
            </motion.div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Selected Influencer Info */}
              {selectedInfluencer && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growi-blue/20 text-growi-blue font-semibold">
                    {(selectedInfluencer.influencer.name || selectedInfluencer.influencer.walletAddress).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedInfluencer.influencer.name || `${selectedInfluencer.influencer.walletAddress.slice(0, 6)}...${selectedInfluencer.influencer.walletAddress.slice(-4)}`}
                    </p>
                    <p className="text-sm text-muted-foreground">Balance:
                      ${selectedInfluencer.currentBalance.toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {/* Star Rating */}
              <div className="text-center">
                <p className="mb-3 text-sm font-medium text-foreground">Your Rating</p>
                <div className="flex justify-center gap-2">
                  {[ 1, 2, 3, 4, 5 ].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-growi-yellow text-growi-yellow'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-muted-foreground"
                  >
                    {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                  </motion.p>
                )}
              </div>
              
              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Review (Optional)</label>
                <Textarea
                  placeholder="Share your experience working with this influencer..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowRatingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-growi-blue text-white hover:bg-growi-blue/90"
                  disabled={rating === 0}
                  onClick={handleSubmitRating}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Link href="/manager/campaign/1/complete">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="outline"
            className="w-full border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
          >
            View Campaign Complete Screen (Demo)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </Link>
    </div>
  );
}
