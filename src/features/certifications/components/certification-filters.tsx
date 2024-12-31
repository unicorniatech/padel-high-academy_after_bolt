import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n } from '@/lib/i18n';

interface CertificationFiltersProps {
  status: string;
  onStatusChange: (value: string) => void;
  disabled?: boolean;
}

export function CertificationFilters({ 
  status, 
  onStatusChange,
  disabled 
}: CertificationFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Select 
        value={status} 
        onValueChange={onStatusChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={i18n.t('certifications.filters.status')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{i18n.t('certifications.filters.all')}</SelectItem>
          <SelectItem value="active">{i18n.t('certifications.filters.active')}</SelectItem>
          <SelectItem value="pending">{i18n.t('certifications.filters.pending')}</SelectItem>
          <SelectItem value="expired">{i18n.t('certifications.filters.expired')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}