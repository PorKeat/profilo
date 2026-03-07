import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderLoading() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar Skeleton */}
      <header className="h-14 w-full border-b bg-background flex items-center px-4 md:px-8 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </header>

      {/* Builder Layout Skeleton */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-64 border-r bg-muted/30 flex flex-col h-full shrink-0">
          <div className="p-4 border-b space-y-2">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-32 mb-4" />
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Canvas Skeleton */}
        <div className="flex-1 bg-muted/5 p-4 flex flex-col items-center overflow-hidden">
          <div className="w-full max-w-4xl space-y-4 pt-10 flex flex-col items-center">
             <Skeleton className="h-[200px] w-full rounded-xl" />
             <Skeleton className="h-[120px] w-full rounded-xl" />
             <Skeleton className="h-16 w-full max-w-2xl border-2 border-dashed rounded-lg opacity-50" />
          </div>
        </div>

        {/* Preview Panel Skeleton */}
        <div className="w-[500px] xl:w-[600px] border-l bg-background flex flex-col h-full shrink-0 hidden lg:flex">
          <div className="h-14 border-b flex items-center px-4 justify-between bg-muted/10">
             <Skeleton className="h-8 w-24 rounded-md" />
             <div className="flex space-x-2">
               <Skeleton className="h-8 w-8 rounded-md" />
               <Skeleton className="h-8 w-8 rounded-md" />
             </div>
          </div>
          <div className="p-6 space-y-6">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-24 w-3/4 rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
