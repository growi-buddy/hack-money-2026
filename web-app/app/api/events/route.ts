import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { ApiDataResponse, ApiErrorResponse } from '@/types';

export async function GET(req: Request) {
  return safeRoute(async () => {
    const { searchParams } = new URL(req.url);
    
    const campaignRewardEventId = searchParams.get('campaignRewardEventId');
    const clientId = searchParams.get('clientId');
    const limit = parseInt(searchParams.get('limit') ?? '50');
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    if (!campaignRewardEventId && !clientId) {
      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Either campaignRewardEventId or clientId is required',
        },
      };
      return { response, status: 400 };
    }
    
    const whereClause: { campaignRewardEventId?: string; clientId?: string } = {};
    if (campaignRewardEventId) whereClause.campaignRewardEventId = campaignRewardEventId;
    if (clientId) whereClause.clientId = clientId;
    
    const [ events, total ] = await Promise.all([
      prisma.trackedEvent.findMany({
        where: whereClause,
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
        include: {
          campaignRewardEvent: {
            include: {
              rewardEvent: true,
            },
          },
        },
      }),
      prisma.trackedEvent.count({ where: whereClause }),
    ]);
    
    const response: ApiDataResponse<{ events: typeof events; total: number }> = {
      success: true,
      data: {
        events,
        total,
      },
    };
    
    return { response };
  });
}
