'use client';

/* eslint-disable @next/next/no-img-element */

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  Braces,
  Cloud,
  CloudCog,
  DatabaseZap,
  GitBranch,
  MonitorSmartphone,
  Rocket,
  ScanSearch,
  ShieldCheck,
  ShipWheel,
  Terminal,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MagicCard } from '@/components/ui/MagicCard';
import Link from 'next/link';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15, delayChildren: delay } }
      }}
      className={`inline-flex flex-wrap ${className || ""}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

type TechLogo = {
  fallback?: React.ComponentType<{ className?: string }>;
  logo: string | { light: string; dark: string };
};

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const simpleIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const techIcons: Record<string, TechLogo> = {
  Kubernetes: { logo: devicon('kubernetes/kubernetes-plain.svg'), fallback: CloudCog },
  Docker: { logo: devicon('docker/docker-original.svg'), fallback: ShipWheel },
  Jenkins: { logo: devicon('jenkins/jenkins-original.svg'), fallback: Terminal },
  ArgoCD: { logo: simpleIcon('argo'), fallback: GitBranch },
  Ansible: { logo: devicon('ansible/ansible-original.svg'), fallback: Terminal },
  GCP: { logo: devicon('googlecloud/googlecloud-original.svg'), fallback: Cloud },
  Linux: { logo: devicon('linux/linux-original.svg'), fallback: Terminal },
  GitOps: { logo: devicon('git/git-original.svg'), fallback: GitBranch },
  Prometheus: { logo: devicon('prometheus/prometheus-original.svg'), fallback: ScanSearch },
  Grafana: { logo: devicon('grafana/grafana-original.svg'), fallback: ScanSearch },
  Thanos: { logo: simpleIcon('thanos'), fallback: Cloud },
  Loki: { logo: 'https://cdn.jsdelivr.net/gh/cncf/artwork/projects/loki/icon/color/loki-icon-color.svg', fallback: Terminal },
  Harbor: { logo: simpleIcon('harbor'), fallback: ShipWheel },
  Trivy: { logo: simpleIcon('trivy'), fallback: ShieldCheck },
  SonarQube: { logo: devicon('sonarqube/sonarqube-original.svg'), fallback: ScanSearch },
  Nexus: { logo: simpleIcon('sonatype'), fallback: DatabaseZap },
  DefectDojo: { logo: 'https://raw.githubusercontent.com/DefectDojo/django-DefectDojo/master/static/dojo/img/logo.png', fallback: ScanSearch },
  Java: { logo: devicon('java/java-original.svg'), fallback: Braces },
  'Spring Boot': { logo: devicon('spring/spring-original.svg'), fallback: Braces },
  'Node.js': { logo: devicon('nodejs/nodejs-original.svg'), fallback: Braces },
  FastAPI: { logo: devicon('fastapi/fastapi-original.svg'), fallback: Braces },
  Flask: { logo: devicon('flask/flask-original.svg'), fallback: Braces },
  Django: { logo: devicon('django/django-plain.svg'), fallback: Braces },
  MongoDB: { logo: devicon('mongodb/mongodb-original.svg'), fallback: DatabaseZap },
  Oracle: { logo: devicon('oracle/oracle-original.svg'), fallback: DatabaseZap },
  MySQL: { logo: devicon('mysql/mysql-original.svg'), fallback: DatabaseZap },
  'SQL Server': { logo: devicon('microsoftsqlserver/microsoftsqlserver-plain.svg'), fallback: DatabaseZap },
  PostgreSQL: { logo: devicon('postgresql/postgresql-original.svg'), fallback: DatabaseZap },
  'React.js': { logo: devicon('react/react-original.svg'), fallback: MonitorSmartphone },
  'Next.js': { logo: devicon('nextjs/nextjs-original.svg'), fallback: MonitorSmartphone },
  'Vue.js': { logo: devicon('vuejs/vuejs-original.svg'), fallback: MonitorSmartphone },
  Angular: { logo: devicon('angularjs/angularjs-original.svg'), fallback: MonitorSmartphone },
  'Tailwind CSS': { logo: devicon('tailwindcss/tailwindcss-original.svg'), fallback: MonitorSmartphone },
  TypeScript: { logo: devicon('typescript/typescript-original.svg'), fallback: Braces },
  'Framer Motion': { logo: simpleIcon('framer'), fallback: MonitorSmartphone },
};

export default function AboutPage() {
  const cardBase = "relative bg-white/60 dark:bg-[#080810]/80 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl";
  const techStack = [
    {
      title: 'DevOps & Cloud',
      eyebrow: 'Infrastructure layer',
      icon: CloudCog,
      accent: 'from-sky-400 to-blue-500',
      glow: 'bg-sky-500/20',
      line: 'border-sky-400/30',
      description: 'Automation, delivery pipelines, runtime platforms, and production operations.',
      items: ['Kubernetes', 'Docker', 'Jenkins', 'ArgoCD', 'Ansible', 'GCP', 'Linux', 'GitOps', 'Prometheus', 'Grafana', 'Thanos', 'Loki', 'Harbor', 'Trivy', 'SonarQube', 'Nexus', 'DefectDojo'],
    },
    {
      title: 'Backend & Data',
      eyebrow: 'Service layer',
      icon: DatabaseZap,
      accent: 'from-emerald-300 to-cyan-400',
      glow: 'bg-emerald-400/15',
      line: 'border-emerald-300/30',
      description: 'Reliable APIs, backend frameworks, service logic, and production-ready databases.',
      items: ['Java', 'Spring Boot', 'Node.js', 'FastAPI', 'Flask', 'Django', 'MongoDB', 'Oracle', 'MySQL', 'SQL Server', 'PostgreSQL'],
    },
    {
      title: 'Frontend & UI',
      eyebrow: 'Experience layer',
      icon: MonitorSmartphone,
      accent: 'from-violet-300 to-fuchsia-400',
      glow: 'bg-violet-400/15',
      line: 'border-violet-300/30',
      description: 'Fast interfaces, polished interactions, accessible layouts, and visual systems.',
      items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    },
  ];

  return (
    <div className="pb-20">
      <MarketingPageShell className="max-w-6xl">
        <div className="w-full flex flex-col gap-24 md:gap-32">
          <motion.div initial="hidden" animate="show" variants={stagger} className="text-center mt-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div variants={fadeUp} className="relative inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(75,134,247,0.8)]" />
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">The Story</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-foreground">About </span>
              <TypewriterText text="Us." className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400" delay={0.2} />
            </motion.h1>
          </motion.div>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={stagger}
            className="w-full relative py-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 max-w-5xl mx-auto px-4">
              
              {/* Unique Image Shape */}
              <motion.div variants={fadeUp} className="relative shrink-0 group z-10 order-1 md:order-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-tr-[6rem] rounded-bl-[6rem] rounded-tl-2xl rounded-br-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-52 h-64 md:w-64 md:h-[22rem] rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[1.5rem] rounded-br-[1.5rem] p-1.5 bg-gradient-to-tr from-white/20 to-white/5 border border-white/20 shadow-2xl overflow-hidden backdrop-blur-md">
                  <div className="relative w-full h-full rounded-tr-[4.5rem] rounded-bl-[4.5rem] rounded-tl-xl rounded-br-xl overflow-hidden bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                    <Image
                      src="/images/me.jpg"
                      alt="Seng Porkeat"
                      fill
                      unoptimized
                      className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out relative z-0"
                    />
                  </div>
                </div>
                
                {/* Floating Tech Badges */}
                <div className="absolute -left-6 bottom-12 bg-background/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(75,134,247,0.3)] rounded-2xl p-3 flex flex-col gap-4 group-hover:-translate-x-3 group-hover:-translate-y-2 transition-transform duration-500 z-20">
                  <Terminal className="w-5 h-5 text-primary" />
                  <Cloud className="w-5 h-5 text-blue-500" />
                </div>
              </motion.div>

              {/* Minimal Text Content */}
              <motion.div variants={fadeUp} className="flex flex-col items-start max-w-lg z-10 order-2 md:order-1">
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mb-6" />
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter mb-6 text-foreground leading-[1.1]">
                  Built by <br className="hidden md:block" />
                  <TypewriterText text="Seng Porkeat." className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500" delay={0.4} />
                </h2>
                
                <p className="text-foreground/70 leading-relaxed text-base md:text-lg mb-8">
                  I'm a DevOps Engineer who got tired of manually writing Markdown to make my GitHub look good. <strong className="text-foreground font-semibold">Profilo</strong> is my solution to frictionless developer branding — no backends, no logins, just pure creative utility.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/contact">
                    <button className="h-12 px-6 rounded-full bg-foreground text-background font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg">
                      Contact Me
                    </button>
                  </Link>
                  <Link href="https://github.com/PorKeat" target="_blank" rel="noopener noreferrer">
                    <button className="h-12 px-6 rounded-full border border-black/10 dark:border-white/10 text-foreground font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Follow
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={stagger}
            className="w-full relative py-20"
          >
            <div className="text-center mb-16 relative z-10">
              <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(75,134,247,0.75)] animate-pulse" />
                The Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight"><TypewriterText text="Core Priorities" delay={0.2} /></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 relative z-10">
              <motion.div variants={fadeUp} className={`${cardBase} md:col-span-2 p-10 flex flex-col justify-between group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground tracking-tight">Zero Friction. Free Forever.</h3>
                  <p className="text-foreground/70 leading-relaxed max-w-md text-lg">
                    Profilo is designed with a strict focus on developer experience. No backends, no account logins, just pure utility and creative freedom. Open the browser and build.
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className={`${cardBase} p-10 flex flex-col justify-center items-center text-center group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-6xl font-extrabold tracking-tighter text-foreground mb-4">100%</span>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Open Source</span>
              </motion.div>
              
              <motion.div variants={fadeUp} className={`${cardBase} p-10 flex flex-col justify-center items-center text-center group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-6xl font-extrabold tracking-tighter text-foreground mb-4">∞</span>
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Exports</span>
              </motion.div>
              
              <motion.div variants={fadeUp} className={`${cardBase} md:col-span-2 p-10 flex flex-col md:flex-row justify-between items-center gap-8 group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">No Auth / Database</h3>
                  </div>
                  <p className="text-foreground/70 leading-relaxed text-lg">
                    Everything runs locally in your browser. Your data stays with you. We don't track your profiles or require you to sign in to export your code.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={stagger}
            className="relative z-10"
          >
            <motion.div variants={fadeUp} className="text-center relative">
              <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px] pointer-events-none" />
              <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(75,134,247,0.75)]" />
                Capability Map
              </span>
              <h2 className="relative text-3xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight"><TypewriterText text="My Tech Stack" delay={0.2} /></h2>
              <p className="relative text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                The tools and technologies I use to build scalable cloud-native infrastructure, robust backend microservices, and seamless frontend experiences.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid gap-5 md:grid-cols-3">
              {techStack.map((category) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    key={category.title}
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/88 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] transition-colors duration-300 hover:border-primary/25 dark:border-white/10 dark:bg-[#070b16]/78 dark:shadow-2xl dark:hover:bg-[#0b1222]/82"
                  >
                    <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/45">{category.eyebrow}</p>
                    <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{category.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-foreground/70 dark:text-foreground/62">{category.description}</p>

                    <div className="mt-7 grid grid-cols-4 gap-2.5 sm:grid-cols-5 md:grid-cols-4">
                      {category.items.map((tech) => (
                        <TechIcon key={tech} name={tech} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={fadeUp}
          >
            <MagicCard className="relative text-center bg-white/80 dark:bg-black/60 backdrop-blur-3xl border border-primary/20 dark:border-primary/15 rounded-[2rem] md:rounded-[3rem] overflow-hidden p-8 md:p-16 lg:p-20 shadow-2xl mt-10">
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

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-primary mb-6 tracking-widest uppercase flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" /> Try It Now
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-10 text-foreground tracking-tight max-w-3xl mx-auto">
                  Ready To Build Your Perfect GitHub Profile?
                </h2>
                <Link href="/builder">
                  <Button className="bg-primary text-black hover:bg-primary/80 transition-all duration-300 font-bold px-12 h-14 text-base rounded-full shadow-[0_0_40px_rgba(75,134,247,0.35)] hover:shadow-[0_0_60px_rgba(75,134,247,0.55)] hover:scale-105">
                    Get Started <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </MarketingPageShell>
    </div>
  );
}

function TechIcon({ name }: { name: string }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const icon = techIcons[name];
  const FallbackIcon = icon?.fallback;
  const logo = icon?.logo;
  const lightLogo = typeof logo === 'string' ? logo : logo?.light;
  const darkLogo = typeof logo === 'string' ? logo : logo?.dark;
  const showLogo = lightLogo && !logoFailed;

  return (
    <HoverCard>
      <HoverCardTrigger
        aria-label={name}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white dark:border-white/15 dark:bg-white/70 dark:hover:bg-white/85"
      >
        {showLogo ? (
          <>
            <img
              src={lightLogo}
              alt=""
              loading="lazy"
              className={`h-6 w-6 object-contain ${darkLogo && darkLogo !== lightLogo ? 'dark:hidden' : ''}`}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                setLogoFailed(true);
              }}
            />
            {darkLogo && darkLogo !== lightLogo ? (
              <img
                src={darkLogo}
                alt=""
                loading="lazy"
                className="hidden h-6 w-6 object-contain dark:block"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                  setLogoFailed(true);
                }}
              />
            ) : null}
          </>
        ) : FallbackIcon ? (
          <FallbackIcon className="h-5 w-5" />
        ) : (
          <Braces className="h-5 w-5" />
        )}
        <span className="sr-only">{name}</span>
      </HoverCardTrigger>
      <HoverCardContent side="top" sideOffset={8} className="w-auto rounded-full border border-black/10 bg-background/95 px-3 py-1.5 text-xs font-bold shadow-xl backdrop-blur-xl dark:border-white/10">
        {name}
      </HoverCardContent>
    </HoverCard>
  );
}
