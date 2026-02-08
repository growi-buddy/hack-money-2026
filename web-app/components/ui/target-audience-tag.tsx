import { cn } from '@/lib/utils';
import { Users, X } from 'lucide-react';

interface TargetAudienceTagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  variant?: 'default' | 'selected';
  onClick?: () => void;
}

export function TargetAudienceTag({
                                    label,
                                    onRemove,
                                    className,
                                    variant = 'default',
                                    onClick,
                                  }: TargetAudienceTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer',
        variant === 'selected'
          ? 'bg-purple-500/15 text-purple-600 border border-purple-500/40 hover:bg-purple-500/25'
          : 'bg-transparent text-muted-foreground border border-purple-500/10 hover:bg-secondary/50',
        className,
      )}
      onClick={onClick}
    >
      <Users className="h-3 w-3" />
      <span className="capitalize">{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="rounded-full hover:bg-background/50 p-0.5 transition-colors"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
