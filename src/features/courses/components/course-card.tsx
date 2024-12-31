import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { PlayCircle, Clock, User } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  isEnrolling?: boolean;
  className?: string;
}

export function CourseCard({ course, onEnroll, isEnrolling, className }: CourseCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <img 
        src={course.thumbnail} 
        alt={course.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {i18n.t(`courses.levels.${course.level}`)}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{course.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{course.description}</p>
        </div>
        
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {i18n.t('courses.card.duration', { duration: course.duration.toString() })}
          </div>
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {i18n.t('courses.card.instructor', { name: course.instructor })}
          </div>
        </div>

        <Button 
          onClick={() => onEnroll(course.id)} 
          className="w-full"
          disabled={isEnrolling}
        >
          {isEnrolling ? (
            <span className="animate-pulse">{i18n.t('common.loading')}</span>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              {i18n.t('courses.card.startLearning')}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}