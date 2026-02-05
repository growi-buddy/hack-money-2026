import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, InfluencerCampaignsResponse } from '@/types';

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

    const user = await getOrCreateUserByWallet(wallet);

    // Build where clause: filter participations by influencer and campaign status
    const campaignStatusFilter = status
      ? { status }
      : { status: { not: CampaignStatus.DELETED } };

    const whereClause = {
      influencerId: user.id,
      campaign: campaignStatusFilter,
    };

    const [participations, total] = await Promise.all([
      prisma.participation.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          campaign: {
            include: {
              owner: {
                select: { id: true, name: true, walletAddress: true },
              },
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
          },
          _count: {
            select: { events: true },
          },
        },
      }),
      prisma.participation.count({ where: whereClause }),
    ]);

    const campaigns = participations.map((participation) => {
      const campaign = participation.campaign;

      // Calculate total budget spent across all reward events
      const budgetSpent = campaign.rewardEvents.reduce((acc, cre) => {
        return acc + cre._count.trackedEvents * Number(cre.amount);
      }, 0);

      return {
        participationId: participation.id,
        currentBalance: Number(participation.currentBalance),
        totalEvents: participation._count.events,
        campaign: {
          id: campaign.id,
          title: campaign.title,
          status: campaign.status,
          budgetTotal: Number(campaign.budgetTotal),
          budgetSpent,
          owner: {
            id: campaign.owner.id,
            name: campaign.owner.name,
            walletAddress: campaign.owner.walletAddress,
          },
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
        },
      };
    });

    const response: ApiDataResponse<InfluencerCampaignsResponse> = {
      success: true,
      data: {
        campaigns,
        total,
      },
    };

    return { response };
  });
}
