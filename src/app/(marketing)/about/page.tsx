'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Sparkles, UserRound } from 'lucide-react';
import { Github } from '@/components/icons/Github';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  const cardBase = "relative bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden";

  return (
    <MarketingPageShell className="max-w-6xl">
      <motion.div variants={stagger} initial="hidden" animate="show" className="w-full flex flex-col gap-8">
        
        {/* ── Top Grid: Creator Profile & Mission ── */}
        <section className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Creator Card */}
          <motion.div variants={fadeUp} className="relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-blue-600/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
            <div className={`${cardBase} h-full flex flex-col items-center text-center justify-center`}>
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent opacity-50" />
              
              <div className="relative mb-8 mt-4 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 rounded-full bg-primary/40 blur-3xl" />
                <div className="absolute -inset-2 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite] opacity-50" />
                <Image
                  src="https://github.com/PorKeat.png"
                  alt="Seng Porkeat"
                  width={160}
                  height={160}
                  unoptimized
                  className="relative h-40 w-40 rounded-full border-2 border-white/20 dark:border-white/10 object-cover shadow-[0_20px_50px_rgba(75,134,247,0.3)]"
                />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4 backdrop-blur-md">
                <UserRound className="h-3.5 w-3.5" />
                Creator of Profilo
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight mb-4">
                Hi, I&apos;m<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Seng Porkeat.</span>
              </h1>
              
              <p className="max-w-sm text-base leading-relaxed text-foreground/70 mb-8">
                DevOps engineer and cloud automation enthusiast building tools that help developers present their work with less friction.
              </p>

              <div className="mt-auto flex flex-wrap justify-center gap-2">
                {["Cloud Native", "CI/CD", "Automation", "Open Source"].map((item) => (
                  <span key={item} className="rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs font-bold text-foreground/70 shadow-sm backdrop-blur-md transition-colors hover:text-primary hover:border-primary/30">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={fadeUp} className="flex flex-col gap-8 h-full">
            <div className={`${cardBase} flex-1 flex flex-col justify-center relative overflow-hidden group`}>
              <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/10 transition-colors duration-700" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-1.5 h-6 rounded-full bg-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">About Profilo</span>
              </div>
              
              <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl leading-[1.1] relative z-10">
                Building better GitHub profiles.
              </h2>
              
              <p className="text-lg leading-relaxed text-foreground/70 relative z-10 max-w-lg">
                Profilo started from a simple idea: your GitHub profile should look polished and professional without forcing you to wrestle with complex Markdown, badges, and APIs entirely by hand.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { title: "Fast to use", desc: "Choose sections, customize details, preview instantly, and export clean Markdown.", icon: <Sparkles className="w-5 h-5 text-primary" /> },
                { title: "Built in public", desc: "Designed for developers who care about open-source, clarity, and creative profiles.", icon: <Github className="w-5 h-5 text-primary" /> },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#080810]/80 p-7 shadow-xl backdrop-blur-3xl group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-foreground text-lg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Middle Grid: Features ── */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div variants={fadeUp} className={`${cardBase} group hover:border-primary/20 transition-colors duration-500`}>
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-blue-400/5 rounded-full blur-[50px] group-hover:bg-blue-400/10 transition-colors duration-500" />
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 group-hover:scale-110 transition-transform duration-500">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">No Backend, No Auth</h3>
            <p className="text-foreground/60 text-base leading-relaxed relative z-10">
              Profilo is meant to feel immediate and frictionless. Everything runs securely in your browser, so you can build, preview, and export without creating an account or logging in.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className={`${cardBase} group hover:border-primary/20 transition-colors duration-500`}>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 group-hover:scale-110 transition-transform duration-500">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 relative z-10">100% Open Source</h3>
            <p className="text-foreground/60 text-base leading-relaxed relative z-10">
              This project is fully open for ideas, templates, custom blocks, and improvements. We believe the best developer tools are built by the community, for the community.
            </p>
          </motion.div>
        </section>

        {/* ── Bottom Grid: Why it matters & CTA ── */}
        <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-stretch">
          
          <motion.div variants={fadeUp} className={`${cardBase} h-full flex flex-col justify-center`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-4 rounded-full bg-primary/60" />
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">Why it matters</span>
            </div>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              Your profile is your first handshake.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-foreground/60">
              <p>
                Recruiters, collaborators, and open-source maintainers often see your README before anything else. A thoughtful profile explains what you build, what you care about, and how people can work with you.
              </p>
              <p>
                Profilo gives you a powerful visual way to shape that story instantly, then keeps the output simple: clean, standard Markdown that belongs entirely to you.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-tl from-primary/30 to-blue-400/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500" />
            <div className="relative h-full overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.03] dark:bg-primary/[0.02] shadow-2xl backdrop-blur-3xl p-8 sm:p-10 flex flex-col items-center text-center justify-center group-hover:bg-primary/[0.05] transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/20 text-primary shadow-[0_0_30px_rgba(75,134,247,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(75,134,247,0.5)] transition-all duration-500">
                <Rocket className="w-10 h-10" />
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-foreground relative z-10">Ready to build your profile?</h2>
              
              <Link href="/builder" className="w-full relative z-10">
                <button className="w-full h-14 rounded-2xl bg-primary text-black font-extrabold text-base flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(75,134,247,0.4)] hover:shadow-[0_0_40px_rgba(75,134,247,0.6)]">
                  Start Building Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>

        </section>

        {/* ── Footer Link ── */}
        <motion.div variants={fadeUp} className="flex justify-center pt-4">
          <Link
            href="https://github.com/PorKeat/profilo"
            target="_blank"
            className="group inline-flex items-center gap-3 rounded-full border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 px-6 py-3.5 text-sm font-bold text-foreground/80 shadow-sm backdrop-blur-xl transition-all hover:bg-white/60 dark:hover:bg-white/5 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_20px_rgba(75,134,247,0.15)]"
          >
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            View the project on GitHub
          </Link>
        </motion.div>

      </motion.div>
    </MarketingPageShell>
  );
}
