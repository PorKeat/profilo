import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Monitor } from "lucide-react";

const templates = [
  { id: 'minimal-dev', name: 'Minimal Developer', desc: 'Clean, simple, focuses on featured projects and skills.' },
  { id: 'devops', name: 'DevOps Engineer', desc: 'Focus on tools, CI/CD pipelines, and GitHub stats.' },
  { id: 'cyberpunk', name: 'Cyberpunk', desc: 'Neon colors, dark mode, high contrast tech style.' },
  { id: 'student', name: 'Student Portfolio', desc: 'Highlights education, current learning, and hackathon projects.' },
  { id: 'opensource', name: 'Open Source Maintainer', desc: 'Showcases repositories, contributions, and community stats.' },
  { id: 'backend', name: 'Backend Engineer', desc: 'Focuses on databases, cloud infrastructure, and APIs.' },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Start with a Template</h1>
        <p className="text-xl text-muted-foreground">
          Choose a starting point. You can customize everything later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map(template => (
          <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-all border-muted-foreground/20 bg-background/50 backdrop-blur-sm">
            <div className="h-48 bg-muted/30 border-b flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Monitor className="w-16 h-16 text-muted-foreground/30 transition-transform group-hover:scale-110 duration-500" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2">{template.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 h-10">
                {template.desc}
              </p>
              <Link href={`/builder?template=${template.id}`}>
                <Button className="w-full">Use Template</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
