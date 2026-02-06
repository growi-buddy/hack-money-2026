import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { SocialMediaPlatform } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiErrorResponse } from '@/types';
import { z } from 'zod';

const SocialMediaSchema = z.object({
  id: z.string().optional(),
  platform: z.nativeEnum(SocialMediaPlatform),
  username: z.string().min(1),
  followers: z.string().optional(),
  url: z.string().optional(),
});

const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  interests: z.array(z.string()).optional(),
  affinities: z.array(z.string()).optional(),
  socialMedias: z.array(SocialMediaSchema).optional(),
});

// GET /api/users/profile?walletAddress=...
export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Wallet address is required' },
      };
      return { response, status: 400 };
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        socialMedias: true,
        campaignsCreated: {
          select: {
            budgetTotal: true,
            status: true,
          },
        },
        _count: {
          select: {
            participations: true,
            campaignsCreated: true,
          },
        },
      },
    });

    if (!user) {
      // Create user if not exists
      const newUser = await prisma.user.create({
        data: { walletAddress },
        include: {
          socialMedias: true,
          campaignsCreated: {
            select: {
              budgetTotal: true,
              status: true,
            },
          },
          _count: {
            select: {
              participations: true,
              campaignsCreated: true,
            },
          },
        },
      });

      // Calculate budget spent
      const budgetSpent = 0; // New user has no budget spent

      const response: ApiDataResponse<typeof newUser & { budgetSpent: number }> = {
        success: true,
        data: {
          ...newUser,
          budgetSpent,
        },
      };
      return { response, status: 201 };
    }

    // Calculate total budget spent across all campaigns
    const budgetSpent = user.campaignsCreated.reduce((total, campaign) => {
      return total + Number(campaign.budgetTotal);
    }, 0);

    const response: ApiDataResponse<typeof user & { budgetSpent: number }> = {
      success: true,
      data: {
        ...user,
        budgetSpent,
      },
    };
    return { response };
  });
}

// PUT /api/users/profile
export async function PUT(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Wallet address is required' },
      };
      return { response, status: 400 };
    }

    const body = await req.json();
    const data = UpdateProfileSchema.parse(body);

    // Find user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      // Create user if not exists
      user = await prisma.user.create({
        data: { walletAddress },
      });
    }

    // Update user profile
    const { socialMedias, ...profileData } = data;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...profileData,
      },
      include: {
        socialMedias: true,
      },
    });

    // Handle social media updates if provided
    if (socialMedias) {
      // Delete existing social medias
      await prisma.socialMedia.deleteMany({
        where: { userId: user.id },
      });

      // Create new social medias
      if (socialMedias.length > 0) {
        await prisma.socialMedia.createMany({
          data: socialMedias.map((sm) => ({
            userId: user.id,
            platform: sm.platform,
            username: sm.username,
            followers: sm.followers,
            url: sm.url,
          })),
        });
      }
    }

    // Fetch updated user with social medias and campaign stats
    const finalUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        socialMedias: true,
        campaignsCreated: {
          select: {
            budgetTotal: true,
            status: true,
          },
        },
        _count: {
          select: {
            participations: true,
            campaignsCreated: true,
          },
        },
      },
    });

    if (!finalUser) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found after update' },
      };
      return { response, status: 404 };
    }

    // Calculate budget spent
    const budgetSpent = finalUser.campaignsCreated.reduce((total, campaign) => {
      return total + Number(campaign.budgetTotal);
    }, 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: ApiDataResponse<any> = {
      success: true,
      data: {
        ...finalUser,
        budgetSpent,
      },
    };
    return { response };
  });
}