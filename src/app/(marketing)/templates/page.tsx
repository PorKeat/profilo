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
import { TypewriterText } from "@/components/ui/TypewriterText";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { TemplateCategory } from "@/types/templates";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const CATEGORIES: (TemplateCategory | 'All')[] = ['All', 'Minimal', 'Creative', 'Professional', 'Data-Driven', 'Fun & Quirky'];

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<TemplateCategory | 'All'>('All');

  const filteredTemplates = TEMPLATES.filter(t => activeTab === 'All' || t.category === activeTab);

  return (
    <MarketingPageShell className="max-w-6xl">
      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto mb-16 max-w-3xl space-y-5 text-center">
        <motion.span variants={fadeUp} className="block text-xs font-bold uppercase tracking-widest text-primary">Template gallery</motion.span>
        <motion.h1 variants={fadeUp} className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          <TypewriterText text="Start with a premium template." delay={0.1} />
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/80 dark:text-foreground/80">
          Skip the blank page. Choose a starting point tailored to your role. You can customize every detail in the builder.
        </motion.p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={cn(
              "relative px-5 py-2 rounded-full text-sm font-medium transition-colors outline-none",
              activeTab === category 
                ? "text-white dark:text-black" 
                : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            {activeTab === category && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-md"
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map(template => {
          const markdownPreview = generateMarkdown(template.blocks, template.themeId, true);

          return (
            <motion.div 
              key={template.id} 
              layout 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <MagicCard className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white/40 p-4 shadow-xl backdrop-blur-2xl transition-all hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_30px_60px_rgba(75,134,247,0.15)] dark:border-white/10 dark:bg-black/40 dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                {/* Clean Floating Preview Window */}
                <div className="relative z-10 h-60 overflow-hidden rounded-3xl border border-black/5 p-0 shadow-inner dark:border-white/10">
                  <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top,rgba(75,134,247,0.15),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  
                  {/* Scaled Real Template Background */}
                  <div className="absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] bg-white p-12 transition-all duration-700 group-hover:scale-[0.42] dark:bg-[#0d1117]">
                    <div className="prose prose-sm dark:prose-invert pointer-events-none w-full max-w-none opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {markdownPreview}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>

                <CardContent className="relative z-20 flex flex-1 flex-col px-4 pb-4 pt-8">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">{template.name}</h3>
                  
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/60">
                    {template.desc}
                  </p>
                  
                  <div className="mb-8 flex flex-wrap gap-2">
                    {['GitHub', 'React', 'Markdown'].map((tag) => (
                      <span key={tag} className="rounded-full border border-black/5 bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/70 dark:border-white/10 dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/builder?template=${template.id}`} className="mt-auto block">
                    <Button className="group/btn relative h-12 w-full overflow-hidden rounded-full bg-primary text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/25">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Use Template <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </MagicCard>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>
    </MarketingPageShell>
  );
}
