import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

interface DashboardData {
  stats: {
    coursesCompleted: number;
    totalPlayTime: number;
    skillLevel: string;
    remainingChallenges: number;
  };
  nextMilestone: string;
  milestoneProgress: number;
  recentActivity: Array<{
    id: number;
    type: 'course' | 'achievement' | 'booking';
    title: string;
    time: string;
  }>;
  upcomingClasses: Array<{
    id: number;
    title: string;
    instructor: string;
    time: string;
    date: string;
  }>;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        stats: {
          coursesCompleted: 5,
          totalPlayTime: 48,
          skillLevel: i18n.t('courses.levels.intermediate'),
          remainingChallenges: 3,
        },
        nextMilestone: i18n.t('courses.levels.advanced'),
        milestoneProgress: 75,
        recentActivity: [
          {
            id: 1,
            type: 'course',
            title: i18n.t('dashboard.activity.courseCompleted'),
            time: '2h',
          },
          // Add more activity items
        ],
        upcomingClasses: [
          {
            id: 1,
            title: i18n.t('dashboard.classes.advancedServe'),
            instructor: 'Maria Rodriguez',
            time: '10:00',
            date: '2024-03-20',
          },
          // Add more classes
        ],
      });
      setError(null);
    } catch (err) {
      setError(err as Error);
      toast.error(i18n.t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const retry = () => {
    setRetryCount(prev => prev + 1);
    loadData();
  };

  return { data, isLoading, error, retry };
}