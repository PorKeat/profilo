import { Skeleton } from "@/components/ui/skeleton";
import { MarketingPageShell } from "@/components/layout/MarketingPageShell";

export default function MarketingLoading() {
  const cardBase = "bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl p-8";

  return (
    <MarketingPageShell className="max-w-6xl">
      <div className="w-full flex flex-col gap-16 md:gap-24">
        
        {/* Header Skeleton */}
        <div className="text-center mt-8 relative flex flex-col items-center">
          <Skeleton className="h-6 w-24 rounded-full mb-6" />
          <Skeleton className="h-16 w-3/4 max-w-2xl rounded-xl mb-6" />
          <Skeleton className="h-6 w-1/2 max-w-md rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`${cardBase} aspect-square relative overflow-hidden`}>
            <Skeleton className="absolute inset-0 rounded-[2rem]" />
          </div>
          <div className="flex flex-col gap-6 pt-4">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-full mt-4" />
          </div>
        </div>

        {/* Bottom Skeleton */}
        <div className={`${cardBase} h-64 relative overflow-hidden flex flex-col items-center justify-center gap-6 mt-10`}>
          <Skeleton className="absolute inset-0 rounded-3xl" />
        </div>

      </div>
    </MarketingPageShell>
  );
}
