import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

interface AchievementProgressProps {
  nextMilestone: string;
  progress: number;
}

export function AchievementProgress({ nextMilestone, progress }: AchievementProgressProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">Next Milestone</h3>
          <p className="text-sm text-muted-foreground">Keep pushing forward!</p>
        </div>
        <div className="rounded-full bg-primary/10 p-2">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">{nextMilestone}</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium">Remaining Challenges:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              Complete Advanced Serve course
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              Win 5 more matches
            </li>
            <li className="flex items-center">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              Achieve 80% accuracy in drills
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}