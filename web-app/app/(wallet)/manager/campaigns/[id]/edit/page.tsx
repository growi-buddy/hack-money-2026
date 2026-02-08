'use client';

import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CountryTag } from '@/components/ui/country-tag';
import { ErrorCard } from '@/components/ui/error-card';
import { Input } from '@/components/ui/input';
import { InterestTag } from '@/components/ui/interest-tag';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { RegionTag } from '@/components/ui/region-tag';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TargetAudienceTag } from '@/components/ui/target-audience-tag';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/contexts/wallet-context';
import { useSites } from '@/hooks';
import { SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { sendFunds } from '@/lib/web3';
import { ApiDataResponse, CampaignResponseDTO, UpdateCampaignInput } from '@/types';
import { Check, Flame, Globe, Loader2, Save, Tag, Users } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditCampaignPage() {
  
  const { address } = useWallet();
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;
  
  const [ campaign, setCampaign ] = useState<CampaignResponseDTO | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ saveError, setSaveError ] = useState<string | null>(null);
  
  const [ formData, setFormData ] = useState<Required<UpdateCampaignInput>>({
    title: '',
    description: '',
    interests: [],
    demographics: [],
    regions: [],
    countries: [],
    slots: 10,
    budgetTotal: 0,
    startDate: '',
    endDate: '',
    status: CampaignStatus.DRAFT,
    siteEvents: [],
  });
  
  const [ interestInput, setInterestInput ] = useState('');
  const [ demographicInput, setDemographicInput ] = useState('');
  const [ regionInput, setRegionInput ] = useState('');
  const [ countryInput, setCountryInput ] = useState('');
  const [ selectedSiteId, setSelectedSiteId ] = useState<string>('');
  
  const { sites } = useSites();
  
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/campaigns/${campaignId}?walletAddress=${address}`);
        const data: ApiDataResponse<CampaignResponseDTO> = await response.json();
        
        if (!response.ok) {
          throw new Error((data as unknown as { error: Error }).error?.message || 'Failed to fetch campaign');
        }
        
        setCampaign(data.data);
        
        if (data.data.status !== CampaignStatus.DRAFT) {
          setError('Only campaigns in DRAFT status can be edited');
          // return; // MOCK
        }
        const siteEvents: Required<UpdateCampaignInput>['siteEvents'] = (data.data.sites || [])
          .map(({ siteEvents }) => siteEvents).flat()
          .filter(Boolean)
          .map(({ id, amount, volumeStep }) => ({
            siteEventId: id,
            amount,
            volumeStep,
          }));
        
        setFormData({
          title: data.data.title,
          description: data.data.description || '',
          interests: data.data.interests || [],
          demographics: data.data.demographics || [],
          regions: data.data.regions || [],
          countries: data.data.countries || [],
          slots: data.data.slots || 10,
          budgetTotal: data.data.budgetTotal || 0,
          startDate: data.data.startDate ? new Date(data.data.startDate).toISOString().split('T')[0] : '',
          endDate: data.data.endDate ? new Date(data.data.endDate).toISOString().split('T')[0] : '',
          status: data.data.status,
          siteEvents,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (campaignId) {
      void fetchCampaign();
    }
  }, [ address, campaignId ]);
  
  useEffect(() => {
    if (sites.length > 0 && formData.siteEvents && formData.siteEvents.length > 0 && !selectedSiteId) {
      const matchingSite = sites.find((site) => {
        if (site.events.length === 0) return false;
        
        return site.events.every((event) =>
          formData.siteEvents.some((se) => se.siteEventId === event.id),
        );
      });
      
      if (matchingSite) {
        setSelectedSiteId(matchingSite.id);
      }
    }
  }, [ sites, formData.siteEvents, selectedSiteId ]);
  
  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests?.includes(interestInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [ ...prev.interests, interestInput.trim() ],
      }));
      setInterestInput('');
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };
  
  const handleAddDemographic = () => {
    if (demographicInput.trim() && !formData.demographics?.includes(demographicInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        demographics: [ ...(prev.demographics || []), demographicInput.trim() ],
      }));
      setDemographicInput('');
    }
  };
  
  const handleRemoveDemographic = (demographic: string) => {
    setFormData((prev) => ({
      ...prev,
      demographics: prev.demographics?.filter((d) => d !== demographic) || [],
    }));
  };
  
  const handleAddRegion = () => {
    if (regionInput.trim() && !formData.regions?.includes(regionInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        regions: [ ...(prev.regions || []), regionInput.trim() ],
      }));
      setRegionInput('');
    }
  };
  
  const handleRemoveRegion = (region: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions?.filter((r) => r !== region) || [],
    }));
  };
  
  const handleAddCountry = () => {
    if (countryInput.trim() && !formData.countries?.includes(countryInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        countries: [ ...(prev.countries || []), countryInput.trim() ],
      }));
      setCountryInput('');
    }
  };
  
  const handleRemoveCountry = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      countries: prev.countries?.filter((c) => c !== country) || [],
    }));
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          interests: formData.interests,
          demographics: formData.demographics,
          regions: formData.regions,
          countries: formData.countries,
          slots: formData.slots,
          budgetTotal: formData.budgetTotal,
          startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
          endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
          status: formData.status,
          siteEvents: formData.siteEvents,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to update campaign');
      }
      
      router.push(`/manager/campaigns/${campaignId}`);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading || !campaign) {
    return <Loader />;
  }
  
  return (
    <div className="space-y-6">
      <BackButton href={`/manager/campaigns/${campaignId}`} />
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit Campaign</h1>
              <p className="mt-1 text-sm text-muted-foreground">Update campaign details and settings</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            variant="outline"
            size="sm"
            className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
      
      <ErrorCard error={saveError} />
      <ErrorCard error={error} />
      
      {/* Hot Campaign Toggle */}
      <Card>
        <CardContent className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Hot Campaign</Label>
              <p className="text-xs text-muted-foreground">Feature this campaign prominently</p>
            </div>
          </div>
          {campaign?.isHot ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-growi-success/20">
              <Check className="h-5 w-5 text-growi-success" />
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const {
                  success,
                  error,
                  txHash,
                } = await sendFunds('0x75a26Ca9e3Ef85d8e118Ec2b260c143f8738BA19', '0.0001');
                
                if (success) {
                  console.log('Transacción exitosa en Base Sepolia:', txHash);
                } else {
                  console.error('Error:', error);
                  setError(error);
                }
              }}
              className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10"
            >
              Mark as Hot
            </Button>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Campaign Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Campaign title"
              />
            </CardContent>
          </Card>
          
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Campaign description"
                rows={4}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Campaign Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-muted-foreground">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-muted-foreground">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Available Slots</CardTitle>
              <CardDescription>Number of influencer slots available</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                min="1"
                max="1000"
                value={formData.slots}
                onChange={(e) => setFormData((prev) => ({ ...prev, slots: parseInt(e.target.value) || 10 }))}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Budget</CardTitle>
              <CardDescription>Campaign total budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="budget" className="text-sm font-medium text-muted-foreground">
                  Total Budget ($)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.budgetTotal}
                  onChange={(e) => setFormData((prev) => ({ ...prev, budgetTotal: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div className="rounded-lg bg-secondary/30 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Spent:</span>
                  <span className="font-semibold text-growi-money">${campaign.budgetSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className="font-semibold text-foreground">
                    ${Math.max(0, +formData.budgetTotal - campaign.budgetSpent).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {sites.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <Label className="text-sm font-medium">Site Events</Label>
                  <Select
                    value={selectedSiteId}
                    onValueChange={(siteId) => {
                      setSelectedSiteId(siteId);
                      const site = sites.find(s => s.id === siteId);
                      if (site) {
                        setFormData((prev) => ({
                          ...prev,
                          siteEvents: site.events.map(event => ({
                            siteEventId: event.id!,
                            amount: 0.01,
                            volumeStep: 1,
                          })),
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a site..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sites.map((site) => (
                        <SelectItem key={site.id} value={site.id}>
                          {site.name} ({site.events.length} event{site.events.length !== 1 ? 's' : ''})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Show events from selected site */}
                  {selectedSiteId && (() => {
                    const selectedSite = sites.find(s => s.id === selectedSiteId);
                    if (!selectedSite) return null;
                    
                    return (
                      <div className="space-y-2">
                        {selectedSite.events.map((event) => {
                          const selectedEvent = formData.siteEvents?.find(
                            (e) => e.siteEventId === event.id,
                          );
                          
                          return (
                            <div
                              key={event.id}
                              className="flex items-center gap-3 rounded-lg border border-growi-success/50 bg-growi-success/5 px-2.5 py-2"
                            >
                              <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium text-foreground">{event.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {SITE_EVENT_TYPE_LABELS[event.eventType]}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1 rounded bg-secondary px-2 py-1">
                                    <span className="text-xs text-muted-foreground">$</span>
                                    <input
                                      type="number"
                                      step="0.001"
                                      min="0"
                                      value={selectedEvent?.amount || 0}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          siteEvents: (prev.siteEvents || []).map((ev) =>
                                            ev.siteEventId === event.id
                                              ? { ...ev, amount: parseFloat(e.target.value) || 0 }
                                              : ev,
                                          ),
                                        }));
                                      }}
                                      className="w-16 bg-transparent text-sm text-foreground focus:outline-none"
                                    />
                                  </div>
                                  <span className="text-[10px] text-muted-foreground/60 px-2">Amount</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1 rounded bg-secondary px-2 py-1">
                                    <span className="text-xs text-muted-foreground">×</span>
                                    <input
                                      type="number"
                                      step="1"
                                      min="1"
                                      value={selectedEvent?.volumeStep || 1}
                                      onChange={(e) => {
                                        setFormData((prev) => ({
                                          ...prev,
                                          siteEvents: (prev.siteEvents || []).map((ev) =>
                                            ev.siteEventId === event.id
                                              ? { ...ev, volumeStep: parseInt(e.target.value) || 1 }
                                              : ev,
                                          ),
                                        }));
                                      }}
                                      className="w-12 bg-transparent text-sm text-foreground focus:outline-none"
                                    />
                                  </div>
                                  <span className="text-[10px] text-muted-foreground/60 px-2">Volume</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Tag className="h-5 w-5 text-growi-blue" />
                Interests
              </CardTitle>
              <CardDescription>Tags to help target the right influencers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add interest (e.g., Fashion, Tech)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddInterest}
                  variant="outline"
                  className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                >
                  Add
                </Button>
              </div>
              
              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest) => (
                    <InterestTag key={interest} label={interest} onRemove={() => handleRemoveInterest(interest)} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-growi-blue" />
                Demographics
              </CardTitle>
              <CardDescription>Target audience demographics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={demographicInput}
                  onChange={(e) => setDemographicInput(e.target.value)}
                  placeholder="Add demographic (e.g., Gen Z, Millennials)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDemographic();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddDemographic}
                  variant="outline"
                  className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                >
                  Add
                </Button>
              </div>
              
              {formData.demographics && formData.demographics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.demographics.map((demographic) => (
                    <TargetAudienceTag
                      key={demographic}
                      label={demographic}
                      onRemove={() => handleRemoveDemographic(demographic)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Globe className="h-5 w-5 text-growi-blue" />
                Geographic Targeting
              </CardTitle>
              <CardDescription>Target regions and countries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Regions
                </Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    placeholder="Add region (e.g., North America, Europe)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRegion();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddRegion}
                    variant="outline"
                    className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                  >
                    Add
                  </Button>
                </div>
                
                {formData.regions && formData.regions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.regions.map((region) => (
                      <RegionTag key={region} label={region} onRemove={() => handleRemoveRegion(region)} />
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Countries
                </Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    placeholder="Add country (e.g., United States, Mexico)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCountry();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddCountry}
                    variant="outline"
                    className="border-growi-blue/50 text-growi-blue hover:bg-growi-blue/10 bg-transparent"
                  >
                    Add
                  </Button>
                </div>
                
                {formData.countries && formData.countries.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.countries.map((country) => (
                      <CountryTag key={country} label={country} onRemove={() => handleRemoveCountry(country)} />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
