'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons/Github';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const contacts = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'alexkgm2412@gmail.com',
    description: 'Best for general questions and collaborations',
    href: 'mailto:alexkgm2412@gmail.com',
    cta: 'Send an email',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/PorKeat',
    description: 'For bug reports, feature requests, and contributions',
    href: 'https://github.com/PorKeat',
    cta: 'Open GitHub',
  },
  {
    icon: <Send className="w-5 h-5" />,
    label: 'Telegram',
    value: '@porkeat',
    description: 'Quick questions or just want to say hi',
    href: 'https://t.me/porkeat',
    cta: 'Message on Telegram',
  },
];

export default function ContactPage() {
  return (
    <MarketingPageShell className="max-w-3xl">
      {/* Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="text-center mb-16"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Contact</span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.05]">
          Get in touch.
        </motion.h1>

        <motion.p variants={fadeUp} className="text-base md:text-lg text-foreground/70 max-w-md mx-auto leading-relaxed">
          Have questions, ideas, or want to contribute? Reach out through any of the channels below.
        </motion.p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {contacts.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group relative bg-white/70 dark:bg-black/50 backdrop-blur-2xl border border-black/8 dark:border-white/8 hover:border-primary/25 rounded-2xl p-6 transition-all duration-300 overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative z-10 flex items-center justify-between gap-4">
              {/* Left */}
              <div className="flex items-center gap-5 min-w-0">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                  {c.icon}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-0.5 font-mono">{c.label}</div>
                  <div className="text-base font-bold text-foreground truncate">{c.value}</div>
                  <div className="text-xs text-foreground/55 mt-0.5 leading-relaxed">{c.description}</div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="shrink-0 flex items-center gap-2 h-9 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-black transition-all duration-300 whitespace-nowrap"
              >
                {c.cta}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom note */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center mt-14"
      >
        <p className="text-sm text-foreground/45">
          Want to contribute to Profilo?{' '}
          <Link
            href="https://github.com/PorKeat/profilo"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-primary/80 font-semibold transition-colors inline-flex items-center gap-1"
          >
            Open a pull request on GitHub <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </motion.div>
    </MarketingPageShell>
  );
}
