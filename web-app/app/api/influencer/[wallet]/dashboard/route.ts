import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus, EventType } from '@/lib/db/enums';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse } from '@/types';

export type InfluencerDashboardData = {
  totalEarnings: number;
  activityLinks: {
    id: string;
    name: string;
    url: string;
    clicks: string;
    campaignTitle: string;
  }[];
  performanceMetrics: {
    label: string;
    value: string;
    progress: number;
  }[];
  availableCampaigns: {
    id: string;
    name: string;
    tag: string;
    brand: string;
    earning: string;
    sales: string;
    progress: number;
  }[];
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ wallet: string }> }
) {
  return safeRoute(async () => {
    const { wallet } = await params;

    const user = await getOrCreateUserByWallet(wallet);

    // Get all participations with campaign and events data
    const participations = await prisma.participation.findMany({
      where: {
        influencerId: user.id,
        campaign: {
          status: { not: CampaignStatus.DELETED },
        },
      },
      include: {
        campaign: {
          include: {
            owner: {
              select: { name: true },
            },
            rewardEvents: {
              include: {
                rewardEvent: true,
                _count: {
                  select: { trackedEvents: true },
                },
              },
            },
          },
        },
        links: true,
        events: true,
        _count: {
          select: { events: true },
        },
      },
    });

    // Calculate total earnings
    const totalEarnings = participations.reduce(
      (acc, p) => acc + Number(p.currentBalance),
      0
    );

    // Get activity links with click counts
    const activityLinks = participations.flatMap((p) =>
      p.links.map((link) => ({
        id: link.id,
        name: p.campaign.title,
        url: link.url,
        clicks: `${p._count.events} clicks`,
        campaignTitle: p.campaign.title,
      }))
    );

    // Aggregate events by type for performance metrics
    const eventsByType = participations.reduce((acc, p) => {
      p.events.forEach((event) => {
        if (!acc[event.type]) {
          acc[event.type] = 0;
        }
        acc[event.type]++;
      });
      return acc;
    }, {} as Record<EventType, number>);

    // Calculate total events for percentage calculation
    const totalEvents = Object.values(eventsByType).reduce(
      (acc, count) => acc + count,
      0
    );

    // Map event types to performance metrics with progression
    const eventTypeOrder = [
      EventType.LANDING_PAGE_VIEW,
      EventType.VIEW_ITEM,
      EventType.ADD_TO_CART,
      EventType.CHECKOUT,
      EventType.PURCHASE_SUCCESS,
    ];

    const eventTypeLabels: Record<EventType, string> = {
      [EventType.LANDING_PAGE_VIEW]: 'Landing Page View',
      [EventType.VIEW_ITEM]: 'View Item',
      [EventType.ADD_TO_CART]: 'Add to Cart',
      [EventType.CHECKOUT]: 'Checkout',
      [EventType.PURCHASE_SUCCESS]: 'Purchase',
    };

    const performanceMetrics = eventTypeOrder.map((eventType) => {
      const count = eventsByType[eventType] || 0;
      const progress = totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0;

      return {
        label: eventTypeLabels[eventType],
        value: count >= 1000 ? `${Math.floor(count / 1000)}K` : count.toString(),
        progress,
      };
    });

    // Get available campaigns (not yet participated, active, with available slots)
    const availableCampaigns = await prisma.campaign.findMany({
      where: {
        status: CampaignStatus.ACTIVE,
        participations: {
          none: {
            influencerId: user.id,
          },
        },
      },
      include: {
        owner: {
          select: { name: true },
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
      take: 6,
      orderBy: [
        { isHot: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    const mappedAvailableCampaigns = availableCampaigns.map((campaign) => {
      // Calculate potential earning based on average reward
      const avgReward = campaign.rewardEvents.length > 0
        ? campaign.rewardEvents.reduce((acc, cre) => acc + Number(cre.amount), 0) / campaign.rewardEvents.length
        : 0;

      // Calculate progress based on filled slots
      const progress = Math.round((campaign._count.participations / campaign.slots) * 100);

      // Calculate total tracked events for this campaign
      const totalTrackedEvents = campaign.rewardEvents.reduce(
        (acc, cre) => acc + cre._count.trackedEvents,
        0
      );

      return {
        id: campaign.id,
        name: campaign.title,
        tag: campaign.isHot ? 'HOT' : 'NEW',
        brand: campaign.owner.name || 'Unknown Brand',
        earning: `$${avgReward.toFixed(2)}`,
        sales: totalTrackedEvents.toString(),
        progress,
      };
    });

    const response: ApiDataResponse<InfluencerDashboardData> = {
      success: true,
      data: {
        totalEarnings,
        activityLinks: activityLinks.slice(0, 4), // Limit to 4 most recent
        performanceMetrics,
        availableCampaigns: mappedAvailableCampaigns,
      },
    };

    return { response };
  });
}