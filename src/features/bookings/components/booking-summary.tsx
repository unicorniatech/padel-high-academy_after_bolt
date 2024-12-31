import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatDate, formatTime } from '@/lib/utils/date-formatter';

interface BookingSummaryProps {
  date: Date;
  courtId?: string;
  startTime?: string;
}

export function BookingSummary({ date, courtId, startTime }: BookingSummaryProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold">{i18n.t('bookings.summary.title')}</h3>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {formatDate(date)}
        </div>
        
        {courtId && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {i18n.t('bookings.court', { number: courtId })}
          </div>
        )}
        
        {startTime && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {formatTime(new Date(`2024-01-01T${startTime}`))}
          </div>
        )}
      </div>
    </Card>
  );
}