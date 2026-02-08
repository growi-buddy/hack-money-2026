import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ParticipationStatus } from '@/lib/db/enums';
import { CampaignStatus } from '@/lib/db/prisma/generated';
import { ApiDataResponse, ApiErrorResponse } from '@/types';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const { id: campaignId } = await params;
    
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        _count: {
          select: { participations: true },
        },
      },
    });
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    if (campaign.status !== CampaignStatus.PUBLISHED) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'CAMPAIGN_NOT_ACTIVE', message: 'Campaign is not accepting participants' },
      };
      return { response, status: 400 };
    }
    
    if (campaign._count.participations >= campaign.slots) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'SLOTS_FULL', message: 'Campaign has no available slots' },
      };
      return { response, status: 400 };
    }
    
    if (campaign.ownerId === user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'OWNER_CANNOT_PARTICIPATE', message: 'Campaign owner cannot participate in their own campaign' },
      };
      return { response, status: 400 };
    }
    
    const existingParticipation = await prisma.participation.findUnique({
      where: {
        influencerId_campaignId: {
          influencerId: user.id,
          campaignId,
        },
      },
    });
    
    if (existingParticipation) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'ALREADY_PARTICIPATING', message: 'You are already participating in this campaign' },
      };
      return { response, status: 400 };
    }
    
    const participation = await prisma.participation.create({
      data: {
        influencerId: user.id,
        campaignId,
        status: ParticipationStatus.APPLY_PENDING,
      },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
        links: true,
      },
    });
    
    const response: ApiDataResponse<typeof participation> = {
      success: true,
      data: participation,
    };
    return { response, status: 201 };
  });
}
