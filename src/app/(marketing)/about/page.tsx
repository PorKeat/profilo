'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  const cardBase = "relative bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl";

  return (
    <div className="pb-20">
      
      {/* ── Top Header Section ── */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
            About Us
          </motion.h1>
          <motion.div variants={fadeUp} className="text-foreground/50 text-sm font-bold tracking-wide flex items-center justify-center gap-2 uppercase">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-primary/50">/</span>
            <span className="text-foreground">About</span>
          </motion.div>
        </motion.div>
      </section>

      <MarketingPageShell className="max-w-6xl mt-0">
        <motion.div variants={stagger} initial="hidden" animate="show" className="w-full flex flex-col gap-24 md:gap-32">
          
          {/* ── First Section: Image Left, Text Right ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Avatar Container */}
            <motion.div variants={fadeUp} className="relative w-full max-w-[28rem] mx-auto aspect-square group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-blue-600/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-700" />
              <div className={`${cardBase} absolute inset-0 overflow-hidden p-4 rounded-[2rem]`}>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 z-0" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 z-10">
                  <Image
                    src="https://github.com/PorKeat.png"
                    alt="Seng Porkeat"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-start relative z-10">
              <span className="text-xs font-bold text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                About The Creator
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6 text-foreground tracking-tight">
                Building Better<br />GitHub Profiles
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-8 max-w-lg text-lg">
                Hi, I&apos;m Seng Porkeat. As a DevOps engineer and cloud automation enthusiast, I realized developers spend too much time wrestling with Markdown just to make a decent GitHub profile. Profilo was built to change that — making it frictionless to present your work beautifully.
              </p>
              
              <Link href="/contact">
                <button className="h-14 px-8 rounded-full bg-primary text-black font-extrabold text-base hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(75,134,247,0.3)] hover:shadow-[0_0_40px_rgba(75,134,247,0.5)]">
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </section>

          {/* ── Second Section: Skills Left, Stats Right ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold mb-4 text-foreground tracking-tight">Core Priorities</h2>
              <p className="text-foreground/70 leading-relaxed mb-10 max-w-md">
                Profilo is designed with a strict focus on developer experience. No backends, no logins, just pure utility and creative freedom.
              </p>

              <div className="space-y-8">
                {[
                  { label: "Open Source Focus", value: "100%" },
                  { label: "No Auth / Database", value: "100%" },
                  { label: "Ease of Use", value: "95%" },
                ].map((skill) => (
                  <div key={skill.label} className="group">
                    <div className="flex justify-between text-sm font-bold mb-3 text-foreground/80 group-hover:text-primary transition-colors">
                      <span className="uppercase tracking-widest text-[11px]">{skill.label}</span>
                      <span>{skill.value}</span>
                    </div>
                    <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative border border-black/5 dark:border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-5">
              {[
                { number: "100%", label: "Free Forever" },
                { number: "0", label: "Account Logins" },
                { number: "Infinite", label: "Markdown Exports" },
                { number: "24/7", label: "Browser Based" },
              ].map((stat) => (
                <div key={stat.label} className={`${cardBase} p-8 flex flex-col items-center text-center justify-center group hover:border-primary/30 hover:-translate-y-1 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 rounded-3xl" />
                  <span className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-foreground relative z-10">{stat.number}</span>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest relative z-10">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ── Third Section: CTA Banner ── */}
          <motion.div variants={fadeUp} className={`${cardBase} relative overflow-hidden py-32 px-6 flex flex-col items-center justify-center text-center mt-10 group`}>
            {/* Background effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
            
            <div className="relative z-10 flex flex-col items-center max-w-3xl">
              <span className="text-xs font-bold text-primary mb-6 tracking-widest uppercase flex items-center gap-2">
                <Rocket className="w-4 h-4" /> Try It Now
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-10 text-foreground tracking-tight">
                Ready To Build Your Perfect GitHub Profile?
              </h2>
              <Link href="/builder">
                <button className="h-16 px-10 rounded-2xl bg-primary text-black font-extrabold text-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(75,134,247,0.3)] hover:shadow-[0_0_50px_rgba(75,134,247,0.5)] flex items-center gap-3">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </MarketingPageShell>
    </div>
  );
}
