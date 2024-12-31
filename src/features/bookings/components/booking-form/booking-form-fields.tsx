import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n } from '@/lib/i18n';

interface BookingFormFieldsProps {
  courtId: string;
  startTime: string;
  onCourtChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  disabled?: boolean;
}

export function BookingFormFields({
  courtId,
  startTime,
  onCourtChange,
  onTimeChange,
  disabled
}: BookingFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{i18n.t('bookings.form.court')}</Label>
        <Select value={courtId} onValueChange={onCourtChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder={i18n.t('bookings.form.selectCourt')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">{i18n.t('bookings.court', { number: '1' })}</SelectItem>
            <SelectItem value="2">{i18n.t('bookings.court', { number: '2' })}</SelectItem>
            <SelectItem value="3">{i18n.t('bookings.court', { number: '3' })}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{i18n.t('bookings.form.time')}</Label>
        <Select value={startTime} onValueChange={onTimeChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder={i18n.t('bookings.form.selectTime')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09:00">09:00 - 10:30</SelectItem>
            <SelectItem value="10:30">10:30 - 12:00</SelectItem>
            <SelectItem value="12:00">12:00 - 13:30</SelectItem>
            <SelectItem value="15:00">15:00 - 16:30</SelectItem>
            <SelectItem value="16:30">16:30 - 18:00</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}