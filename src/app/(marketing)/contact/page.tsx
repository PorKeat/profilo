'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, ArrowRight, CheckCircle, AlertCircle, Loader2, Github as GithubIcon } from 'lucide-react';
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

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const inputBase =
    'w-full rounded-xl bg-black/4 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all duration-200';

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
            Questions, ideas, bugs, or just want to say hi — I'd love to hear from you.
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

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">Message sent!</p>
                    <p className="text-sm text-foreground/55 mt-1">I'll get back to you as soon as possible.</p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs text-primary hover:text-primary/70 transition-colors mt-2"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest">Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
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
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-11 rounded-xl bg-primary text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(75,134,247,0.3)] hover:shadow-[0_0_30px_rgba(75,134,247,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
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
            <div className="mt-2 bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4">
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
