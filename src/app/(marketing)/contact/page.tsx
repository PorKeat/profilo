'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, Loader2, User, MessageSquare } from 'lucide-react';
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
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: 'alexkgm2412@gmail.com',
    href: 'mailto:alexkgm2412@gmail.com',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'PorKeat',
    href: 'https://github.com/PorKeat',
  },
  {
    icon: <Send className="w-5 h-5" />,
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

      toast.success('Message sent successfully!', {
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
    'w-full rounded-2xl bg-white/5 dark:bg-white-[0.02] border border-black/10 dark:border-white/10 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/35 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-white/10 dark:focus:bg-white/5 transition-all duration-300';

  return (
    <MarketingPageShell className="max-w-5xl">
      <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">
        
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(75,134,247,0.8)]" />
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Let&apos;s Connect</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="text-foreground">Get in </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">touch.</span>
          </h1>
          
          <p className="text-lg text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Have a question, an idea, or just want to say hi? Fill out the form below or reach out via social media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ── Left: Contact form ── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 relative group h-full"
          >
            {/* Animated Glow Behind Form */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-blue-600/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />
            
            <div className="relative h-full flex flex-col bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full bg-primary" />
                Send a message
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/40">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        disabled={loading}
                        className={`${inputBase} pl-11`}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/40">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        disabled={loading}
                        className={`${inputBase} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-foreground/50 uppercase tracking-widest pl-1">Message</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-foreground/40">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      required
                      rows={5}
                      disabled={loading}
                      className={`${inputBase} pl-11 resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-auto w-full h-14 rounded-2xl bg-primary text-black font-extrabold text-base flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(75,134,247,0.3)] hover:shadow-[0_0_40px_rgba(75,134,247,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 overflow-hidden relative group/btn"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Right: Contact channels ── */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-5 pt-2 h-full">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-foreground mb-2">Direct channels</h3>
              <p className="text-sm text-foreground/60">Prefer to reach out directly? Choose your favorite platform below.</p>
            </div>

            {channels.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="group relative flex items-center gap-5 bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 hover:border-primary/30 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-foreground/70 group-hover:bg-primary group-hover:text-black group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                  {c.icon}
                </div>
                
                <div className="relative z-10 min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mb-1">{c.label}</div>
                  <div className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">{c.value}</div>
                </div>
                
                <div className="relative z-10 w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                  <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:-rotate-45 transition-all duration-300" />
                </div>
              </Link>
            ))}

            {/* Contribute note */}
            <div className="mt-auto relative overflow-hidden bg-primary/5 dark:bg-primary/[0.02] border border-primary/20 rounded-2xl p-6 group hover:bg-primary/10 dark:hover:bg-primary/[0.04] transition-colors duration-500 backdrop-blur-3xl">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
              <h4 className="font-bold text-foreground mb-2 relative z-10">Want to contribute?</h4>
              <p className="text-sm text-foreground/70 leading-relaxed mb-4 relative z-10">
                Profilo is open source. Join the community and help us build the best profile generator.
              </p>
              <Link
                href="https://github.com/PorKeat/profilo"
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Open a pull request <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MarketingPageShell>
  );
}
