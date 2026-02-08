import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ParticipationStatus } from '@/lib/db/enums';
import { CampaignResponseDTO } from '@/types';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export const CampaignSlots = ({ campaign }: { campaign: CampaignResponseDTO }) => {
  
  // Calculate accepted and pending participants
  const acceptedCount = campaign.participants.filter(p => p.status === ParticipationStatus.ACCEPTED).length;
  const pendingCount = campaign.participants.filter(p => p.status === ParticipationStatus.APPLY_PENDING).length;
  
  // Calculate percentages (can exceed 100% if more applications than slots)
  const acceptedProgress = campaign.slots > 0 ? Math.min((acceptedCount / campaign.slots) * 100, 100) : 0;
  const pendingProgress = campaign.slots > 0 ? Math.min(((acceptedCount + pendingCount) / campaign.slots) * 100, 100) : 0;
  
  return (
    <>
      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          <span>Slots</span>
        </div>
        <span>{acceptedCount + pendingCount}/{campaign.slots}</span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="h-2 overflow-hidden rounded-full bg-secondary relative cursor-help">
              {/* Pending applications bar (lighter color, full width) */}
              <motion.div
                className="h-full bg-growi-blue/40 absolute top-0 left-0"
                initial={{ width: 0 }}
                animate={{ width: `${pendingProgress}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
              />
              {/* Accepted participants bar (darker color, on top) */}
              <motion.div
                className="h-full bg-growi-blue absolute top-0 left-0"
                initial={{ width: 0 }}
                animate={{ width: `${acceptedProgress}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs space-y-1">
              <p className="font-semibold">Slot Status:</p>
              <p className="text-growi-blue">✓ Accepted: {acceptedCount}</p>
              <p className="text-growi-blue/60">⏳ Pending: {pendingCount}</p>
              <p className="text-muted-foreground">Total Slots: {campaign.slots}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
