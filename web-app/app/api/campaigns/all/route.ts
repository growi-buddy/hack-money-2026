import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { SiteEventType } from '@/lib/db/enums';
import { $Enums } from '@/lib/db/prisma/generated';
import { ApiListResponse, CampaignResponseDTO, CampaignUserRole, SiteWithEventsResponseDTO } from '@/types';
import { Decimal } from '@prisma/client-runtime-utils';

function groupTrackedEventsBySite(
  siteEvents: Array<{
    id: string;
    amount: Decimal;
    volumeStep: number;
    siteEvent: {
      id: string;
      eventType: SiteEventType;
      site: {
        id: string;
        name: string;
        url: string;
        description: string | null;
      };
    };
  }>,
  participations: Array<{
    trackedSiteEvents: Array<{
      siteEventId: string;
    }>;
  }>,
): SiteWithEventsResponseDTO[] {
  // Count tracked events by siteEventId
  const trackedEventCountsBySiteEventId = new Map<string, number>();
  participations.forEach(p => {
    p.trackedSiteEvents.forEach(te => {
      const count = trackedEventCountsBySiteEventId.get(te.siteEventId) || 0;
      trackedEventCountsBySiteEventId.set(te.siteEventId, count + 1);
    });
  });
  
  // Group site events by site
  const siteMap = new Map<string, {
    site: { id: string; name: string; url: string; description: string | null };
    eventsByType: Map<SiteEventType, { amount: number; volumeStep: number; count: number }>;
  }>();
  
  siteEvents.forEach(cse => {
    const siteId = cse.siteEvent.site.id;
    
    if (!siteMap.has(siteId)) {
      siteMap.set(siteId, {
        site: cse.siteEvent.site,
        eventsByType: new Map(),
      });
    }
    
    const siteData = siteMap.get(siteId)!;
    const eventType = cse.siteEvent.eventType;
    const count = trackedEventCountsBySiteEventId.get(cse.siteEvent.id) || 0;
    
    if (!siteData.eventsByType.has(eventType)) {
      siteData.eventsByType.set(eventType, {
        amount: Number(cse.amount),
        volumeStep: cse.volumeStep,
        count: 0,
      });
    }
    
    siteData.eventsByType.get(eventType)!.count += count;
  });
  
  return Array.from(siteMap.entries()).map(([ _, data ]) => ({
    id: data.site.id,
    name: data.site.name,
    url: data.site.url,
    description: data.site.description ?? '',
    trackedSiteEventsGroupedByType: Array.from(data.eventsByType.entries()).map(([ eventType, info ]) => ({
      siteEventType: eventType,
      amount: +info.amount,
      volumeStep: info.volumeStep,
      trackedEventsCount: info.count,
    })),
  }));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isComplete = searchParams.get('complete') === 'true';
  
  return safeRouteWithWalletAddress(req, async (user) => {
    // Parse multiple status values (e.g., status=ACTIVE,PAUSED,COMPLETED)
    const statusParam = searchParams.get('status');
    const statusArray = statusParam
      ? statusParam.split(',').filter(s => Object.values($Enums.CampaignStatus).includes(s as $Enums.CampaignStatus))
      : null;
    
    // Check if we should fetch deleted campaigns
    const isDeleted = searchParams.get('isDeleted') === 'true';
    
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;
    
    // Build where clause for campaigns
    const deletedAtFilter = isDeleted ? { not: null } : null;
    
    const campaignWhere = statusArray && statusArray.length > 0
      ? { status: { in: statusArray as $Enums.CampaignStatus[] }, deletedAt: deletedAtFilter }
      : { deletedAt: deletedAtFilter };
    
    const select = {
      id: true,
      title: true,
      description: true,
      status: true,
      budgetTotal: true,
      isHot: true,
      slots: true,
      interests: true,
      demographics: true,
      regions: true,
      countries: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      owner: {
        select: { id: true, name: true, walletAddress: true, avatar: true },
      },
      siteEvents: {
        include: {
          siteEvent: {
            include: {
              site: true,
            },
          },
        },
      },
      participations: {
        select: {
          status: true,
          influencer: {
            select: { id: true, name: true, walletAddress: true, avatar: true },
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
      _count: {
        select: { participations: true },
      },
    };
    const createdCampaigns = await prisma.campaign.findMany({
      where: {
        ownerId: user.id,
        ...campaignWhere,
      },
      orderBy: { createdAt: 'desc' },
      select,
    });
    
    const participations = await prisma.participation.findMany({
      where: {
        influencerId: user.id,
        campaign: campaignWhere,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        campaign: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            budgetTotal: true,
            isHot: true,
            slots: true,
            interests: true,
            demographics: true,
            regions: true,
            countries: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            owner: {
              select: { id: true, name: true, walletAddress: true, avatar: true },
            },
            siteEvents: {
              include: {
                siteEvent: {
                  include: {
                    site: true,
                  },
                },
              },
            },
            participations: {
              select: {
                status: true,
                influencer: {
                  select: { id: true, name: true, walletAddress: true, avatar: true },
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
            _count: {
              select: { participations: true },
            },
          },
        },
      },
    });
    
    let allCampaigns = [
      ...createdCampaigns.map(campaign => ({ campaign, userRole: 'manager' as CampaignUserRole })),
      ...participations.map(({ campaign }) => ({ campaign, userRole: 'influencer' as CampaignUserRole })),
    ];
    
    if (isComplete) {
      const complete = await prisma.campaign.findMany({
        where: {
          ...campaignWhere,
          id: { notIn: allCampaigns.map(c => c.campaign.id) },
        },
        orderBy: { createdAt: 'desc' },
        select,
      });
      allCampaigns = [
        ...allCampaigns,
        ...complete.map(campaign => ({ campaign, userRole: 'guest' as CampaignUserRole })),
      ];
    }
    
    const transformedCampaigns = allCampaigns.map(({ campaign, userRole }) => {
      
      const sites = groupTrackedEventsBySite(campaign.siteEvents, campaign.participations);
      
      const budgetSpent = sites.reduce((total, site) => {
        return total + site.trackedSiteEventsGroupedByType.reduce((siteTotal, event) => {
          return siteTotal + (event.trackedEventsCount * event.amount);
        }, 0);
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
        startDate: campaign.startDate?.getTime() ?? campaign.createdAt.getTime(),
        endDate: campaign.endDate?.getTime() ?? campaign.createdAt.getTime(),
        sites,
        participants: campaign.participations.map(p => {
          // Group tracked events by event type
          const summaryTrackedSiteEvents: Record<SiteEventType, { total: number; lastUpdated: number }> = {} as any;

          p.trackedSiteEvents.forEach(te => {
            const eventType = te.siteEvent.eventType;

            if (!summaryTrackedSiteEvents[eventType]) {
              summaryTrackedSiteEvents[eventType] = {
                total: 0,
                lastUpdated: 0,
              };
            }

            summaryTrackedSiteEvents[eventType].total += 1;
            const createdAtTime = new Date(te.createdAt).getTime();
            if (createdAtTime > summaryTrackedSiteEvents[eventType].lastUpdated) {
              summaryTrackedSiteEvents[eventType].lastUpdated = createdAtTime;
            }
          });

          return {
            id: p.influencer.id,
            name: p.influencer.name || '',
            walletAddress: p.influencer.walletAddress,
            avatar: p.influencer.avatar || '',
            status: p.status,
            summaryTrackedSiteEvents,
          };
        }),
        createdAt: campaign.createdAt.getTime(),
        updatedAt: campaign.updatedAt.getTime(),
        isDeleted: !!campaign.deletedAt,
        owner: {
          id: campaign.owner.id,
          name: campaign.owner.name || '',
          walletAddress: campaign.owner.walletAddress,
          avatar: campaign.owner.avatar || '',
        },
        userRole,
      };
    })
      .sort((a, b) => b.createdAt - a.createdAt);
    
    // Apply pagination
    const paginatedCampaigns = transformedCampaigns.slice(skip, skip + limit);
    const total = transformedCampaigns.length;
    
    const response: ApiListResponse<CampaignResponseDTO> = {
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
