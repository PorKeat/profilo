import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/builder/Sidebar";
import { Canvas } from "@/components/builder/Canvas";
import { PreviewPanel } from "@/components/builder/PreviewPanel";

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        <PreviewPanel />
      </div>
    </div>
  );
}
