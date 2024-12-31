import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { i18n } from '@/lib/i18n';

interface ModuleFormData {
  title: string;
  description: string;
  sort_order: number;
}

interface ModuleFormProps {
  initialData?: Partial<ModuleFormData>;
  onSubmit: (data: ModuleFormData) => Promise<void>;
  isLoading?: boolean;
}

export function ModuleForm({ initialData, onSubmit, isLoading }: ModuleFormProps) {
  const [formData, setFormData] = useState<ModuleFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    sort_order: initialData?.sort_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">{i18n.t('courses.modules.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">{i18n.t('courses.modules.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="sort_order">{i18n.t('courses.modules.order')}</Label>
            <Input
              id="sort_order"
              type="number"
              min="0"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
              required
            />
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="animate-pulse">{i18n.t('common.saving')}</span>
          ) : (
            i18n.t('common.save')
          )}
        </Button>
      </Card>
    </form>
  );
}