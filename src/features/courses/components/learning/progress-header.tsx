```tsx
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { i18n } from '@/lib/i18n';

interface ProgressHeaderProps {
  courseTitle: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export function ProgressHeader({
  courseTitle,
  progress,
  totalLessons,
  completedLessons,
}: ProgressHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {i18n.t('courses.progress.completed', {
              completed: completedLessons.toString(),
              total: totalLessons.toString(),
            })}
          </p>
        </div>
        <div className="rounded-full bg-primary/10 p-2">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-sm">
          <span>{i18n.t('courses.progress.overall')}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </Card>
  );
}
```