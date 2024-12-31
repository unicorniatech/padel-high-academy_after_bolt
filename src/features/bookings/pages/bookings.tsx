import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CalendarView } from '../components/calendar/calendar-view';
import { TimeSlotGrid } from '../components/time-slots/time-slot-grid';
import { BookingForm } from '../components/form/booking-form';
import { useBookingPage } from '../hooks/use-booking-page';
import { i18n } from '@/lib/i18n';

const DEMO_TIME_SLOTS = [
  { time: '09:00', available: true, price: 500, type: 'lesson' },
  { time: '10:30', available: false, price: 500, type: 'lesson' },
  { time: '12:00', available: true, price: 800, type: 'webinar' },
  { time: '15:00', available: true, price: 500, type: 'lesson' },
  { time: '16:30', available: true, price: 800, type: 'webinar' },
];

export function BookingsPage() {
  const {
    selectedDate,
    selectedTime,
    isLoading,
    setSelectedDate,
    setSelectedTime,
    handleBooking,
  } = useBookingPage();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: i18n.t('navigation.bookings') }]}
        className="text-muted-foreground/60"
      />

      <PageHeader
        title={i18n.t('bookings.title')}
        description={i18n.t('bookings.description')}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            disabled={isLoading}
          />
          <TimeSlotGrid
            slots={DEMO_TIME_SLOTS}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            disabled={isLoading}
          />
        </div>
        <BookingForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSubmit={handleBooking}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}