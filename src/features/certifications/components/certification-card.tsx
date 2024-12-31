import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils/date-formatter';
import { i18n } from '@/lib/i18n';

interface CertificationCardProps {
  certification: {
    id: string;
    title: string;
    issueDate: string;
    expiryDate?: string;
    status: 'active' | 'expired' | 'pending';
    downloadUrl?: string;
    verifyUrl?: string;
  };
  onDownload: (id: string) => void;
  isDownloading?: boolean;
}

export function CertificationCard({ 
  certification, 
  onDownload,
  isDownloading 
}: CertificationCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{certification.title}</h3>
            <div className="mt-1 space-y-1 text-sm text-muted-foreground">
              <p>
                {i18n.t('certifications.issuedOn', { 
                  date: formatDate(certification.issueDate) 
                })}
              </p>
              {certification.expiryDate && (
                <p>
                  {i18n.t('certifications.expiresOn', { 
                    date: formatDate(certification.expiryDate) 
                  })}
                </p>
              )}
            </div>
            <Badge 
              variant="secondary" 
              className="mt-2"
            >
              {i18n.t(`certifications.status.${certification.status}`)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {certification.downloadUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(certification.id)}
              disabled={isDownloading}
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? (
                <span className="animate-pulse">
                  {i18n.t('common.loading')}
                </span>
              ) : (
                i18n.t('common.download')
              )}
            </Button>
          )}
          {certification.verifyUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(certification.verifyUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {i18n.t('certifications.verify')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}