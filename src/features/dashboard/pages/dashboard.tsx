import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { StatsGrid } from '../components/stats/stats-grid';
import { QuickActions } from '../components/actions/quick-actions';
import { RecentActivity } from '../components/recent-activity';
import { UpcomingClasses } from '../components/upcoming-classes';
import { WeeklyProgress } from '../components/weekly-progress';
import { FeaturedCourses } from '../components/featured-courses';
import { AchievementProgress } from '../components/achievement-progress';
import { LoadingState } from '../components/loading-state';
import { ErrorState } from '../components/error-state';
import { useDashboardData } from '../hooks/use-dashboard-data';
import { i18n } from '@/lib/i18n';

export function Dashboard() {
  const { data, isLoading, error, retry } = useDashboardData();

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[{ label: i18n.t('navigation.dashboard') }]}
          className="text-muted-foreground/60"
        />
        <QuickActions />
      </div>
      
      <PageHeader
        title={data ? i18n.t('dashboard.welcome', { name: data.stats.skillLevel }) : ''}
        description={i18n.t('dashboard.overview')}
      />

      {isLoading || !data ? (
        <LoadingState />
      ) : (
        <>
          <StatsGrid stats={data.stats} />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <WeeklyProgress />
            <AchievementProgress 
              nextMilestone={data.nextMilestone}
              progress={data.milestoneProgress}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FeaturedCourses />
            </div>
            <UpcomingClasses />
          </div>

          <RecentActivity />
        </>
      )}
    </div>
  );
}