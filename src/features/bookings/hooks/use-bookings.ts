import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

interface Booking {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export function useBookings() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isBooking, setIsBooking] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBookings([
        {
          id: '1',
          courtId: '3',
          date: '2024-03-15',
          startTime: '10:00',
          endTime: '11:30',
        },
        // Add more bookings...
      ]);
    } catch (err) {
      setError(err as Error);
      toast.error(i18n.t('bookings.error.load'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBooking = useCallback(async (bookingData: Omit<Booking, 'id'>) => {
    setIsBooking(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(i18n.t('bookings.success.book'));
      await loadBookings(); // Refresh bookings
    } catch (error) {
      toast.error(i18n.t('bookings.error.book'));
      throw error;
    } finally {
      setIsBooking(false);
    }
  }, [loadBookings]);

  return {
    bookings,
    isLoading,
    error,
    isBooking,
    selectedDate,
    setSelectedDate,
    handleBooking,
    retry: loadBookings,
  };
}