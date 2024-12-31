import { Button } from '@/components/ui/button';
import { Play, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';

export function QuickActions() {
  const navigate = useNavigate();

  const handleBookCourt = () => {
    navigate('/bookings');
  };

  const handleResumeCourse = () => {
    toast.info(i18n.t('dashboard.actions.resumingCourse'));
    navigate('/courses');
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleBookCourt}>
        <Calendar className="mr-2 h-4 w-4" />
        {i18n.t('dashboard.actions.bookCourt')}
      </Button>
      <Button size="sm" onClick={handleResumeCourse}>
        <Play className="mr-2 h-4 w-4" />
        {i18n.t('dashboard.actions.resumeCourse')}
      </Button>
    </div>
  );
}