import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse } from '@/types';
import { z } from 'zod';

const CreateChatRoomSchema = z.object({
  walletOne: z.string().min(1, 'walletOne is required'),
  walletTwo: z.string().min(1, 'walletTwo is required'),
  campaignId: z.string().optional(),
  initialMessages: z.array(z.object({
    text: z.string().min(1, 'Message text is required'),
    senderWallet: z.string().min(1, 'Sender wallet is required'),
  })).optional(),
});

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const { walletOne, walletTwo, campaignId, initialMessages } = CreateChatRoomSchema.parse(body);

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
    let room = await prisma.chatRoom.findUnique({
      where: {
        userOneId_userTwoId: {
          userOneId: orderedOneId,
          userTwoId: orderedTwoId,
        },
      },
      include: {
        userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
        campaign: { select: { id: true, title: true, status: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: { select: { id: true, name: true, walletAddress: true } },
          },
        },
      },
    });

    // Create new room if it doesn't exist
    if (!room) {
      room = await prisma.chatRoom.create({
        data: {
          userOneId: orderedOneId,
          userTwoId: orderedTwoId,
          campaignId: campaignId || null,
        },
        include: {
          userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          campaign: { select: { id: true, title: true, status: true } },
          messages: {
            orderBy: { createdAt: 'asc' },
            include: {
              sender: { select: { id: true, name: true, walletAddress: true } },
            },
          },
        },
      });
    }

    // Add initial messages if provided
    if (initialMessages && initialMessages.length > 0) {
      const messagesToCreate = initialMessages.map((msg) => {
        // Determine sender ID based on wallet address
        const senderId =
          userOne.walletAddress === msg.senderWallet ? userOne.id :
          userTwo.walletAddress === msg.senderWallet ? userTwo.id :
          userOne.id; // Default to userOne if wallet doesn't match

        return {
          chatRoomId: room.id,
          senderId,
          text: msg.text,
        };
      });

      await prisma.chatMessage.createMany({
        data: messagesToCreate,
      });

      // Update lastActivityAt
      await prisma.chatRoom.update({
        where: { id: room.id },
        data: { lastActivityAt: new Date() },
      });

      // Refetch room with messages
      room = await prisma.chatRoom.findUnique({
        where: { id: room.id },
        include: {
          userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          campaign: { select: { id: true, title: true, status: true } },
          messages: {
            orderBy: { createdAt: 'asc' },
            include: {
              sender: { select: { id: true, name: true, walletAddress: true } },
            },
          },
        },
      }) as typeof room;
    }

    const response: ApiDataResponse<typeof room> = {
      success: true,
      data: room,
    };

    return { response, status: room.messages.length > 0 ? 200 : 201 };
  });
}
