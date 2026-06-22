'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Shield, Layers, Code2, GitBranch, Sparkles, Terminal, ChevronDown } from 'lucide-react';
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

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.07] text-foreground">
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
                className={`relative group p-10 ${c.featured ? 'bg-primary/90 backdrop-blur-md text-white shadow-xl shadow-primary/20' : 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl shadow-sm'} overflow-hidden cursor-default`}
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
        <Section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-black/5 dark:border-white/5">

          {/* Left — 3D floating cards */}
          <motion.div variants={fadeIn} className="relative h-[420px] flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] -z-10" />

            {/* Main card */}
            <motion.div
              initial={{ rotateX: 8, rotateY: 12 }}
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className="relative z-10 bg-white/90 dark:bg-[#0d1117]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl p-7 w-80 shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground/80 dark:text-foreground/70 font-mono">profilo_output.md</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="text-primary/70"># Hi there 👋</div>
                <div className="text-foreground/80 dark:text-foreground/70">![Typing SVG](...)</div>
                <div className="text-blue-500/70">## GitHub Stats</div>
                <div className="text-foreground/80 dark:text-foreground/70/60">![Stats](github-stats...)</div>
                <div className="text-blue-500/70">## Skills</div>
                <div className="text-green-600/70 dark:text-green-400/50">![TypeScript] ![Rust] ...</div>
              </div>
            </motion.div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[8%] left-[2%] bg-white/95 dark:bg-[#1a1f2e]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4.5 shadow-2xl z-20"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-primary font-bold text-xs uppercase tracking-wider">Live Preview</div>
              </div>
              <div className="text-foreground font-extrabold text-sm">See changes instantly</div>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[8%] right-[0%] bg-white/95 dark:bg-[#1a1f2e]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-20 w-48"
            >
              <div className="text-[11px] font-bold text-foreground/60 dark:text-foreground/50 uppercase tracking-widest mb-1">Top Language</div>
              <div className="text-foreground font-black text-lg mb-3">TypeScript</div>
              <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  animate={{ width: ['0%', '68%', '68%'] }}
                  transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
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
          <motion.div variants={fadeUpStagger} className="flex flex-col items-start space-y-6 relative z-10 p-2 md:p-6">
            {/* Added Glassmorphism Backdrop for Readability */}
            <div className="absolute -inset-4 md:-inset-8 bg-white/80 dark:bg-black/60 backdrop-blur-2xl rounded-[2.5rem] -z-10 border border-black/5 dark:border-white/5 shadow-2xl" />
            
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-2">
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Built for developers</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.05]">
              Create your README<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">in minutes, not hours.</span>
            </motion.h2>
            
            <motion.div variants={fadeUp} className="flex items-center gap-3 bg-black/5 dark:bg-white/5 py-2 px-4 rounded-full w-fit">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
              </div>
              <span className="text-[11px] font-bold text-foreground/80">Loved by 10k+ devs</span>
            </motion.div>
            
            <motion.p variants={fadeUp} className="text-base text-foreground/90 dark:text-foreground/80 leading-relaxed max-w-lg">
              Profilo integrates with popular open-source statistics APIs to display live commit graphs, profile views, and top languages — completely client-side without any backend setup.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-[0_0_30px_rgba(75,134,247,0.35)] hover:shadow-[0_0_50px_rgba(75,134,247,0.55)] hover:scale-105 transition-all duration-300">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sm font-bold text-foreground transition-colors border border-black/5 dark:border-white/5">
                How it works <ArrowRight className="w-4 h-4" />
              </Link>
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
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-xs text-primary font-bold tracking-widest uppercase mb-4 block">Everything included</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Everything you need</h2>
            <p className="text-foreground/80 dark:text-foreground/70 text-base max-w-xl">Profilo comes packed with dynamic blocks to show off your developer journey.</p>
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
            FAQ
        ══════════════════════════════════════════ */}
        <Section className="py-32 border-t border-black/5 dark:border-white/5">
          <motion.div variants={fadeUp} className="text-center mb-16 flex flex-col items-center">
            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3 mb-6 shadow-sm">
              <span className="text-foreground/40 text-[10px] font-mono font-bold tracking-wider">04</span>
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
              <span className="text-foreground/80 text-[10px] font-bold tracking-widest uppercase">FAQS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
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
