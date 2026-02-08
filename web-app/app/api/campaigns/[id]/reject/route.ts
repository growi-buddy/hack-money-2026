import { safeRouteWithWalletAddress } from '@/helpers';
import { prisma } from '@/lib/db';
import { ParticipationStatus } from '@/lib/db/enums';
import { ApiDataResponse, ApiErrorResponse } from '@/types';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRouteWithWalletAddress(req, async (user) => {
    const { id: campaignId } = await params;
    const { searchParams } = new URL(req.url);
    const participationId = searchParams.get('participationId');
    const influencerWalletAddress = searchParams.get('walletAddress');
    
    if (!participationId && !influencerWalletAddress) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'MISSING_PARAMS', message: 'Either participationId or walletAddress is required' },
      };
      return { response, status: 400 };
    }
    
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    if (campaign.ownerId !== user.id) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only campaign owner can reject participants' },
      };
      return { response, status: 403 };
    }
    
    let participation;
    if (participationId) {
      participation = await prisma.participation.findFirst({
        where: {
          id: participationId,
          campaignId,
        },
      });
    } else if (influencerWalletAddress) {
      const influencer = await prisma.user.findUnique({
        where: { walletAddress: influencerWalletAddress },
      });
      
      if (!influencer) {
        const response: ApiErrorResponse = {
          success: false,
          error: { code: 'INFLUENCER_NOT_FOUND', message: 'Influencer not found' },
        };
        return { response, status: 404 };
      }
      
      participation = await prisma.participation.findFirst({
        where: {
          influencerId: influencer.id,
          campaignId,
        },
      });
    }
    
    if (!participation) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'PARTICIPATION_NOT_FOUND', message: 'Participation not found' },
      };
      return { response, status: 404 };
    }
    
    const updatedParticipation = await prisma.participation.update({
      where: { id: participation.id },
      data: {
        status: ParticipationStatus.REJECTED,
      },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
        influencer: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    });
    
    const response: ApiDataResponse<typeof updatedParticipation> = {
      success: true,
      data: updatedParticipation,
    };
    return { response, status: 200 };
  });
}
