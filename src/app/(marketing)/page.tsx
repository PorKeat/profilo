'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Layers, Code2, GitBranch, Sparkles, ChevronDown, Terminal } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import FloatingLines from '@/components/ui/FloatingLines';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { useRef } from 'react';

// ─── Reusable animation variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};
const fadeUpStagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6 } },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      variants={fadeUpStagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ container: containerRef });
  const heroParallax = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <div ref={containerRef} className="flex flex-col items-center bg-white dark:bg-[#080810] min-h-screen text-foreground overflow-x-hidden relative font-sans transition-colors duration-300">

      {/* ── React Bits Floating Lines Background ── */}
      <div className="fixed inset-0 z-0 opacity-60 dark:opacity-100 pointer-events-none">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          linesGradient={['#4B86F7', '#75A8F6', '#8B5CF6']}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="flex flex-col items-center justify-center text-center pt-16 pb-32 relative z-20">

          {/* Left */}
          <motion.div
            style={{ y: heroParallax }}
            variants={fadeUpStagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center space-y-8 relative z-10 max-w-4xl mx-auto"
          >
            {/* Seamless Glassmorphism Backdrop for Readability */}
            <div className="absolute -inset-x-24 -inset-y-24 bg-background/60 dark:bg-background/40 backdrop-blur-3xl rounded-[6rem] -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] pointer-events-none" />
            <motion.div variants={fadeUp} className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Build Your Developer Identity</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.07] text-foreground">
              Best GitHub<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/60">
                Profile Builder
              </span><br />
              <span className="text-foreground/40">for your future.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-foreground/80 dark:text-foreground/70 text-lg md:text-xl leading-relaxed max-w-2xl text-center">
              Drag-and-drop beautiful blocks, see live previews, and export pure markdown — no code, no backend, no cost.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/builder">
                <Button className="bg-primary text-black hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-[0_0_30px_rgba(75,134,247,0.35)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(75,134,247,0.55)] hover:scale-105">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View Templates <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side removed to center the hero section */}
        </section>

        {/* ══════════════════════════════════════════
            FEATURE TRIO
        ══════════════════════════════════════════ */}
        <Section className="py-32 relative">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Why Profilo</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">ultimate toolkit</span><br />
              <span className="text-foreground/40">for GitHub READMEs.</span>
            </h2>
            <p className="text-foreground/80 dark:text-foreground/70 text-sm max-w-md mx-auto">No databases. No paid tiers. Just a pure, client-side markdown generation engine.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 dark:bg-white/5 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
            {[
              { n:'01.', title:'Drag & Drop Builder', desc:'Reorder your README sections with a smooth drag and drop interface. What you see is what you get.', accent:'from-primary/20 to-transparent', icon: <Layers className="w-5 h-5" /> },
              { n:'02.', title:'Premium Templates', desc:'Start with pre-built layouts tailored to your role — Backend, Frontend, Data Science, DevOps, and more.', accent:'from-primary/60 to-primary/40', icon: <Sparkles className="w-5 h-5" />, featured: true },
              { n:'03.', title:'Pure Markdown', desc:'No proprietary formats. You get exactly what you see: clean, structured Markdown ready for GitHub.', accent:'from-blue-400/20 to-transparent', icon: <Code2 className="w-5 h-5" /> },
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative group p-6 md:p-10 ${c.featured ? 'bg-primary/90 backdrop-blur-md text-white shadow-xl shadow-primary/20' : 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl shadow-sm'} overflow-hidden cursor-default`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative z-10 ${c.featured ? 'text-white' : 'text-primary'} mb-6 flex items-center gap-3`}>
                  {c.icon}
                  <span className="text-sm font-bold tracking-widest opacity-80">{c.n}</span>
                </div>
                <h3 className={`relative z-10 text-xl font-black mb-3 ${c.featured ? 'text-white' : 'text-foreground'}`}>{c.title}</h3>
                <p className={`relative z-10 text-sm leading-relaxed ${c.featured ? 'text-white/80' : 'text-foreground/80 dark:text-foreground/70'}`}>{c.desc}</p>
                {c.featured && (
                  <Link href="/templates" className="relative z-10 mt-6 flex items-center gap-1 font-bold text-sm">
                    Explore Templates <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            PLATFORM SECTION
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Built for developers</span>
            </div>
            <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tight text-foreground md:text-5xl">
              Create your README<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">in minutes, not hours.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 dark:text-foreground/70">
              Build a polished GitHub profile with live stats, clean sections, and export-ready Markdown. No backend, no login, no complicated setup.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto mb-14 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-black/8 bg-black/8 dark:border-white/10 dark:bg-white/10">
            {[
              ['12+', 'Blocks'],
              ['0', 'Backend'],
              ['100%', 'Markdown'],
            ].map(([value, label]) => (
              <div key={label} className="bg-white/80 p-5 text-center backdrop-blur-xl dark:bg-[#080d1b]/80">
                <div className="text-2xl font-black text-foreground">{value}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-foreground/45">{label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="relative mx-auto grid max-w-5xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="absolute inset-x-8 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-black/8 bg-white/80 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-xl font-black text-primary">A</div>
                <div>
                  <div className="text-lg font-black text-foreground">Alex Nguyen</div>
                  <div className="mt-1 text-sm font-medium text-primary">Full-Stack Developer</div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-primary/15 bg-primary/15">
                {[['Stars','423'], ['Commits','1,847']].map(([label, val]) => (
                  <div key={label} className="bg-white/70 p-4 dark:bg-[#0b1020]/90">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80">{label}</div>
                    <div className="mt-2 text-2xl font-black text-foreground">{val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary/70">Activity</div>
                <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className={`h-3 rounded-[4px] ${
                      [2, 5, 8, 13, 17, 22, 26, 29, 34].includes(i) ? 'bg-primary' :
                      [0, 3, 6, 11, 15, 18, 20, 24, 28, 31].includes(i) ? 'bg-primary/55' :
                      'bg-primary/12 dark:bg-white/10'
                    }`} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-black/8 bg-white/80 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-black/45"
            >
              <div className="mb-6 flex items-center justify-between border-b border-black/8 pb-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/45">README.md</span>
              </div>

              <div className="space-y-6">
                {[
                  ['## About me', 'Building polished tools for developers.'],
                  ['### Tech stack', 'React  Next.js  TypeScript  Tailwind'],
                  ['### Latest focus', 'Shipping better READMEs with less friction.'],
                ].map(([title, text]) => (
                  <div key={title}>
                    <div className="font-mono text-xs font-bold text-primary">{title}</div>
                    <div className="mt-3 h-2 w-full rounded-full bg-black/8 dark:bg-white/12" />
                    <div className="mt-2 h-2 w-2/3 rounded-full bg-black/8 dark:bg-white/12" />
                    <p className="mt-3 text-sm leading-relaxed text-foreground/65">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </Section>




        {/* ══════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Simple process</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">How it works</h2>
            <p className="text-foreground/80 dark:text-foreground/70 text-base max-w-xl mx-auto">Three simple steps to craft a standout GitHub profile README — no code required.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {[
              { n:'1', title:'Pick a Template', desc:'Start from scratch or select a role-specific layout — Backend, Frontend, Data Science, DevOps and more.', icon: <Layers className="w-6 h-6" /> },
              { n:'2', title:'Customize Blocks', desc:'Use the drag-and-drop editor to add GitHub Stats, Activity Graphs, Typing SVGs, and skill badges.', icon: <Zap className="w-6 h-6" /> },
              { n:'3', title:'Copy & Paste', desc:"Hit Export for perfectly formatted Markdown. Paste it into your GitHub README.md and you're done!", icon: <Shield className="w-6 h-6" /> },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/8 dark:border-white/5 hover:border-primary/30 p-8 rounded-2xl flex flex-col items-center text-center transition-colors duration-300 cursor-default shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {s.icon}
                </div>
                <div className="absolute top-6 right-6 text-[10px] text-foreground/30 font-mono font-bold">{s.n}</div>
                <h3 className="relative z-10 text-lg font-bold mb-3 text-foreground">{s.title}</h3>
                <p className="relative z-10 text-foreground/80 dark:text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            FEATURES BENTO GRID
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Everything included</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Everything you need</h2>
            <p className="text-foreground/80 dark:text-foreground/70 text-base max-w-xl mx-auto">Profilo comes packed with dynamic blocks to show off your developer journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Big card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/8 dark:border-white/5 hover:border-primary/20 p-7 rounded-2xl col-span-1 lg:col-span-2 row-span-2 transition-colors duration-300 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Real-time GitHub Stats</h3>
              <p className="text-foreground/80 dark:text-foreground/70 text-sm mb-6 leading-relaxed">Showcase commits, stars, PRs, and top languages pulling directly from GitHub APIs. Always up-to-date, always accurate.</p>
              <div className="w-full rounded-xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/5 backdrop-blur-md p-4 space-y-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-white">G</div>
                  <div>
                    <div className="text-xs font-bold text-foreground">GitHub Stats</div>
                    <div className="text-[10px] text-foreground/80 dark:text-foreground/70">Connected · Live</div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[['Stars','423'],['Commits','1,847'],['PRs','94']].map(([l,v]) => (
                    <div key={l} className="bg-black/5 dark:bg-white/10 rounded-lg p-2 text-center shadow-sm">
                      <div className="text-xs font-bold text-foreground">{v}</div>
                      <div className="text-[9px] text-foreground/80 dark:text-foreground/70">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {[
              { icon: <Shield className="w-5 h-5" />, title:'No Databases', desc:'100% client-side generation. We never store your data or require sign-in.' },
              { icon: <Sparkles className="w-5 h-5" />, title:'Custom Themes', desc:'Instantly switch between GitHub Classic, Cyberpunk, Purple Gradient, and Clean Light.' },
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                className="group bg-white/80 dark:bg-black/60 backdrop-blur-2xl shadow-sm border border-black/8 dark:border-white/5 hover:border-primary/20 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  {c.icon}
                </div>
                <h3 className="relative z-10 font-bold mb-2 text-foreground">{c.title}</h3>
                <p className="relative z-10 text-foreground/80 dark:text-foreground/70 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white/80 dark:bg-black/60 backdrop-blur-2xl shadow-sm border border-black/8 dark:border-white/5 hover:border-primary/20 p-6 rounded-2xl lg:col-span-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">Animated Elements</h3>
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm leading-relaxed">Add typing SVGs, profile view counters, activity graphs, and streak stats — without wrestling with complex markdown syntax.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Community</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Loved by developers</h2>
            <p className="text-foreground/70 text-base max-w-md mx-auto">Join thousands of developers who already use Profilo to craft their GitHub identity.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Sarah Chen',
                role: 'Frontend Engineer',
                avatar: 'S',
                stars: 5,
                quote: 'I spent hours trying to get my README right. With Profilo I had a beautiful, live-stats profile set up in under 10 minutes. Incredible tool.'
              },
              {
                name: 'Marcus Okonkwo',
                role: 'Full-Stack Developer',
                avatar: 'M',
                stars: 5,
                quote: 'The drag-and-drop editor is so intuitive. I love how the live preview updates instantly as I move blocks around. This is what readme.so should have been.'
              },
              {
                name: 'Priya Sharma',
                role: 'Data Scientist',
                avatar: 'P',
                stars: 5,
                quote: 'No sign-in, no backend, nothing stored. Pure client-side Markdown generation. As a privacy-conscious dev, I appreciate that more than I can say.'
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-black/8 dark:border-white/5 hover:border-primary/20 p-7 rounded-2xl shadow-sm transition-all duration-300 flex flex-col gap-5 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Stars */}
                <div className="relative z-10 flex gap-1">
                  {[...Array(t.stars)].map((_, s) => (
                    <svg key={s} className="w-3.5 h-3.5 fill-primary text-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="relative z-10 text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="relative z-10 flex items-center gap-3 pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-[11px] text-primary/70 font-mono">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-16 flex flex-col items-center">
            <div className="relative inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(75,134,247,0.8)]" />
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Answers</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Questions</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mt-4 leading-relaxed">
              Everything you need to know about Profilo, pricing, and how your data is handled.
            </p>
          </motion.div>

          <FaqAccordion />
        </Section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <Section className="py-32 mb-12">
          <motion.div
            variants={fadeUp}
            className="relative text-center bg-white/80 dark:bg-black/60 backdrop-blur-3xl border border-primary/20 dark:border-primary/15 rounded-[3rem] overflow-hidden p-20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#4B86F7_0%,transparent_55%)] opacity-10 dark:opacity-15 pointer-events-none" />
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 18 + i * 3, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -translate-x-1/2 -translate-y-1/2"
                style={{ transformOrigin: 'center' }}
              >
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-primary/30 dark:bg-primary/40"
                  style={{ top: 0, left: '50%', transform: `translateX(-50%) rotate(${deg}deg) translateY(-170px)` }}
                />
              </motion.div>
            ))}

            <div className="relative z-10">
              <motion.span variants={fadeUp} className="text-xs text-primary font-bold tracking-widest uppercase mb-6 block">Ready to begin?</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
                Ready to stand out?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-foreground/80 dark:text-foreground/70 text-lg mb-10 max-w-md mx-auto">
                Join thousands of developers crafting beautiful, dynamic GitHub profiles with Profilo.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/builder">
                  <Button className="bg-primary text-black hover:bg-primary/80 transition-all duration-300 font-bold px-12 h-14 text-base rounded-full shadow-[0_0_40px_rgba(75,134,247,0.35)] hover:shadow-[0_0_60px_rgba(75,134,247,0.55)] hover:scale-105">
                    Start Building Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Section>

      </div>
    </div>
  );
}
