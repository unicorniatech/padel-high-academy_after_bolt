import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

interface BookingFormData {
  courtId: string;
  startTime: string;
}

export function useBookingForm(onSubmit: (data: BookingFormData) => Promise<void>) {
  const [courtId, setCourtId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courtId || !startTime) {
      toast.error(i18n.t('bookings.error.incomplete'));
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ courtId, startTime });
      setCourtId('');
      setStartTime('');
    } catch {
      // Error is handled by the parent component
    } finally {
      setIsSubmitting(false);
    }
  }, [courtId, startTime, onSubmit]);

  return {
    formState: {
      courtId,
      startTime,
      isSubmitting
    },
    handlers: {
      setCourtId,
      setStartTime,
      handleSubmit
    }
  };
}