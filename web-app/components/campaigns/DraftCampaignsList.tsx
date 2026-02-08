'use client';

import { CampaignStatusBadge } from '@/components/campaigns/CampaignStatusBadge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { InterestTag } from '@/components/ui/interest-tag';
import { LoadingCard } from '@/components/ui/loading-card';
import { TargetAudienceTag } from '@/components/ui/target-audience-tag';
import { groupTrackedEventsByType } from '@/helpers/campaigns';
import { useCampaigns } from '@/hooks/use-campaigns';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SITE_EVENT_TYPE_SHORT_LABELS } from '@/lib/constants';
import { CampaignStatus } from '@/lib/db/enums';
import { UserRoleType } from '@/types';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Eraser, Users } from 'lucide-react';
import Link from 'next/link';

interface MyCampaignsListProps {
  userRole: UserRoleType,
  deps?: (number | Date | string)[],
}

function getCampaignDuration(startDate: string | number, endDate: string | number): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getTime() === end.getTime()) return 'Ongoing';
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) return 'Same day';
  if (diffDays < 7) return `${diffDays}d`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)}mo`;
  return `${Math.ceil(diffDays / 365)}y`;
}

function getDateRange(startDate: string | number, endDate: string | number): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  if (start.getTime() === new Date(endDate).getTime()) {
    return `${startStr} - Ongoing`;
  }
  
  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return `${startStr} - ${endStr}`;
}

export const DraftCampaignsList = ({ userRole, deps }: MyCampaignsListProps) => {
  
  const {
    campaigns,
    isLoading,
    error,
  } = useCampaigns([ CampaignStatus.DRAFT ], userRole, false, deps);
  
  const isManager = userRole === 'manager';
  const primaryColorClass = isManager ? 'text-growi-blue' : 'text-growi-success';
  const primaryBorderHover = isManager ? 'hover:border-growi-blue/50' : 'hover:border-growi-success/50';
  const primaryBadge = isManager ? 'bg-growi-blue/20 text-growi-blue' : 'bg-growi-success/20 text-growi-success';
  
  const hasCampaigns = campaigns.length > 0;
  
  if (!hasCampaigns) {
    return null;
  }
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Eraser className={`h-5 w-5 ${primaryColorClass}`} />
          Draft Campaigns
        </h2>
        {hasCampaigns && (
          <Badge className={`${primaryBadge} border-transparent`}>{campaigns.length} draft</Badge>
        )}
      </div>
      
      <ErrorCard error={error} />
      
      {(isLoading && !hasCampaigns) ? <LoadingCard userRole={userRole} /> : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2"
        >
          {campaigns.map((campaign) => {
            return (
              <motion.div key={campaign.id} variants={staggerItem}>
                <Link href={`/${userRole}/campaigns/${campaign.id}`}>
                  <Card className={`cursor-pointer transition-colors ${primaryBorderHover}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-foreground">{campaign.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <CampaignStatusBadge status={campaign.status} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Campaign Period and Duration */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{getDateRange(campaign.startDate, campaign.endDate)}</span>
                        </div>
                        <span className="font-medium">{getCampaignDuration(campaign.startDate, campaign.endDate)}</span>
                      </div>
                      
                      <div
                        className="flex justify-evenly text-xs text-muted-foreground w-full"
                        style={{ justifyContent: 'space-evenly' }}
                      >
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>Slots:</span>
                          aaaa
                          <span className="font-medium text-foreground">{campaign.slots}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>Budget:</span>
                          <span className="font-medium text-foreground">{campaign.budgetTotal}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {(() => {
                          const grouped = groupTrackedEventsByType(campaign.sites);
                          return grouped.slice(0, 4).map((event, index) => {
                            return (
                              <div key={event.eventType}>
                                <p className="text-xs text-muted-foreground truncate">{SITE_EVENT_TYPE_SHORT_LABELS[event.eventType]}</p>
                              </div>
                            );
                          });
                        })()}
                      </div>
                      
                      {(campaign.interests.length > 0 || campaign.demographics.length > 0) && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {campaign.interests.slice(0, 2).map((interest) => (
                            <InterestTag
                              key={interest}
                              label={interest}
                            />
                          ))}
                          {campaign.demographics.slice(0, 2).map((demo) => (
                            <TargetAudienceTag key={demo} label={demo} />
                          ))}
                          {(campaign.interests.length + campaign.demographics.length) > 4 && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 bg-muted/50 text-muted-foreground border-transparent"
                            >
                              +{(campaign.interests.length + campaign.demographics.length) - 4}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
