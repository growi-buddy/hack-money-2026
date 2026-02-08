import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { ApiDataResponse, CreateCampaignDTO } from '@/types';

export async function POST(req: Request) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const body = await req.json();
    
    const validatedData = CreateCampaignDTO.parse(body);
    
    const result = await prisma.$transaction(async (tx) => {
      
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
        
        if (existingSiteEvents.length !== siteEventIds.length) {
          throw new Error('One or more site events not found');
        }
        
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
      });
    });
    
    const response: ApiDataResponse<{ id: string }> = {
      success: true,
      data: { id: result.id },
    };
    return { response, status: 201 };
  });
}
