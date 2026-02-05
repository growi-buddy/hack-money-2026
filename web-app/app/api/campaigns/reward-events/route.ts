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
        rewardEvents: campaign.rewardEvents.map(cre => ({
          id: cre.id,
          rewardEventId: cre.rewardEventId,
          amount: +cre.amount,
          volumeStep: cre.volumeStep,
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

    // Verify all reward events exist
    const rewardEventIds = rewardEvents.map(re => re.rewardEventId);
    const existingRewardEvents = await prisma.rewardEvent.findMany({
      where: { id: { in: rewardEventIds } },
    });

    if (existingRewardEvents.length !== rewardEventIds.length) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'One or more reward events not found' },
      };
      return { response, status: 400 };
    }

    // Delete existing campaign reward events
    await prisma.campaignRewardEvent.deleteMany({
      where: { campaignId },
    });

    // Create new campaign reward event links
    const createdLinks = await Promise.all(
      rewardEvents.map(event =>
        prisma.campaignRewardEvent.create({
          data: {
            campaignId,
            rewardEventId: event.rewardEventId,
            amount: event.amount,
            volumeStep: event.volumeStep,
          },
          include: {
            rewardEvent: {
              include: { selectors: true },
            },
          },
        }),
      ),
    );

    const response: ApiDataResponse<CampaignRewardEventsDTO> = {
      success: true,
      data: {
        campaignId,
        rewardEvents: createdLinks.map(cre => ({
          id: cre.id,
          rewardEventId: cre.rewardEventId,
          amount: +cre.amount,
          volumeStep: cre.volumeStep,
        })),
      },
    };
    return { response, status: 201 };
  });
}
