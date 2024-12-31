import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CourseSearch } from '../components/course-search';
import { CourseFilters } from '../components/course-filters';
import { CourseList } from '../components/course-list';
import { EnrollmentModal } from '../components/enrollment-modal';
import { useCourses } from '../hooks/use-courses';
import { useCourseEnrollment } from '../hooks/use-course-enrollment';
import { DEMO_COURSES } from '../data/demo-courses';
import { i18n } from '@/lib/i18n';

export function CoursesPage() {
  const {
    courses,
    isLoading,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    sortBy,
    setSortBy,
  } = useCourses(DEMO_COURSES);

  const {
    selectedCourse,
    isEnrolling,
    showConfirmation,
    handleEnrollmentStart,
    handleEnrollmentConfirm,
    handleEnrollmentCancel,
  } = useCourseEnrollment();

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: i18n.t('navigation.courses') }]}
        className="text-muted-foreground/60"
      />

      <PageHeader
        title={i18n.t('courses.title')}
        description={i18n.t('courses.description')}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CourseSearch 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
        <CourseFilters
          levelFilter={levelFilter}
          sortBy={sortBy}
          onLevelChange={setLevelFilter}
          onSortChange={setSortBy}
        />
      </div>

      <CourseList 
        courses={courses}
        isLoading={isLoading}
        onEnroll={handleEnrollmentStart}
      />

      <EnrollmentModal
        course={selectedCourse}
        isOpen={showConfirmation}
        isEnrolling={isEnrolling}
        onClose={handleEnrollmentCancel}
        onConfirm={handleEnrollmentConfirm}
      />
    </div>
  );
}