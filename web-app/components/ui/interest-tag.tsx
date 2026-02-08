import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface InterestTagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  variant?: 'default' | 'selected';
  onClick?: () => void,
}

export function InterestTag({
                              label,
                              onRemove,
                              className,
                              variant = 'default',
                              onClick,
                            }: InterestTagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
        variant === 'selected'
          ? 'bg-growi-lime/10 text-growi-lime border border-growi-lime/30 hover:bg-growi-lime/20'
          : 'bg-secondary text-muted-foreground border border-border hover:bg-secondary/80',
        className,
      )}
      onClick={onClick}
    >
      <span>{label}</span>
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
