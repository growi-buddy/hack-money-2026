import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { Campaign } from '@/lib/db/prisma/generated';
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
    
    const campaign = await prisma.campaign.create({
      data: {
        ownerId: validatedData.ownerId,
        title: validatedData.title,
        escrowAddress: validatedData.escrowAddress,
        budgetTotal: validatedData.budgetTotal,
        rewardEvents: {
          create: validatedData.rewardEvents.map(event => ({
            eventType: event.eventType,
            amount: event.amount,
            volumeStep: event.volumeStep ?? 1,
            selectors: {
              create: event.selectors?.map(selector => ({
                selector: selector.selector,
                eventType: selector.eventType,
                isActive: selector.isActive ?? true,
              })) ?? [],
            },
          })),
        },
      },
      include: {
        rewardEvents: {
          include: { selectors: true },
        },
      },
    });
    
    const response: ApiDataResponse<Campaign> = {
      success: true,
      data: campaign,
    };
    return { response, status: 201 };
  });
}
