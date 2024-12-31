import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  type: 'lesson' | 'webinar';
  notes?: string;
}

export function useBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = useCallback(async (formData: BookingFormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error(i18n.t('bookings.error.incomplete'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(i18n.t('bookings.success.booked'));
      
      // Reset form
      setSelectedTime(undefined);
    } catch (error) {
      toast.error(i18n.t('bookings.error.failed'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedTime]);

  return {
    selectedDate,
    selectedTime,
    isLoading,
    setSelectedDate,
    setSelectedTime,
    handleBooking,
  };
}