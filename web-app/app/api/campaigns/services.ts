import { prisma } from '@/lib/db';
import { CampaignStatus, EventType } from '@/lib/db/enums';

export const getCampaignById = (campaignId: string) => {
  return prisma.campaign.findUnique({
    where: {
      id: campaignId,
      status: { not: CampaignStatus.DELETED },
    },
    include: {
      rewardEvents: {
        include: {
          rewardEvent: {
            include: { selectors: true },
          },
        },
      },
    },
  });
};

export type CampaignDashboardData = {
  id: string;
  title: string;
  status: CampaignStatus;
  budgetTotal: number;
  budgetSpent: number;
  rewardEvents: {
    id: string;
    name: string;
    eventType: EventType;
    amount: number;
    volumeStep: number;
    trackedEventsCount: number;
  }[];
  participations: {
    id: string;
    influencer: {
      id: string;
      name: string | null;
      walletAddress: string;
    };
    currentBalance: number;
    totalEvents: number;
    events: {
      type: EventType;
      count: number;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
};

export const getCampaignDashboard = async (campaignId: string): Promise<CampaignDashboardData | null> => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
      status: { not: CampaignStatus.DELETED },
    },
    include: {
      rewardEvents: {
        include: {
          rewardEvent: true,
          _count: {
            select: { trackedEvents: true },
          },
        },
      },
      participations: {
        include: {
          influencer: {
            select: {
              id: true,
              name: true,
              walletAddress: true,
            },
          },
          events: {
            select: {
              type: true,
              payoutGenerated: true,
            },
          },
        },
      },
    },
  });
  
  if (!campaign) return null;
  
  // Calculate budget spent
  const budgetSpent = campaign.rewardEvents.reduce((total, cre) => {
    const eventsCount = cre._count.trackedEvents;
    const amountPerEvent = Number(cre.amount);
    return total + (eventsCount * amountPerEvent);
  }, 0);
  
  // Map reward events with tracked counts
  const rewardEvents = campaign.rewardEvents.map((cre) => ({
    id: cre.id,
    name: cre.rewardEvent.name,
    eventType: cre.rewardEvent.eventType,
    amount: Number(cre.amount),
    volumeStep: cre.volumeStep,
    trackedEventsCount: cre._count.trackedEvents,
  }));
  
  // Map participations with aggregated event counts
  const participations = campaign.participations.map((p) => {
    // Group events by type
    const eventsByType = p.events.reduce((acc, event) => {
      if (!acc[event.type]) {
        acc[event.type] = 0;
      }
      acc[event.type]++;
      return acc;
    }, {} as Record<EventType, number>);
    
    return {
      id: p.id,
      influencer: p.influencer,
      currentBalance: Number(p.currentBalance),
      totalEvents: p.events.length,
      events: Object.entries(eventsByType).map(([ type, count ]) => ({
        type: type as EventType,
        count,
      })),
    };
  });
  
  return {
    id: campaign.id,
    title: campaign.title,
    status: campaign.status,
    budgetTotal: Number(campaign.budgetTotal),
    budgetSpent,
    rewardEvents,
    participations,
    createdAt: campaign.createdAt.toISOString(),
    updatedAt: campaign.updatedAt.toISOString(),
  };
};
