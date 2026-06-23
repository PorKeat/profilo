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
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.h1 variants={fadeUp} className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">Start with a premium template.</motion.h1>
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
        </AnimatePresence>
      </motion.div>
    </MarketingPageShell>
  );
}
