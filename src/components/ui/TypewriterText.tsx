'use client';

import { motion } from 'framer-motion';

export const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const chars = text.split("");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.02, delayChildren: delay } }
      }}
      className={`inline-block ${className || ""}`}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.01 } }
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
