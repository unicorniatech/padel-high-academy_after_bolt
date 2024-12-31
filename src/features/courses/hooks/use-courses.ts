import { useState, useCallback } from 'react';
import { Course } from '@/types';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

export function useCourses(initialCourses: Course[]) {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isEnrolling, setIsEnrolling] = useState(false);

  const filteredCourses = useCallback(() => {
    return courses
      .filter((course) => {
        const matchesSearch = course.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
        return matchesSearch && matchesLevel;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return -1; // Simulated, would use actual dates
          case 'popular':
            return -1; // Simulated, would use actual popularity metrics
          case 'rating':
            return -1; // Simulated, would use actual ratings
          default:
            return 0;
        }
      });
  }, [courses, searchQuery, levelFilter, sortBy]);

  const handleEnroll = useCallback(async (courseId: string) => {
    setIsEnrolling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(i18n.t('courses.enrollSuccess'));
    } catch (error) {
      toast.error(i18n.t('courses.enrollError'));
    } finally {
      setIsEnrolling(false);
    }
  }, []);

  return {
    courses: filteredCourses(),
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    sortBy,
    setSortBy,
    isEnrolling,
    handleEnroll,
  };
}