import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiErrorResponse } from '@/types';
import { z } from 'zod';

const ParticipateSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required'),
});

// POST /api/campaigns/[id]/participate - Join a campaign as an influencer
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id: campaignId } = await params;
    const body = await req.json();
    const { walletAddress } = ParticipateSchema.parse(body);

    // Get campaign and check if it's available
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        _count: {
          select: { participations: true },
        },
      },
    });

    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'CAMPAIGN_NOT_ACTIVE', message: 'Campaign is not accepting participants' },
      };
      return { response, status: 400 };
    }

    // Check if slots are available
    if (campaign._count.participations >= campaign.slots) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'SLOTS_FULL', message: 'Campaign has no available slots' },
      };
      return { response, status: 400 };
    }

    // Get or create user
    const user = await getOrCreateUserByWallet(walletAddress);

    // Check if user is the campaign owner
    if (campaign.ownerId === user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'OWNER_CANNOT_PARTICIPATE', message: 'Campaign owner cannot participate in their own campaign' },
      };
      return { response, status: 400 };
    }

    // Check if user already participated
    const existingParticipation = await prisma.participation.findUnique({
      where: {
        influencerId_campaignId: {
          influencerId: user.id,
          campaignId,
        },
      },
    });

    if (existingParticipation) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'ALREADY_PARTICIPATING', message: 'You are already participating in this campaign' },
      };
      return { response, status: 400 };
    }

    // Create participation
    const participation = await prisma.participation.create({
      data: {
        influencerId: user.id,
        campaignId,
      },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
        links: true,
      },
    });

    const response: ApiDataResponse<typeof participation> = {
      success: true,
      data: participation,
    };
    return { response, status: 201 };
  });
}

// GET /api/campaigns/[id]/participate?walletAddress=... - Check participation status
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id: campaignId } = await params;
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
    });

    if (!user) {
      const response: ApiDataResponse<{ isParticipating: boolean; participation: null }> = {
        success: true,
        data: { isParticipating: false, participation: null },
      };
      return { response };
    }

    const participation = await prisma.participation.findUnique({
      where: {
        influencerId_campaignId: {
          influencerId: user.id,
          campaignId,
        },
      },
      include: {
        links: true,
        _count: {
          select: { events: true },
        },
      },
    });

    const response: ApiDataResponse<{
      isParticipating: boolean;
      participation: typeof participation;
    }> = {
      success: true,
      data: {
        isParticipating: !!participation,
        participation,
      },
    };
    return { response };
  });
}