import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, UpsertSiteEventSchema } from '@/types';
import { NextRequest } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) {
  return safeRouteWithWalletAddress(req, async (user) => {
    
    const { eventId } = await params;
    const body = await req.json();
    
    if (!eventId) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'MISSING_ID',
          message: 'Site Event ID is required',
        },
      };
      return { response, status: 400 };
    }
    
    const validatedData = UpsertSiteEventSchema.parse(body);
    
    const existingSiteEvent = await prisma.siteEvent.findUnique({
      where: {
        id: eventId,
      },
      include: {
        site: true,
        selectors: true,
      },
    });
    
    if (!existingSiteEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'SITE_EVENT_NOT_FOUND',
          message: 'Site event not found',
        },
      };
      return { response, status: 404 };
    }
    
    if (existingSiteEvent.site.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to edit this site event',
        },
      };
      return { response, status: 403 };
    }
    
    // Delete existing selectors
    await prisma.siteEventSelector.deleteMany({
      where: { siteEventId: eventId },
    });
    
    // Update site event with new data and selectors
    const updatedEvent = await prisma.siteEvent.update({
      where: {
        id: eventId,
      },
      data: {
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
    
    const response: ApiDataResponse<typeof updatedEvent> = {
      success: true,
      data: updatedEvent,
    };
    return { response };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return safeRouteWithWalletAddress(req, async (user) => {
    
    const { id } = await params;
    
    if (!id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'MISSING_ID',
          message: 'Site Event ID is required',
        },
      };
      return { response, status: 400 };
    }
    
    const existingSiteEvent = await prisma.siteEvent.findUnique({
      where: {
        id,
      },
      include: {
        site: true,
      },
    });
    
    if (!existingSiteEvent) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'SITE_EVENT_NOT_FOUND',
          message: 'Site event not found',
        },
      };
      return { response, status: 404 };
    }
    
    if (existingSiteEvent.site.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to delete this site event',
        },
      };
      return { response, status: 403 };
    }
    
    await prisma.siteEvent.delete({
      where: {
        id,
      },
    });
    
    const response: ApiDataResponse<true> = {
      success: true,
      data: true,
    };
    return { response };
  });
}
