import { prisma } from '@/lib/db';
import { CampaignStatus, SiteEventType } from '@/lib/db/enums';
import { CampaignResponseDTO, CampaignUserRole } from '@/types';

// Type for influencer campaign detail view
// export type InfluencerCampaignView = {
//   id: string;
//   title: string;
//   description: string | null;
//   status: CampaignStatus;
//   budgetTotal: number;
//   isHot: boolean;
//   slots: number;
//   filledSlots: number;
//   interests: string[];
//   demographics: string[];
//   regions: string[];
//   countries: string[];
//   startDate: string | null;
//   endDate: string | null;
//   owner: {
//     id: string;
//     name: string | null;
//     walletAddress: string;
//     avatar: string | null;
//   };
//   rewardEvents: {
//     id: string;
//     name: string;
//     eventType: SiteEventType;
//     amount: number;
//     volumeStep: number;
//   }[];
//   createdAt: string;
//   updatedAt: string;
// };

// export const getCampaignForInfluencer = async (campaignId: string): Promise<InfluencerCampaignView | null> => {
//   const campaign = await prisma.campaign.findUnique({
//     where: {
//       id: campaignId,
//       status: { not: CampaignStatus.DELETED },
//     },
//     include: {
//       owner: {
//         select: {
//           id: true,
//           name: true,
//           walletAddress: true,
//           avatar: true,
//         },
//       },
//       rewardEvents: {
//         include: {
//           rewardEvent: true,
//         },
//       },
//       _count: {
//         select: {
//           participations: true,
//         },
//       },
//     },
//   });
//
//   if (!campaign) return null;
//
//   return {
//     id: campaign.id,
//     title: campaign.title,
//     description: campaign.description,
//     status: campaign.status,
//     budgetTotal: Number(campaign.budgetTotal),
//     isHot: campaign.isHot,
//     slots: campaign.slots,
//     filledSlots: campaign._count.participations,
//     interests: campaign.interests,
//     demographics: campaign.demographics,
//     regions: campaign.regions,
//     countries: campaign.countries,
//     startDate: campaign.startDate?.toISOString() ?? null,
//     endDate: campaign.endDate?.toISOString() ?? null,
//     owner: campaign.owner,
//     rewardEvents: campaign.rewardEvents.map((cre) => ({
//       id: cre.id,
//       name: cre.rewardEvent.name,
//       eventType: cre.rewardEvent.eventType,
//       amount: Number(cre.amount),
//       volumeStep: cre.volumeStep,
//     })),
//     createdAt: campaign.createdAt.toISOString(),
//     updatedAt: campaign.updatedAt.toISOString(),
//   };
// };

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
    eventType: SiteEventType;
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
      type: SiteEventType;
      count: number;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
};

