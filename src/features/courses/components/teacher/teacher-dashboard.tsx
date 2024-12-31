```tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Users, 
  BarChart2, 
  Plus,
  GraduationCap,
  Settings 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { i18n } from '@/lib/i18n';

interface TeacherStats {
  totalCourses: number;
  totalStudents: number;
  activeEnrollments: number;
  completionRate: number;
}

interface TeacherDashboardProps {
  stats: TeacherStats;
  recentCourses: Array<{
    id: string;
    title: string;
    students: number;
    published: boolean;
  }>;
}

export function TeacherDashboard({ stats, recentCourses }: TeacherDashboardProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{i18n.t('teacher.dashboard.title')}</h1>
        <Button onClick={() => navigate('/teacher/courses/new')}>
          <Plus className="mr-2 h-4 w-4" />
          {i18n.t('teacher.courses.create')}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('teacher.stats.totalCourses')}
              </p>
              <p className="text-2xl font-bold">{stats.totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('teacher.stats.totalStudents')}
              </p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('teacher.stats.activeEnrollments')}
              </p>
              <p className="text-2xl font-bold">{stats.activeEnrollments}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {i18n.t('teacher.stats.completionRate')}
              </p>
              <p className="text-2xl font-bold">{stats.completionRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="font-semibold">{i18n.t('teacher.courses.recent')}</h2>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4 p-6 pt-0">
            {recentCourses.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {i18n.t('teacher.courses.students', { 
                        count: course.students.toString() 
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/teacher/courses/${course.id}`)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {i18n.t('teacher.courses.manage')}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
```