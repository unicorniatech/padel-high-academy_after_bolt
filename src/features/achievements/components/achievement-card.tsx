import { Card } from '@/components/ui/card';
import { Achievement } from '@/types';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <Card className={`p-4 ${isUnlocked ? 'bg-primary/5' : 'opacity-50'}`}>
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          {isUnlocked && (
            <p className="mt-2 text-xs text-muted-foreground">
              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}