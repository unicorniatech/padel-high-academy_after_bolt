```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Clock, Award, BarChart2 } from 'lucide-react';
import { i18n } from '@/lib/i18n';

interface Course {
  id: string;
  title: string;
  progress: number;
  lastLesson: {
    title: string;
    timeLeft: number;
  };
}

interface StudentDashboardProps {
  courses: Course[];
  stats: {
    totalProgress: number;
    coursesCompleted: number;
    timeSpent: number;
    achievements: number;
  };
  onContinueCourse: (courseId: string) => void;
}

export function StudentDashboard({ 
  courses, 
  stats, 
  onContinueCourse 
}: StudentDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('courses.dashboard.totalProgress')}
              </p>
              <p className="text-2xl font-bold">{stats.totalProgress}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('courses.dashboard.coursesCompleted')}
              </p>
              <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('courses.dashboard.timeSpent')}
              </p>
              <p className="text-2xl font-bold">{stats.timeSpent}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('courses.dashboard.achievements')}
              </p>
              <p className="text-2xl font-bold">{stats.achievements}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="font-semibold">
            {i18n.t('courses.dashboard.inProgress')}
          </h2>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 p-6 pt-0">
            {courses.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {course.lastLesson.title}
                    </p>
                    <div className="mt-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onContinueCourse(course.id)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {i18n.t('courses.dashboard.continue')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
```