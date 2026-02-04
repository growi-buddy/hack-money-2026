import { getCampaignById } from '@/app/api/campaigns/services';
import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, CampaignRewardEventsDTO, UpdateCampaignRewardEventsSchema } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    
    const campaignId = searchParams.get('campaignId');
    
    if (!campaignId) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'campaignId is required' },
      };
      return { response, status: 400 };
    }
    
    const campaign = await getCampaignById(campaignId);
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    const response: ApiDataResponse<CampaignRewardEventsDTO> = {
      success: true,
      data: {
        campaignId: campaign.id,
        rewardEvents: campaign.rewardEvents.map(event => ({
          id: event.id,
          eventType: event.eventType,
          amount: +event.amount,
          volumeStep: event.volumeStep,
          selectors: event.selectors.map(sel => ({
            id: sel.id,
            selector: sel.selector,
            eventType: sel.eventType,
            isActive: sel.isActive,
          })),
        })),
      },
    };
    return { response };
  });
}

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    
    const validatedData = UpdateCampaignRewardEventsSchema.parse(body);
    
    const { campaignId, rewardEvents } = validatedData;
    
    const campaign = await getCampaignById(campaignId);
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    await prisma.rewardEvent.deleteMany({
      where: { campaignId },
    });
    
    const createdRewardEvents = await Promise.all(
      rewardEvents.map(event =>
        prisma.rewardEvent.create({
          data: {
            campaignId,
            eventType: event.eventType,
            amount: event.amount,
            volumeStep: event.volumeStep,
            selectors: event.selectors
              ? {
                create: event.selectors.map(sel => ({
                  selector: sel.selector,
                  eventType: sel.eventType,
                  isActive: sel.isActive,
                })),
              }
              : undefined,
          },
          include: { selectors: true },
        }),
      ),
    );
    
    const response: ApiDataResponse<CampaignRewardEventsDTO> = {
      success: true,
      data: {
        campaignId,
        rewardEvents: createdRewardEvents.map(event => ({
          id: event.id,
          eventType: event.eventType,
          amount: +event.amount,
          volumeStep: event.volumeStep,
          selectors: event.selectors.map(sel => ({
            id: sel.id,
            selector: sel.selector,
            eventType: sel.eventType,
            isActive: sel.isActive,
          })),
        })),
      },
    };
    return { response, status: 201 };
  });
}
