import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ErrorCard = ({ error }: { error: string }) => {
  return !!error && (
    <Card className="border-destructive/50">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-destructive">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};
