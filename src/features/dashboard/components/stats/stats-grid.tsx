import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react';
import { StatsCard } from './stats-card';
import { i18n } from '@/lib/i18n';
import { formatNumber } from '@/lib/utils/date-formatter';

interface StatsGridProps {
  stats: {
    coursesCompleted: number;
    totalPlayTime: number;
    skillLevel: string;
    remainingChallenges: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title={i18n.t('dashboard.stats.completedCourses')}
        value={formatNumber(stats.coursesCompleted)}
        icon={BookOpen}
      />
      <StatsCard
        title={i18n.t('dashboard.stats.totalPlayTime')}
        value={`${stats.totalPlayTime}h`}
        icon={Clock}
      />
      <StatsCard
        title={i18n.t('dashboard.stats.skillLevel')}
        value={stats.skillLevel}
        icon={TrendingUp}
      />
      <StatsCard
        title={i18n.t('dashboard.stats.remainingChallenges')}
        value={formatNumber(stats.remainingChallenges)}
        icon={Trophy}
      />
    </div>
  );
}