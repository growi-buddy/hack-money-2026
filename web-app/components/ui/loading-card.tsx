import { Card, CardContent } from '@/components/ui/card';
import { UserRoleType } from '@/types';
import { Loader2 } from 'lucide-react';

export const LoadingCard = ({ userRole }: { userRole: UserRoleType }) => {
  
  const primaryColorClass = userRole === 'manager' ? 'text-growi-blue' : 'text-growi-success';
  
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-16">
        <Loader2 className={`h-8 w-8 animate-spin ${primaryColorClass}`} />
      </CardContent>
    </Card>
  );
};
