import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { i18n } from '@/lib/i18n';

interface EnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  isEnrolling: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EnrollmentModal({
  course,
  isOpen,
  isEnrolling,
  onClose,
  onConfirm,
}: EnrollmentModalProps) {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{i18n.t('courses.enrollment.title')}</DialogTitle>
          <DialogDescription>
            {i18n.t('courses.enrollment.description', { course: course.title })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">{i18n.t('courses.enrollment.includes')}</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>• {i18n.t('courses.enrollment.features.videos')}</li>
              <li>• {i18n.t('courses.enrollment.features.exercises')}</li>
              <li>• {i18n.t('courses.enrollment.features.certificate')}</li>
              <li>• {i18n.t('courses.enrollment.features.support')}</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isEnrolling}
            >
              {i18n.t('common.cancel')}
            </Button>
            <Button 
              onClick={onConfirm} 
              className="flex-1"
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                <span className="animate-pulse">
                  {i18n.t('courses.enrollment.processing')}
                </span>
              ) : (
                i18n.t('courses.enrollment.confirm')
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}