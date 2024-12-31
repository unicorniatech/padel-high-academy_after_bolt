import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n } from '@/lib/i18n';

interface CourseFormData {
  title: string;
  description: string;
  level: string;
  category_id: string;
  price: number;
  duration: number;
  thumbnail_url: string;
}

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CourseForm({ initialData, onSubmit, isLoading }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    level: initialData?.level || 'beginner',
    category_id: initialData?.category_id || '',
    price: initialData?.price || 0,
    duration: initialData?.duration || 60,
    thumbnail_url: initialData?.thumbnail_url || '',
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
            <Label htmlFor="title">{i18n.t('courses.form.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">{i18n.t('courses.form.description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>{i18n.t('courses.form.level')}</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => setFormData({ ...formData, level: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">
                  {i18n.t('courses.levels.beginner')}
                </SelectItem>
                <SelectItem value="intermediate">
                  {i18n.t('courses.levels.intermediate')}
                </SelectItem>
                <SelectItem value="advanced">
                  {i18n.t('courses.levels.advanced')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">{i18n.t('courses.form.price')}</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">{i18n.t('courses.form.duration')}</Label>
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
            <Label htmlFor="thumbnail">{i18n.t('courses.form.thumbnail')}</Label>
            <Input
              id="thumbnail"
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
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