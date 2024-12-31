import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { i18n } from '@/lib/i18n';

const progressData = [
  {
    id: 1,
    title: 'Oficial de Torneo',
    progress: 75,
    requirements: [
      'Examen de reglas',
      'Evaluación práctica',
      'Supervisión de partidos',
    ],
  },
  {
    id: 2,
    title: 'Entrenador Elite',
    progress: 45,
    requirements: [
      'Técnicas avanzadas',
      'Metodología de entrenamiento',
      'Desarrollo de jugadores',
    ],
  },
];

export function CertificationProgress() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {progressData.map((item) => (
        <Card key={item.id} className="p-6">
          <h3 className="font-semibold">{item.title}</h3>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>{i18n.t('certifications.progress')}</span>
              <span>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-2" />
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium">{i18n.t('certifications.requirements')}</h4>
            <ul className="mt-2 space-y-2">
              {item.requirements.map((req, index) => (
                <li key={index} className="flex items-center text-sm text-muted-foreground">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}