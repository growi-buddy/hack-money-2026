import { prisma } from '@/lib/db';
import { corsJsonResponse, handleOptions } from '@/lib/cors';

interface SelectorData {
  campaignRewardEventId: string;
  rewardEventId: string;
  rewardEventName: string;
  eventType: string;
  selector: string;
  selectorEventType: string;
}

// Handle CORS preflight
export async function OPTIONS() {
  return handleOptions();
}

// GET /api/selectors?id=campaignId - Get all selectors for a campaign (public, CORS enabled)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('id');

    if (!campaignId) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'BAD_REQUEST', message: 'Campaign ID (id) is required' },
        },
        400
      );
    }

    // Verify campaign exists and is active
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign not found' },
        },
        404
      );
    }

    // Fetch all CampaignRewardEvents with RewardEvents and their Selectors
    const campaignRewardEvents = await prisma.campaignRewardEvent.findMany({
      where: { campaignId },
      include: {
        rewardEvent: {
          include: {
            selectors: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    // Flatten the data structure for the client script
    const selectors: SelectorData[] = [];

    for (const cre of campaignRewardEvents) {
      for (const selector of cre.rewardEvent.selectors) {
        selectors.push({
          campaignRewardEventId: cre.id,
          rewardEventId: cre.rewardEvent.id,
          rewardEventName: cre.rewardEvent.name,
          eventType: cre.rewardEvent.eventType,
          selector: selector.selector,
          selectorEventType: selector.eventType,
        });
      }
    }

    return corsJsonResponse({
      success: true,
      data: selectors,
    });
  } catch (error) {
    console.error('[Selectors API] Error:', error);
    return corsJsonResponse(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Internal server error' },
      },
      500
    );
  }
}