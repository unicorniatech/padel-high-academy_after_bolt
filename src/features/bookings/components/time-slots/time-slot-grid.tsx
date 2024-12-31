import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatTime } from '@/lib/utils/date-formatter';

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
  type: 'lesson' | 'webinar';
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedTime?: string;
  onTimeSelect: (time: string) => void;
  disabled?: boolean;
}

export function TimeSlotGrid({
  slots,
  selectedTime,
  onTimeSelect,
  disabled
}: TimeSlotGridProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 font-semibold">
        {i18n.t('bookings.timeSlots.title')}
      </h3>

      <div className="grid gap-2">
        {slots.map((slot) => (
          <Button
            key={slot.time}
            variant={selectedTime === slot.time ? 'default' : 'outline'}
            className="justify-between"
            disabled={disabled || !slot.available}
            onClick={() => onTimeSelect(slot.time)}
          >
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{formatTime(new Date(`2024-01-01T${slot.time}`))}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {i18n.t(`bookings.types.${slot.type}`)}
              </Badge>
              <span className="text-sm">
                {i18n.formatCurrency(slot.price)}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}