import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { i18n } from '@/lib/i18n';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">{i18n.t('common.menu')}</span>
        </Button>
        
        <div className="flex items-center">
          <span className="text-lg font-bold">Padel High Academy</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-full max-w-sm lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={i18n.t('common.search')}
                className="w-full pl-8"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}