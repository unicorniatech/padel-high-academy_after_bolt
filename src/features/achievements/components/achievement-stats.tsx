import { Card } from '@/components/ui/card';
import { Trophy, Star, Target, Award } from 'lucide-react';
import { i18n } from '@/lib/i18n';

const stats = [
  {
    title: i18n.t('achievements.stats.total'),
    value: '24',
    icon: Trophy,
    trend: '+3 este mes',
  },
  {
    title: i18n.t('achievements.stats.streak'),
    value: '15 días',
    icon: Star,
    trend: i18n.t('achievements.stats.bestStreak', { days: '21' }),
  },
  {
    title: i18n.t('achievements.stats.goals'),
    value: '8/10',
    icon: Target,
    trend: i18n.t('achievements.stats.completion', { percent: '80' }),
  },
  {
    title: i18n.t('achievements.stats.ranking'),
    value: 'Oro',
    icon: Award,
    trend: 'Top 10%',
  },
];

export function AchievementStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="group p-6 transition-all hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.trend}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}