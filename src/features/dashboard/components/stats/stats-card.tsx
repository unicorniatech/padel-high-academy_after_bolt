import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("p-6 transition-all hover:shadow-md", className)}>
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
      </div>
    </Card>
  );
}