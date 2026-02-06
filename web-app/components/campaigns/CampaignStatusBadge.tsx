import { Badge } from '@/components/ui/badge';
import { CampaignStatus } from '@/lib/db/enums';

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
  [CampaignStatus.ACTIVE]: {
    label: 'Active',
    className: 'bg-growi-success/20 text-growi-success border-transparent',
  },
  [CampaignStatus.COMPLETED]: {
    label: 'Completed',
    className: 'bg-growi-blue/20 text-growi-blue border-transparent',
  },
  [CampaignStatus.DEPLETED]: {
    label: 'Depleted',
    className: 'bg-amber-500/20 text-amber-600 border-transparent',
  },
  [CampaignStatus.PAUSED]: {
    label: 'Paused',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
  [CampaignStatus.DRAFT]: {
    label: 'Draft',
    className: 'bg-muted/50 text-muted-foreground border-transparent',
  },
  [CampaignStatus.DELETED]: {
    label: 'Archived',
    className: 'bg-muted text-muted-foreground border-transparent',
  },
};

export function CampaignStatusBadge({ status, className = '' }: CampaignStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge className={`${config.className} ${className}`}>
      {config.label}
    </Badge>
  );
}