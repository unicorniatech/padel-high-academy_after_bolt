import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingFormFields } from './booking-form/booking-form-fields';
import { useBookingForm } from '../hooks/use-booking-form';
import { i18n } from '@/lib/i18n';

interface BookingFormProps {
  onSubmit: (data: {
    courtId: string;
    startTime: string;
  }) => Promise<void>;
  disabled?: boolean;
}

export function BookingForm({ onSubmit, disabled }: BookingFormProps) {
  const { formState, handlers } = useBookingForm(onSubmit);

  return (
    <form onSubmit={handlers.handleSubmit}>
      <Card className="p-6">
        <BookingFormFields
          courtId={formState.courtId}
          startTime={formState.startTime}
          onCourtChange={handlers.setCourtId}
          onTimeChange={handlers.setStartTime}
          disabled={disabled || formState.isSubmitting}
        />

        <Button 
          type="submit" 
          className="mt-6 w-full"
          disabled={disabled || formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <span className="animate-pulse">
              {i18n.t('bookings.form.processing')}
            </span>
          ) : (
            i18n.t('bookings.form.submit')
          )}
        </Button>
      </Card>
    </form>
  );
}