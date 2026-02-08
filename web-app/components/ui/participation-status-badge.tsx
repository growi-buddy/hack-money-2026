import { Badge } from '@/components/ui/badge';
import { PARTICIPATION_STATUS } from '@/lib/constants';
import { ParticipationStatus } from '@/lib/db/enums';
import { cn } from '@/lib/utils';
import { Check, Clock, Mail, X } from 'lucide-react';

interface ParticipationStatusBadgeProps {
  status: ParticipationStatus;
  className?: string;
  showIcon?: boolean;
}

const STATUS_CONFIG = {
  [ParticipationStatus.ACCEPTED]: {
    className: 'bg-growi-success text-white hover:bg-growi-success/90',
    icon: Check,
  },
  [ParticipationStatus.APPLY_PENDING]: {
    className: 'bg-growi-yellow text-white hover:bg-growi-yellow/90',
    icon: Clock,
  },
  [ParticipationStatus.INVITATION_SENT]: {
    className: 'bg-growi-blue text-white hover:bg-growi-blue/90',
    icon: Mail,
  },
  [ParticipationStatus.REJECTED]: {
    className: 'bg-destructive text-white hover:bg-destructive/90',
    icon: X,
  },
};

export function ParticipationStatusBadge({
  status,
  className,
  showIcon = true
}: ParticipationStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge className={cn(config.className, className)}>
      {showIcon && <Icon className="mr-1 h-3 w-3" />}
      {PARTICIPATION_STATUS[status]}
    </Badge>
  );
}