'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="group fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(75,134,247,0.3)] transition-all duration-300"
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
          
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-black/5 dark:text-white/5"
            />
            {/* Progress indicator */}
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary drop-shadow-[0_0_6px_rgba(75,134,247,0.6)]"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          
          {/* Icon */}
          <ArrowUp className="relative z-10 w-5 h-5 text-foreground/70 group-hover:text-primary group-hover:-translate-y-1 transition-all duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
