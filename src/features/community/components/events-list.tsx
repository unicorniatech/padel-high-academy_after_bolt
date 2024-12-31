import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { i18n } from '@/lib/i18n';
import { formatDate } from '@/lib/utils/date-formatter';

const events = [
  {
    id: 1,
    title: 'Torneo de Fin de Semana',
    date: '2024-03-20',
    location: 'Complejo Deportivo Principal',
    participants: 16,
    maxParticipants: 24,
    price: 'MXN $500',
  },
  {
    id: 2,
    title: 'Taller para Principiantes',
    date: '2024-03-25',
    location: 'Centro de Entrenamiento',
    participants: 8,
    maxParticipants: 12,
    price: 'MXN $300',
  },
];

export function EventsList() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="p-6 transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {i18n.t('community.event.participants', {
                    current: event.participants.toString(),
                    max: event.maxParticipants.toString(),
                  })}
                </div>
                <div className="text-sm font-medium">{event.price}</div>
              </div>
            </div>
            <Button>
              {i18n.t('community.event.join')}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}