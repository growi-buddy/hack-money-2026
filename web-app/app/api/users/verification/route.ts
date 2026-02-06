import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { InfluencerVerificationStatus } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiErrorResponse } from '@/types';
import { z } from 'zod';

const RequestVerificationSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
});

// POST /api/users/verification - Request influencer verification
export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const { walletAddress } = RequestVerificationSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        socialMedias: true,
      },
    });

    if (!user) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found' },
      };
      return { response, status: 404 };
    }

    // Check if user has social media accounts
    if (user.socialMedias.length === 0) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'NO_SOCIAL_MEDIA',
          message: 'Please add at least one social media account before requesting verification',
        },
      };
      return { response, status: 400 };
    }

    // Check if already verified
    if (user.influencerVerification === InfluencerVerificationStatus.VERIFIED) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'ALREADY_VERIFIED', message: 'User is already verified' },
      };
      return { response, status: 400 };
    }

    // Check if already pending
    if (user.influencerVerification === InfluencerVerificationStatus.PENDING) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'ALREADY_PENDING', message: 'Verification request is already pending' },
      };
      return { response, status: 400 };
    }

    // Update verification status to PENDING
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        influencerVerification: InfluencerVerificationStatus.PENDING,
      },
      select: {
        id: true,
        walletAddress: true,
        influencerVerification: true,
      },
    });

    const response: ApiDataResponse<typeof updatedUser> = {
      success: true,
      data: updatedUser,
    };
    return { response };
  });
}