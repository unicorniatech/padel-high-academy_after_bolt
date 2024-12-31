import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatDate } from '@/lib/utils/date-formatter';

const certifications = [
  {
    id: 1,
    title: 'Instructor Profesional de Pádel',
    issuer: 'Federación Internacional de Pádel',
    date: '2024-02-15',
    status: 'active',
  },
  {
    id: 2,
    title: 'Certificación de Jugador Avanzado',
    issuer: 'Academia PadelPro',
    date: '2023-11-20',
    status: 'active',
  },
];

export function CertificationList() {
  return (
    <div className="space-y-4">
      {certifications.map((cert) => (
        <Card key={cert.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(cert.date)}
                </div>
              </div>
            </div>
            <Badge variant="secondary">
              {i18n.t(`certifications.status.${cert.status}`)}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}