'use client';

import FloatingLines from '@/components/ui/FloatingLines';
import { cn } from '@/lib/utils';

export function MarketingPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-white text-foreground transition-colors duration-300 dark:bg-[#080810]">
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none dark:opacity-100">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax
          animationSpeed={1}
          linesGradient={['#4B86F7', '#75A8F6', '#8B5CF6']}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-background/40 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)] dark:bg-background/20" />
      <div className={cn('relative z-10 mx-auto w-full px-4 py-20 sm:px-6 lg:px-8', className)}>
        {children}
      </div>
    </div>
  );
}
