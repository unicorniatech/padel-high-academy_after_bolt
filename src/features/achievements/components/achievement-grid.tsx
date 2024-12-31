import { Card } from '@/components/ui/card';
import { Trophy, Lock } from 'lucide-react';
import { i18n } from '@/lib/i18n';

const achievements = [
  {
    id: 1,
    title: 'Aprendiz Veloz',
    description: 'Completa 5 cursos en un mes',
    progress: 80,
    unlocked: true,
  },
  {
    id: 2,
    title: 'Campeón de Torneo',
    description: 'Gana tu primer torneo',
    progress: 0,
    unlocked: false,
  },
  {
    id: 3,
    title: 'Maestro del Saque',
    description: 'Logra 90% de precisión en saques',
    progress: 65,
    unlocked: true,
  },
  {
    id: 4,
    title: 'Estratega Experto',
    description: 'Completa todos los cursos de estrategia',
    progress: 40,
    unlocked: true,
  },
];

export function AchievementGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`group p-6 transition-all hover:shadow-md ${
            !achievement.unlocked && 'opacity-60'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                {achievement.unlocked ? (
                  <Trophy className="h-6 w-6 text-primary" />
                ) : (
                  <Lock className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.progress < 100 && (
                  <div className="mt-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {achievement.unlocked && (
              <div className="text-sm font-medium">{achievement.progress}%</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}