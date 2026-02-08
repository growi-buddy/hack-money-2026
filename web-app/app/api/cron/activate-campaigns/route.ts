import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Verify CRON secret
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }
    
    const now = new Date();
    
    // Find PUBLISHED campaigns whose startDate is in the past
    const result = await prisma.campaign.updateMany({
      where: {
        status: CampaignStatus.PUBLISHED,
        startDate: { lte: now },
        deletedAt: null,
      },
      data: {
        status: CampaignStatus.ACTIVE,
      },
    });
    
    return NextResponse.json({
      success: true,
      data: {
        activatedCount: result.count,
        checkedAt: now.toISOString(),
      },
    });
  } catch (error) {
    console.error('[Cron: activate-campaigns] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
