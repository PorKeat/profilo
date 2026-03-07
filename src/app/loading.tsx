import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-8">
        <Skeleton className="h-16 w-3/4 max-w-3xl rounded-xl" />
        <Skeleton className="h-24 w-2/3 max-w-2xl rounded-xl" />
        <div className="flex space-x-4">
          <Skeleton className="h-12 w-32 rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
      </main>
    </div>
  );
}
