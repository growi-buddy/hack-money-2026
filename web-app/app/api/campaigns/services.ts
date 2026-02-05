import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/enums';

export const getCampaignById = (campaignId: string) => {
  return prisma.campaign.findUnique({
    where: {
      id: campaignId,
      status: { not: CampaignStatus.DELETED },
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
};
