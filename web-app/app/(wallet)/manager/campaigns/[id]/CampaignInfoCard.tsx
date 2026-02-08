import { CampaignSlots } from '@/components/campaigns/CampaignSlots';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountryTag } from '@/components/ui/country-tag';
import { InterestTag } from '@/components/ui/interest-tag';
import { RegionTag } from '@/components/ui/region-tag';
import { TargetAudienceTag } from '@/components/ui/target-audience-tag';
import { staggerItem } from '@/lib/animations';
import { SITE_EVENT_TYPE_LABELS } from '@/lib/constants';
import { CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Globe, Tag, Users, Zap } from 'lucide-react';

const formatDate = (dateStr: string | number | null) => {
  if (!dateStr) return 'TBD';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const CampaignInfoCard = ({ campaign, withoutTitle }: {
  campaign: CampaignResponseDTO,
  withoutTitle: boolean
}) => {
  return (
    <Card>
      {!withoutTitle && (
        <CardHeader>
          <CardTitle className="text-foreground">Campaign Details</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {!withoutTitle && campaign.description && (
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
              <p className="text-foreground text-sm leading-relaxed">{campaign.description}</p>
            </div>
          )}
          
          <motion.div variants={staggerItem} className="md:col-span-2 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Start Date
              </div>
              <p className="mt-1 font-semibold text-foreground">{formatDate(campaign.startDate)}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                End Date
              </div>
              <p className="mt-1 font-semibold text-foreground">{formatDate(campaign.endDate)}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                Total Budget
              </div>
              <p className="mt-1 font-semibold text-growi-money">${campaign.budgetTotal.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <CampaignSlots campaign={campaign} />
            </div>
          </motion.div>
          
          {/* Site Events */}
          {campaign.sites && campaign.sites.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Site Events</h4>
              </div>
              <div className="space-y-3">
                {campaign.sites.map((site) => (
                  <div key={site.id} className="border border-border rounded-lg p-3 bg-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-semibold text-foreground">{site.name}</h5>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-growi-blue hover:underline"
                      >
                        {new URL(site.url).hostname}
                      </a>
                    </div>
                    {site.description && (
                      <p className="text-xs text-muted-foreground mb-2">{site.description}</p>
                    )}
                    <div className="space-y-1.5">
                      {site.trackedSiteEventsGroupedByType.map((event) => (
                        <div
                          key={event.siteEventType}
                          className="flex items-center justify-between rounded bg-background/50 px-2.5 py-1.5 border border-border/50"
                        >
                          <div className="flex items-center gap-2">
                            <Zap className="h-3.5 w-3.5 text-growi-blue" />
                            <span className="text-xs font-medium text-foreground">
                              {SITE_EVENT_TYPE_LABELS[event.siteEventType]}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-growi-money">
                              ${event.amount.toFixed(3)}
                            </span>
                            <span className="text-xs text-muted-foreground">per</span>
                            <span className="text-xs font-semibold text-foreground">
                              {event.volumeStep} {event.volumeStep === 1 ? 'event' : 'events'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {campaign.interests.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {campaign.interests.map((interest) => (
                  <InterestTag key={interest} label={interest} />
                ))}
              </div>
            </div>
          )}
          
          {campaign.demographics.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Target Audience</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {campaign.demographics.map((demographic) => (
                  <TargetAudienceTag key={demographic} label={demographic} />
                ))}
              </div>
            </div>
          )}
          
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
                        <RegionTag key={region} label={region} />
                      ))}
                    </div>
                  </div>
                )}
                {campaign.countries.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.countries.map((country) => (
                        <CountryTag key={country} label={country} />
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
  );
};
