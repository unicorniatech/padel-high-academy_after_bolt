import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)}>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-foreground hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}