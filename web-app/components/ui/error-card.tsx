import { AlertCircle } from 'lucide-react';

export const ErrorCard = ({ error }: { error: string | null }) => {
  return !!error && (
    <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
      <p className="text-sm text-destructive">{error}</p>
    </div>
  );
};
