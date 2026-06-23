'use client';

import { CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/MagicCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { generateMarkdown } from "@/lib/markdown/generator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MarketingPageShell } from "@/components/layout/MarketingPageShell";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function TemplatesPage() {
  return (
    <MarketingPageShell className="max-w-6xl">
      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto mb-16 max-w-3xl space-y-5 text-center">
        <motion.span variants={fadeUp} className="block text-xs font-bold uppercase tracking-widest text-primary">Template gallery</motion.span>
        <motion.h1 variants={fadeUp} className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">Start with a premium template.</motion.h1>
        <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/80 dark:text-foreground/80">
          Skip the blank page. Choose a starting point tailored to your role. You can customize every detail in the builder.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={stagger} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: false, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        {TEMPLATES.map(template => {
          const markdownPreview = generateMarkdown(template.blocks, template.themeId, true);

          return (
            <motion.div key={template.id} variants={fadeUp} className="h-full">
              <MagicCard className="h-full group flex flex-col gap-0 overflow-hidden rounded-2xl border-black/8 bg-white/75 py-0 shadow-sm backdrop-blur-2xl [--card-spacing:0px] transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_28px_90px_rgba(75,134,247,0.16)] dark:border-white/10 dark:bg-black/45">
                <div className="dark h-64 bg-[#080d1b]/95 border-b border-white/10 relative overflow-hidden flex justify-center p-0 z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 pointer-events-none" />
                  <div className="absolute top-0 w-[1000px] origin-top transform scale-[0.4] flex flex-col items-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="prose prose-sm prose-invert max-w-none w-full">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {markdownPreview}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col z-20 bg-white/40 backdrop-blur-xl dark:bg-white/[0.03]">
                  <h3 className="font-extrabold text-2xl mb-3 tracking-tight">{template.name}</h3>
                  <p className="text-foreground/80 mb-8 flex-1 leading-relaxed">
                    {template.desc}
                  </p>
                  <Link href={`/builder?template=${template.id}`}>
                    <Button size="lg" className="w-full rounded-full bg-primary text-md font-bold text-black hover:bg-primary/90">
                      Use this Template
                    </Button>
                  </Link>
                </CardContent>
              </MagicCard>
            </motion.div>
          );
        })}
      </motion.div>
    </MarketingPageShell>
  );
}
