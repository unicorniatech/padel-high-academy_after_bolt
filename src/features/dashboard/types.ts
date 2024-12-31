export interface StatsData {
  id: string;
  value: number;
  trend: number;
  label: string;
  type: 'percentage' | 'number' | 'currency';
}

export interface ActivityItem {
  id: string;
  type: 'course' | 'booking' | 'achievement';
  title: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface DashboardState {
  stats: StatsData[];
  activities: ActivityItem[];
  isLoading: boolean;
  error: Error | null;
}