import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, CampaignFiltersResponse } from '@/types';

export async function GET() {
  return safeRoute(async () => {
    const campaigns = await prisma.campaign.findMany({
      select: {
        interests: true,
        demographics: true,
        regions: true,
        countries: true,
      },
    });
    
    const interestsSet = new Set<string>();
    const demographicsSet = new Set<string>();
    const regionsSet = new Set<string>();
    const countriesSet = new Set<string>();
    
    campaigns.forEach((campaign) => {
      campaign.interests?.forEach((interest) => interestsSet.add(interest));
      campaign.demographics?.forEach((demographic) => demographicsSet.add(demographic));
      campaign.regions?.forEach((region) => regionsSet.add(region));
      campaign.countries?.forEach((country) => countriesSet.add(country));
    });
    
    const data: CampaignFiltersResponse = {
      interests: Array.from(interestsSet).sort(),
      demographics: Array.from(demographicsSet).sort(),
      regions: Array.from(regionsSet).sort(),
      countries: Array.from(countriesSet).sort(),
    };
    
    const response: ApiDataResponse<CampaignFiltersResponse> = {
      success: true,
      data,
    };
    
    return { response };
  });
}
