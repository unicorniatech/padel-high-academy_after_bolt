```tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseForm } from '../management/course-form';
import { ModuleForm } from '../management/module-form';
import { LessonForm } from '../management/lesson-form';
import { QuizForm } from '../management/quiz-form';
import { i18n } from '@/lib/i18n';

interface CourseManagementProps {
  courseId?: string;
  initialData?: any; // Type this properly based on your data structure
  onSave: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function CourseManagement({ 
  courseId, 
  initialData,
  onSave,
  isLoading 
}: CourseManagementProps) {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {courseId 
            ? i18n.t('teacher.courses.edit') 
            : i18n.t('teacher.courses.create')}
        </h1>
        <Button disabled={isLoading}>
          {i18n.t('teacher.courses.publish')}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details">
            {i18n.t('teacher.courses.tabs.details')}
          </TabsTrigger>
          <TabsTrigger value="modules">
            {i18n.t('teacher.courses.tabs.modules')}
          </TabsTrigger>
          <TabsTrigger value="lessons">
            {i18n.t('teacher.courses.tabs.lessons')}
          </TabsTrigger>
          <TabsTrigger value="quizzes">
            {i18n.t('teacher.courses.tabs.quizzes')}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="details">
            <CourseForm
              initialData={initialData}
              onSubmit={onSave}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="modules">
            <ModuleForm
              onSubmit={onSave}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="lessons">
            <LessonForm
              onSubmit={onSave}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizForm
              onSubmit={onSave}
              isLoading={isLoading}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
```