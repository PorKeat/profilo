/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[#0a0a0a] min-h-screen text-white overflow-hidden relative font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Massive Watermark */}
      <div className="absolute top-[10%] right-[-5%] text-[250px] font-black text-white/[0.02] tracking-tighter z-0 pointer-events-none select-none">
        CODE
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        
        {/* ================= HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start space-y-6"
          >
            <div className="text-primary font-bold tracking-widest text-sm uppercase">
              BUILD YOUR IDENTITY FAST <span className="text-white">!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Best GitHub <br />
              <span className="text-primary">profile building platform</span> <br />
              <span className="text-white/60">for your future.</span>
            </h1>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=4" alt="User 4" />
                <img className="w-10 h-10 rounded-full border-2 border-black" src="https://i.pravatar.cc/100?img=5" alt="User 5" />
              </div>
              <div>
                <div className="font-bold text-lg">168K+</div>
                <div className="text-xs text-white/50">Generated Profiles</div>
              </div>
            </div>

            <div className="flex items-start space-x-6 pt-10">
              <Link href="/builder">
                <button className="w-14 h-14 rounded-full border border-primary flex items-center justify-center group hover:bg-primary/10 transition-colors shrink-0">
                  <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                Drag-and-drop beautiful blocks, see live previews, and export pure markdown. The ultimate GitHub Profile builder.
              </p>
            </div>
          </motion.div>

          {/* Right Hero Visuals */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Glowing Spline Path */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 500 600">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 50 100 Q 150 200, 300 150 T 450 300 T 200 500 T 450 600" 
                fill="none" 
                stroke="#ff003c" 
                strokeWidth="2" 
                className="drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]"
              />
              <circle cx="50" cy="100" r="4" fill="#ff003c" />
              <circle cx="450" cy="600" r="4" fill="#ff003c" />
            </svg>

            {/* Floating Phone/Mockup 1 */}
            <motion.div 
              initial={{ y: 20, rotate: -5 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[10%] w-[260px] h-[480px] bg-[#161616] rounded-3xl border-4 border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 overflow-hidden"
            >
               {/* Mock UI inside */}
               <div className="w-full h-full flex flex-col items-center p-4">
                  <div className="w-1/2 h-1 bg-[#333] rounded-full mb-8" />
                  <div className="text-xs text-white/50 mb-2">Total Profile Views</div>
                  <div className="text-2xl font-bold mb-6">1,445,209</div>
                  
                  {/* Chart Mock */}
                  <svg className="w-full h-24 mb-6" viewBox="0 0 200 100">
                    <path d="M 0 80 Q 50 20, 100 60 T 200 30" fill="none" stroke="#ff003c" strokeWidth="2" />
                    <path d="M 0 80 Q 50 20, 100 60 T 200 30 L 200 100 L 0 100 Z" fill="rgba(255,0,60,0.1)" />
                  </svg>

                  <div className="w-full space-y-3">
                    <div className="h-10 w-full bg-[#222] rounded-lg flex justify-between items-center px-4">
                      <span className="text-xs">Followers</span>
                      <span className="text-xs font-bold text-primary">+120</span>
                    </div>
                    <div className="h-10 w-full bg-[#222] rounded-lg flex justify-between items-center px-4">
                      <span className="text-xs">Repositories</span>
                      <span className="text-xs font-bold text-primary">+3</span>
                    </div>
                  </div>
               </div>
            </motion.div>

            {/* Floating Phone/Mockup 2 */}
            <motion.div 
              initial={{ y: -20, rotate: 5 }}
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[30%] right-[5%] w-[240px] h-[450px] bg-[#161616] rounded-3xl border-4 border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden opacity-90"
            >
               <div className="w-full h-full flex flex-col p-6 space-y-4">
                 <div className="text-lg font-bold">Tech Stack</div>
                 <div className="flex gap-2">
                   <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30 text-primary text-xs font-bold">R</div>
                   <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-500 text-xs font-bold">TS</div>
                   <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center border border-green-500/30 text-green-500 text-xs font-bold">N</div>
                 </div>
                 <div className="flex-1" />
                 <div className="h-8 w-full rounded bg-primary flex items-center justify-center text-xs font-bold text-black">
                   Add Block
                 </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* ================= TRUSTED PARTNER SECTION ================= */}
        <section className="py-32 relative">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-end">
             <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
               Your <span className="text-primary">ultimate toolkit</span> <br />
               <span className="text-white/60">for GitHub READMEs.</span>
             </h2>
             <p className="text-white/50 text-sm max-w-sm ml-auto text-right">
               We stripped away the friction. No databases, no paid tiers, just a pure, client-side markdown generation engine.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222] rounded-2xl overflow-hidden bg-[#111]">
             {/* Card 1 */}
             <div className="p-10 border-b md:border-b-0 md:border-r border-[#222] relative group">
               <div className="text-primary font-bold text-xl mb-4">01.</div>
               <h3 className="text-xl font-bold mb-4">Drag & Drop <br /> Builder</h3>
               <p className="text-sm text-white/50">Easily reorder your README sections with a smooth drag and drop interface.</p>
             </div>
             
             {/* Card 2 (Highlighted) */}
             <div className="p-10 bg-primary text-black transform scale-[1.05] rounded-xl shadow-[0_0_40px_rgba(255,0,60,0.3)] z-10 relative">
               <div className="font-bold text-xl mb-4">02.</div>
               <h3 className="text-2xl font-black mb-4 leading-tight">Premium <br /> Templates.</h3>
               <p className="text-sm font-medium mb-8">Start with a pre-built layout tailored to your exact role and tech stack.</p>
               <Link href="/templates" className="font-bold flex items-center group-hover:underline">
                 Explore Templates <ArrowRight className="w-4 h-4 ml-1 inline" />
               </Link>
             </div>

             {/* Card 3 */}
             <div className="p-10 border-t md:border-t-0 md:border-l border-[#222]">
               <div className="text-primary font-bold text-xl mb-4">03.</div>
               <h3 className="text-xl font-bold mb-4">Pure <br /> Markdown.</h3>
               <p className="text-sm text-white/50">No proprietary formats. You get exactly what you see: clean, formatted Markdown.</p>
             </div>
           </div>
        </section>

        {/* ================= PLATFORM ANYWHERE SECTION ================= */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-[#222]">
          
          {/* Left Visuals (Graph & Floating elements) */}
          <div className="relative h-[400px] w-full flex items-center justify-center">
            {/* Background graph line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 400">
              <path d="M 0 200 L 100 150 L 200 300 L 300 250 L 400 100 L 500 350 L 600 200" fill="none" stroke="#ff003c" strokeWidth="2" className="opacity-50" />
              <circle cx="100" cy="150" r="4" fill="#ff003c" />
              <circle cx="200" cy="300" r="4" fill="#ff003c" />
              <circle cx="400" cy="100" r="4" fill="#ff003c" />
            </svg>

            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] bg-[#1a1a1a] p-4 rounded-xl border border-[#333] shadow-lg"
            >
              <div className="text-primary font-bold text-xs mb-1">Total Commits</div>
              <div className="text-white font-bold text-xl">4,528</div>
            </motion.div>

            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] right-[10%] bg-[#1a1a1a] p-4 rounded-xl border border-[#333] shadow-lg w-48"
            >
              <div className="text-xs text-white/50 mb-1">Top Language</div>
              <div className="text-white font-bold text-lg mb-2">TypeScript</div>
              <div className="w-full h-2 bg-[#333] rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%]" />
              </div>
            </motion.div>
          </div>

          {/* Right Text */}
          <div className="flex flex-col items-start space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Dynamic stats <br />
              <span className="text-primary">anytime & anywhere.</span>
            </h2>
            
            <div className="flex text-white space-x-1">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Profilo integrates seamlessly with popular open-source statistics APIs to display live-updating commit graphs, profile views, and top languages directly on your GitHub profile without any backend setup.
            </p>

            <div className="flex items-center space-x-6 pt-6">
              <Link href="/builder">
                <Button className="bg-primary text-black hover:bg-primary/90 font-bold px-8 h-12 rounded-full">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">
                How it works?
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
