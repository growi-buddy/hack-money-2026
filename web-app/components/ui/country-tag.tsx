import { cn } from '@/lib/utils';
import { MapPin, X } from 'lucide-react';

interface LocationTagProps {
  label: string;
  type?: 'region' | 'country';
  onRemove?: () => void;
  className?: string;
  variant?: 'default' | 'selected';
  onClick?: () => void;
}

export function CountryTag({
                             label,
                             type = 'region',
                             onRemove,
                             className,
                             variant = 'default',
                             onClick,
                           }: LocationTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer',
        variant === 'selected'
          ? 'bg-growi-blue/15 text-growi-blue border border-growi-blue/40 hover:bg-growi-blue/25'
          : 'bg-transparent text-muted-foreground border border-growi-blue/10 hover:bg-secondary/50',
        className,
      )}
      onClick={onClick}
    >
      <MapPin className="h-3 w-3" />
      <span className="capitalize">{label}</span>
      {type === 'country' && (
        <span className="text-[10px] opacity-60">({type})</span>
      )}
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
