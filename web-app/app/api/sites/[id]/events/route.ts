import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, UpsertSiteEventSchema } from '@/types';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const { id: siteId } = await params;
    const body = await req.json();
    
    // Validate input
    const validatedData = UpsertSiteEventSchema.parse(body);
    
    // Check if site exists and user owns it
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });
    
    if (!site) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        },
      };
      return { response, status: 404 };
    }
    
    if (site.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to add events to this site',
        },
      };
      return { response, status: 403 };
    }
    
    // Create site event with selectors
    const siteEvent = await prisma.siteEvent.create({
      data: {
        siteId,
        name: validatedData.name,
        eventType: validatedData.eventType,
        selectors: {
          create: validatedData.selectors.map(sel => ({
            selector: sel.selector,
            eventType: sel.eventType,
            isActive: sel.isActive ?? true,
          })),
        },
      },
      include: {
        selectors: true,
      },
    });
    
    const response: ApiDataResponse<typeof siteEvent> = {
      success: true,
      data: siteEvent,
    };
    return { response };
  });
}
