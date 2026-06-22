import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { generateMarkdown } from "@/lib/markdown/generator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
        {TEMPLATES.map(template => {
          const markdownPreview = generateMarkdown(template.blocks, template.themeId, true);

          return (
            <Card key={template.id} className="overflow-hidden group hover:shadow-2xl transition-all border-muted-foreground/20 bg-background/50 backdrop-blur-sm flex flex-col">
              {/* Preview — always dark regardless of page theme */}
              <div className="dark h-64 bg-[#0d1117] border-b border-white/5 relative overflow-hidden flex justify-center p-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 pointer-events-none" />
                <div className="absolute top-0 w-[1000px] origin-top transform scale-[0.4] flex flex-col items-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="prose prose-sm prose-invert max-w-none w-full">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {markdownPreview}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col z-20 bg-background/95 backdrop-blur">
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
          );
        })}
      </div>
    </div>
  );
}
