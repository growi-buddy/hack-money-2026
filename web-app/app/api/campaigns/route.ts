import { safeRoute } from '@/helpers';
import { prisma } from '@/lib/db';
import { CampaignModel } from '@/lib/db/prisma/generated/models/Campaign';
import { ApiDataResponse, ApiErrorResponse, ApiListResponse, CreateCampaignDTO } from '@/types/dto';
import { NextResponse } from 'next/server';

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
    
    const response: ApiListResponse<CampaignModel> = {
      success: true,
      data: campaigns,
      meta: { total, page, limit },
    };
    return { response };
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = CreateCampaignDTO.parse(body);
    
    const campaign = await prisma.campaign.create({
      data: {
        brandId: validatedData.brandId,
        title: validatedData.title,
        escrowAddress: validatedData.escrowAddress,
        budgetTotal: validatedData.budgetTotal,
        payoutRates: {
          create: validatedData.payoutRates,
        },
      },
      include: { payoutRates: true },
    });
    
    const response: ApiDataResponse<CampaignModel> = {
      success: true,
      data: campaign,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    const response: ApiErrorResponse = {
      success: false,
      error: { code: 'SERVER_ERROR', message: (error as Error)?.message || 'Internal Server Error' },
    };
    return NextResponse.json(response, { status: 400 });
  }
}
