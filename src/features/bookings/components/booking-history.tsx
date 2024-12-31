import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatDate, formatTime } from '@/lib/utils/date-formatter';

interface BookingHistoryProps {
  bookings: Array<{
    id: string;
    court: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  }>;
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  if (bookings.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          {i18n.t('bookings.noHistory')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{booking.court}</h3>
              <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(booking.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatTime(new Date(`2024-01-01T${booking.startTime}`))} - 
                  {formatTime(new Date(`2024-01-01T${booking.endTime}`))}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {booking.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}