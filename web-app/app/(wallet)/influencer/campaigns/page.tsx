'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Building2, Flame, Loader2, Search, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  isHot: boolean;
  interests: string[];
  budget: number;
  slots: number;
  filledSlots: number;
  progress: number;
  rate: number;
  startDate?: string;
  endDate?: string;
  owner: {
    id: string;
    name?: string;
    walletAddress: string;
    avatar?: string;
  };
  createdAt: string;
}

interface Manager {
  id: string;
  name?: string;
  walletAddress: string;
}

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const managerFromUrl = searchParams.get('manager');

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [allInterests, setAllInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState<string | null>(managerFromUrl);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedInterest) params.set('interest', selectedInterest);
      if (selectedManager) params.set('managerId', selectedManager);

      const response = await fetch(`/api/campaigns/available?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setCampaigns(data.data);
        if (data.meta?.interests) {
          setAllInterests(data.meta.interests);
        }
        if (data.meta?.managers) {
          setManagers(data.meta.managers);
        }
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedInterest, selectedManager]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    if (managerFromUrl) {
      setSelectedManager(managerFromUrl);
    }
  }, [managerFromUrl]);

  const selectedManagerName = selectedManager
    ? managers.find((m) => m.id === selectedManager)?.name ||
      managers.find((m) => m.id === selectedManager)?.walletAddress?.slice(0, 8)
    : null;

  const hotCampaigns = campaigns.filter((c) => c.isHot);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Available Campaigns</h1>
          <p className="text-muted-foreground">Browse and apply to campaigns that match your style</p>
        </div>
        <Badge variant="outline" className="w-fit">
          {campaigns.length} campaigns available
        </Badge>
      </motion.div>

      {/* Manager Filter Banner */}
      {selectedManagerName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-lg border border-growi-blue/30 bg-growi-blue/10 p-3"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-growi-blue" />
            <span className="text-sm text-foreground">
              Showing campaigns from <span className="font-semibold">{selectedManagerName}</span>
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedManager(null)} className="h-7 w-7 p-0">
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns or managers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={selectedManager || 'all'}
            onValueChange={(value) => setSelectedManager(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <Building2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Managers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Managers</SelectItem>
              {managers.map((manager) => (
                <SelectItem key={manager.id} value={manager.id}>
                  {manager.name || manager.walletAddress.slice(0, 8) + '...'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedInterest === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedInterest(null)}
            className={selectedInterest === null ? 'bg-growi-blue text-white' : 'bg-transparent'}
          >
            All
          </Button>
          {allInterests.slice(0, 8).map((interest) => (
            <Button
              key={interest}
              variant={selectedInterest === interest ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedInterest(interest)}
              className={selectedInterest === interest ? 'bg-growi-blue text-white' : 'bg-transparent'}
            >
              {interest}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
        </div>
      )}

      {/* Campaigns Tabs */}
      {!loading && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              All ({campaigns.length})
            </TabsTrigger>
            <TabsTrigger value="hot" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Hot ({hotCampaigns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No campaigns available at the moment.</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="hot" className="mt-6">
            {hotCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hot campaigns available.</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {hotCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const formatDate = (startDate?: string, endDate?: string) => {
    if (!startDate && !endDate) return 'Ongoing';
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
    const end = endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
    if (start && end) return `${start} - ${end}`;
    if (start) return `From ${start}`;
    if (end) return `Until ${end}`;
    return 'Ongoing';
  };

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/influencer/campaign/${campaign.id}`}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image
              src={campaign.owner.avatar || '/growi-mascot.png'}
              alt={campaign.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {campaign.isHot && (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute right-2 top-2"
              >
                <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                  <Flame className="mr-1 h-3 w-3" />
                  HOT
                </Badge>
              </motion.div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">{campaign.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 8) + '...'}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{formatDate(campaign.startDate, campaign.endDate)}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {campaign.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-medium text-growi-money">${campaign.rate.toFixed(3)}/event</p>
              <p className="text-xs text-muted-foreground">${campaign.budget.toLocaleString()}</p>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>
                  Slots filled ({campaign.filledSlots}/{campaign.slots})
                </span>
                <span>{campaign.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full bg-growi-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.progress}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}