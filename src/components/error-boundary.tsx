import { useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home } from 'lucide-react';
import { i18n } from '@/lib/i18n';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">
          {i18n.t('common.error')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {i18n.t('common.pageNotFound')}
        </p>
        <Button
          className="mt-4"
          onClick={() => window.location.href = '/'}
        >
          <Home className="mr-2 h-4 w-4" />
          {i18n.t('common.returnHome')}
        </Button>
      </div>
    </div>
  );
}