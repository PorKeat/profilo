import { cn } from '@/lib/utils';

export function MarketingPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative z-10 mx-auto w-full px-4 py-20 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
