import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n } from '@/lib/i18n';

interface CourseFiltersProps {
  levelFilter: string;
  sortBy: string;
  onLevelChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function CourseFilters({
  levelFilter,
  sortBy,
  onLevelChange,
  onSortChange,
}: CourseFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select value={levelFilter} onValueChange={onLevelChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={i18n.t('courses.levels.all')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{i18n.t('courses.levels.all')}</SelectItem>
          <SelectItem value="beginner">{i18n.t('courses.levels.beginner')}</SelectItem>
          <SelectItem value="intermediate">{i18n.t('courses.levels.intermediate')}</SelectItem>
          <SelectItem value="advanced">{i18n.t('courses.levels.advanced')}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={i18n.t('courses.filters.sortBy')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">{i18n.t('courses.filters.newest')}</SelectItem>
          <SelectItem value="popular">{i18n.t('courses.filters.popular')}</SelectItem>
          <SelectItem value="rating">{i18n.t('courses.filters.rating')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}