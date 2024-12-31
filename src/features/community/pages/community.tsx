import { PageHeader } from '@/components/ui/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CommunityFeed } from '../components/community-feed';
import { PlayerDirectory } from '../components/player-directory';
import { EventsList } from '../components/events-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { i18n } from '@/lib/i18n';

export function CommunityPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: i18n.t('navigation.community') }]}
        className="text-muted-foreground/60"
      />

      <PageHeader
        title={i18n.t('community.title')}
        description={i18n.t('community.description')}
      />

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="feed">{i18n.t('community.tabs.feed')}</TabsTrigger>
          <TabsTrigger value="players">{i18n.t('community.tabs.players')}</TabsTrigger>
          <TabsTrigger value="events">{i18n.t('community.tabs.events')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-6">
          <CommunityFeed />
        </TabsContent>
        
        <TabsContent value="players" className="space-y-6">
          <PlayerDirectory />
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <EventsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}