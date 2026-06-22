import { Sidebar } from "@/components/builder/Sidebar";
import { Canvas } from "@/components/builder/Canvas";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { TemplateLoader } from "@/components/builder/TemplateLoader";
import { Suspense } from "react";

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      
      <Suspense fallback={null}>
        <TemplateLoader />
      </Suspense>
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <Canvas />
        <PreviewPanel />
      </div>
    </div>
  );
}
