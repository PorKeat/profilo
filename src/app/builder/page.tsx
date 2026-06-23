'use client';

import { Sidebar } from "@/components/builder/Sidebar";
import { Canvas } from "@/components/builder/Canvas";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { TemplateLoader } from "@/components/builder/TemplateLoader";
import { BuilderCommandPalette } from "@/components/builder/BuilderCommandPalette";
import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import DotField from "@/components/ui/DotField";

export default function BuilderPage() {
  const [zenMode, setZenMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Dynamic Ambient Background with Noise Texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DotField className="absolute inset-0 opacity-50" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-30 blur-[120px]"></div>
        {/* SVG Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>
      
      <Suspense fallback={null}>
        <TemplateLoader />
      </Suspense>

      {/* Zen Mode Toggle Button */}
      <div className="absolute bottom-6 right-6 z-50 hidden lg:block">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-2xl bg-background/50 backdrop-blur-xl border-white/10 hover:bg-primary hover:text-primary-foreground transition-all"
          onClick={() => setZenMode(!zenMode)}
          title={zenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
          {zenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="absolute top-4 left-4 z-[60] lg:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-2xl bg-black/50 backdrop-blur-xl border-white/10 hover:bg-primary hover:text-black transition-all"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative z-10 pt-16 lg:pt-0">
        <AnimatePresence>
          {!zenMode && isSidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="z-[55] h-full absolute lg:relative w-[320px] bg-background/95 backdrop-blur-3xl lg:bg-transparent shadow-[100px_0_100px_rgba(0,0,0,0.5)] lg:shadow-none border-r border-white/10 lg:border-none"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!zenMode && (
            <motion.div 
              layout 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col h-full min-w-0 min-h-0 overflow-hidden"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Canvas />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          className={`h-full lg:h-full min-h-[50vh] ${zenMode ? 'flex-1 w-full' : 'w-full lg:w-auto lg:max-w-xl xl:max-w-2xl'}`}
        >
          <PreviewPanel isFullscreen={zenMode} />
        </motion.div>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <BuilderCommandPalette />
    </div>
  );
}
