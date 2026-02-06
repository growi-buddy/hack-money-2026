import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiErrorResponse } from '@/types';
import { z } from 'zod';

function buildAblyRoomId(userOneId: string, userTwoId: string, campaignId?: string): string {
  const [orderedOne, orderedTwo] = userOneId < userTwoId ? [userOneId, userTwoId] : [userTwoId, userOneId];
  return `chat:${orderedOne}:${orderedTwo}${campaignId ? `:${campaignId}` : ''}`;
}

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

    // Create chat room between influencer and campaign owner
    const [orderedOneId, orderedTwoId] =
      user.id < campaign.ownerId
        ? [user.id, campaign.ownerId]
        : [campaign.ownerId, user.id];

    const ablyRoomId = buildAblyRoomId(user.id, campaign.ownerId, campaignId);

    const chatRoom = await prisma.chatRoom.upsert({
      where: {
        userOneId_userTwoId_campaignId: {
          userOneId: orderedOneId,
          userTwoId: orderedTwoId,
          campaignId,
        },
      },
      update: {},
      create: {
        userOneId: orderedOneId,
        userTwoId: orderedTwoId,
        campaignId,
        ablyRoomId,
      },
    });

    // Create initial message from the influencer
    const influencerDisplayName = user.name || `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    const initialMessageText = `Hi! I just applied to your campaign "${campaign.title}". I'm excited to collaborate and would love to discuss the details. Looking forward to working together! 🚀`;

    await prisma.chatMessage.create({
      data: {
        chatRoomId: chatRoom.id,
        senderId: user.id,
        text: initialMessageText,
      },
    });

    // Update lastActivityAt on the chat room
    await prisma.chatRoom.update({
      where: { id: chatRoom.id },
      data: { lastActivityAt: new Date() },
    });

    const response: ApiDataResponse<typeof participation & { chatRoomId: string }> = {
      success: true,
      data: {
        ...participation,
        chatRoomId: chatRoom.id,
      },
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