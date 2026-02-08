import { cn } from '@/lib/utils';
import { Globe, X } from 'lucide-react';

interface GeographicRegionTagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  variant?: 'default' | 'selected';
  onClick?: () => void;
}

export function RegionTag({
                            label,
                            onRemove,
                            className,
                            variant = 'default',
                            onClick,
                          }: GeographicRegionTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer',
        variant === 'selected'
          ? 'bg-orange-500/15 text-orange-600 border border-orange-500/40 hover:bg-orange-500/25'
          : 'bg-transparent text-muted-foreground border border-orange-500/10 hover:bg-secondary/50',
        className,
      )}
      onClick={onClick}
    >
      <Globe className="h-3 w-3" />
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
