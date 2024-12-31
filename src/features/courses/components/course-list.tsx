import { Course } from '@/types';
import { CourseCard } from './course-card';
import { i18n } from '@/lib/i18n';

interface CourseListProps {
  courses: Course[];
  isLoading?: boolean;
  onEnroll: (course: Course) => void;
}

export function CourseList({ courses, isLoading, onEnroll }: CourseListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="h-48 rounded-lg bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-1/4 rounded bg-muted" />
              <div className="h-8 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
            <div className="h-10 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          {i18n.t('courses.noResults')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEnroll={() => onEnroll(course)}
        />
      ))}
    </div>
  );
}