import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { getOrCreateUserByWallet } from '@/lib/services/user.service';
import { ApiDataResponse, ApiErrorResponse, CreateRewardEventSchema, RewardEventDTO } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);

    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'walletAddress is required' },
      };
      return { response, status: 400 };
    }

    const user = await getOrCreateUserByWallet(walletAddress);

    const rewardEvents = await prisma.rewardEvent.findMany({
      where: { ownerId: user.id },
      include: { selectors: true },
      orderBy: { createdAt: 'desc' },
    });

    const response: ApiDataResponse<RewardEventDTO[]> = {
      success: true,
      data: rewardEvents.map(event => ({
        id: event.id,
        name: event.name,
        eventType: event.eventType,
        selectors: event.selectors.map(sel => ({
          id: sel.id,
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive,
        })),
      })),
    };
    return { response };
  });
}

export async function POST(req: Request) {
  return safeRoute(async () => {
    const body = await req.json();

    const validatedData = CreateRewardEventSchema.parse(body);

    const { walletAddress, name, eventType, selectors } = validatedData;

    const user = await getOrCreateUserByWallet(walletAddress);

    const rewardEvent = await prisma.rewardEvent.create({
      data: {
        ownerId: user.id,
        name,
        eventType,
        selectors: selectors.length > 0
          ? {
            create: selectors.map(sel => ({
              selector: sel.selector,
              eventType: sel.eventType,
              isActive: sel.isActive,
            })),
          }
          : undefined,
      },
      include: { selectors: true },
    });

    const response: ApiDataResponse<RewardEventDTO> = {
      success: true,
      data: {
        id: rewardEvent.id,
        name: rewardEvent.name,
        eventType: rewardEvent.eventType,
        selectors: rewardEvent.selectors.map(sel => ({
          id: sel.id,
          selector: sel.selector,
          eventType: sel.eventType,
          isActive: sel.isActive,
        })),
      },
    };
    return { response, status: 201 };
  });
}
