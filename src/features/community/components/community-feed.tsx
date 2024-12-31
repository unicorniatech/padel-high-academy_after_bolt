import { Card } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { i18n } from '@/lib/i18n';
import { formatRelativeTime } from '@/lib/utils/date-formatter';

const feedItems = [
  {
    id: 1,
    user: 'María R.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    content: '¡Acabo de completar el curso de Saque Avanzado! Las técnicas son revolucionarias 🎾',
    likes: 24,
    comments: 8,
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    user: 'Carlos M.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
    content: 'Busco compañero de práctica para este fin de semana. ¿Alguien interesado? 🏸',
    likes: 12,
    comments: 15,
    time: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];

export function CommunityFeed() {
  return (
    <div className="space-y-4">
      {feedItems.map((item) => (
        <Card key={item.id} className="p-6 transition-all hover:shadow-md">
          <div className="flex items-start space-x-4">
            <img
              src={item.avatar}
              alt={item.user}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{item.user}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatRelativeTime(item.time)}
                </span>
              </div>
              <p className="mt-2 text-base">{item.content}</p>
              <div className="mt-4 flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {item.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {item.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Share2 className="mr-2 h-4 w-4" />
                  {i18n.t('community.post.share')}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}