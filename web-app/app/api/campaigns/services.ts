import { prisma } from '@/lib/db';
import { CampaignStatus } from '@/lib/db/prisma/generated';

export const getCampaignById = (campaignId: string) => {
  return prisma.campaign.findUnique({
    where: {
      id: campaignId,
      status: { not: CampaignStatus.DELETED },
    },
    include: {
      rewardEvents: {
        include: { selectors: true },
      },
    },
  });
};
