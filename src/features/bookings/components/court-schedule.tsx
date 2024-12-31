import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatDate, formatTime } from '@/lib/utils/date-formatter';

interface CourtScheduleProps {
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
  isTimeSlotAvailable: (time: string) => boolean;
}

const TIME_SLOTS = [
  '09:00', '10:30', '12:00', '13:30', '15:00', '16:30'
];

export function CourtSchedule({ 
  selectedDate, 
  onTimeSelect,
  isTimeSlotAvailable 
}: CourtScheduleProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold">{i18n.t('bookings.timeSlots')}</h3>
      
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-2 h-4 w-4" />
        {formatDate(selectedDate)}
      </div>

      <div className="mt-6 space-y-2">
        {TIME_SLOTS.map((time) => {
          const available = isTimeSlotAvailable(time);
          return (
            <Button
              key={time}
              variant={available ? 'outline' : 'ghost'}
              disabled={!available}
              onClick={() => available && onTimeSelect(time)}
              className="w-full justify-start"
            >
              <Clock className="mr-2 h-4 w-4" />
              <span>{formatTime(new Date(`2024-01-01T${time}`))}</span>
              {!available && (
                <span className="ml-auto text-sm text-muted-foreground">
                  {i18n.t('bookings.noAvailability')}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}