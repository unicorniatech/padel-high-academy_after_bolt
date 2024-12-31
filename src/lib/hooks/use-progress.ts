import { useState, useCallback } from 'react';
import { UserProgress } from '@/types';

export function useProgress(initialProgress: UserProgress) {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  const updateProgress = useCallback((newProgress: Partial<UserProgress>) => {
    setProgress((prev) => ({ ...prev, ...newProgress }));
  }, []);

  const calculateCompletionPercentage = useCallback(() => {
    // This is a simplified calculation, adjust based on your needs
    const totalCourses = 10; // Example total
    return (progress.coursesCompleted / totalCourses) * 100;
  }, [progress.coursesCompleted]);

  return {
    progress,
    updateProgress,
    completionPercentage: calculateCompletionPercentage(),
  };
}