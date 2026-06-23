'use client';

import { motion } from 'framer-motion';

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
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-primary/30 pb-20">
      
      {/* ── Top Header Section ── */}
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            About Us
          </motion.h1>
          <motion.div variants={fadeUp} className="text-white/50 text-sm font-medium tracking-wide flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </motion.div>
        </motion.div>
      </section>

      <MarketingPageShell className="max-w-6xl mt-0">
        <motion.div variants={stagger} initial="hidden" animate="show" className="w-full flex flex-col gap-24 md:gap-32">
          
          {/* ── First Section: Image Left, Text Right ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#111] group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src="https://github.com/PorKeat.png"
                alt="Seng Porkeat"
                fill
                unoptimized
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-start">
              <span className="text-sm font-bold text-white/60 mb-3 tracking-wide">About The Creator</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
                Building Better<br />GitHub Profiles
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-lg">
                Hi, I&apos;m Seng Porkeat. As a DevOps engineer and cloud automation enthusiast, I realized developers spend too much time wrestling with Markdown just to make a decent GitHub profile. Profilo was built to change that — making it frictionless to present your work beautifully.
              </p>
              
              <Link href="/contact">
                <button className="h-12 px-8 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-300">
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </section>

          {/* ── Second Section: Skills Left, Stats Right ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            
            <motion.div variants={fadeUp} className="flex flex-col">
              <h2 className="text-3xl font-bold mb-4">Core Priorities</h2>
              <p className="text-white/60 leading-relaxed mb-10 max-w-md">
                Profilo is designed with a strict focus on developer experience. No backends, no logins, just pure utility and creative freedom.
              </p>

              <div className="space-y-8">
                {[
                  { label: "Open Source Focus", value: "100%" },
                  { label: "No Auth / No Database", value: "100%" },
                  { label: "Ease of Use", value: "95%" },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm font-bold mb-3">
                      <span>{skill.label}</span>
                      <span>{skill.value}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/10 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="absolute top-0 left-0 h-full bg-white" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-16 gap-x-8 lg:pl-10">
              {[
                { number: "100%", label: "Free Forever" },
                { number: "0", label: "Account Logins" },
                { number: "Infinite", label: "Markdown Exports" },
                { number: "24/7", label: "Browser Based" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-5xl font-bold mb-3 tracking-tight">{stat.number}</span>
                  <span className="text-sm font-medium text-white/50">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ── Third Section: CTA Banner ── */}
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden py-32 px-6 flex flex-col items-center justify-center text-center mt-10">
            {/* Background image placeholder - using a dark gradient and grid */}
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
            
            <div className="relative z-10 flex flex-col items-center max-w-3xl">
              <span className="text-sm font-bold text-white/70 mb-4 tracking-widest uppercase">Try It Now</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-10">
                Ready To Build Your Perfect GitHub Profile?
              </h2>
              <Link href="/builder">
                <button className="h-14 px-10 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  Get Started
                </button>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </MarketingPageShell>
    </div>
  );
}
