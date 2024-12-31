import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, ChevronRight } from 'lucide-react';

const featuredCourses = [
  {
    id: 1,
    title: 'Advanced Serve Mastery',
    progress: 45,
    duration: '2h 15m',
    thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34df?q=80&w=1000',
  },
  {
    id: 2,
    title: 'Professional Match Tactics',
    progress: 20,
    duration: '1h 45m',
    thumbnail: 'https://images.unsplash.com/photo-1602211844066-d3bb556e983b?q=80&w=1000',
  },
];

export function FeaturedCourses() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Continue Learning</h3>
          <p className="text-sm text-muted-foreground">Pick up where you left off</p>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {featuredCourses.map((course) => (
          <div
            key={course.id}
            className="group relative overflow-hidden rounded-lg border bg-background/95 p-4 transition-all hover:bg-accent"
          >
            <div className="flex gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="font-medium">{course.title}</h4>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {course.duration} remaining
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <Button size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}