import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const upcomingClasses = [
  {
    id: 1,
    title: 'Advanced Serve Techniques',
    instructor: 'Maria Rodriguez',
    time: '10:00 AM',
    date: 'Tomorrow',
  },
  {
    id: 2,
    title: 'Defensive Strategies',
    instructor: 'John Smith',
    time: '2:00 PM',
    date: 'Thursday',
  },
];

export function UpcomingClasses() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold">Upcoming Classes</h3>
      <div className="mt-4 space-y-4">
        {upcomingClasses.map((class_) => (
          <div key={class_.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
            <div className="rounded-lg bg-primary/10 p-2">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{class_.title}</h4>
              <p className="text-sm text-muted-foreground">with {class_.instructor}</p>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {class_.time} · {class_.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}