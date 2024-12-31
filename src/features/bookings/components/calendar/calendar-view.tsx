import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { i18n } from '@/lib/i18n';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  bookedDates?: Date[];
  lessonDates?: Date[];
  webinarDates?: Date[];
  disabled?: boolean;
}

export function CalendarView({
  selectedDate,
  onDateSelect,
  bookedDates = [],
  lessonDates = [],
  webinarDates = [],
  disabled
}: CalendarViewProps) {
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const getDateClassNames = (date: Date) => {
    const isLesson = lessonDates.some(d => d.toDateString() === date.toDateString());
    const isWebinar = webinarDates.some(d => d.toDateString() === date.toDateString());

    return cn(
      isLesson && 'bg-blue-100 text-blue-900 hover:bg-blue-200',
      isWebinar && 'bg-purple-100 text-purple-900 hover:bg-purple-200'
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{i18n.t('bookings.calendar.title')}</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-100">
            {i18n.t('bookings.calendar.lessons')}
          </Badge>
          <Badge variant="outline" className="bg-purple-100">
            {i18n.t('bookings.calendar.webinars')}
          </Badge>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        locale={es}
        disabled={(date) => {
          if (disabled) return true;
          return date < new Date() || isDateBooked(date);
        }}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersClassNames={{
          booked: 'line-through opacity-50',
        }}
        className="rounded-md border"
        classNames={{
          day_selected: cn(
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            getDateClassNames(selectedDate)
          ),
        }}
      />
    </Card>
  );
}