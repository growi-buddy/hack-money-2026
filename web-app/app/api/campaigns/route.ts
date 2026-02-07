import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { Campaign } from '@/lib/db/prisma/generated';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiListResponse, CreateCampaignDTO } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;
    
    const [ campaigns, total ] = await Promise.all([
      prisma.campaign.findMany({
        skip,
        take: limit,
        include: { _count: { select: { participations: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.campaign.count(),
    ]);
    
    const response: ApiListResponse<Campaign> = {
      success: true,
      data: campaigns,
      meta: { total, page, limit },
    };
    return { response };
  });
}

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();
    const validatedData = CreateCampaignDTO.parse(body);

    const campaign = await prisma.$transaction(async (tx) => {
      const user = await getOrCreateUserByWallet(validatedData.walletAddress, tx);

      // Verify all site events exist and belong to the user
      if (validatedData.siteEvents.length > 0) {
        const siteEventIds = validatedData.siteEvents.map(se => se.siteEventId);
        const existingSiteEvents = await tx.siteEvent.findMany({
          where: {
            id: { in: siteEventIds },
          },
          include: {
            site: true,
          },
        });

        // Verify all site events exist
        if (existingSiteEvents.length !== siteEventIds.length) {
          throw new Error('One or more site events not found');
        }

        // Verify all sites belong to the user
        const invalidSites = existingSiteEvents.filter(se => se.site.ownerId !== user.id);
        if (invalidSites.length > 0) {
          throw new Error('One or more site events do not belong to the user');
        }
      }

      return tx.campaign.create({
        data: {
          status: CampaignStatus.DRAFT,
          ownerId: user.id,
          title: validatedData.title,
          description: validatedData.description,
          escrowAddress: '',
          budgetTotal: validatedData.budgetTotal,
          slots: validatedData.slots ?? 10,
          interests: validatedData.interests ?? [],
          demographics: validatedData.demographics ?? [],
          regions: validatedData.regions ?? [],
          countries: validatedData.countries ?? [],
          startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
          endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
          siteEvents: {
            create: validatedData.siteEvents.map(event => ({
              siteEventId: event.siteEventId,
              amount: event.amount,
              volumeStep: event.volumeStep ?? 1,
            })),
          },
        },
        include: {
          siteEvents: {
            include: {
              siteEvent: {
                include: {
                  site: true,
                  selectors: true,
                },
              },
            },
          },
        },
      });
    });

    const response: ApiDataResponse<Campaign> = {
      success: true,
      data: campaign,
    };
    return { response, status: 201 };
  });
}
