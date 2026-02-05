import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, UserCampaignsResponse } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ wallet: string }> }
) {
  return safeRoute(async () => {
    const { wallet } = await params;
    const { searchParams } = new URL(req.url);

    const status = searchParams.get('status') as CampaignStatus | null;
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    // Get or create user by wallet address
    const user = await getOrCreateUserByWallet(wallet);

    const whereClause = {
      ownerId: user.id,
      status: status ? status : { not: CampaignStatus.DELETED },
    };

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          rewardEvents: {
            include: {
              rewardEvent: true,
              _count: {
                select: { trackedEvents: true },
              },
            },
          },
          _count: {
            select: { participations: true },
          },
        },
      }),
      prisma.campaign.count({ where: whereClause }),
    ]);

    // Calculate budget spent based on tracked events
    const campaignSummaries = await Promise.all(
      campaigns.map(async (campaign) => {
        // Calculate spent: sum of (trackedEventsCount * amount) for each reward event
        const budgetSpent = campaign.rewardEvents.reduce((total, cre) => {
          const eventsCount = cre._count.trackedEvents;
          const amountPerEvent = Number(cre.amount);
          return total + (eventsCount * amountPerEvent);
        }, 0);

        return {
          id: campaign.id,
          title: campaign.title,
          status: campaign.status,
          budgetTotal: Number(campaign.budgetTotal),
          budgetSpent,
          rewardEvents: campaign.rewardEvents.map((cre) => ({
            id: cre.id,
            name: cre.rewardEvent.name,
            eventType: cre.rewardEvent.eventType,
            amount: Number(cre.amount),
            volumeStep: cre.volumeStep,
            trackedEventsCount: cre._count.trackedEvents,
          })),
          participationsCount: campaign._count.participations,
          createdAt: campaign.createdAt.toISOString(),
          updatedAt: campaign.updatedAt.toISOString(),
        };
      })
    );

    const response: ApiDataResponse<UserCampaignsResponse> = {
      success: true,
      data: {
        campaigns: campaignSummaries,
        total,
      },
    };

    return { response };
  });
}