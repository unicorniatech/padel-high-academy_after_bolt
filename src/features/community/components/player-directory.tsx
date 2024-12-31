import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Trophy } from 'lucide-react';
import { i18n } from '@/lib/i18n';

const players = [
  {
    id: 1,
    name: 'María Rodríguez',
    level: 'Avanzado',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    achievements: 15,
    location: 'Ciudad de México',
  },
  {
    id: 2,
    name: 'Carlos Martínez',
    level: 'Profesional',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
    achievements: 24,
    location: 'Guadalajara',
  },
];

export function PlayerDirectory() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {players.map((player) => (
        <Card key={player.id} className="p-6 transition-all hover:shadow-md">
          <div className="flex items-center space-x-4">
            <img
              src={player.avatar}
              alt={player.name}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{player.name}</h3>
              <p className="text-sm text-muted-foreground">{player.level}</p>
              <p className="text-xs text-muted-foreground">{player.location}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Trophy className="mr-2 h-4 w-4" />
              {player.achievements} logros
            </div>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              {i18n.t('common.message')}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}