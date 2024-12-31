import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Dashboard } from '@/features/dashboard/pages/dashboard';
import { CoursesPage } from '@/features/courses/pages/courses';
import { CertificationsPage } from '@/features/certifications/pages/certifications';
import { BookingsPage } from '@/features/bookings/pages/bookings';
import { CommunityPage } from '@/features/community/pages/community';
import { AchievementsPage } from '@/features/achievements/pages/achievements';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
    </RouterRoutes>
  );
}