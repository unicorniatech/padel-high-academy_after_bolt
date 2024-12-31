```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { i18n } from '@/lib/i18n';

export function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <Card className="mx-auto max-w-md p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Mail className="h-6 w-6 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">
        {i18n.t('auth.verifyEmail.title')}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {i18n.t('auth.verifyEmail.description')}
      </p>
      <Button
        className="mt-6 w-full"
        onClick={() => navigate('/auth/signin')}
      >
        {i18n.t('auth.verifyEmail.backToSignin')}
      </Button>
    </Card>
  );
}
```