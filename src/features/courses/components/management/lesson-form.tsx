import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { i18n } from '@/lib/i18n';

interface LessonFormData {
  title: string;
  description: string;
  content: string;
  video_url: string;
  duration: number;
  sort_order: number;
  is_free: boolean;
}

interface LessonFormProps {
  initialData?: Partial<LessonFormData>;
  onSubmit: (data: LessonFormData) => Promise<void>;
  isLoading?: boolean;
}

export function LessonForm({ initialData, onSubmit, isLoading }: LessonFormProps) {
  const [formData, setFormData] = useState<LessonFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    video_url: initialData?.video_url || '',
    duration: initialData?.duration || 30,
    sort_order: initialData?.sort_order || 0,
    is_free: initialData?.is_free || false,
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
            <Label htmlFor="title">{i18n.t('courses.lessons.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">{i18n.t('courses.lessons.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="content">{i18n.t('courses.lessons.content')}</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="video_url">{i18n.t('courses.lessons.videoUrl')}</Label>
            <Input
              id="video_url"
              type="url"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="duration">{i18n.t('courses.lessons.duration')}</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="sort_order">{i18n.t('courses.lessons.order')}</Label>
            <Input
              id="sort_order"
              type="number"
              min="0"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_free"
              checked={formData.is_free}
              onCheckedChange={(checked) => setFormData({ ...formData, is_free: checked })}
            />
            <Label htmlFor="is_free">{i18n.t('courses.lessons.isFree')}</Label>
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