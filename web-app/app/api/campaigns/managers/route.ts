import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { ApiListResponse } from '@/types';

interface ManagerCampaign {
  id: string;
  title: string;
  budget: number;
  status: CampaignStatus;
}

interface CampaignManager {
  id: string;
  name: string | null;
  walletAddress: string;
  avatar: string | null;
  bio: string | null;
  activeCampaignsCount: number;
  totalCampaignsCount: number;
  totalBudget: number;
  campaigns: ManagerCampaign[];
}

// GET /api/campaigns/managers - Get all users who have created campaigns
export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    // Build where clause for users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userWhere: any = {
      campaignsCreated: {
        some: {},
      },
    };

    if (search) {
      userWhere.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { walletAddress: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get users who have created campaigns
    const users = await prisma.user.findMany({
      where: userWhere,
      include: {
        campaignsCreated: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
            budgetTotal: true,
            status: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        campaignsCreated: {
          _count: 'desc',
        },
      },
    });

    // Transform to response format
    const managers: CampaignManager[] = users.map((user) => {
      const activeCampaigns = user.campaignsCreated.filter(
        (c) => c.status === CampaignStatus.ACTIVE || c.status === CampaignStatus.DEPLETED
      );

      const totalBudget = user.campaignsCreated.reduce(
        (sum, c) => sum + Number(c.budgetTotal),
        0
      );

      return {
        id: user.id,
        name: user.name,
        walletAddress: user.walletAddress,
        avatar: user.avatar,
        bio: user.bio,
        activeCampaignsCount: activeCampaigns.length,
        totalCampaignsCount: user.campaignsCreated.length,
        totalBudget,
        campaigns: activeCampaigns.slice(0, 5).map((c) => ({
          id: c.id,
          title: c.title,
          budget: Number(c.budgetTotal),
          status: c.status,
        })),
      };
    });

    // Sort by active campaigns count (more active = higher priority)
    managers.sort((a, b) => b.activeCampaignsCount - a.activeCampaignsCount);

    // Calculate stats
    const totalActiveCampaigns = managers.reduce(
      (sum, m) => sum + m.activeCampaignsCount,
      0
    );

    type ExtraMeta = {
      totalActiveCampaigns: number;
    };

    const response: ApiListResponse<CampaignManager, ExtraMeta> = {
      success: true,
      data: managers,
      meta: {
        total: managers.length,
        page: 1,
        limit: managers.length,
        totalActiveCampaigns,
      },
    };

    return { response };
  });
}