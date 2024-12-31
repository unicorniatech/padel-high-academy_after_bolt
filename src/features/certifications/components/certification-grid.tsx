import { CertificationCard } from './certification-card';
import { i18n } from '@/lib/i18n';

interface Certification {
  id: string;
  title: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending';
  downloadUrl?: string;
  verifyUrl?: string;
}

interface CertificationGridProps {
  certifications: Certification[];
  onDownload: (id: string) => void;
  isDownloading?: boolean;
}

export function CertificationGrid({ 
  certifications,
  onDownload,
  isDownloading 
}: CertificationGridProps) {
  if (certifications.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          {i18n.t('certifications.noCertifications')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {certifications.map((cert) => (
        <CertificationCard
          key={cert.id}
          certification={cert}
          onDownload={onDownload}
          isDownloading={isDownloading}
        />
      ))}
    </div>
  );
}