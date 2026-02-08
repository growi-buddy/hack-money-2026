'use client';

import { Badge } from '@/components/ui/badge';
import { CampaignStatus } from '@/lib/db/enums';
import { motion } from 'framer-motion';

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  CampaignStatus,
  {
    label: string;
    className: string;
  }
> = {
  [CampaignStatus.DRAFT]: {
    label: 'Draft',
    className: 'bg-muted/50 text-muted-foreground border-transparent',
  },
  [CampaignStatus.PUBLISHED]: {
    label: 'Published',
    className: 'bg-growi-success/20 text-growi-success border-transparent',
  },
  [CampaignStatus.ACTIVE]: {
    label: 'Active',
    className: 'bg-growi-success/20 text-growi-success border-transparent',
  },
  [CampaignStatus.PAUSED]: {
    label: 'Paused',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  [CampaignStatus.DEPLETED]: {
    label: 'Depleted',
    className: 'bg-amber-500/20 text-amber-600 border-transparent',
  },
  [CampaignStatus.EXPIRED]: {
    label: 'Expired',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  [CampaignStatus.COMPLETED]: {
    label: 'Completed',
    className: 'bg-growi-blue/20 text-growi-blue border-transparent',
  },
};

export function CampaignStatusBadge({ status, className = '' }: CampaignStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  
  return (
    <>
      {status === CampaignStatus.ACTIVE && (<motion.div
          animate={{
            scale: [ 1, 1.3, 1 ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="h-1.5 w-1.5 rounded-full bg-red-500"
          style={{ height: 8, width: 8 }}
        />
      )}
      <Badge className={`${config.className} ${className}`}>
        {config.label}
      </Badge>
    </>
  );
}