export const getCampaignResponseDTO = async (
  campaignId: string,
  userWalletAddress: string,
): Promise<CampaignResponseDTO | null> => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
      deletedAt: null,
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
      siteEvents: {
        include: {
          siteEvent: {
            include: {
              site: true,
              trackedSiteEvents: {
                select: {
                  id: true,
                  participationId: true,
                },
              },
            },
          },
        },
      },
      participations: {
        select: {
          id: true,
          status: true,
          influencer: {
            select: {
              id: true,
              name: true,
              walletAddress: true,
              avatar: true,
              influencerVerification: true,
            },
          },
          trackedSiteEvents: {
            select: {
              siteEventId: true,
              createdAt: true,
              siteEvent: {
                select: {
                  eventType: true,
                },
              },
            },
          },
        },
      },
    },
  });
  
  if (!campaign) return null;
  
  // Determine user role
  let userRole: CampaignUserRole = 'guest';
  if (userWalletAddress) {
    if (campaign.owner.walletAddress === userWalletAddress) {
      userRole = 'manager';
    } else if (campaign.participations.some(p => p.influencer.walletAddress === userWalletAddress)) {
      userRole = 'influencer';
    }
  }
  
  // Calculate budget spent by summing tracked events
  let budgetSpent = 0;
  const siteMap = new Map<string, {
    id: string;
    name: string;
    url: string;
    description: string;
    events: Map<SiteEventType, { amount: number; volumeStep: number; count: number }>;
    siteEvents: Array<{ id: string; siteEventType: SiteEventType, amount: number; volumeStep: number }>;
  }>();
  
  // Group site events by site and calculate budget spent
  campaign.siteEvents.forEach((cse) => {
    const site = cse.siteEvent.site;
    const eventType = cse.siteEvent.eventType;
    const amount = Number(cse.amount);
    const trackedCount = cse.siteEvent.trackedSiteEvents.length;
    
    budgetSpent += trackedCount * amount;
    
    if (!siteMap.has(site.id)) {
      siteMap.set(site.id, {
        id: site.id,
        name: site.name,
        url: site.url,
        description: site.description,
        events: new Map(),
        siteEvents: [],
      });
    }
    
    const siteData = siteMap.get(site.id)!;
    
    // Add individual site event
    siteData.siteEvents.push({
      id: cse.siteEvent.id,
      siteEventType: cse.siteEvent.eventType,
      amount,
      volumeStep: cse.volumeStep,
    });
    
    if (!siteData.events.has(eventType)) {
      siteData.events.set(eventType, {
        amount,
        volumeStep: cse.volumeStep,
        count: 0,
      });
    }
    
    const eventData = siteData.events.get(eventType)!;
    eventData.count += trackedCount;
  });
  
  // Convert site map to array format for response
  const sites = Array.from(siteMap.values()).map((site) => ({
    id: site.id,
    name: site.name,
    url: site.url,
    description: site.description,
    siteEvents: site.siteEvents,
    trackedSiteEventsGroupedByType: Array.from(site.events.entries()).map(([ eventType, data ]) => ({
      siteEventType: eventType,
      amount: data.amount,
      volumeStep: data.volumeStep,
      trackedEventsCount: data.count,
    })),
  }));
  
  // Create a map of siteEventId to {amount, volumeStep} for quick lookup
  const siteEventConfigMap = new Map<string, { amount: number; volumeStep: number }>();
  campaign.siteEvents.forEach((cse) => {
    siteEventConfigMap.set(cse.siteEvent.id, {
      amount: Number(cse.amount),
      volumeStep: cse.volumeStep,
    });
  });

  const participants = campaign.participations.map((p) => {
    const summaryTrackedSiteEvents: Record<SiteEventType, {
      total: number; lastUpdated: number, amount: number,
      volumeStep: number,
    }> = {
      [SiteEventType.LANDING_PAGE_VIEW]: { total: 0, lastUpdated: 0, amount: 0, volumeStep: 1 },
      [SiteEventType.VIEW_ITEM]: { total: 0, lastUpdated: 0, amount: 0, volumeStep: 1 },
      [SiteEventType.ADD_TO_CART]: { total: 0, lastUpdated: 0, amount: 0, volumeStep: 1 },
      [SiteEventType.CHECKOUT]: { total: 0, lastUpdated: 0, amount: 0, volumeStep: 1 },
      [SiteEventType.PURCHASE_SUCCESS]: { total: 0, lastUpdated: 0, amount: 0, volumeStep: 1 },
    };

    p.trackedSiteEvents.forEach(te => {
      const eventType = te.siteEvent.eventType;
      const config = siteEventConfigMap.get(te.siteEventId);

      if (!summaryTrackedSiteEvents[eventType]) {
        summaryTrackedSiteEvents[eventType] = {
          total: 0,
          lastUpdated: 0,
          amount: config?.amount || 0,
          volumeStep: config?.volumeStep || 1,
        };
      }

      // Set amount and volumeStep from the campaign configuration
      if (config && summaryTrackedSiteEvents[eventType].amount === 0) {
        summaryTrackedSiteEvents[eventType].amount = config.amount;
        summaryTrackedSiteEvents[eventType].volumeStep = config.volumeStep;
      }

      summaryTrackedSiteEvents[eventType].total += 1;
      const createdAtTime = new Date(te.createdAt).getTime();
      if (createdAtTime > summaryTrackedSiteEvents[eventType].lastUpdated) {
        summaryTrackedSiteEvents[eventType].lastUpdated = createdAtTime;
      }
    });
    
    return {
      id: p.id,
      userId: p.influencer.id,
      name: p.influencer.name ?? '',
      walletAddress: p.influencer.walletAddress,
      avatar: p.influencer.avatar ?? '',
      status: p.status,
      summaryTrackedSiteEvents,
      influencerVerification: p.influencer.influencerVerification,
    };
  });
  
  const startDate = new Date(campaign.startDate || 0).getTime();
  const endDate = new Date(campaign.endDate || 0).getTime();
  
  return {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description ?? '',
    status: campaign.status,
    budgetTotal: Number(campaign.budgetTotal),
    budgetSpent,
    isHot: campaign.isHot,
    slots: campaign.slots,
    interests: campaign.interests,
    demographics: campaign.demographics,
    regions: campaign.regions,
    countries: campaign.countries,
    startDate,
    endDate,
    sites,
    participants,
    owner: {
      id: campaign.owner.id,
      name: campaign.owner.name ?? '',
      walletAddress: campaign.owner.walletAddress,
      avatar: campaign.owner.avatar ?? '',
    },
    userRole,
    createdAt: campaign.createdAt.getTime(),
    updatedAt: campaign.updatedAt.getTime(),
    isDeleted: !!campaign.deletedAt,
  };
};
