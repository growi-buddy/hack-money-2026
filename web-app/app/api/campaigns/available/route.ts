import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { ApiListResponse } from '@/types';

// GET /api/campaigns/available - Get available campaigns for influencers
// Returns ACTIVE campaigns ordered by isHot first, then by createdAt
export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '20');
    const skip = (page - 1) * limit;
    const interest = searchParams.get('interest');
    const search = searchParams.get('search');
    const managerId = searchParams.get('managerId');

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: CampaignStatus.ACTIVE,
      // Only show campaigns that haven't ended yet or have no end date
      OR: [
        { endDate: null },
        { endDate: { gte: new Date() } },
      ],
    };

    // Filter by interest
    if (interest) {
      where.interests = { has: interest };
    }

    // Filter by search query
    if (search) {
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
      ];
    }

    // Filter by manager/owner
    if (managerId) {
      where.ownerId = managerId;
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              walletAddress: true,
              avatar: true,
            },
          },
          rewardEvents: {
            include: {
              rewardEvent: true,
            },
          },
          _count: {
            select: {
              participations: true,
            },
          },
        },
        // Order by isHot first (descending), then by createdAt (descending)
        orderBy: [
          { isHot: 'desc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.campaign.count({ where }),
    ]);

    // Transform campaigns to include calculated fields
    const transformedCampaigns = campaigns.map(campaign => {
      // Calculate slots progress
      const filledSlots = campaign._count.participations;
      const totalSlots = campaign.slots;
      const progress = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

      // Calculate average rate from reward events
      const avgRate = campaign.rewardEvents.length > 0
        ? campaign.rewardEvents.reduce((sum, re) => sum + Number(re.amount), 0) / campaign.rewardEvents.length
        : 0;

      return {
        id: campaign.id,
        title: campaign.title,
        description: campaign.description,
        isHot: campaign.isHot,
        interests: campaign.interests,
        budget: Number(campaign.budgetTotal),
        slots: campaign.slots,
        filledSlots,
        progress,
        rate: avgRate,
        startDate: campaign.startDate?.toISOString(),
        endDate: campaign.endDate?.toISOString(),
        owner: campaign.owner,
        createdAt: campaign.createdAt.toISOString(),
      };
    });

    // Get unique interests from all active campaigns for filtering
    const allCampaigns = await prisma.campaign.findMany({
      where: { status: CampaignStatus.ACTIVE },
      select: { interests: true },
    });
    const allInterests = [...new Set(allCampaigns.flatMap(c => c.interests))];

    // Get unique managers/owners
    const managers = await prisma.user.findMany({
      where: {
        campaignsCreated: {
          some: { status: CampaignStatus.ACTIVE },
        },
      },
      select: {
        id: true,
        name: true,
        walletAddress: true,
      },
    });

    type ExtraMeta = {
      interests: string[];
      managers: typeof managers;
    };

    const response: ApiListResponse<typeof transformedCampaigns[0], ExtraMeta> = {
      success: true,
      data: transformedCampaigns,
      meta: {
        total,
        page,
        limit,
        interests: allInterests,
        managers,
      },
    };
    return { response };
  });
}