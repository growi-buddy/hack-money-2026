import { getCampaignResponseDTO } from '@/app/api/campaigns/services';
import { corsJsonResponse, handleOptions } from '@/lib/cors';
import { prisma } from '@/lib/db';
import { ServerPublisher } from '@/lib/realtime';
import { z } from 'zod';

// Handle CORS preflight
export async function OPTIONS() {
  return handleOptions();
}

const TrackEventSchema = z.object({
  campaignSiteEventId: z.string().min(1, 'Campaign site event ID is required'),
  participationId: z.string().min(1, 'Participation ID is required'),
  sessionId: z.string().min(1, 'Session ID is required'),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  data: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
});

// Extract IP address from request headers
function getClientIp(req: Request): string | undefined {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return undefined;
}

// POST /api/client/event - Track an event (public, CORS enabled)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = TrackEventSchema.parse(body);
    
    const clientIp = payload.ipAddress || getClientIp(req);
    
    const campaignSiteEvent = await prisma.campaignSiteEvent.findUnique({
      where: { id: payload.campaignSiteEventId },
      include: {
        campaign: true,
        siteEvent: {
          include: {
            site: true,
          },
        },
      },
    });
    
    if (!campaignSiteEvent) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Campaign site event not found' },
        },
        404,
      );
    }
    
    // Verify the participation exists
    const participation = await prisma.participation.findUnique({
      where: { id: payload.participationId },
      include: {
        campaign: true,
        influencer: true,
      },
    });
    
    if (!participation) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Participation not found' },
        },
        404,
      );
    }
    
    // Verify participation belongs to the campaign
    if (participation.campaignId !== campaignSiteEvent.campaignId) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'INVALID_REQUEST', message: 'Participation does not belong to this campaign' },
        },
        400,
      );
    }
    
    let client = await prisma.client.findUnique({
      where: { sessionId: payload.sessionId },
    });
    
    if (!client) {
      client = await prisma.client.create({
        data: {
          sessionId: payload.sessionId,
          userAgent: payload.userAgent,
          ipAddress: clientIp,
        },
      });
    }
    
    const trackedEvent = await prisma.trackedSiteEvent.create({
      data: {
        siteEventId: campaignSiteEvent.siteEventId,
        participationId: payload.participationId,
        clientId: client.id,
        data: payload.data ? JSON.parse(JSON.stringify(payload.data)) : undefined,
        timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      },
    });
    
    // Publish to Ably for real-time updates
    try {
      // Publish tracked event
      await ServerPublisher.publishCampaignEvent(
        campaignSiteEvent.campaignId,
        'tracked_event',
        {
          id: trackedEvent.id,
          eventType: campaignSiteEvent.siteEvent.eventType,
          eventName: campaignSiteEvent.siteEvent.name,
          amount: Number(campaignSiteEvent.amount) / Number(campaignSiteEvent.volumeStep),
          timestamp: trackedEvent.timestamp.toISOString(),
          data: trackedEvent.data,
          participationId: participation.id,
          influencerWallet: participation.influencer.walletAddress,
          influencerName: participation.influencer.name,
        },
      );
      
      // Publish campaign changes with full campaign DTO
      const campaignDTO = await getCampaignResponseDTO(
        campaignSiteEvent.campaignId,
        participation.influencer.walletAddress,
      );
      
      if (campaignDTO) {
        await ServerPublisher.publishCampaignEvent(
          campaignSiteEvent.campaignId,
          'campaign_changes',
          campaignDTO,
        );
      }
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
      201,
    );
  } catch (error) {
    console.error('[Event API] Error:', error);
    
    if (error instanceof z.ZodError) {
      return corsJsonResponse(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: error.errors[0].message },
        },
        400,
      );
    }
    
    return corsJsonResponse(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Internal server error' },
      },
      500,
    );
  }
}
