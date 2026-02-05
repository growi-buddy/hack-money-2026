import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { Campaign } from '@/lib/db/prisma/generated';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiListResponse, CreateCampaignDTO } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const skip = (page - 1) * limit;

    const [campaigns, total] = await Promise.all([
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

      // Verify all reward events exist and belong to the user
      if (validatedData.rewardEvents.length > 0) {
        const rewardEventIds = validatedData.rewardEvents.map(re => re.rewardEventId);
        const existingRewardEvents = await tx.rewardEvent.findMany({
          where: {
            id: { in: rewardEventIds },
            ownerId: user.id,
          },
        });

        if (existingRewardEvents.length !== rewardEventIds.length) {
          throw new Error('One or more reward events not found or do not belong to the user');
        }
      }

      return tx.campaign.create({
        data: {
          ownerId: user.id,
          title: validatedData.title,
          escrowAddress: '',
          budgetTotal: validatedData.budgetTotal,
          rewardEvents: {
            create: validatedData.rewardEvents.map(event => ({
              rewardEventId: event.rewardEventId,
              amount: event.amount,
              volumeStep: event.volumeStep ?? 1,
            })),
          },
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
    });

    const response: ApiDataResponse<Campaign> = {
      success: true,
      data: campaign,
    };
    return { response, status: 201 };
  });
}
