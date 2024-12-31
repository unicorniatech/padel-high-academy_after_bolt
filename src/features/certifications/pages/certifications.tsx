import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CertificationGrid } from '../components/certification-grid';
import { CertificationFilters } from '../components/certification-filters';
import { LoadingState } from '../components/loading-state';
import { ErrorState } from '../components/error-state';
import { useCertifications } from '../hooks/use-certifications';
import { i18n } from '@/lib/i18n';

export function CertificationsPage() {
  const {
    certifications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    isDownloading,
    handleDownload,
    retry,
  } = useCertifications();

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: i18n.t('navigation.certifications') }]}
        className="text-muted-foreground/60"
      />

      <div className="flex items-center justify-between">
        <PageHeader
          title={i18n.t('certifications.title')}
          description={i18n.t('certifications.description')}
        />
        <Button 
          variant="outline"
          onClick={() => handleDownload('all')}
          disabled={isLoading || isDownloading}
        >
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? (
            <span className="animate-pulse">
              {i18n.t('common.loading')}
            </span>
          ) : (
            i18n.t('certifications.downloadAll')
          )}
        </Button>
      </div>

      <CertificationFilters
        status={statusFilter}
        onStatusChange={setStatusFilter}
        disabled={isLoading}
      />

      {isLoading ? (
        <LoadingState />
      ) : (
        <CertificationGrid
          certifications={certifications}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
      )}
    </div>
  );
}