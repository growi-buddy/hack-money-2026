import { cn } from '@/lib/utils';
import { Tag, X } from 'lucide-react';

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
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer',
        variant === 'selected'
          ? 'bg-growi-lime/15 text-growi-lime border border-growi-lime/40 hover:bg-growi-lime/25'
          : 'bg-transparent text-muted-foreground border border-growi-lime/10 hover:bg-secondary/50',
        className,
      )}
      onClick={onClick}
    >
      <Tag className="h-3 w-3" />
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
