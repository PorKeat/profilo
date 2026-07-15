'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  { q:'Is Profilo completely free?', a:'Yes! Profilo is a 100% free, open-source tool built for the developer community. There are no paid tiers and no hidden features.' },
  { q:'Do I need to sign in with GitHub?', a:"Nope! We don't require OAuth permissions. Profilo relies on your public GitHub username to generate URLs for open-source stat APIs (like anuraghazra/github-readme-stats)." },
  { q:'Where is my profile data saved?', a:"Your in-progress profile is saved locally in your browser's local storage. We have no backend database, meaning your data never leaves your computer until you push the Markdown to GitHub." },
  { q:'Can I use my own theme colors?', a:'Absolutely. Beyond the built-in themes, individual blocks like GitHub Stats and Activity Graphs support fully custom hex color inputs for maximum personalization.' },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            className="relative overflow-hidden transition-all duration-500 cursor-pointer group"
            onClick={() => setOpenIndex(isOpen ? null : i)}
          >
            {/* Closed state background */}
            <div className={`absolute inset-0 bg-white/60 dark:bg-[#080810]/80 border border-black/10 dark:border-white/10 backdrop-blur-3xl rounded-[2rem] transition-all duration-500 ${isOpen ? 'opacity-0 scale-95' : 'opacity-100 group-hover:border-primary/30 group-hover:bg-primary/5'}`} />
            
            {/* Opened state background */}
            <div className={`absolute inset-0 bg-white/80 dark:bg-[#080810]/95 border border-primary/40 backdrop-blur-3xl rounded-[2rem] shadow-[0_0_30px_rgba(75,134,247,0.15)] transition-all duration-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} />

            <div className={`relative z-10 p-4 md:px-6 ${isOpen ? 'pt-8 pb-8' : 'py-5'} flex items-start gap-4 md:gap-6`}>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-colors duration-300 ${isOpen ? 'bg-primary/20 text-primary' : 'bg-black/5 dark:bg-white/10 text-foreground/80'}`}>
                    {i + 1}
                  </div>
                  <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                    {faq.q}
                  </h3>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 md:pl-12 text-foreground/80 text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-primary text-white shadow-[0_0_15px_rgba(75,134,247,0.5)] rotate-90' : 'bg-black/5 dark:bg-white/5 text-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110'}`}>
                {isOpen ? <X className="w-5 h-5 text-black" /> : <Plus className="w-5 h-5" />}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
