import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutTemplate, GripVertical, Eye, Download, Code2, Sparkles, FileText } from 'lucide-react';
import { Github } from "@/components/icons/Github";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
          <Sparkles className="w-3 h-3 mr-1" />
          100% Free & Open Source
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
          Build a stunning GitHub profile README <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">in minutes</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Choose a theme, customize your sections, preview live, and export clean Markdown. No login required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/builder">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
              Start Building
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
              <LayoutTemplate className="w-4 h-4 mr-2" />
              View Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ReadmeCraft provides all the tools to craft the perfect GitHub profile, entirely in your browser.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<GripVertical className="w-6 h-6 text-primary" />}
              title="Drag & drop sections"
              description="Easily reorder your README sections with a smooth drag and drop interface."
            />
            <FeatureCard 
              icon={<Eye className="w-6 h-6 text-primary" />}
              title="Live Markdown preview"
              description="See your changes instantly with a live rendered preview of your Markdown."
            />
            <FeatureCard 
              icon={<LayoutTemplate className="w-6 h-6 text-primary" />}
              title="Beautiful templates"
              description="Start quickly with professionally designed templates for different roles."
            />
            <FeatureCard 
              icon={<Download className="w-6 h-6 text-primary" />}
              title="Export README.md"
              description="Copy the generated Markdown or download the README.md file directly."
            />
            <FeatureCard 
              icon={<Code2 className="w-6 h-6 text-primary" />}
              title="No login required"
              description="Start building immediately. Your progress is saved automatically in your browser."
            />
            <FeatureCard 
              icon={<Github className="w-6 h-6 text-primary" />}
              title="Open-source"
              description="Free forever and open-source. Contribute on GitHub to make it even better."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-muted-foreground/20 bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/50 group">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
