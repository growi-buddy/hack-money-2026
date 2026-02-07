import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignResponseDTO } from '@/types';
import { Calendar, DollarSign, Tag, Users } from 'lucide-react';

export const CampaignInfoCard = ({ campaign }: { campaign: CampaignResponseDTO }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Campaign Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Description */}
          {campaign.description && (
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
              <p className="text-foreground text-sm leading-relaxed">{campaign.description}</p>
            </div>
          )}
          
          {/* Duration */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-growi-blue" />
              <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
            </div>
            <div className="text-sm text-foreground">
              {campaign.startDate && campaign.endDate ? (
                <>
                  <p>{new Date(campaign.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })} → {new Date(campaign.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">Not specified</p>
              )}
            </div>
          </div>
          
          {/* Budget & Slots */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-growi-money" />
              <h4 className="text-sm font-medium text-muted-foreground">Budget & Slots</h4>
            </div>
            <div className="text-sm text-foreground space-y-1">
              <p>Budget: <span className="font-semibold">${campaign.budgetTotal.toLocaleString()}</span></p>
              <p>Slots: <span className="font-semibold">{campaign.slots}</span></p>
            </div>
          </div>
          
          {/* Interests */}
          {campaign.interests.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Interests</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {campaign.interests.map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Target Demographics */}
          {campaign.demographics.length > 0 && (
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-growi-blue" />
                <h4 className="text-sm font-medium text-muted-foreground">Target Audience</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {campaign.demographics.map((demographic) => (
                  <Badge
                    key={demographic}
                    className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                  >
                    {demographic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Geographic */}
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
                        <Badge
                          key={region}
                          className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                        >
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {campaign.countries.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.countries.map((country) => (
                        <Badge
                          key={country}
                          className="bg-growi-blue/10 text-growi-blue hover:bg-growi-blue/20"
                        >
                          {country}
                        </Badge>
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
