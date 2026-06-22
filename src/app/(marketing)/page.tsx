'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Shield, Layers, Code2, GitBranch, Sparkles, Terminal, ChevronDown } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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

      {/* ── Modern Animated Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient Animated Glows */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 dark:bg-primary/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60"
        />

        {/* Premium Grid with Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">

          {/* Left */}
          <motion.div
            style={{ y: heroParallax }}
            variants={fadeUpStagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start space-y-7"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Build Your Developer Identity</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.07] text-foreground">
              Best GitHub<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/60">
                Profile Builder
              </span><br />
              <span className="text-foreground/40">for your future.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Drag-and-drop beautiful blocks, see live previews, and export pure markdown — no code, no backend, no cost.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
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

          {/* Right — 3D card */}
          <div className="relative h-[540px] w-full hidden lg:flex items-center justify-center">
            {/* Ambient blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/15 dark:bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-blue-400/10 rounded-full blur-[80px]" />

            {/* 3D card */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 18, rotateY: -14 }}
              animate={{ opacity: 1, y: 0,  rotateX: 6,  rotateY: -8  }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
              className="relative w-[390px] z-20"
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/15 blur-3xl translate-y-8 scale-95" />
              <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden">

                {/* chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.025]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  <span className="ml-3 text-[11px] text-foreground/25 font-mono">README.md — profilo</span>
                </div>

                {/* profile */}
                <div className="p-5 flex items-center gap-4 border-b border-black/5 dark:border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/30 shrink-0">A</div>
                  <div>
                    <div className="font-bold text-foreground text-sm">alex-nguyen</div>
                    <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Full-Stack · Open Source · Since Jan 2025</div>
                    <div className="flex gap-1 mt-1.5">
                      {['Next.js','TypeScript','Rust'].map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* stats */}
                <div className="grid grid-cols-3 divide-x divide-black/5 dark:divide-white/5 border-b border-black/5 dark:border-white/5">
                  {[{ l:'Commits',v:'1,847' },{ l:'Stars',v:'423' },{ l:'PRs',v:'94' }].map(s => (
                    <div key={s.l} className="py-3 text-center">
                      <div className="text-sm font-bold text-foreground">{s.v}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* activity */}
                <div className="px-5 py-4 border-b border-black/5 dark:border-white/5">
                  <div className="text-[9px] text-muted-foreground mb-2.5 font-mono uppercase tracking-widest">Contribution Activity</div>
                  <svg width="100%" height="44" viewBox="0 0 320 44" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4B86F7" stopOpacity="0.45"/>
                        <stop offset="100%" stopColor="#4B86F7" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 36 C40 26,60 8,80 18 S120 32,140 12 S180 2,200 14 S240 26,260 8 S295 4,320 16 L320 44 L0 44Z" fill="url(#g1)"/>
                    <path d="M0 36 C40 26,60 8,80 18 S120 32,140 12 S180 2,200 14 S240 26,260 8 S295 4,320 16" fill="none" stroke="#4B86F7" strokeWidth="1.8"/>
                  </svg>
                </div>

                {/* languages */}
                <div className="px-5 py-4">
                  <div className="text-[9px] text-muted-foreground mb-2.5 font-mono uppercase tracking-widest">Top Languages</div>
                  <div className="space-y-2">
                    {[{ l:'TypeScript',p:68,c:'#3178c6' },{ l:'Python',p:21,c:'#3572A5' },{ l:'Go',p:11,c:'#00acd7' }].map((l,i) => (
                      <div key={l.l} className="flex items-center gap-2.5">
                        <span className="text-[9px] text-muted-foreground w-20 shrink-0">{l.l}</span>
                        <div className="flex-1 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${l.p}%` }}
                            transition={{ duration: 1.3, delay: 0.8 + i * 0.15, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: l.c }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground w-6 text-right">{l.p}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating chips */}
            {[
              { text: 'Theme: Cyberpunk',  dot: 'bg-green-400', pos: 'top-[6%]  right-[2%]',    delay: 0,   dur: 4   },
              { text: 'Live Preview',      dot: 'bg-primary',   pos: 'top-[42%] right-[-3%]',   delay: 0.8, dur: 3.5 },
              { text: 'Export Markdown',   dot: 'bg-blue-400',  pos: 'bottom-[16%] left-[-2%]', delay: 1.5, dur: 5   },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
                  className={`absolute ${c.pos} z-30 flex items-center gap-2 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl px-3 py-1.5 shadow-lg dark:shadow-2xl`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
                  <span className="text-[11px] text-foreground/65 font-mono">{c.text}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
            <p className="text-muted-foreground text-sm max-w-md mx-auto">No databases. No paid tiers. Just a pure, client-side markdown generation engine.</p>
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
                className={`relative group p-10 ${c.featured ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white dark:bg-[#0e0e18] shadow-sm'} overflow-hidden cursor-default`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative z-10 ${c.featured ? 'text-white' : 'text-primary'} mb-6 flex items-center gap-3`}>
                  {c.icon}
                  <span className="text-sm font-bold tracking-widest opacity-80">{c.n}</span>
                </div>
                <h3 className={`relative z-10 text-xl font-black mb-3 ${c.featured ? 'text-white' : 'text-foreground'}`}>{c.title}</h3>
                <p className={`relative z-10 text-sm leading-relaxed ${c.featured ? 'text-white/80' : 'text-muted-foreground'}`}>{c.desc}</p>
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
        <Section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-black/5 dark:border-white/5">

          {/* Left — 3D floating cards */}
          <motion.div variants={fadeIn} className="relative h-[420px] flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[80px]" />

            {/* Main card */}
            <motion.div
              initial={{ rotateX: 8, rotateY: 8 }}
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative z-10 bg-gray-50 dark:bg-[#0e0e18] border border-black/8 dark:border-white/10 rounded-2xl p-6 w-72 shadow-[0_24px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground font-mono">profilo_output.md</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="text-primary/70"># Hi there 👋</div>
                <div className="text-muted-foreground">![Typing SVG](...)</div>
                <div className="text-blue-500/70">## GitHub Stats</div>
                <div className="text-muted-foreground/60">![Stats](github-stats...)</div>
                <div className="text-blue-500/70">## Skills</div>
                <div className="text-green-600/70 dark:text-green-400/50">![TypeScript] ![Rust] ...</div>
              </div>
            </motion.div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[12%] left-[5%] bg-white dark:bg-[#0e0e18]/90 backdrop-blur border border-black/8 dark:border-white/10 rounded-xl p-4 shadow-lg dark:shadow-xl z-20"
            >
              <div className="text-primary font-bold text-xs mb-1">Live Preview</div>
              <div className="text-foreground font-bold text-sm">See changes instantly</div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[12%] right-[2%] bg-white dark:bg-[#0e0e18]/90 backdrop-blur border border-black/8 dark:border-white/10 rounded-xl p-4 shadow-lg dark:shadow-xl z-20 w-44"
            >
              <div className="text-xs text-muted-foreground mb-1">Top Language</div>
              <div className="text-foreground font-bold text-base mb-2">TypeScript</div>
              <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ['0%', '68%', '68%'] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  className="h-full bg-[#3178c6] rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 8, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-[50%] right-[-4%] bg-primary/10 border border-primary/30 backdrop-blur rounded-xl px-3 py-2 z-20"
            >
              <div className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-mono">4 themes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div variants={fadeUpStagger} className="flex flex-col items-start space-y-6">
            <motion.div variants={fadeUp}>
              <span className="text-xs text-primary font-bold tracking-widest uppercase">Built for developers</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Create your README<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">in minutes, not hours.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Profilo integrates with popular open-source statistics APIs to display live commit graphs, profile views, and top languages — without any backend setup.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
              <Link href="/builder">
                <Button className="bg-primary text-black hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-[0_0_30px_rgba(75,134,247,0.35)] hover:shadow-[0_0_50px_rgba(75,134,247,0.55)] hover:scale-105 transition-all duration-300">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works →</Link>
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
            <p className="text-muted-foreground text-base max-w-xl mx-auto">Three simple steps to craft a standout GitHub profile README — no code required.</p>
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
                className="group relative bg-white dark:bg-[#0e0e18] border border-black/8 dark:border-white/5 hover:border-primary/30 p-8 rounded-2xl flex flex-col items-center text-center transition-colors duration-300 cursor-default shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {s.icon}
                </div>
                <div className="absolute top-6 right-6 text-[10px] text-foreground/30 font-mono font-bold">{s.n}</div>
                <h3 className="relative z-10 text-lg font-bold mb-3 text-foreground">{s.title}</h3>
                <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            FEATURES BENTO GRID
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Everything included</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Everything you need</h2>
            <p className="text-muted-foreground text-base max-w-xl">Profilo comes packed with dynamic blocks to show off your developer journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Big card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-[#0e0e18] border border-black/8 dark:border-white/5 hover:border-primary/20 p-7 rounded-2xl col-span-1 lg:col-span-2 row-span-2 transition-colors duration-300 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Real-time GitHub Stats</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Showcase commits, stars, PRs, and top languages pulling directly from GitHub APIs. Always up-to-date, always accurate.</p>
              <div className="w-full rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#0d1117] p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-xs font-bold text-white">G</div>
                  <div>
                    <div className="text-xs font-bold text-foreground">GitHub Stats</div>
                    <div className="text-[10px] text-muted-foreground">Connected · Live</div>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[['Stars','423'],['Commits','1,847'],['PRs','94']].map(([l,v]) => (
                    <div key={l} className="bg-black/5 dark:bg-white/5 rounded-lg p-2 text-center">
                      <div className="text-xs font-bold text-foreground">{v}</div>
                      <div className="text-[9px] text-muted-foreground">{l}</div>
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
                className="group bg-white dark:bg-[#0e0e18] shadow-sm border border-black/8 dark:border-white/5 hover:border-primary/20 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  {c.icon}
                </div>
                <h3 className="relative z-10 font-bold mb-2 text-foreground">{c.title}</h3>
                <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-[#0e0e18] shadow-sm border border-black/8 dark:border-white/5 hover:border-primary/20 p-6 rounded-2xl lg:col-span-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-foreground">Animated Elements</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Add typing SVGs, profile view counters, activity graphs, and streak stats — without wrestling with complex markdown syntax.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Questions</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q:'Is Profilo completely free?', a:'Yes! Profilo is a 100% free, open-source tool built for the developer community. There are no paid tiers and no hidden features.' },
              { q:'Do I need to sign in with GitHub?', a:"Nope! We don't require OAuth permissions. Profilo relies on your public GitHub username to generate URLs for open-source stat APIs (like anuraghazra/github-readme-stats)." },
              { q:'Where is my profile data saved?', a:"Your in-progress profile is saved locally in your browser's local storage. We have no backend database, meaning your data never leaves your computer until you push the Markdown to GitHub." },
              { q:'Can I use my own theme colors?', a:'Absolutely. Beyond the built-in themes, individual blocks like GitHub Stats and Activity Graphs support fully custom hex color inputs for maximum personalization.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="group bg-white dark:bg-[#0e0e18] shadow-sm border border-black/8 dark:border-white/5 hover:border-primary/20 p-6 rounded-2xl transition-all duration-300 cursor-default"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h3 className="font-bold mb-2 text-primary">{f.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <Section className="py-32 mb-12">
          <motion.div
            variants={fadeUp}
            className="relative text-center bg-gradient-to-b from-primary/8 dark:from-primary/10 to-transparent border border-primary/20 dark:border-primary/15 rounded-[3rem] overflow-hidden p-20"
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
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
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
