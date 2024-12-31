import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { AchievementStats } from '../components/achievement-stats';
import { AchievementGrid } from '../components/achievement-grid';
import { LeaderboardCard } from '../components/leaderboard-card';
import { i18n } from '@/lib/i18n';

export function AchievementsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: i18n.t('navigation.achievements') }]}
        className="text-muted-foreground/60"
      />

      <PageHeader
        title={i18n.t('achievements.title')}
        description={i18n.t('achievements.description')}
      />

      <AchievementStats />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <AchievementGrid />
        </div>
        <div>
          <LeaderboardCard />
        </div>
      </div>
    </div>
  );
}