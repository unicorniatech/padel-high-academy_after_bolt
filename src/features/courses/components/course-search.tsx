import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { i18n } from '@/lib/i18n';

interface CourseSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CourseSearch({ value, onChange, className }: CourseSearchProps) {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={i18n.t('courses.searchPlaceholder')}
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}