import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  children: React.ReactNode;
  icon: React.ElementType;
  isActive?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function NavigationLink({
  children,
  icon: Icon,
  isActive,
  isLoading,
  isDisabled,
  onClick,
}: NavigationLinkProps) {
  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start',
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="mr-2 h-4 w-4" />
      )}
      {children}
    </Button>
  );
}