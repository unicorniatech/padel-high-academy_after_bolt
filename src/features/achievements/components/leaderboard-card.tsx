import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import { i18n } from '@/lib/i18n';

const leaderboard = [
  {
    rank: 1,
    name: 'María R.',
    points: 2500,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
  },
  {
    rank: 2,
    name: 'Carlos M.',
    points: 2350,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
  },
  {
    rank: 3,
    name: 'Ana G.',
    points: 2200,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
  },
];

export function LeaderboardCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{i18n.t('achievements.leaderboard.title')}</h3>
        <Crown className="h-5 w-5 text-yellow-500" />
      </div>
      <div className="mt-4 space-y-4">
        {leaderboard.map((player) => (
          <div key={player.rank} className="group flex items-center space-x-4 rounded-lg p-2 transition-colors hover:bg-accent">
            <span className={`text-lg font-bold ${
              player.rank === 1 ? 'text-yellow-500' :
              player.rank === 2 ? 'text-zinc-400' :
              player.rank === 3 ? 'text-amber-700' :
              'text-muted-foreground'
            }`}>
              #{player.rank}
            </span>
            <img
              src={player.avatar}
              alt={player.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{player.name}</p>
              <p className="text-sm text-muted-foreground">
                {i18n.t('achievements.leaderboard.points', { points: player.points.toString() })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}