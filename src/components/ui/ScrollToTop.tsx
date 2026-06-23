'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setScrollPct(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SVG circle progress ring
  const size = 44;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = scrollPct * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* Outer glow */}
          <span className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* SVG ring + icon */}
          <span className="relative flex items-center justify-center w-11 h-11">
            {/* Background circle */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0 -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-primary/15"
              />
              {/* Progress */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - dash}
                strokeLinecap="round"
                className="text-primary transition-[stroke-dashoffset] duration-100"
              />
            </svg>

            {/* Inner glass pill */}
            <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_4px_20px_rgba(75,134,247,0.25)] group-hover:shadow-[0_4px_24px_rgba(75,134,247,0.45)] transition-shadow duration-300">
              <ArrowUp className="w-3.5 h-3.5 text-primary group-hover:-translate-y-0.5 transition-transform duration-200" />
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
