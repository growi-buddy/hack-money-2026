import { corsJsonResponse, handleOptions } from '@/lib/cors';
import { prisma } from '@/lib/db';

interface SelectorData {
  campaignSiteEventId: string;
  siteEventId: string;
  siteEventName: string;
  eventType: string;
  selector: string;
  selectorEventType: string;
  siteId: string;
  siteName: string;
  siteUrl: string;
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
        400,
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
        404,
      );
    }

    // Fetch all CampaignSiteEvents with SiteEvents and their Selectors
    const campaignSiteEvents = await prisma.campaignSiteEvent.findMany({
      where: { campaignId },
      include: {
        siteEvent: {
          include: {
            site: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
            selectors: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    // Flatten the data structure for the client script
    const selectors: SelectorData[] = [];

    for (const cse of campaignSiteEvents) {
      for (const selector of cse.siteEvent.selectors) {
        selectors.push({
          campaignSiteEventId: cse.id,
          siteEventId: cse.siteEvent.id,
          siteEventName: cse.siteEvent.name,
          eventType: cse.siteEvent.eventType,
          selector: selector.selector,
          selectorEventType: selector.eventType,
          siteId: cse.siteEvent.site.id,
          siteName: cse.siteEvent.site.name,
          siteUrl: cse.siteEvent.site.url,
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
      500,
    );
  }
}
