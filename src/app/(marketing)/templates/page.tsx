import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Monitor, Code, Terminal, Server } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";

// Map icons to templates for a visual flair
const getIconForTemplate = (id: string) => {
  switch (id) {
    case 'devops': return <Terminal className="w-16 h-16 text-primary/50 transition-transform group-hover:scale-110 duration-500" />;
    case 'cyberpunk': return <Monitor className="w-16 h-16 text-green-500/50 transition-transform group-hover:scale-110 duration-500" />;
    case 'opensource': return <Code className="w-16 h-16 text-purple-500/50 transition-transform group-hover:scale-110 duration-500" />;
    default: return <Server className="w-16 h-16 text-blue-500/50 transition-transform group-hover:scale-110 duration-500" />;
  }
};

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Start with a Premium Template</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Skip the blank page. Choose a starting point tailored to your role. You can customize every detail in the builder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {TEMPLATES.map(template => (
          <Card key={template.id} className="overflow-hidden group hover:shadow-2xl transition-all border-muted-foreground/20 bg-background/50 backdrop-blur-sm flex flex-col">
            <div className="h-48 bg-muted/10 border-b flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {getIconForTemplate(template.id)}
            </div>
            <CardContent className="p-8 flex-1 flex flex-col">
              <h3 className="font-extrabold text-2xl mb-3 tracking-tight">{template.name}</h3>
              <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                {template.desc}
              </p>
              <Link href={`/builder?template=${template.id}`}>
                <Button size="lg" className="w-full text-md font-semibold">
                  Use this Template
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
