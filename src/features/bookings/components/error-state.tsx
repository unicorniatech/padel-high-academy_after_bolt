import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { i18n } from '@/lib/i18n';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-lg font-semibold">
        {i18n.t('bookings.error.title')}
      </h2>
      <p className="text-sm text-muted-foreground">
        {i18n.t('bookings.error.description')}
      </p>
      <Button onClick={onRetry}>
        {i18n.t('common.retry')}
      </Button>
    </div>
  );
}