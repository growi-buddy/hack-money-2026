import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ServerPublisher } from '@/lib/realtime/server-publisher';
import { ApiDataResponse } from '@/types';
import { z } from 'zod';

const CreateChatRoomSchema = z.object({
  walletOne: z.string().min(1, 'walletOne is required'),
  walletTwo: z.string().min(1, 'walletTwo is required'),
  initialMessages: z.array(z.object({
    text: z.string().min(1, 'Message text is required'),
    senderWallet: z.string().min(1, 'Sender wallet is required'),
  })).optional(),
});

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const { walletOne, walletTwo, initialMessages } = CreateChatRoomSchema.parse(body);

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
        },
        include: {
          userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
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

      // Create messages in DB
      await prisma.chatMessage.createMany({
        data: messagesToCreate,
      });

      // Update lastActivityAt
      await prisma.chatRoom.update({
        where: { id: room.id },
        data: { lastActivityAt: new Date() },
      });

      // Publish messages to Ably Chat
      const ablyChatRoomId = `chat:${orderedOneId}:${orderedTwoId}`;

      // Send each message to Ably
      for (let i = 0; i < initialMessages.length; i++) {
        const msg = initialMessages[i];
        const senderId = messagesToCreate[i].senderId;
        const sender = senderId === userOne.id ? userOne : userTwo;

        try {
          await ServerPublisher.publish(ablyChatRoomId, 'message', {
            text: msg.text,
            senderId,
            senderName: sender.name,
            senderWallet: sender.walletAddress,
            timestamp: Date.now(),
          });
        } catch (error) {
          console.error('[ChatRoom] Failed to publish message to Ably:', error);
          // Continue even if Ably publish fails
        }
      }

      // Refetch room with messages
      room = await prisma.chatRoom.findUnique({
        where: { id: room.id },
        include: {
          userOne: { select: { id: true, name: true, walletAddress: true, avatar: true } },
          userTwo: { select: { id: true, name: true, walletAddress: true, avatar: true } },
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
