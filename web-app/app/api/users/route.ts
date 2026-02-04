import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { User } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiListResponse, CreateUserDTO } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '10'));
    const skip = (page - 1) * limit;
    
    const [ users, total ] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);
    
    const response: ApiListResponse<User> = {
      success: true,
      data: users,
      meta: { total, page, limit },
    };
    return { response };
  });
}

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const validatedData = CreateUserDTO.parse(body);
    
    const user = await prisma.user.create({
      data: validatedData,
    });
    
    const response: ApiDataResponse<User> = {
      success: true,
      data: user,
    };
    return { response, status: 201 };
  });
}
