import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { i18n } from '@/lib/i18n';

interface BookingCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  disabled?: boolean;
}

export function BookingCalendar({ 
  selectedDate, 
  onDateChange,
  disabled 
}: BookingCalendarProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 font-semibold">{i18n.t('bookings.selectDate')}</h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateChange(date)}
        locale={es}
        className="rounded-md border"
        disabled={(date) => {
          if (disabled) return true;
          return date < new Date();
        }}
      />
    </Card>
  );
}