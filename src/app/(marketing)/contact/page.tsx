'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Github } from '@/components/icons/Github';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const channels = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: 'Email',
    value: 'alexkgm2412@gmail.com',
    href: 'mailto:alexkgm2412@gmail.com',
  },
  {
    icon: <Github className="w-4 h-4" />,
    label: 'GitHub',
    value: 'PorKeat',
    href: 'https://github.com/PorKeat',
  },
  {
    icon: <Send className="w-4 h-4" />,
    label: 'Telegram',
    value: '@porkeat',
    href: 'https://t.me/porkeat',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Sending your message...', {
      description: 'Please wait a moment.',
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      toast.success('Message sent!', {
        id: toastId,
        description: "I'll get back to you as soon as possible.",
        duration: 5000,
      });
      setForm({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      toast.error('Failed to send message', {
        id: toastId,
        description: err instanceof Error ? err.message : 'Please try again or reach out directly.',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full rounded-xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-200';

  return (
    <MarketingPageShell className="max-w-3xl">
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Contact</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.05]">
            Get in touch.
          </h1>
          <p className="text-base text-foreground/60 max-w-sm mx-auto leading-relaxed">
            Questions, ideas, bugs, or just want to say hi — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Contact form ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-3 bg-white/70 dark:bg-black/50 backdrop-blur-2xl border border-black/8 dark:border-white/8 rounded-2xl p-7"
          >
            <h2 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-primary" />
              Send a message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={loading}
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  required
                  rows={5}
                  disabled={loading}
                  className={`${inputBase} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(75,134,247,0.3)] hover:shadow-[0_0_30px_rgba(75,134,247,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>

          {/* ── Right: Contact channels ── */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4">
            <p className="text-[11px] font-bold text-foreground/40 uppercase tracking-widest px-1">Or reach me directly</p>

            {channels.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group flex items-center gap-4 bg-white/70 dark:bg-black/50 backdrop-blur-2xl border border-black/8 dark:border-white/8 hover:border-primary/25 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-0.5">{c.label}</div>
                  <div className="text-sm font-bold text-foreground truncate">{c.value}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground/25 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}

            {/* Contribute note */}
            <div className="mt-auto bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4">
              <p className="text-xs text-foreground/60 leading-relaxed">
                Want to contribute to Profilo?{' '}
                <Link
                  href="https://github.com/PorKeat/profilo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  Open a pull request →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MarketingPageShell>
  );
}
