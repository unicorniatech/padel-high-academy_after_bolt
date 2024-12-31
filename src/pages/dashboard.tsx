import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Trophy,
  TrendingUp,
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: 'Dashboard' }]}
        className="text-muted-foreground/60"
      />
      
      <PageHeader
        title="Welcome back, Player!"
        description="Here's an overview of your progress and upcoming activities."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 transition-all hover:shadow-md">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>
        {/* ... Rest of the dashboard content remains the same ... */}
      </div>
    </div>
  );
}