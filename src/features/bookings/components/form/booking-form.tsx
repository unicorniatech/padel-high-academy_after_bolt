import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n } from '@/lib/i18n';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => Promise<void>;
  selectedDate: Date;
  selectedTime?: string;
  disabled?: boolean;
}

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  type: 'lesson' | 'webinar';
  notes?: string;
}

export function BookingForm({
  onSubmit,
  selectedDate,
  selectedTime,
  disabled
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    type: 'lesson',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.type) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'lesson',
        notes: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{i18n.t('bookings.form.name')}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            disabled={disabled || isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{i18n.t('bookings.form.email')}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            disabled={disabled || isSubmitting}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{i18n.t('bookings.form.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            disabled={disabled || isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label>{i18n.t('bookings.form.type')}</Label>
          <Select
            value={formData.type}
            onValueChange={(value: 'lesson' | 'webinar') => 
              setFormData(prev => ({ ...prev, type: value }))
            }
            disabled={disabled || isSubmitting}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lesson">
                {i18n.t('bookings.types.lesson')}
              </SelectItem>
              <SelectItem value="webinar">
                {i18n.t('bookings.types.webinar')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{i18n.t('bookings.form.notes')}</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            disabled={disabled || isSubmitting}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={disabled || isSubmitting || !selectedTime}
        >
          {isSubmitting ? (
            <span className="animate-pulse">
              {i18n.t('bookings.form.processing')}
            </span>
          ) : (
            i18n.t('bookings.form.submit')
          )}
        </Button>
      </form>
    </Card>
  );
}