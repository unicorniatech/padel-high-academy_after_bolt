import { Card } from '@/components/ui/card';
import { BookOpen, Trophy, Calendar } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'course',
    title: 'Completed "Padel Fundamentals"',
    time: '2 hours ago',
    icon: BookOpen,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Earned "Quick Learner" Badge',
    time: 'Yesterday',
    icon: Trophy,
  },
  {
    id: 3,
    type: 'booking',
    title: 'Booked Court #3',
    time: '2 days ago',
    icon: Calendar,
  },
];

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}