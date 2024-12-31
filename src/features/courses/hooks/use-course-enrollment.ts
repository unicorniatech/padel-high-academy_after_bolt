import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Course } from '@/types';
import { i18n } from '@/lib/i18n';

export function useCourseEnrollment() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEnrollmentStart = useCallback((course: Course) => {
    setSelectedCourse(course);
    setShowConfirmation(true);
  }, []);

  const handleEnrollmentConfirm = useCallback(async () => {
    if (!selectedCourse) return;

    setIsEnrolling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(i18n.t('courses.enrollSuccess'));
      setShowConfirmation(false);
    } catch (error) {
      toast.error(i18n.t('courses.enrollError'));
    } finally {
      setIsEnrolling(false);
    }
  }, [selectedCourse]);

  return {
    selectedCourse,
    isEnrolling,
    showConfirmation,
    handleEnrollmentStart,
    handleEnrollmentConfirm,
    handleEnrollmentCancel: () => setShowConfirmation(false),
  };
}