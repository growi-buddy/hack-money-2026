import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ wallet: string }> }
) {
  return safeRoute(async () => {
    const { wallet } = await params;
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '20');
    const skip = (page - 1) * limit;

    const user = await getOrCreateUserByWallet(wallet);

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
          campaign: {
            select: {
              id: true,
              title: true,
              status: true,
              budgetTotal: true,
              interests: true,
              startDate: true,
              endDate: true,
              rewardEvents: {
                include: {
                  rewardEvent: { select: { name: true, eventType: true } },
                },
              },
            },
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
        const relatedCampaigns = await prisma.campaign.findMany({
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
            rewardEvents: {
              include: {
                rewardEvent: { select: { name: true, eventType: true } },
              },
            },
          },
        });

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
          campaign: room.campaign
            ? {
              id: room.campaign.id,
              title: room.campaign.title,
              status: room.campaign.status,
              budgetTotal: Number(room.campaign.budgetTotal),
              interests: room.campaign.interests,
              startDate: room.campaign.startDate?.toISOString() ?? null,
              endDate: room.campaign.endDate?.toISOString() ?? null,
              rewardEvents: room.campaign.rewardEvents.map((cre) => ({
                name: cre.rewardEvent.name,
                eventType: cre.rewardEvent.eventType,
                amount: Number(cre.amount),
              })),
            }
            : null,
          relatedCampaigns: relatedCampaigns.map((campaign) => ({
            id: campaign.id,
            title: campaign.title,
            status: campaign.status,
            budgetTotal: Number(campaign.budgetTotal),
            interests: campaign.interests,
            startDate: campaign.startDate?.toISOString() ?? null,
            endDate: campaign.endDate?.toISOString() ?? null,
            ownerId: campaign.ownerId,
            isCurrentUserOwner: campaign.ownerId === user.id,
            rewardEvents: campaign.rewardEvents.map((cre) => ({
              name: cre.rewardEvent.name,
              eventType: cre.rewardEvent.eventType,
              amount: Number(cre.amount),
            })),
          })),
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
