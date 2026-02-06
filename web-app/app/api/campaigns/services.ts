import { prisma } from '@/lib/db';
import { CampaignStatus, EventType } from '@/lib/db/enums';

// Type for influencer campaign detail view
export type InfluencerCampaignView = {
  id: string;
  title: string;
  description: string | null;
  status: CampaignStatus;
  budgetTotal: number;
  isHot: boolean;
  slots: number;
  filledSlots: number;
  interests: string[];
  demographics: string[];
  regions: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
  owner: {
    id: string;
    name: string | null;
    walletAddress: string;
    avatar: string | null;
  };
  rewardEvents: {
    id: string;
    name: string;
    eventType: EventType;
    amount: number;
    volumeStep: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export const getCampaignForInfluencer = async (campaignId: string): Promise<InfluencerCampaignView | null> => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
      status: { not: CampaignStatus.DELETED },
    },
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
  });

  if (!campaign) return null;

  return {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    status: campaign.status,
    budgetTotal: Number(campaign.budgetTotal),
    isHot: campaign.isHot,
    slots: campaign.slots,
    filledSlots: campaign._count.participations,
    interests: campaign.interests,
    demographics: campaign.demographics,
    regions: campaign.regions,
    countries: campaign.countries,
    startDate: campaign.startDate?.toISOString() ?? null,
    endDate: campaign.endDate?.toISOString() ?? null,
    owner: campaign.owner,
    rewardEvents: campaign.rewardEvents.map((cre) => ({
      id: cre.id,
      name: cre.rewardEvent.name,
      eventType: cre.rewardEvent.eventType,
      amount: Number(cre.amount),
      volumeStep: cre.volumeStep,
    })),
    createdAt: campaign.createdAt.toISOString(),
    updatedAt: campaign.updatedAt.toISOString(),
  };
};

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
  description: string | null;
  status: CampaignStatus;
  budgetTotal: number;
  budgetSpent: number;
  slots: number;
  interests: string[];
  demographics: string[];
  regions: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
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
    description: campaign.description,
    status: campaign.status,
    budgetTotal: Number(campaign.budgetTotal),
    budgetSpent,
    slots: campaign.slots,
    interests: campaign.interests,
    demographics: campaign.demographics,
    regions: campaign.regions,
    countries: campaign.countries,
    startDate: campaign.startDate?.toISOString() ?? null,
    endDate: campaign.endDate?.toISOString() ?? null,
    rewardEvents,
    participations,
    createdAt: campaign.createdAt.toISOString(),
    updatedAt: campaign.updatedAt.toISOString(),
  };
};
