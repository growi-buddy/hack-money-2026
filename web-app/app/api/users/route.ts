import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { InfluencerVerificationStatus, Prisma, SocialMedia, User } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiListResponse, CreateUserDTO, UserResponseDTO } from '@/types';

// Helper function to transform User to UserResponseDTO
function transformToUserResponseDTO(user: User & { socialMedias: SocialMedia[] }): UserResponseDTO {
  return {
    id: user.id,
    name: user.name || '',
    walletAddress: user.walletAddress,
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    avatar: user.avatar || '',
    interests: user.interests || [],
    affinities: user.affinities || [],
    influencerVerification: user.influencerVerification === InfluencerVerificationStatus.VERIFIED,
    influencerVerificationStatus: user.influencerVerification,
    socialMedias: user.socialMedias.map(sm => ({
      platform: sm.platform || '',
      username: sm.username || '',
      followers: sm.followers || 0,
      url: sm.url || '',
    })),
  };
}

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '10'));
    const skip = (page - 1) * limit;
    const type = searchParams.get('type');
    
    const where: Prisma.UserWhereInput = {};
    
    if (type === 'manager') {
      where.campaignsCreated = {
        some: {},
      };
    } else if (type === 'influencer') {
      where.influencerVerification = InfluencerVerificationStatus.VERIFIED;
    }
    
    const [ users, total ] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          socialMedias: true,
        },
      }),
      prisma.user.count({ where }),
    ]);
    
    const transformedUsers = users.map(transformToUserResponseDTO);
    
    const response: ApiListResponse<UserResponseDTO> = {
      success: true,
      data: transformedUsers,
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
