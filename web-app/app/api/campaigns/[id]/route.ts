import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated/enums';
import { CampaignModel } from '@/lib/db/prisma/generated/models/Campaign';
import { ApiDataResponse, ApiErrorResponse, UpdateCampaignDTO } from '@/types/dto';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    
    const { id } = await params;
    
    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
        status: { not: CampaignStatus.DELETED },
      },
      include: { payoutRates: true },
    });
    
    if (!campaign) {
      const response: ApiErrorResponse = {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Campaign not found' },
      };
      return { response, status: 404 };
    }
    
    const response: ApiDataResponse<CampaignModel> = {
      success: true,
      data: campaign,
    };
    
    return { response };
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const body = await req.json();
    const { id } = await params;
    
    const validatedData = UpdateCampaignDTO.parse(body);
    const updated = await prisma.$transaction(async (tx) => {
      await tx.payoutRate.deleteMany({
        where: { campaignId: id },
      });
      
      return tx.campaign.update({
        where: { id },
        data: {
          ...validatedData,
          payoutRates: {
            create: validatedData.payoutRates,
          },
        },
        include: { payoutRates: true },
      });
    });
    
    const response: ApiDataResponse<CampaignModel> = {
      success: true,
      data: updated,
    };
    
    return { response };
  });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  return safeRoute(async () => {
    const { id } = await params;
    
    const deletedCampaign = await prisma.campaign.update({
      where: { id },
      data: { status: CampaignStatus.DELETED },
    });
    
    const response: ApiDataResponse<{ id: string, status: CampaignStatus }> = {
      success: true,
      data: { id: deletedCampaign.id, status: CampaignStatus.DELETED },
    };
    return { response };
  });
}
