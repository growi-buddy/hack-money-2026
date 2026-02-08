import { getAblyRoomId, safeRoute, safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ServerPublisher } from '@/lib/realtime/server-publisher';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
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
    
    const [ userOne, userTwo ] = await Promise.all([
      getOrCreateUserByWallet(walletOne),
      getOrCreateUserByWallet(walletTwo),
    ]);
    
    const { ablyChatRoomId, orderedOneId, orderedTwoId } = getAblyRoomId(userOne.id, userTwo.id);
    
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
          chatRoomId: room!.id,
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

export async function GET(  req: Request) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '20');
    const skip = (page - 1) * limit;
    
    const whereClause = {
      OR: [
        { userOneId: user.id },
        { userTwoId: user.id },
      ],
    };
    
    const [rooms, total] = await Promise.all([
      prisma.chatRoom.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { lastActivityAt: 'desc' },
        include: {
          userOne: {
            select: { id: true, name: true, walletAddress: true, avatar: true },
          },
          userTwo: {
            select: { id: true, name: true, walletAddress: true, avatar: true },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            include: {
              sender: {
                select: { id: true, name: true, walletAddress: true },
              },
            },
          },
        },
      }),
      prisma.chatRoom.count({ where: whereClause }),
    ]);
    
    // For each room, find related campaigns
    const chatRoomsWithCampaigns = await Promise.all(
      rooms.map(async (room) => {
        // Determine the "other" user relative to the requesting user
        const otherUser = room.userOneId === user.id ? room.userTwo : room.userOne;
        const lastMessage = room.messages[0] ?? null;
        
        // Find campaigns where:
        // - Current user is owner AND other user is participant, OR
        // - Other user is owner AND current user is participant
        const relatedCampaignsResponse = await prisma.campaign.findMany({
          where: {
            OR: [
              {
                ownerId: user.id,
                participations: {
                  some: {
                    influencerId: otherUser.id,
                  },
                },
              },
              {
                ownerId: otherUser.id,
                participations: {
                  some: {
                    influencerId: user.id,
                  },
                },
              },
            ],
          },
          select: {
            id: true,
            title: true,
            status: true,
            budgetTotal: true,
            interests: true,
            startDate: true,
            endDate: true,
            ownerId: true,
            siteEvents: {
              include: {
                siteEvent: {
                  include: {
                    site: { select: { name: true, url: true } },
                  },
                },
              },
            },
          },
        });

        const relatedCampaigns = relatedCampaignsResponse.map((campaign) => ({
          id: campaign.id,
          title: campaign.title,
          status: campaign.status,
          budgetTotal: Number(campaign.budgetTotal),
          interests: campaign.interests,
          startDate: campaign.startDate?.toISOString() ?? null,
          endDate: campaign.endDate?.toISOString() ?? null,
          ownerId: campaign.ownerId,
          isCurrentUserOwner: campaign.ownerId === user.id,
          siteEvents: campaign.siteEvents.map((cse) => ({
            name: cse.siteEvent.name,
            eventType: cse.siteEvent.eventType,
            amount: Number(cse.amount),
            siteName: cse.siteEvent.site.name,
            siteUrl: cse.siteEvent.site.url,
          })),
        }));
        
        return {
          id: room.id,
          userOneId: room.userOneId,
          userTwoId: room.userTwoId,
          otherUser: {
            id: otherUser.id,
            name: otherUser.name,
            walletAddress: otherUser.walletAddress,
            avatar: otherUser.avatar,
          },
          relatedCampaigns,
          lastMessage: lastMessage
            ? {
              id: lastMessage.id,
              text: lastMessage.text,
              senderId: lastMessage.senderId,
              senderName: lastMessage.sender.name,
              createdAt: lastMessage.createdAt.toISOString(),
            }
            : null,
          lastActivityAt: room.lastActivityAt.toISOString(),
          createdAt: room.createdAt.toISOString(),
        };
      })
    );
    
    const response: ApiDataResponse<{ chatRooms: typeof chatRoomsWithCampaigns; total: number }> = {
      success: true,
      data: { chatRooms: chatRoomsWithCampaigns, total },
    };
    
    return { response };
  });
}
