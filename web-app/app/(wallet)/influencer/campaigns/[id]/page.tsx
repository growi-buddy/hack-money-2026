'use client';

import { CampaignInfoCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignInfoCard';
import { CampaignLiveEventsCard } from '@/app/(wallet)/manager/campaigns/[id]/CampaignLiveEventsCard';
import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { useCampaign } from '@/hooks/use-campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { CampaignStatus, SiteEventType } from '@/lib/db/enums';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { CreditCard, DollarSign, Eye, Flame, Loader2, Package, QrCode, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

interface CampaignDetail {
  id: string;
  title: string;
  description: string | null;
  status: CampaignStatus;
  budgetTotal: number;
  isHot: boolean;
  slots: number;
  filledSlots: number;
  interests: string[];
  demographics: string[];
  regions: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
  owner: {
    id: string;
    name: string | null;
    walletAddress: string;
    avatar: string | null;
  };
  rewardEvents: {
    id: string;
    name: string;
    eventType: SiteEventType;
    amount: number;
    volumeStep: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Mock data for charts (will be replaced with real tracking data)
const timelineData = [
  { date: 'Feb 10', landingViews: 500, viewItems: 280, addToCart: 32, checkout: 12, purchases: 3, earnings: 15.50 },
  { date: 'Feb 11', landingViews: 1200, viewItems: 650, addToCart: 78, checkout: 29, purchases: 8, earnings: 42.30 },
  { date: 'Feb 12', landingViews: 1800, viewItems: 980, addToCart: 110, checkout: 42, purchases: 12, earnings: 58.20 },
  { date: 'Feb 13', landingViews: 2500, viewItems: 1350, addToCart: 160, checkout: 58, purchases: 18, earnings: 78.90 },
  {
    date: 'Feb 14',
    landingViews: 3500,
    viewItems: 1890,
    addToCart: 220,
    checkout: 81,
    purchases: 25,
    earnings: 105.40,
  },
  {
    date: 'Feb 15',
    landingViews: 4800,
    viewItems: 2600,
    addToCart: 310,
    checkout: 110,
    purchases: 35,
    earnings: 145.60,
  },
  {
    date: 'Feb 16',
    landingViews: 6200,
    viewItems: 3350,
    addToCart: 400,
    checkout: 145,
    purchases: 48,
    earnings: 185.70,
  },
];

const funnelData = [
  { name: 'Landing Views', value: 12500, color: '#4A90E2' },
  { name: 'View Items', value: 6750, color: '#60a5fa' },
  { name: 'Add to Cart', value: 850, color: '#FFB347' },
  { name: 'Checkout', value: 210, color: '#9ACD32' },
  { name: 'Purchase', value: 98, color: '#34d399' },
];

interface Transaction {
  id: string;
  type: 'view' | 'cart' | 'checkout';
  user: string;
  amount: number;
  timestamp: Date;
}

const initialTransactions: Transaction[] = [
  { id: '1', type: 'checkout', user: 'ALICE VERTE', amount: 12.50, timestamp: new Date() },
  { id: '2', type: 'view', user: 'BOB SMITH', amount: 0.01, timestamp: new Date(Date.now() - 5000) },
  { id: '3', type: 'cart', user: 'CHARLIE BROWN', amount: 0.05, timestamp: new Date(Date.now() - 12000) },
  { id: '4', type: 'view', user: 'DIANA ROSS', amount: 0.01, timestamp: new Date(Date.now() - 20000) },
  { id: '5', type: 'checkout', user: 'EVE WILSON', amount: 10.00, timestamp: new Date(Date.now() - 35000) },
];

const mockNames = [ 'ALEX JONES', 'MAYA PATEL', 'LUCAS CHEN', 'SOFIA GARCIA', 'NOAH WILLIAMS', 'EMMA JOHNSON' ];

function CountUpMoney({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return `$${latest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  });
  
  useEffect(() => {
    const controls = animate(count, value, {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    });
    return controls.stop;
  }, [ count, value ]);
  
  return <motion.span>{rounded}</motion.span>;
}

function formatDate(dateStr: string | number | null): string {
  if (!dateStr) return 'Not set';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCampaignDuration(startDate: string | number | null, endDate: string | number | null): string {
  if (!startDate || !endDate) return 'Ongoing';
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start.getTime() === end.getTime()) return 'Ongoing';
  const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return `${diffDays} days`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months`;
  return `${Math.ceil(diffDays / 365)} years`;
}

export default function InfluencerCampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  const [ earnings, setEarnings ] = useState(245.67);
  const [ transactions, setTransactions ] = useState<Transaction[]>(initialTransactions);
  const [ metrics, setMetrics ] = useState({
    landingViews: { count: 12500, earned: 87.50 },
    viewItems: { count: 6750, earned: 33.75 },
    addToCart: { count: 850, earned: 42.50 },
    checkout: { count: 210, earned: 21.00 },
    purchases: { count: 98, earned: 98.17 },
  });
  
  const { id } = use(params);
  const { campaign, error, isLoading } = useCampaign(id);
  
  // Simulate real-time transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('view' | 'cart' | 'checkout')[] = [ 'view', 'view', 'view', 'cart', 'checkout' ];
      const type = types[Math.floor(Math.random() * types.length)];
      const amounts = { view: 0.007, cart: 0.05, checkout: Math.random() * 15 + 5 };
      const amount = type === 'checkout' ? Number(amounts[type].toFixed(2)) : amounts[type];
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type,
        user: mockNames[Math.floor(Math.random() * mockNames.length)],
        amount,
        timestamp: new Date(),
      };
      
      setTransactions(prev => [ newTransaction, ...prev.slice(0, 9) ]);
      setEarnings(prev => Number((prev + amount).toFixed(2)));
      
      const metricKey = type === 'view' ? 'landingViews' : type === 'cart' ? 'addToCart' : 'purchases';
      setMetrics(prev => ({
        ...prev,
        [metricKey]: {
          count: prev[metricKey].count + 1,
          earned: Number((prev[metricKey].earned + amount).toFixed(2)),
        },
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'cart':
        return <ShoppingCart className="h-4 w-4" />;
      case 'checkout':
        return <DollarSign className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'view':
        return 'text-growi-blue';
      case 'cart':
        return 'text-growi-yellow';
      case 'checkout':
        return 'text-growi-success';
      default:
        return 'text-muted-foreground';
    }
  };
  
  if (isLoading || !campaign) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <BackButton href="/influencer/campaigns" label="Back to Campaigns" />
      
      <ErrorCard error={error} />
      
      {/* Campaign Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">{campaign.title}</h1>
            {campaign.owner.name && (
              <p className="text-sm text-muted-foreground">
                by {campaign.owner.name}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild size="sm" variant="outline">
              <Link href={`/influencer/campaigns/${campaign?.id}/qr`}>
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Link>
            </Button>
            <CampaignStatusBadge status={campaign.status} />
            {campaign.isHot && (
              <div className="p-1.5 rounded-full bg-amber-500/20" title="Hot Campaign">
                <Flame className="h-4 w-4 text-amber-600" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      <CampaignInfoCard campaign={campaign} withoutSiteEvents />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-growi-blue/30 bg-growi-blue/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Campaign Earnings</p>
            <motion.h1
              className="mt-2 text-5xl font-bold text-growi-blue md:text-6xl"
              key={earnings}
              animate={{ scale: [ 1, 1.02, 1 ] }}
              transition={{ duration: 0.3 }}
            >
              <CountUpMoney value={earnings} />
            </motion.h1>
            <motion.div
              animate={{
                scale: [ 1, 1.1, 1 ],
                opacity: [ 0.5, 1, 0.5 ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-2 flex items-center justify-center gap-1 text-sm text-growi-success"
            >
              <Zap className="h-4 w-4" />
              Live updating
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Metrics - All Event Types */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-blue/20">
                  <Eye className="h-4 w-4 text-growi-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.landingViews.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{SITE_EVENT_TYPE_LABELS[SiteEventType.LANDING_PAGE_VIEW]}</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.landingViews.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/20">
                  <Package className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.viewItems.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{SITE_EVENT_TYPE_LABELS[SiteEventType.VIEW_ITEM]}</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.viewItems.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-yellow/20">
                  <ShoppingCart className="h-4 w-4 text-growi-yellow" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.addToCart.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{SITE_EVENT_TYPE_LABELS[SiteEventType.ADD_TO_CART]}</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.addToCart.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-lime/20">
                  <CreditCard className="h-4 w-4 text-growi-lime" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.checkout.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{SITE_EVENT_TYPE_LABELS[SiteEventType.CHECKOUT]}</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.checkout.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={staggerItem}>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-growi-success/20">
                  <DollarSign className="h-4 w-4 text-growi-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-bold text-foreground">{metrics.purchases.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{SITE_EVENT_TYPE_LABELS[SiteEventType.PURCHASE_SUCCESS]}</p>
                </div>
                <p className="text-sm font-semibold text-growi-money">${metrics.purchases.earned.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Performance Overview - Timeline, Funnel & Daily */}
      {/*<Card>*/}
      {/*  <CardHeader>*/}
      {/*    <CardTitle className="flex items-center gap-2 text-foreground">*/}
      {/*      <TrendingUp className="h-5 w-5 text-growi-blue" />*/}
      {/*      Performance Overview*/}
      {/*    </CardTitle>*/}
      {/*  </CardHeader>*/}
      {/*  <CardContent>*/}
      {/*    <Tabs defaultValue="timeline" className="w-full">*/}
      {/*      <TabsList className="mb-4 grid w-full grid-cols-3">*/}
      {/*        <TabsTrigger value="timeline">Timeline</TabsTrigger>*/}
      {/*        <TabsTrigger value="daily">Daily</TabsTrigger>*/}
      {/*        <TabsTrigger value="funnel">Funnel</TabsTrigger>*/}
      {/*      </TabsList>*/}
      {/*      */}
      {/*      <TabsContent value="timeline">*/}
      {/*        <div className="h-64 sm:h-80">*/}
      {/*          <ResponsiveContainer width="100%" height="100%">*/}
      {/*            <AreaChart data={timelineData}>*/}
      {/*              <defs>*/}
      {/*                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">*/}
      {/*                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />*/}
      {/*                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />*/}
      {/*                </linearGradient>*/}
      {/*              </defs>*/}
      {/*              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />*/}
      {/*              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />*/}
      {/*              <YAxis stroke="#94a3b8" fontSize={12} />*/}
      {/*              <Tooltip*/}
      {/*                contentStyle={{*/}
      {/*                  backgroundColor: '#1e293b',*/}
      {/*                  border: '1px solid #334155',*/}
      {/*                  borderRadius: '8px',*/}
      {/*                  color: '#f1f5f9',*/}
      {/*                }}*/}
      {/*              />*/}
      {/*              <Area*/}
      {/*                type="monotone"*/}
      {/*                dataKey="earnings"*/}
      {/*                stroke="#22c55e"*/}
      {/*                fillOpacity={1}*/}
      {/*                fill="url(#colorEarnings)"*/}
      {/*                strokeWidth={2}*/}
      {/*                name="Earnings ($)"*/}
      {/*              />*/}
      {/*            </AreaChart>*/}
      {/*          </ResponsiveContainer>*/}
      {/*        </div>*/}
      {/*      </TabsContent>*/}
      {/*      */}
      {/*      <TabsContent value="daily">*/}
      {/*        <div className="h-64 sm:h-80">*/}
      {/*          <ResponsiveContainer width="100%" height="100%">*/}
      {/*            <BarChart data={timelineData}>*/}
      {/*              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />*/}
      {/*              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />*/}
      {/*              <YAxis stroke="#94a3b8" fontSize={12} />*/}
      {/*              <Tooltip*/}
      {/*                contentStyle={{*/}
      {/*                  backgroundColor: '#1e293b',*/}
      {/*                  border: '1px solid #334155',*/}
      {/*                  borderRadius: '8px',*/}
      {/*                  color: '#f1f5f9',*/}
      {/*                }}*/}
      {/*                formatter={(value, name) => {*/}
      {/*                  const labels: Record<string, string> = {*/}
      {/*                    landingViews: 'Landing Views',*/}
      {/*                    viewItems: 'View Items',*/}
      {/*                    addToCart: 'Add to Cart',*/}
      {/*                    checkout: 'Checkout',*/}
      {/*                    purchases: 'Purchases',*/}
      {/*                  };*/}
      {/*                  return [ Number(value).toLocaleString(), labels[name as string] || name ];*/}
      {/*                }}*/}
      {/*              />*/}
      {/*              <Bar dataKey="landingViews" fill="#4A90E2" name="landingViews" radius={[ 2, 2, 0, 0 ]} />*/}
      {/*              <Bar dataKey="viewItems" fill="#60a5fa" name="viewItems" radius={[ 2, 2, 0, 0 ]} />*/}
      {/*              <Bar dataKey="addToCart" fill="#FFB347" name="addToCart" radius={[ 2, 2, 0, 0 ]} />*/}
      {/*              <Bar dataKey="checkout" fill="#9ACD32" name="checkout" radius={[ 2, 2, 0, 0 ]} />*/}
      {/*              <Bar dataKey="purchases" fill="#34d399" name="purchases" radius={[ 2, 2, 0, 0 ]} />*/}
      {/*            </BarChart>*/}
      {/*          </ResponsiveContainer>*/}
      {/*        </div>*/}
      {/*        <div className="mt-4 flex flex-wrap justify-center gap-4">*/}
      {/*          <div className="flex items-center gap-2">*/}
      {/*            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: '#4A90E2' }} />*/}
      {/*            <span className="text-xs text-muted-foreground">Landing Views</span>*/}
      {/*          </div>*/}
      {/*          <div className="flex items-center gap-2">*/}
      {/*            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: '#60a5fa' }} />*/}
      {/*            <span className="text-xs text-muted-foreground">View Items</span>*/}
      {/*          </div>*/}
      {/*          <div className="flex items-center gap-2">*/}
      {/*            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: '#FFB347' }} />*/}
      {/*            <span className="text-xs text-muted-foreground">Add to Cart</span>*/}
      {/*          </div>*/}
      {/*          <div className="flex items-center gap-2">*/}
      {/*            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: '#9ACD32' }} />*/}
      {/*            <span className="text-xs text-muted-foreground">Checkout</span>*/}
      {/*          </div>*/}
      {/*          <div className="flex items-center gap-2">*/}
      {/*            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: '#34d399' }} />*/}
      {/*            <span className="text-xs text-muted-foreground">Purchases</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </TabsContent>*/}
      {/*      */}
      {/*      <TabsContent value="funnel">*/}
      {/*        <div className="flex flex-col gap-4 md:flex-row md:items-center">*/}
      {/*          <div className="h-64 flex-1">*/}
      {/*            <ResponsiveContainer width="100%" height="100%">*/}
      {/*              <PieChart>*/}
      {/*                <Pie*/}
      {/*                  data={funnelData}*/}
      {/*                  cx="50%"*/}
      {/*                  cy="50%"*/}
      {/*                  innerRadius={60}*/}
      {/*                  outerRadius={100}*/}
      {/*                  paddingAngle={2}*/}
      {/*                  dataKey="value"*/}
      {/*                >*/}
      {/*                  {funnelData.map((entry, index) => (*/}
      {/*                    <Cell key={`cell-${index}`} fill={entry.color} />*/}
      {/*                  ))}*/}
      {/*                </Pie>*/}
      {/*                <Tooltip*/}
      {/*                  contentStyle={{*/}
      {/*                    backgroundColor: '#1e293b',*/}
      {/*                    border: '1px solid #334155',*/}
      {/*                    borderRadius: '8px',*/}
      {/*                    color: '#f1f5f9',*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </PieChart>*/}
      {/*            </ResponsiveContainer>*/}
      {/*          </div>*/}
      {/*          <div className="space-y-2 md:w-48">*/}
      {/*            {funnelData.map((item) => (*/}
      {/*              <div key={item.name} className="flex items-center gap-2">*/}
      {/*                <div*/}
      {/*                  className="h-3 w-3 rounded-full"*/}
      {/*                  style={{ backgroundColor: item.color }}*/}
      {/*                />*/}
      {/*                <span className="flex-1 text-sm text-muted-foreground">{item.name}</span>*/}
      {/*                <span className="text-sm font-medium text-foreground">{item.value.toLocaleString()}</span>*/}
      {/*              </div>*/}
      {/*            ))}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </TabsContent>*/}
      {/*    </Tabs>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}
      
      {campaign.status === CampaignStatus.ACTIVE && <CampaignLiveEventsCard campaign={campaign} />}
    </div>
  );
}
