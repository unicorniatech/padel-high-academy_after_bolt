import { useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationLink } from '@/components/ui/navigation-link';
import { toast } from 'sonner';
import { i18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarNavItems = [
  {
    title: i18n.t('navigation.dashboard'),
    icon: Home,
    href: '/',
    enabled: true,
  },
  {
    title: i18n.t('navigation.courses'),
    icon: BookOpen,
    href: '/courses',
    enabled: true,
  },
  {
    title: i18n.t('navigation.certifications'),
    icon: GraduationCap,
    href: '/certifications',
    enabled: true,
  },
  {
    title: i18n.t('navigation.bookings'),
    icon: Calendar,
    href: '/bookings',
    enabled: true,
  },
  {
    title: i18n.t('navigation.community'),
    icon: Users,
    href: '/community',
    enabled: true,
  },
  {
    title: i18n.t('navigation.achievements'),
    icon: Trophy,
    href: '/achievements',
    enabled: true,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string, enabled: boolean) => {
    if (!enabled) {
      toast.info(i18n.t('common.comingSoon'));
      return;
    }
    navigate(href);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background/95 backdrop-blur",
          "transition-transform duration-300 ease-in-out",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)]",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 md:hidden">
          <span className="text-lg font-bold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-4 p-4">
            <nav className="space-y-2">
              {sidebarNavItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  icon={item.icon}
                  isActive={location.pathname === item.href}
                  isDisabled={!item.enabled}
                  onClick={() => handleNavigation(item.href, item.enabled)}
                >
                  {item.title}
                </NavigationLink>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}