import { corsJsonResponse, handleOptions } from '@/lib/cors';
import { prisma } from '@/lib/db';
import { ServerPublisher } from '@/lib/realtime';
import { z } from 'zod';

// Handle CORS preflight
export async function OPTIONS() {
  return handleOptions();
}

const TrackEventSchema = z.object({
  campaignRewardEventId: z.string().min(1, 'Campaign reward event ID is required'),
  sessionId: z.string().min(1, 'Session ID is required'),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
});

// POST /api/client/event - Track an event (public, CORS enabled)
export async function POST(req: Request) {
  try {
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
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign reward event not found' },
        },
        404
      );
    }

    // Find or create Client by sessionId
    let client = await prisma.client.findUnique({
      where: { sessionId: payload.sessionId },
    });

    if (!client) {
      // Create new client with sessionId
      client = await prisma.client.create({
        data: {
          sessionId: payload.sessionId,
          userAgent: payload.userAgent,
          ipAddress: payload.ipAddress,
        },
      });
    }

    // Create the tracked event
    const trackedEvent = await prisma.trackedEvent.create({
      data: {
        campaignRewardEventId: payload.campaignRewardEventId,
        clientId: client.id,
        data: payload.data ? JSON.parse(JSON.stringify(payload.data)) : undefined,
        timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      },
    });

    // Publish to Ably for real-time updates
    try {
      await ServerPublisher.publishCampaignEvent(
        campaignRewardEvent.campaignId,
        'tracked_event',
        {
          id: trackedEvent.id,
          eventType: campaignRewardEvent.rewardEvent.eventType,
          eventName: campaignRewardEvent.rewardEvent.name,
          amount: Number(campaignRewardEvent.amount),
          timestamp: trackedEvent.timestamp.toISOString(),
          data: trackedEvent.data,
        }
      );
    } catch (ablyError) {
      // Log but don't fail the request if Ably publish fails
      console.error('[Event API] Failed to publish to Ably:', ablyError);
    }

    return corsJsonResponse(
      {
        success: true,
        data: {
          event: trackedEvent,
        },
      },
      201
    );
  } catch (error) {
    console.error('[Event API] Error:', error);

    if (error instanceof z.ZodError) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: error.errors[0].message },
        },
        400
      );
    }

    return corsJsonResponse(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Internal server error' },
      },
      500
    );
  }
}