import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';
import { NextResponse } from 'next/server';

interface ENSCampaignPayload {
  campaignCode: string;
  terms: {
    campaignId: string;
    title: string;
    description: string;
    budgetTotal: number;
    slots: number;
    startDate: string;
    endDate: string;
    rewardEvents: Array<{
      name: string;
      eventType: string;
      amount: number;
      volumeStep: number;
    }>;
  };
  yellowChannelId: string;
}

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
    
    const ensWriterUrl = process.env.ENS_WRITER_URL;
    if (!ensWriterUrl) {
      throw new Error('ENS_WRITER_URL is not configured');
    }
    
    // Find ACTIVE campaigns that haven't been synced to ENS yet
    const campaigns = await prisma.campaign.findMany({
      where: {
        status: CampaignStatus.ACTIVE,
        deletedAt: null,
        // Check if ensSubdomain is not set (meaning not synced yet)
        ensSubdomain: null,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
        siteEvents: {
          include: {
            siteEvent: {
              select: {
                name: true,
                eventType: true,
              },
            },
          },
        },
      },
      take: 10, // Process max 10 campaigns per run
    });
    
    const results: Array<{
      campaignId: string;
      success: boolean;
      ensSubdomain?: string;
      error?: string;
    }> = [];
    
    for (const campaign of campaigns) {
      try {
        // Generate campaign code from campaign ID (e.g., first 8 chars)
        const campaignCode = campaign.id.substring(0, 8).toUpperCase();
        
        // Prepare terms JSON
        const terms = {
          campaignId: campaign.id,
          title: campaign.title,
          description: campaign.description ?? '',
          budgetTotal: Number(campaign.budgetTotal),
          slots: campaign.slots,
          startDate: campaign.startDate?.toISOString() ?? '',
          endDate: campaign.endDate?.toISOString() ?? '',
          rewardEvents: campaign.siteEvents.map((cse) => ({
            name: cse.siteEvent.name,
            eventType: cse.siteEvent.eventType,
            amount: Number(cse.amount),
            volumeStep: cse.volumeStep,
          })),
        };
        
        // Create Yellow channel ID (you can generate or use campaign ID)
        const yellowChannelId = `growi-${campaign.id}`;
        
        const payload: ENSCampaignPayload = {
          terms,
          yellowChannelId,
          code: campaignCode,
          'campaignId': campaign.id,
          'campaignName': campaign.name,
          'description': campaign.description,
          'startDate': campaign.startDate,
          'endDate': campaign.endDate,
        };
        
        const response = await fetch(`${ensWriterUrl}/api/ens/campaigns`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `ENS Writer API returned ${response.status}`);
        }
        
        const data = await response.json();
        const ensSubdomain = data.subdomain || `${campaignCode.toLowerCase()}.growi.eth`;
        
        await prisma.campaign.update({
          where: { id: campaign.id },
          data: {
            ensSubdomain,
          },
        });
        
        results.push({
          campaignId: campaign.id,
          success: true,
          ensSubdomain,
        });
      } catch (error) {
        console.error(`[Cron: sync-campaigns-ens] Error syncing campaign ${campaign.id}:`, error);
        results.push({
          campaignId: campaign.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    
    const successCount = results.filter((r) => r.success).length;
    const errorCount = results.filter((r) => !r.success).length;
    
    return NextResponse.json({
      success: true,
      data: {
        campaignsChecked: campaigns.length,
        successCount,
        errorCount,
        results,
        checkedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[Cron: sync-campaigns-ens] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
