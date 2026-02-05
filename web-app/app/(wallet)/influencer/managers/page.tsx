'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, DollarSign, Package, Search, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const campaignManagers = [
  {
    id: '1',
    name: 'Nike Marketing',
    avatar: '/growi-mascot.png',
    company: 'Nike Inc.',
    bio: 'Global sportswear brand focused on innovative athletic performance and lifestyle products.',
    status: 'online',
    rating: 4.9,
    reviewCount: 156,
    historicalBudget: 2500000,
    campaigns: [
      { id: 'nike-1', title: 'Nike Summer Collection', budget: 5000, status: 'active' },
      { id: 'nike-2', title: 'Air Max Launch', budget: 8000, status: 'active' },
      { id: 'nike-3', title: 'Nike Run Club', budget: 3500, status: 'completed' },
    ],
  },
  {
    id: '2',
    name: 'Adidas Global',
    avatar: '/growi-mascot.png',
    company: 'Adidas AG',
    bio: 'Leading sportswear manufacturer with focus on sustainability and street culture.',
    status: 'online',
    rating: 4.7,
    reviewCount: 142,
    historicalBudget: 1800000,
    campaigns: [
      { id: 'adidas-1', title: 'Adidas Winter Drop', budget: 4500, status: 'active' },
      { id: 'adidas-2', title: 'Originals Campaign', budget: 6000, status: 'active' },
    ],
  },
  {
    id: '3',
    name: 'Puma Agency',
    avatar: '/growi-mascot.png',
    company: 'Puma SE',
    bio: 'Athletic and casual footwear brand known for motorsport and football collaborations.',
    status: 'away',
    rating: 4.5,
    reviewCount: 98,
    historicalBudget: 950000,
    campaigns: [
      { id: 'puma-1', title: 'Puma Rush', budget: 3000, status: 'active' },
      { id: 'puma-2', title: 'Speed Series', budget: 4000, status: 'draft' },
    ],
  },
  {
    id: '4',
    name: 'Reebok Classics',
    avatar: '/growi-mascot.png',
    company: 'Reebok International',
    bio: 'Fitness and lifestyle brand with heritage in aerobics and classic sneaker culture.',
    status: 'online',
    rating: 4.6,
    reviewCount: 87,
    historicalBudget: 720000,
    campaigns: [
      { id: 'reebok-1', title: 'Classic Leather 2026', budget: 2500, status: 'active' },
    ],
  },
  {
    id: '5',
    name: 'New Balance Pro',
    avatar: '/growi-mascot.png',
    company: 'New Balance Athletics',
    bio: 'Premium athletic footwear known for quality craftsmanship and running innovation.',
    status: 'online',
    rating: 4.8,
    reviewCount: 112,
    historicalBudget: 1200000,
    campaigns: [
      { id: 'nb-1', title: 'Fresh Foam Launch', budget: 5500, status: 'active' },
      { id: 'nb-2', title: 'Made in USA Collection', budget: 7000, status: 'active' },
      { id: 'nb-3', title: '990 Heritage', budget: 4500, status: 'active' },
    ],
  },
  {
    id: '6',
    name: 'Under Armour',
    avatar: '/growi-mascot.png',
    company: 'Under Armour Inc.',
    bio: 'Performance apparel and footwear brand focused on athletes and fitness enthusiasts.',
    status: 'away',
    rating: 4.4,
    reviewCount: 76,
    historicalBudget: 650000,
    campaigns: [
      { id: 'ua-1', title: 'Curry Flow Collection', budget: 3500, status: 'active' },
    ],
  },
];

function formatBudget(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

export default function CampaignManagersPage() {
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ selectedManager, setSelectedManager ] = useState<typeof campaignManagers[0] | null>(null);
  
  const filteredManagers = campaignManagers.filter(manager =>
    manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    manager.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Campaign Managers</h1>
        <p className="mt-2 text-muted-foreground">
          Discover brands and agencies with active campaigns
        </p>
      </motion.div>
      
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, or description..."
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
          {filteredManagers.length} managers
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-growi-success/10 text-growi-success">
          {campaignManagers.filter(m => m.status === 'online').length} online
        </Badge>
        <Badge variant="secondary" className="gap-1 bg-growi-blue/10 text-growi-blue">
          {campaignManagers.reduce((acc, m) => acc + m.campaigns.filter(c => c.status === 'active').length, 0)} active
          campaigns
        </Badge>
      </motion.div>
      
      {/* Manager Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 lg:grid-cols-2"
      >
        {filteredManagers.map((manager) => (
          <motion.div key={manager.id} variants={staggerItem}>
            <Card className="h-full transition-all hover:border-growi-blue/50 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={manager.avatar || '/placeholder.svg'}
                      alt={manager.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${
                        manager.status === 'online' ? 'bg-growi-success' : 'bg-growi-yellow'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-foreground">{manager.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      <span>{manager.company}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[ ...Array(5) ].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(manager.rating) ? 'fill-growi-yellow text-growi-yellow' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {manager.rating} ({manager.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{manager.bio}</p>
                
                {/* Budget Stats */}
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Historical Budget</p>
                    <p className="text-lg font-bold text-growi-money">{formatBudget(manager.historicalBudget)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Active Campaigns</p>
                    <p className="text-lg font-bold text-foreground">
                      {manager.campaigns.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                </div>
                
                {/* Available Campaigns */}
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Available Campaigns</p>
                  <div className="space-y-2">
                    {manager.campaigns.filter(c => c.status === 'active').map((campaign) => (
                      <Link
                        key={campaign.id}
                        href={`/web-app/app/(wallet)/influencer/campaigns?apply=${campaign.id}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-colors hover:border-growi-blue/50"
                        >
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-growi-blue" />
                            <span className="text-sm font-medium text-foreground">{campaign.title}</span>
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
                    ))}
                    {manager.campaigns.filter(c => c.status === 'active').length === 0 && (
                      <p className="text-sm text-muted-foreground">No active campaigns</p>
                    )}
                  </div>
                </div>
                
                {/* View All Campaigns Button */}
                <Link href={`/web-app/app/(wallet)/influencer/campaigns?manager=${manager.id}`}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    View All Campaigns
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
