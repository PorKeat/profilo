import { Card, CardContent } from "@/components/ui/card";
import { Code2, Rocket } from "lucide-react";
import { Github } from "@/components/icons/Github";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">About Profilo</h1>
        <p className="text-xl text-muted-foreground">
          Built for the open-source community to make great profiles accessible to everyone.
        </p>
      </div>

      <div className="space-y-12">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Profilo?</h2>
          <p>
            Your GitHub profile README is your developer portfolio. It&apos;s often the first thing 
            recruiters, collaborators, and open-source maintainers see. However, crafting a 
            beautiful Markdown file from scratch with badges, stats, and consistent formatting 
            can be tedious.
          </p>
          <p>
            Profilo was built to solve this. It&apos;s a completely free, browser-based tool 
            that lets you visually build your README.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <Code2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Backend, No Auth</h3>
              <p className="text-muted-foreground text-sm">
                We believe tools like this should be instantly accessible. 
                Everything runs in your browser and saves to localStorage.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <Github className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Open Source</h3>
              <p className="text-muted-foreground text-sm">
                The code is fully open-source. Anyone can contribute new templates, 
                blocks, or themes to help the community.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-primary/5 border rounded-2xl p-10">
          <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to build your profile?</h2>
          <Link href="/builder">
            <Button size="lg">Start Building Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
