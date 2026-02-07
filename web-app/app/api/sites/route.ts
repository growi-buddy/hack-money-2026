import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiListResponse, SiteResponseDTO, UpsertSiteSchema } from '@/types';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return safeRouteWithWalletAddress(req, async (user) => {

    const sites = await prisma.site.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        siteEvents: {
          include: {
            selectors: true,
          },
        },
      },
    });

    const response: ApiListResponse<SiteResponseDTO> = {
      success: true,
      data: sites.map(site => ({
        id: site.id,
        name: site.name,
        url: site.url,
        description: site.description,
        createdAt: new Date(site.createdAt).getTime(),
        updatedAt: new Date(site.updatedAt).getTime(),
        events: site.siteEvents.map(event => ({
          id: event.id,
          name: event.name,
          eventType: event.eventType,
          createdAt: new Date(event.createdAt).getTime(),
          updatedAt: new Date(event.updatedAt).getTime(),
          selectors: event.selectors.map(selector => ({
            id: selector.id,
            selector: selector.selector,
            eventType: selector.eventType,
            isActive: selector.isActive,
            createdAt: new Date(selector.createdAt).getTime(),
            updatedAt: new Date(selector.updatedAt).getTime(),
          })),
        })),
      })),
      meta: {
        limit: 0,
        total: sites.length,
        page: 0,
      },
    };
    return { response };
  });
}

export async function POST(req: NextRequest) {
  return safeRouteWithWalletAddress(req, async (user) => {
    
    const body = await req.json();
    const validatedData = UpsertSiteSchema.parse(body);
    
    await prisma.site.create({
      data: {
        ownerId: user.id,
        name: validatedData.name,
        url: validatedData.url,
        description: validatedData.description || '',
      },
    });
    
    const response: ApiDataResponse<true> = {
      success: true,
      data: true,
    };
    return { response, status: 201 };
  });
}
