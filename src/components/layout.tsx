import { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          "p-4 md:p-6 lg:p-8",
          isSidebarOpen && "md:pl-64"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}