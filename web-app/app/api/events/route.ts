import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { TrackedEvent } from '';
import { ApiDataResponse, ApiErrorResponse } from '@/types';
import { z } from 'zod';

const TrackEventSchema = z.object({
  campaignRewardEventId: z.string().cuid('Invalid campaign reward event ID'),
  clientId: z.string().cuid('Invalid client ID').optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
});

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const payload = TrackEventSchema.parse(body);

    // Verify the CampaignRewardEvent exists
    const campaignRewardEvent = await prisma.campaignRewardEvent.findUnique({
      where: { id: payload.campaignRewardEventId },
      include: {
        campaign: true,
        rewardEvent: true,
      },
    });

    if (!campaignRewardEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Campaign reward event not found',
        },
      };
      return { response, status: 404 };
    }

    // Get or create Client
    let clientId = payload.clientId;

    if (!clientId) {
      // Create a new client
      const client = await prisma.client.create({
        data: {
          userAgent: payload.userAgent,
          ipAddress: payload.ipAddress,
        },
      });
      clientId = client.id;
    } else {
      // Verify client exists
      const existingClient = await prisma.client.findUnique({
        where: { id: clientId },
      });

      if (!existingClient) {
        const response: ApiErrorResponse = {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Client not found',
          },
        };
        return { response, status: 404 };
      }
    }

    // Create the tracked event
    const trackedEvent = await prisma.trackedEvent.create({
      data: {
        campaignRewardEventId: payload.campaignRewardEventId,
        clientId,
        data: payload.data ? JSON.parse(JSON.stringify(payload.data)) : undefined,
        timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      },
    });

    const response: ApiDataResponse<{ event: TrackedEvent; clientId: string }> = {
      success: true,
      data: {
        event: trackedEvent,
        clientId,
      },
    };

    return { response, status: 201 };
  });
}

// GET endpoint to retrieve events for a campaign
export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);

    const campaignRewardEventId = searchParams.get('campaignRewardEventId');
    const clientId = searchParams.get('clientId');
    const limit = parseInt(searchParams.get('limit') ?? '50');
    const offset = parseInt(searchParams.get('offset') ?? '0');

    if (!campaignRewardEventId && !clientId) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Either campaignRewardEventId or clientId is required',
        },
      };
      return { response, status: 400 };
    }

    const whereClause: { campaignRewardEventId?: string; clientId?: string } = {};
    if (campaignRewardEventId) whereClause.campaignRewardEventId = campaignRewardEventId;
    if (clientId) whereClause.clientId = clientId;

    const [events, total] = await Promise.all([
      prisma.trackedEvent.findMany({
        where: whereClause,
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
        include: {
          campaignRewardEvent: {
            include: {
              rewardEvent: true,
            },
          },
        },
      }),
      prisma.trackedEvent.count({ where: whereClause }),
    ]);

    const response: ApiDataResponse<{ events: typeof events; total: number }> = {
      success: true,
      data: {
        events,
        total,
      },
    };

    return { response };
  });
}
