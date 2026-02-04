import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { User } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiErrorResponse, UpdateUserDTO } from '@/types';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id },
          { walletAddress: id },
        ],
      },
      include: {
        _count: {
          select: { campaignsCreated: true, participations: true },
        },
      },
    });
    
    if (!user) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      };
      return { response, status: 404 };
    }
    
    const response: ApiDataResponse<User> = {
      success: true,
      data: user,
    };
    return { response };
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    const body = await req.json();
    
    const validatedData = UpdateUserDTO.parse(body);
    
    const updated = await prisma.user.update({
      where: { id },
      data: validatedData,
    });
    
    const response: ApiDataResponse<User> = {
      success: true,
      data: updated,
    };
    return { response };
  });
}
