import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse, UpsertSiteSchema } from '@/types';
import { NextRequest } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return safeRouteWithWalletAddress(req, async (user) => {
    
    const { id } = await params;
    const body = await req.json();
    const validatedData = UpsertSiteSchema.parse(body);
    
    if (!id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'MISSING_ID',
          message: 'Site ID is required',
        },
      };
      return { response, status: 400 };
    }
    
    const existingSite = await prisma.site.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingSite) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        },
      };
      return { response, status: 404 };
    }
    
    if (existingSite.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to update this site',
        },
      };
      return { response, status: 403 };
    }
    
    await prisma.site.update({
      where: {
        id,
      },
      data: {
        name: validatedData.name,
        url: validatedData.url,
        description: validatedData.description || '',
      },
    });
    
    const response: ApiDataResponse<true> = {
      success: true,
      data: true,
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
          message: 'Site ID is required',
        },
      };
      return { response, status: 400 };
    }

    const existingSite = await prisma.site.findUnique({
      where: {
        id,
      },
    });

    if (!existingSite) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'SITE_NOT_FOUND',
          message: 'Site not found',
        },
      };
      return { response, status: 404 };
    }

    if (existingSite.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'You do not have permission to delete this site',
        },
      };
      return { response, status: 403 };
    }

    await prisma.site.delete({
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
