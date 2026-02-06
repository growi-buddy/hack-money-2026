import {
  CampaignDashboardData,
  getCampaignById,
  getCampaignDashboard,
  getCampaignForInfluencer,
  InfluencerCampaignView,
} from '@/app/api/campaigns/services';
import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { Campaign, CampaignStatus } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiErrorResponse, UpdateCampaignDTO } from '@/types';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const dashboard = searchParams.get('dashboard') === 'true';
    const view = searchParams.get('view');
    
    if (dashboard) {
      const campaignData = await getCampaignDashboard(id);
      
      if (!campaignData) {
        const response: ApiErrorResponse = {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign not found' },
        };
        return { response, status: 404 };
      }
      
      const response: ApiDataResponse<CampaignDashboardData> = {
        success: true,
        data: campaignData,
      };
      
      return { response };
    }
    
    // Influencer view - includes owner info and formatted reward events
    if (view === 'influencer') {
      const campaignData = await getCampaignForInfluencer(id);
      
      if (!campaignData) {
        const response: ApiErrorResponse = {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign not found' },
        };
        return { response, status: 404 };
      }
      
      const response: ApiDataResponse<InfluencerCampaignView> = {
        success: true,
        data: campaignData,
      };
      
      return { response };
    }
    
    const campaign = await getCampaignById(id);
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    const response: ApiDataResponse<Campaign> = {
      success: true,
      data: campaign,
    };
    
    return { response };
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const body = await req.json();
    const { id } = await params;
    
    const validatedData = UpdateCampaignDTO.parse(body);
    
    const updated = await prisma.$transaction(async (tx) => {
      const { rewardEvents, ...campaignData } = validatedData;
      
      // Only update rewardEvents if they are provided in the request
      if (rewardEvents !== undefined) {
        // Delete existing campaign reward event links
        await tx.campaignRewardEvent.deleteMany({
          where: { campaignId: id },
        });
        
        // Create new campaign reward event links
        if (rewardEvents.length > 0) {
          await tx.campaignRewardEvent.createMany({
            data: rewardEvents.map((event) => ({
              campaignId: id,
              rewardEventId: event.rewardEventId,
              amount: event.amount,
              volumeStep: event.volumeStep ?? 1,
            })),
          });
        }
      }
      
      await tx.campaign.update({
        where: { id },
        data: campaignData,
      });
      
      return tx.campaign.findUnique({
        where: { id },
        include: {
          rewardEvents: {
            include: {
              rewardEvent: {
                include: { selectors: true },
              },
            },
          },
        },
      });
    });
    
    const response: ApiDataResponse<Campaign> = {
      success: true,
      data: updated!,
    };
    
    return { response };
  });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    
    const deletedCampaign = await prisma.campaign.update({
      where: { id },
      data: { status: CampaignStatus.DELETED },
    });
    
    const response: ApiDataResponse<{ id: string, status: CampaignStatus }> = {
      success: true,
      data: { id: deletedCampaign.id, status: CampaignStatus.DELETED },
    };
    return { response };
  });
}
