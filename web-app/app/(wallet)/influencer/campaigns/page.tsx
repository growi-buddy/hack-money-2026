'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Building2, Flame, Search, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const availableCampaigns = [
  {
    id: '1',
    title: 'Nike Summer Collection',
    type: 'UGC PAID PER CONFIRM',
    rate: '$0.007/units',
    image: '/growi-mascot.png',
    progress: 65,
    isHot: true,
    interests: [ 'Fashion', 'Sports', 'Lifestyle' ],
    budget: '$5,000',
    duration: 'Feb 10 - Feb 24',
    managerId: '1',
    managerName: 'Nike Marketing',
  },
  {
    id: '2',
    title: 'Adidas Winter Drop',
    type: 'AFFILIATE',
    rate: '$0.005/units',
    image: '/growi-mascot.png',
    progress: 45,
    isHot: false,
    interests: [ 'Fitness', 'Sports', 'Streetwear' ],
    budget: '$3,000',
    duration: 'Feb 15 - Mar 1',
    managerId: '2',
    managerName: 'Adidas Global',
  },
  {
    id: '3',
    title: 'Puma Rush Campaign',
    type: 'UGC PAID PER CONFIRM',
    rate: '$0.010/units',
    image: '/growi-mascot.png',
    progress: 82,
    isHot: true,
    interests: [ 'Running', 'Sports', 'Health' ],
    budget: '$4,000',
    duration: 'Feb 20 - Mar 5',
    managerId: '3',
    managerName: 'Puma Agency',
  },
  {
    id: '4',
    title: 'Reebok Classic',
    type: 'AFFILIATE',
    rate: '$0.006/units',
    image: '/growi-mascot.png',
    progress: 28,
    isHot: false,
    interests: [ 'Retro', 'Fashion', 'Lifestyle' ],
    budget: '$2,500',
    duration: 'Feb 25 - Mar 10',
    managerId: '4',
    managerName: 'Reebok Classics',
  },
  {
    id: '5',
    title: 'New Balance Pro',
    type: 'UGC PAID PER CONFIRM',
    rate: '$0.008/units',
    image: '/growi-mascot.png',
    progress: 90,
    isHot: true,
    interests: [ 'Sneakerhead', 'Streetwear', 'Fashion' ],
    budget: '$6,000',
    duration: 'Mar 1 - Mar 15',
    managerId: '5',
    managerName: 'New Balance Pro',
  },
  {
    id: '6',
    title: 'Converse All Star',
    type: 'AFFILIATE',
    rate: '$0.004/units',
    image: '/growi-mascot.png',
    progress: 55,
    isHot: false,
    interests: [ 'Classic', 'Music', 'Art' ],
    budget: '$3,500',
    duration: 'Mar 5 - Mar 20',
    managerId: '1',
    managerName: 'Nike Marketing',
  },
  {
    id: '7',
    title: 'Under Armour Training',
    type: 'UGC PAID PER CONFIRM',
    rate: '$0.009/units',
    image: '/growi-mascot.png',
    progress: 35,
    isHot: false,
    interests: [ 'Fitness', 'Training', 'Sports' ],
    budget: '$4,500',
    duration: 'Mar 10 - Mar 25',
    managerId: '6',
    managerName: 'Under Armour',
  },
  {
    id: '8',
    title: 'Asics Running',
    type: 'AFFILIATE',
    rate: '$0.007/units',
    image: '/growi-mascot.png',
    progress: 60,
    isHot: true,
    interests: [ 'Running', 'Health', 'Outdoor' ],
    budget: '$3,800',
    duration: 'Mar 15 - Mar 30',
    managerId: '2',
    managerName: 'Adidas Global',
  },
];

const managers = [
  { id: '1', name: 'Nike Marketing' },
  { id: '2', name: 'Adidas Global' },
  { id: '3', name: 'Puma Agency' },
  { id: '4', name: 'Reebok Classics' },
  { id: '5', name: 'New Balance Pro' },
  { id: '6', name: 'Under Armour' },
];

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const managerFromUrl = searchParams.get('manager');
  
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ selectedInterest, setSelectedInterest ] = useState<string | null>(null);
  const [ selectedManager, setSelectedManager ] = useState<string | null>(managerFromUrl);
  
  useEffect(() => {
    if (managerFromUrl) {
      setSelectedManager(managerFromUrl);
    }
  }, [ managerFromUrl ]);
  
  const allInterests = [ ...new Set(availableCampaigns.flatMap(c => c.interests)) ];
  
  const filteredCampaigns = availableCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.managerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterest = !selectedInterest || campaign.interests.includes(selectedInterest);
    const matchesManager = !selectedManager || campaign.managerId === selectedManager;
    return matchesSearch && matchesInterest && matchesManager;
  });
  
  const selectedManagerName = selectedManager
    ? managers.find(m => m.id === selectedManager)?.name
    : null;
  
  const hotCampaigns = filteredCampaigns.filter(c => c.isHot);
  const allCampaignsFiltered = filteredCampaigns;
  
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
          {availableCampaigns.length} campaigns available
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedManager(null)}
            className="h-7 w-7 p-0"
          >
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
                  {manager.name}
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
          {allInterests.slice(0, 5).map((interest) => (
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
      
      {/* Campaigns Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            All ({allCampaignsFiltered.length})
          </TabsTrigger>
          <TabsTrigger value="hot" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Hot ({hotCampaigns.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {allCampaignsFiltered.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="hot" className="mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: typeof availableCampaigns[0] }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/web-app/app/(wallet)/influencer/campaign/${campaign.id}`}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image
              src={campaign.image || '/placeholder.svg'}
              alt={campaign.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {campaign.isHot && (
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
                className="absolute right-2 top-2"
              >
                <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                  HOT
                </Badge>
              </motion.div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground">{campaign.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">by {campaign.managerName}</p>
            <p className="mt-1 text-xs uppercase text-muted-foreground">{campaign.type}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {campaign.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-medium text-growi-money">{campaign.rate}</p>
              <p className="text-xs text-muted-foreground">{campaign.budget}</p>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Slots filled</span>
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
