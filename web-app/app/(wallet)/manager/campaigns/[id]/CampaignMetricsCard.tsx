import { SITE_EVENT_TYPE_ICONS } from '@/app/(wallet)/manager/campaigns/[id]/site-event-icons';
import { CampaignDashboardData } from '@/app/api/campaigns/services';
import { MetricCard } from '@/components/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { staggerContainer } from '@/lib/animations';
import { SITE_EVENT_FUNNEL_COLOR, SITE_EVENT_TYPE_LABELS, SITE_EVENT_TYPE_ORDER } from '@/lib/constants';
import { SiteEventType } from '@/lib/db/enums';
import { CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
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

function aggregateEventsByType(rewardEvents: CampaignDashboardData['rewardEvents']) {
  const aggregated = rewardEvents.reduce((acc, event) => {
    if (!acc[event.eventType]) {
      acc[event.eventType] = { count: 0, amount: 0 };
    }
    acc[event.eventType].count += event.trackedEventsCount;
    acc[event.eventType].amount += event.amount;
    return acc;
  }, {} as Record<SiteEventType, { count: number; amount: number }>);
  
  return SITE_EVENT_TYPE_ORDER.map(type => ({
    eventType: type,
    label: SITE_EVENT_TYPE_LABELS[type],
    icon: SITE_EVENT_TYPE_ICONS[type],
    count: aggregated[type]?.count ?? 0,
    amount: aggregated[type]?.amount ?? 0,
    color: SITE_EVENT_FUNNEL_COLOR[type],
  })).filter(e => e.count > 0 || rewardEvents.some(re => re.eventType === e.eventType));
}

export const CampaignMetricsCard = ({ campaign }: { campaign: CampaignResponseDTO }) => {
  
  const [ activeTab, setActiveTab ] = useState('overview');
  
  const metrics = useMemo(() => {
    if (!campaign) return [];
    return aggregateEventsByType([]);
  }, [ campaign ]);
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
  
  return (
    <>
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
    </>
  );
};
