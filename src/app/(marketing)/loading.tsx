import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <div className="container py-20 max-w-4xl mx-auto space-y-12">
      {/* Header section */}
      <div className="space-y-4 text-center flex flex-col items-center">
        <Skeleton className="h-12 w-1/2 max-w-md rounded-lg" />
        <Skeleton className="h-6 w-3/4 max-w-lg rounded-md" />
      </div>

      {/* Content blocks */}
      <div className="space-y-8 mt-12">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4 rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
