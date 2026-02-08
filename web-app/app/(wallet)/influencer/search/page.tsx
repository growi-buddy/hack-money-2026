'use client';

import { CampaignSlots } from '@/components/campaigns/CampaignSlots';
import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CountryTag } from '@/components/ui/country-tag';
import { Input } from '@/components/ui/input';
import { InterestTag } from '@/components/ui/interest-tag';
import { LoadingCard } from '@/components/ui/loading-card';
import { RegionTag } from '@/components/ui/region-tag';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TargetAudienceTag } from '@/components/ui/target-audience-tag';
import { useWallet } from '@/contexts/wallet-context';
import { useUsers } from '@/hooks/use-users';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { PARTICIPATION_STATUS } from '@/lib/constants';
import { CampaignStatus } from '@/lib/db/enums';
import { ApiDataResponse, ApiListResponse, CampaignFiltersResponse, CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { Building2, ChevronDown, ChevronUp, Flame, Globe, Search, Tag, TrendingUp, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const managerFromUrl = searchParams.get('manager');
  const { address } = useWallet();
  
  const [ campaigns, setCampaigns ] = useState<CampaignResponseDTO[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ selectedManager, setSelectedManager ] = useState<string | null>(managerFromUrl);
  
  // Filters state
  const [ filters, setFilters ] = useState<CampaignFiltersResponse>({
    interests: [],
    demographics: [],
    regions: [],
    countries: [],
  });
  const [ selectedInterests, setSelectedInterests ] = useState<string[]>([]);
  const [ selectedDemographics, setSelectedDemographics ] = useState<string[]>([]);
  const [ selectedRegions, setSelectedRegions ] = useState<string[]>([]);
  const [ selectedCountries, setSelectedCountries ] = useState<string[]>([]);
  const [ showAllFilters, setShowAllFilters ] = useState({
    interests: false,
    demographics: false,
    regions: false,
    countries: false,
  });
  
  // Fetch available filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/campaigns/filters');
        const data: ApiDataResponse<CampaignFiltersResponse> = await response.json();
        if (data.success) {
          setFilters(data.data);
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    void fetchFilters();
  }, []);
  
  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (selectedManager) params.set('managerId', selectedManager);
      if (address) params.set('walletAddress', address);
      
      const response = await fetch(`/api/campaigns/all?complete=true&status=${CampaignStatus.PUBLISHED}&${params.toString()}`);
      const data: ApiListResponse<CampaignResponseDTO> = await response.json();
      
      if (data.success) {
        // Client-side filtering
        let filtered = data.data;
        
        if (selectedInterests.length > 0) {
          filtered = filtered.filter((c) =>
            c.interests.some((i) => selectedInterests.includes(i)),
          );
        }
        
        if (selectedDemographics.length > 0) {
          filtered = filtered.filter((c) =>
            c.demographics.some((d) => selectedDemographics.includes(d)),
          );
        }
        
        if (selectedRegions.length > 0) {
          filtered = filtered.filter((c) =>
            c.regions.some((r) => selectedRegions.includes(r)),
          );
        }
        
        if (selectedCountries.length > 0) {
          filtered = filtered.filter((c) =>
            c.countries.some((c2) => selectedCountries.includes(c2)),
          );
        }
        
        setCampaigns(filtered);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedManager,
    address,
    selectedInterests,
    selectedDemographics,
    selectedRegions,
    selectedCountries,
  ]);
  
  useEffect(() => {
    void fetchCampaigns();
  }, [ fetchCampaigns ]);
  
  useEffect(() => {
    if (managerFromUrl) {
      setSelectedManager(managerFromUrl);
    }
  }, [ managerFromUrl ]);
  
  const { users } = useUsers('manager');
  const selectedManagerName = selectedManager
    ? users.find((m) => m.id === selectedManager)?.name ||
    users.find((m) => m.id === selectedManager)?.walletAddress?.slice(0, 8)
    : null;
  
  const hotCampaigns = campaigns.filter((c) => c.isHot);
  
  const toggleFilter = (type: 'interests' | 'demographics' | 'regions' | 'countries', value: string) => {
    const setters = {
      interests: setSelectedInterests,
      demographics: setSelectedDemographics,
      regions: setSelectedRegions,
      countries: setSelectedCountries,
    };
    
    const selected = {
      interests: selectedInterests,
      demographics: selectedDemographics,
      regions: selectedRegions,
      countries: selectedCountries,
    };
    
    const setter = setters[type];
    const current = selected[type];
    
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([ ...current, value ]);
    }
  };
  
  const clearAllFilters = () => {
    setSelectedInterests([]);
    setSelectedDemographics([]);
    setSelectedRegions([]);
    setSelectedCountries([]);
  };
  
  const totalActiveFilters =
    selectedInterests.length +
    selectedDemographics.length +
    selectedRegions.length +
    selectedCountries.length;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Search Campaigns</h1>
          <Badge variant="outline" className="w-fit">
            {campaigns.length} campaigns available
          </Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and apply to campaigns that match your style
        </p>
      </div>
      
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
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name || user.walletAddress.slice(0, 8) + '...'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Active Filters Summary */}
        {totalActiveFilters > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-2 rounded-lg border border-growi-blue/30 bg-growi-blue/5 p-3"
          >
            <Badge className="bg-growi-blue text-white">{totalActiveFilters}</Badge>
            <span className="text-sm text-foreground">active filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="ml-auto h-7 text-xs"
            >
              Clear all
            </Button>
          </motion.div>
        )}
        
        {/* Filters Groups */}
        <div className="space-y-4">
          {/* Interests */}
          {filters.interests.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-growi-blue" />
                <h3 className="text-sm font-semibold text-foreground">Interests</h3>
                {selectedInterests.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedInterests.length}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.interests
                  .slice(0, showAllFilters.interests ? undefined : 6)
                  .map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-growi-blue text-white'
                          : 'hover:border-growi-blue/50'
                      }`}
                      onClick={() => toggleFilter('interests', interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                {filters.interests.length > 6 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowAllFilters((prev) => ({ ...prev, interests: !prev.interests }))
                    }
                    className="h-6 text-xs"
                  >
                    {showAllFilters.interests ? (
                      <>
                        <ChevronUp className="mr-1 h-3 w-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1 h-3 w-3" />
                        +{filters.interests.length - 6} more
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Demographics */}
          {filters.demographics.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <h3 className="text-sm font-semibold text-foreground">Demographics</h3>
                {selectedDemographics.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedDemographics.length}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.demographics
                  .slice(0, showAllFilters.demographics ? undefined : 6)
                  .map((demo) => (
                    <Badge
                      key={demo}
                      variant={selectedDemographics.includes(demo) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedDemographics.includes(demo)
                          ? 'bg-purple-500 text-white'
                          : 'hover:border-purple-500/50'
                      }`}
                      onClick={() => toggleFilter('demographics', demo)}
                    >
                      {demo}
                    </Badge>
                  ))}
                {filters.demographics.length > 6 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowAllFilters((prev) => ({ ...prev, demographics: !prev.demographics }))
                    }
                    className="h-6 text-xs"
                  >
                    {showAllFilters.demographics ? (
                      <>
                        <ChevronUp className="mr-1 h-3 w-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1 h-3 w-3" />
                        +{filters.demographics.length - 6} more
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Geographic (Regions & Countries) */}
          {(filters.regions.length > 0 || filters.countries.length > 0) && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-500" />
                <h3 className="text-sm font-semibold text-foreground">Geographic</h3>
                {(selectedRegions.length + selectedCountries.length > 0) && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedRegions.length + selectedCountries.length}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Regions */}
                {filters.regions
                  .slice(0, showAllFilters.regions ? undefined : 4)
                  .map((region) => (
                    <Badge
                      key={region}
                      variant={selectedRegions.includes(region) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedRegions.includes(region)
                          ? 'bg-indigo-500 text-white'
                          : 'hover:border-indigo-500/50'
                      }`}
                      onClick={() => toggleFilter('regions', region)}
                    >
                      {region}
                    </Badge>
                  ))}
                {/* Countries */}
                {filters.countries
                  .slice(0, showAllFilters.countries ? undefined : 4)
                  .map((country) => (
                    <Badge
                      key={country}
                      variant={selectedCountries.includes(country) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        selectedCountries.includes(country)
                          ? 'bg-indigo-500 text-white'
                          : 'hover:border-indigo-500/50'
                      }`}
                      onClick={() => toggleFilter('countries', country)}
                    >
                      {country}
                    </Badge>
                  ))}
                {(filters.regions.length + filters.countries.length > 8) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setShowAllFilters((prev) => ({
                        ...prev,
                        regions: !prev.regions,
                        countries: !prev.countries,
                      }))
                    }
                    className="h-6 text-xs"
                  >
                    {showAllFilters.regions ? (
                      <>
                        <ChevronUp className="mr-1 h-3 w-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1 h-3 w-3" />
                        +{filters.regions.length + filters.countries.length - 8} more
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {loading && <LoadingCard userRole="influencer" />}
      
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

const formatDate = (startDate?: string | number, endDate?: string | number) => {
  if (!startDate && !endDate) return 'Ongoing';
  const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  const end = endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  if (start && end) return `${start} - ${end}`;
  if (start) return `From ${start}`;
  if (end) return `Until ${end}`;
  return 'Ongoing';
};

function CampaignCard({ campaign }: { campaign: CampaignResponseDTO }) {
  
  const { address } = useWallet();
  
  const participation = campaign.participants.find(({ walletAddress }) => walletAddress === address);
  
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/influencer/search/campaign/${campaign.id}`}>
        <Card className="group cursor-pointer overflow-hidden transition-colors hover:border-growi-blue/50 h-full flex flex-col">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <Image
              src={campaign.owner.avatar || '/growi-mascot.png'}
              alt={campaign.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute left-2 top-2 flex gap-2">
              <CampaignStatusBadge status={campaign.status} />
              {participation ? (
                <Badge className="bg-growi-success text-white hover:bg-growi-success/90">
                  {PARTICIPATION_STATUS[participation.status]}
                </Badge>
              ) : (
                <Badge className="bg-growi-blue/90 text-white hover:bg-growi-blue">
                  Available
                </Badge>
              )}
            </div>
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
                  <Flame className="mr-1 h-3 w-3" />
                  HOT
                </Badge>
              </motion.div>
            )}
          </div>
          <CardContent className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-foreground">{campaign.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              by {campaign.owner.name || campaign.owner.walletAddress.slice(0, 8) + '...'}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{formatDate(campaign.startDate, campaign.endDate)}</p>
            
            {/* Interests */}
            {campaign.interests.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-muted-foreground mb-1">Interests</p>
                <div className="flex flex-wrap gap-1 text-xs">
                  {campaign.interests.slice(0, 3).map((interest) => (
                    <InterestTag key={interest} label={interest} />
                  ))}
                  {campaign.interests.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{campaign.interests.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Demographics */}
            {campaign.demographics.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-muted-foreground mb-1">Target Audience</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.demographics.slice(0, 2).map((demo) => (
                    <TargetAudienceTag key={demo} label={demo} />
                  ))}
                  {campaign.demographics.length > 2 && (
                    <Badge className="text-xs bg-purple-500/20 text-purple-500 border-purple-500/50">
                      +{campaign.demographics.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Geographic */}
            {(campaign.regions.length > 0 || campaign.countries.length > 0) && (
              <div className="mt-2">
                <p className="text-xs font-medium text-muted-foreground mb-1">Geographic</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.regions.slice(0, 2).map((region) => (
                    <RegionTag key={region} label={region} />
                  ))}
                  {campaign.countries.slice(0, 2).map((country) => (
                    <CountryTag key={country} label={country} />
                  ))}
                  {(campaign.regions.length + campaign.countries.length > 4) && (
                    <Badge className="text-xs bg-blue-500/20 text-blue-500 border-blue-500/50">
                      +{campaign.regions.length + campaign.countries.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-auto pt-3 space-y-3">
              <div className="flex items-center justify-between">
                {/*<p className="font-medium text-growi-money">${campaign.rate.toFixed(3)}/event</p>*/}
                <p className="text-xs text-muted-foreground">${campaign.budgetTotal.toLocaleString()}</p>
              </div>
              <div>
                <CampaignSlots campaign={campaign} />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
