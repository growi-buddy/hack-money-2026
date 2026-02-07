import { getCampaignResponseDTO } from '@/app/api/campaigns/services';
import { safeRoute, safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, CampaignResponseDTO, UpdateCampaignDTO } from '@/types';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const dashboard = searchParams.get('dashboard') === 'true';
    
    if (dashboard) {
      const campaignData = await getCampaignResponseDTO(id, user.walletAddress);
      
      if (!campaignData) {
        const response: ApiErrorResponse = {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign not found' },
        };
        return { response, status: 404 };
      }
      
      const response: ApiDataResponse<CampaignResponseDTO> = {
        success: true,
        data: campaignData,
      };
      
      return { response };
    }
    
    // // Influencer view - includes owner info and formatted reward events
    // if (view === 'influencer') {
    //   const campaignData = await getCampaignForInfluencer(id);
    //
    //   if (!campaignData) {
    //     const response: ApiErrorResponse = {
    //       success: false,
    //       error: { code: 'NOT_FOUND', message: 'Campaign not found' },
    //     };
    //     return { response, status: 404 };
    //   }
    //
    //   const response: ApiDataResponse<InfluencerCampaignView> = {
    //     success: true,
    //     data: campaignData,
    //   };
    //
    //   return { response };
    // }
    
    const campaign = await getCampaignResponseDTO(id, user.walletAddress);
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    const response: ApiDataResponse<CampaignResponseDTO> = {
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
    
    await prisma.$transaction(async (tx) => {
      const { siteEvents, ...campaignData } = validatedData;
      
      // Only update rewardEvents if they are provided in the request
      if (siteEvents !== undefined) {
        // Delete existing campaign reward event links
        await tx.campaignSiteEvent.deleteMany({
          where: { campaignId: id },
        });
        
        // Create new campaign reward event links
        if (siteEvents.length > 0) {
          await tx.campaignSiteEvent.createMany({
            data: siteEvents.map((event) => ({
              campaignId: id,
              siteEventId: event.siteEventId,
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
    });
    
    const response: ApiDataResponse<true> = {
      success: true,
      data: true,
    };
    
    return { response };
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    const body = await req.json();
    const { action } = body;

    // Handle restore action
    if (action === 'restore') {
      const restoredCampaign = await prisma.campaign.update({
        where: { id },
        data: { deletedAt: null },
      });

      const response: ApiDataResponse<{ id: string; message: string }> = {
        success: true,
        data: {
          id: restoredCampaign.id,
          message: 'Campaign restored successfully',
        },
      };
      return { response };
    }

    // Handle other actions if needed
    const response: ApiErrorResponse = {
      success: false,
      error: {
        code: 'INVALID_ACTION',
        message: 'Invalid action. Use "restore" to unarchive a campaign.',
      },
    };
    return { response, status: 400 };
  });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;

    const deletedCampaign = await prisma.campaign.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    const response: ApiDataResponse<{ id: string }> = {
      success: true,
      data: { id: deletedCampaign.id },
    };
    return { response };
  });
}
