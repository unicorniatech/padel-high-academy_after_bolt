import { useState, useCallback } from 'react';
import { Course } from '@/types';

export function useCourses(initialCourses: Course[]) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  return {
    courses: filteredCourses(),
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    sortBy,
    setSortBy,
  };
}