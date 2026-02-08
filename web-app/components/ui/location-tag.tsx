import { cn } from '@/lib/utils';
import { MapPin, X } from 'lucide-react';

interface LocationTagProps {
  label: string;
  type?: 'region' | 'country';
  onRemove?: () => void;
  className?: string;
  variant?: 'default' | 'selected';
}

export function LocationTag({
  label,
  type = 'region',
  onRemove,
  className,
  variant = 'default',
}: LocationTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
        variant === 'selected'
          ? 'bg-growi-blue/10 text-growi-blue border border-growi-blue/30 hover:bg-growi-blue/20'
          : 'bg-secondary text-muted-foreground border border-border hover:bg-secondary/80',
        className,
      )}
    >
      <MapPin className="h-3 w-3" />
      <span>{label}</span>
      {type === 'country' && (
        <span className="text-[10px] opacity-60">({type})</span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full hover:bg-background/50 p-0.5 transition-colors"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}