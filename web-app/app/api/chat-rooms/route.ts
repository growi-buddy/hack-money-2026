import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse } from '@/types';
import { z } from 'zod';

const CreateChatRoomSchema = z.object({
  walletOne: z.string().min(1, 'walletOne is required'),
  walletTwo: z.string().min(1, 'walletTwo is required'),
  campaignId: z.string().optional(),
});

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const { walletOne, walletTwo, campaignId } = CreateChatRoomSchema.parse(body);

    const [userOne, userTwo] = await Promise.all([
      getOrCreateUserByWallet(walletOne),
      getOrCreateUserByWallet(walletTwo),
    ]);

    // Ensure consistent ordering so the unique constraint works
    const [orderedOneId, orderedTwoId] =
      userOne.id < userTwo.id
        ? [userOne.id, userTwo.id]
        : [userTwo.id, userOne.id];

    // Try to find existing room first
    const existing = await prisma.chatRoom.findUnique({
      where: {
        userOneId_userTwoId_campaignId: {
          userOneId: orderedOneId,
          userTwoId: orderedTwoId,
          campaignId: campaignId ?? '',
        },
      },
      include: {
        userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        campaign: { select: { id: true, title: true, status: true } },
      },
    });

    if (existing) {
      const response: ApiDataResponse<typeof existing> = {
        success: true,
        data: existing,
      };
      return { response };
    }

    // Create new room
    const room = await prisma.chatRoom.create({
      data: {
        userOneId: orderedOneId,
        userTwoId: orderedTwoId,
        campaignId: campaignId || null,
        ablyRoomId: `chat:${orderedOneId}:${orderedTwoId}${campaignId ? `:${campaignId}` : ''}`,
      },
      include: {
        userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        campaign: { select: { id: true, title: true, status: true } },
      },
    });

    const response: ApiDataResponse<typeof room> = {
      success: true,
      data: room,
    };

    return { response, status: 201 };
  });
}
