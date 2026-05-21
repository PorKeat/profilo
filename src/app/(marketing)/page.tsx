'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, Sparkles, Code2, Database, Cpu, Lock, Layers } from 'lucide-react';
import { Github } from "@/components/icons/Github";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Floating 3D Card component for background
const FloatingCard = ({ delay = 0, duration = 10, src, alt, className }: any) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, rotateX: 20, rotateY: -20 }}
      animate={{ 
        y: [-20, 20, -20],
        opacity: 0.6,
        rotateX: [20, 30, 20],
        rotateY: [-20, -10, -20]
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotateX: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut", delay },
        rotateY: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 1, delay }
      }}
      className={`absolute shadow-2xl rounded-xl overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-md ${className}`}
      style={{ perspective: 1000 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen selection:bg-primary/30 text-white overflow-hidden relative" ref={containerRef}>
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

      {/* Floating 3D Cards Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <motion.div style={{ y: y1 }} className="w-full h-full relative">
            {/* These would normally be real preview images of templates, using placeholders representing tech/code */}
            <FloatingCard 
              delay={0} duration={8} 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" 
              alt="Code snippet" 
              className="w-64 h-80 top-[15%] left-[5%] -z-10" 
            />
            <FloatingCard 
              delay={2} duration={12} 
              src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop" 
              alt="Github graph" 
              className="w-80 h-48 top-[60%] left-[10%] -z-10" 
            />
         </motion.div>
         <motion.div style={{ y: y2 }} className="w-full h-full relative absolute inset-0">
            <FloatingCard 
              delay={1} duration={9} 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop" 
              alt="Matrix code" 
              className="w-72 h-96 top-[20%] right-[5%] -z-10" 
            />
            <FloatingCard 
              delay={3} duration={10} 
              src="https://images.unsplash.com/photo-1607706189992-aaf578faa8eb?q=80&w=600&auto=format&fit=crop" 
              alt="Server rack" 
              className="w-56 h-56 top-[70%] right-[15%] -z-10" 
            />
         </motion.div>
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity }}
        className="w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold bg-background/50 backdrop-blur-xl text-primary mb-8 shadow-[0_0_15px_rgba(255,0,60,0.3)]"
        >
          <Sparkles className="w-3 h-3 mr-2" />
          100% Free, Open Source, No Login Required
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl mb-6 leading-tight"
        >
          Craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-yellow-500">Developer Identity</span> in minutes.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12"
        >
          Drag-and-drop beautiful blocks, see live previews, and export pure markdown. The ultimate GitHub Profile builder.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 relative z-20"
        >
          <Link href="/builder">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg shadow-[0_0_30px_rgba(255,0,60,0.5)] hover:shadow-[0_0_40px_rgba(255,0,60,0.7)] transition-all">
              Start Building
            </Button>
          </Link>
          <Link href="/templates">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-lg bg-background/20 backdrop-blur-md border-primary/50 hover:bg-primary/10">
              <LayoutTemplate className="w-5 h-5 mr-2" />
              Explore Templates
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* The "Why Profilo" Section with 3D Glassmorphism Cards */}
      <section className="w-full py-32 px-4 relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">Why Profilo?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We stripped away the friction. No databases, no paid tiers, just a pure, client-side markdown generation engine.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Lock className="w-10 h-10 text-blue-400" />}
              title="Zero Authentication"
              description="No sign-ups, no OAuth, no giving away your data. Jump straight into the builder and start creating instantly."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Database className="w-10 h-10 text-primary" />}
              title="No Backend"
              description="Everything runs in your browser. State is saved locally, and markdown is generated on the fly. Blazing fast."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Code2 className="w-10 h-10 text-green-400" />}
              title="Pure Markdown"
              description="No proprietary formats. You get exactly what you see: clean, beautifully formatted Markdown ready for GitHub."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Modern Developer Identity Section */}
      <section className="w-full py-32 px-4 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Build complex layouts <br/>with simple blocks.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              From typing animations to dynamic GitHub stats and snake games, Profilo abstracts away the complex markdown syntax. Just point, click, and customize.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-muted-foreground"><Cpu className="w-6 h-6 mr-3 text-primary" /> Integrated GitHub Stats & Graphs</li>
              <li className="flex items-center text-muted-foreground"><Layers className="w-6 h-6 mr-3 text-primary" /> Multi-theme Markdown Generation</li>
              <li className="flex items-center text-muted-foreground"><Github className="w-6 h-6 mr-3 text-primary" /> Direct integration with your Profile</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <div className="w-full h-[500px] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl border border-white/10 p-2 backdrop-blur-md shadow-2xl relative">
              <div className="absolute inset-0 bg-black/40 rounded-2xl backdrop-blur-xl" />
              {/* Mock Editor UI */}
              <div className="relative h-full flex flex-col z-10 border border-white/5 rounded-xl overflow-hidden">
                <div className="h-10 bg-white/5 flex items-center px-4 space-x-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 p-6 space-y-4">
                  <div className="h-24 w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30 flex items-center justify-center">
                     <span className="font-mono text-red-400">{'<WavingBanner text="DevOps Engineer" />'}</span>
                  </div>
                  <div className="h-32 w-3/4 bg-blue-500/10 rounded-lg border border-blue-500/20 p-4 font-mono text-sm text-blue-300">
                     {'## Technical Skills\n\n![Docker](...)\n![AWS](...)'}
                  </div>
                  <div className="flex gap-4">
                    <div className="h-40 flex-1 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center justify-center font-mono text-green-300">
                      {'<GitHubStats />'}
                    </div>
                    <div className="h-40 flex-1 bg-purple-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center font-mono text-purple-300">
                      {'<ActivityGraph />'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-32 px-4 relative z-10 text-center border-t border-white/10 bg-gradient-to-b from-transparent to-primary/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8">Ready to upgrade your profile?</h2>
          <Link href="/builder">
            <Button size="lg" className="h-14 px-12 text-lg shadow-[0_0_40px_rgba(255,0,60,0.4)] hover:shadow-[0_0_60px_rgba(255,0,60,0.6)]">
              Open the Builder
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors shadow-xl"
    >
      <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block border border-white/5">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
