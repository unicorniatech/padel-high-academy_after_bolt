```tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { i18n } from '@/lib/i18n';

interface Module {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    duration: number;
    completed: boolean;
    current: boolean;
  }[];
}

interface CourseSidebarProps {
  modules: Module[];
  onLessonSelect: (lessonId: string) => void;
}

export function CourseSidebar({ modules, onLessonSelect }: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <Card className="h-[calc(100vh-4rem)] w-80">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="mb-4 font-semibold">{i18n.t('courses.content')}</h2>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => toggleModule(module.id)}
                >
                  <span className="truncate">{module.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedModules.includes(module.id) && "rotate-90"
                    )}
                  />
                </Button>
                
                {expandedModules.includes(module.id) && (
                  <div className="ml-4 mt-2 space-y-2">
                    {module.lessons.map((lesson) => (
                      <Button
                        key={lesson.id}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2",
                          lesson.current && "bg-accent"
                        )}
                        onClick={() => onLessonSelect(lesson.id)}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : lesson.current ? (
                          <PlayCircle className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span className="truncate">{lesson.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {lesson.duration}m
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
```