import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserProgress } from '@/types';

interface ProgressStatsProps {
  progress: UserProgress;
}

export function ProgressStats({ progress }: ProgressStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium">Courses Completed</h3>
        <p className="mt-2 text-2xl font-bold">{progress.coursesCompleted}</p>
        <Progress value={progress.coursesCompleted * 10} className="mt-2" />
      </Card>
      {/* Add more stat cards */}
    </div>
  );
}