```tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

type AuthMode = 'signin' | 'signup';
type UserRole = 'student' | 'teacher';

export function AuthForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student' as UserRole,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              role: formData.role,
            },
          },
        });

        if (signUpError) throw signUpError;

        toast.success(i18n.t('auth.signupSuccess'));
        navigate('/auth/verify-email');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        toast.success(i18n.t('auth.signinSuccess'));
        navigate(formData.role === 'teacher' ? '/teacher' : '/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {mode === 'signin' 
              ? i18n.t('auth.signin') 
              : i18n.t('auth.signup')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'signin'
              ? i18n.t('auth.signinDescription')
              : i18n.t('auth.signupDescription')}
          </p>
        </div>

        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name">{i18n.t('auth.name')}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">{i18n.t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{i18n.t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {mode === 'signup' && (
          <div className="space-y-2">
            <Label>{i18n.t('auth.role')}</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value: UserRole) => 
                setFormData({ ...formData, role: value })
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">{i18n.t('auth.roles.student')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teacher" id="teacher" />
                <Label htmlFor="teacher">{i18n.t('auth.roles.teacher')}</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="animate-pulse">
              {i18n.t('common.loading')}
            </span>
          ) : mode === 'signin' ? (
            i18n.t('auth.signinButton')
          ) : (
            i18n.t('auth.signupButton')
          )}
        </Button>

        <div className="text-center text-sm">
          {mode === 'signin' ? (
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setMode('signup')}
            >
              {i18n.t('auth.noAccount')}
            </button>
          ) : (
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => setMode('signin')}
            >
              {i18n.t('auth.hasAccount')}
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
```