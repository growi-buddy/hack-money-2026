import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiListResponse, CampaignResponse } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ wallet: string }> },
) {
  return safeRoute(async () => {
    const { wallet } = await params;
    const { searchParams } = new URL(req.url);

    // Parse multiple status values (e.g., status=ACTIVE,PAUSED,COMPLETED)
    const statusParam = searchParams.get('status');
    const statusArray = statusParam
      ? statusParam.split(',').filter(s => Object.values(CampaignStatus).includes(s as CampaignStatus))
      : null;

    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    // Get or create user by wallet address
    const user = await getOrCreateUserByWallet(wallet);

    // Build status filter for campaigns
    const statusFilter = statusArray && statusArray.length > 0
      ? { in: statusArray as CampaignStatus[] }
      : { not: CampaignStatus.DELETED };

    // Fetch campaigns created by user (as manager)
    const createdCampaigns = await prisma.campaign.findMany({
      where: {
        ownerId: user.id,
        status: statusFilter,
      },
      orderBy: { createdAt: 'desc' },
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
    });

    // Fetch campaigns user is participating in (as influencer)
    const participations = await prisma.participation.findMany({
      where: {
        influencerId: user.id,
        campaign: { status: statusFilter },
      },
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
      },
    });

    // Transform created campaigns (user is manager)
    const managerCampaigns: CampaignResponse[] = createdCampaigns.map((campaign) => {
      const budgetSpent = campaign.rewardEvents.reduce((total, cre) => {
        return total + (cre._count.trackedEvents * Number(cre.amount));
      }, 0);

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description ?? '',
        status: campaign.status,
        budgetTotal: Number(campaign.budgetTotal),
        budgetSpent,
        isHot: campaign.isHot,
        slots: campaign.slots,
        interests: campaign.interests ?? [],
        demographics: campaign.demographics ?? [],
        regions: campaign.regions ?? [],
        countries: campaign.countries ?? [],
        startDate: campaign.startDate?.toISOString() ?? campaign.createdAt.toISOString(),
        endDate: campaign.endDate?.toISOString() ?? campaign.createdAt.toISOString(),
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
        owner: {
          id: campaign.owner.id,
          name: campaign.owner.name,
          walletAddress: campaign.owner.walletAddress,
        },
        userRole: 'manager',
      };
    });

    // Transform participating campaigns (user is influencer)
    const influencerCampaigns: CampaignResponse[] = participations.map((participation) => {
      const campaign = participation.campaign;
      const budgetSpent = campaign.rewardEvents.reduce((total, cre) => {
        return total + (cre._count.trackedEvents * Number(cre.amount));
      }, 0);

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description ?? '',
        status: campaign.status,
        budgetTotal: Number(campaign.budgetTotal),
        budgetSpent,
        isHot: campaign.isHot,
        slots: campaign.slots,
        interests: campaign.interests ?? [],
        demographics: campaign.demographics ?? [],
        regions: campaign.regions ?? [],
        countries: campaign.countries ?? [],
        startDate: campaign.startDate?.toISOString() ?? campaign.createdAt.toISOString(),
        endDate: campaign.endDate?.toISOString() ?? campaign.createdAt.toISOString(),
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
        owner: {
          id: campaign.owner.id,
          name: campaign.owner.name,
          walletAddress: campaign.owner.walletAddress,
        },
        userRole: 'influencer',
      };
    });

    // Combine both lists and sort by createdAt desc
    const allCampaigns = [...managerCampaigns, ...influencerCampaigns]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const paginatedCampaigns = allCampaigns.slice(skip, skip + limit);
    const total = allCampaigns.length;

    const response: ApiListResponse<CampaignResponse> = {
      success: true,
      data: paginatedCampaigns,
      meta: {
        total,
        page,
        limit,
      },
    };

    return { response };
  });
}
