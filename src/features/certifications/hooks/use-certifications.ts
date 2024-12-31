import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
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

export function useCertifications() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDownloading, setIsDownloading] = useState(false);

  const loadCertifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setCertifications([
        {
          id: '1',
          title: i18n.t('certifications.items.instructor'),
          issueDate: '2024-01-15',
          expiryDate: '2026-01-15',
          status: 'active',
          downloadUrl: '#',
          verifyUrl: 'https://verify.padelpro.academy/cert/abc123',
        },
        {
          id: '2',
          title: i18n.t('certifications.items.referee'),
          issueDate: '2023-11-20',
          status: 'active',
          downloadUrl: '#',
          verifyUrl: 'https://verify.padelpro.academy/cert/def456',
        },
      ]);
    } catch (err) {
      setError(err as Error);
      toast.error(i18n.t('certifications.error.load'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCertifications();
  }, [loadCertifications]);

  const handleDownload = useCallback(async (id: string) => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(i18n.t('certifications.success.download'));
    } catch (error) {
      toast.error(i18n.t('certifications.error.download'));
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const filteredCertifications = certifications.filter(cert => 
    statusFilter === 'all' || cert.status === statusFilter
  );

  return {
    certifications: filteredCertifications,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    isDownloading,
    handleDownload,
    retry: loadCertifications,
  };
}