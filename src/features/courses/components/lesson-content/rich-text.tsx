import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div 
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
}