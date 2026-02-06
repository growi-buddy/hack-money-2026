'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { CampaignStatus } from '@/lib/db/enums';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, DollarSign, Loader2, Package, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface ManagerCampaign {
  id: string;
  title: string;
  budget: number;
  status: CampaignStatus;
}

interface CampaignManager {
  id: string;
  name: string | null;
  walletAddress: string;
  avatar: string | null;
  bio: string | null;
  activeCampaignsCount: number;
  totalCampaignsCount: number;
  totalBudget: number;
  campaigns: ManagerCampaign[];
}

function formatBudget(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export default function CampaignManagersPage() {
  const [ managers, setManagers ] = useState<CampaignManager[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ totalActiveCampaigns, setTotalActiveCampaigns ] = useState(0);
  
  const fetchManagers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      
      const response = await fetch(`/api/campaigns/managers?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setManagers(data.data);
        setTotalActiveCampaigns(data.meta?.totalActiveCampaigns || 0);
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    } finally {
      setLoading(false);
    }
  }, [ searchQuery ]);
  
  useEffect(() => {
    fetchManagers();
  }, [ fetchManagers ]);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Campaign Managers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover brands and agencies with active campaigns
        </p>
      </div>
      
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </motion.div>
      
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <Badge variant="secondary" className="gap-1">
          <Building2 className="h-3 w-3" />
          {managers.length} managers
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-growi-blue/10 text-growi-blue">
          {totalActiveCampaigns} active campaigns
        </Badge>
      </motion.div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-growi-blue" />
        </div>
      )}
      
      {/* Empty State */}
      {!loading && managers.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No campaign managers found</p>
        </div>
      )}
      
      {/* Manager Grid */}
      {!loading && managers.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-2"
        >
          {managers.map((manager) => (
            <motion.div key={manager.id} variants={staggerItem}>
              <Card className="h-full transition-all hover:border-growi-blue/50 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Image
                        src={manager.avatar || '/growi-mascot.png'}
                        alt={manager.name || 'Manager'}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      {manager.activeCampaignsCount > 0 && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-growi-success" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg text-foreground">
                        {manager.name || manager.walletAddress.slice(0, 8) + '...'}
                      </CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span className="truncate">{manager.walletAddress.slice(0, 12)}...</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {manager.bio && <p className="text-sm text-muted-foreground line-clamp-2">{manager.bio}</p>}
                  
                  {/* Budget Stats */}
                  <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Budget</p>
                      <p className="text-lg font-bold text-growi-money">{formatBudget(manager.totalBudget)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Active Campaigns</p>
                      <p className="text-lg font-bold text-foreground">{manager.activeCampaignsCount}</p>
                    </div>
                  </div>
                  
                  {/* Available Campaigns */}
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Available Campaigns</p>
                    <div className="space-y-2">
                      {manager.campaigns.length > 0 ? (
                        manager.campaigns.map((campaign) => (
                          <Link key={campaign.id} href={`/influencer/campaign/${campaign.id}`}>
                            <motion.div
                              whileHover={{ scale: 1.01 }}
                              className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-colors hover:border-growi-blue/50"
                            >
                              <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-growi-blue" />
                                <span className="text-sm font-medium text-foreground">{campaign.title}</span>
                                {campaign.status === CampaignStatus.DEPLETED && (
                                  <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500">
                                    Depleted
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  <DollarSign className="mr-0.5 h-3 w-3" />
                                  {formatBudget(campaign.budget)}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </motion.div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No active campaigns</p>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/influencer/campaigns?managerId=${manager.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Campaigns
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
