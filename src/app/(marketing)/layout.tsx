import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import FloatingLines from '@/components/ui/FloatingLines';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative isolate overflow-hidden bg-white text-foreground transition-colors duration-300 dark:bg-[#080810]">
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
      <div className="fixed inset-0 z-0 pointer-events-none bg-background/40 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)] dark:bg-background/20" />
      
      <Navbar />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
