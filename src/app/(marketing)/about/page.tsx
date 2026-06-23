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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Us.</span>
            </motion.h1>
          </motion.div>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div
              variants={fadeUp}
              className="relative w-full max-w-[28rem] mx-auto group"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-blue-600/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-700" />
                <div className={`${cardBase} relative overflow-hidden p-4 rounded-[2rem]`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 z-0 pointer-events-none" />
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 z-10 bg-black/20">
                    <Image
                      src="/images/me.jpg"
                      alt="Seng Porkeat"
                      fill
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-start relative z-10">
              <span className="text-xs font-bold text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                About The Creator
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] mb-6 text-foreground tracking-tight">
                Building Better<br />GitHub Profiles
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-8 max-w-lg text-lg">
                Hi, I&apos;m Seng Porkeat. I am a passionate DevOps Engineer and Software Engineering student focused on building scalable, secure, and cloud-native systems. I realized developers spend too much time wrestling with Markdown just to make a decent GitHub profile, so I built Profilo to change that — making it frictionless to present your work beautifully.
              </p>

              <Link href="/contact">
                <button className="h-14 px-8 rounded-full bg-primary text-black font-extrabold text-base hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(75,134,247,0.3)] hover:shadow-[0_0_40px_rgba(75,134,247,0.5)]">
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20"
          >
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold mb-4 text-foreground tracking-tight">Core Priorities</h2>
              <p className="text-foreground/80 leading-relaxed mb-10 max-w-md">
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
                        viewport={{ once: false, margin: "-40px" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
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
              <h2 className="relative text-3xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">My Tech Stack</h2>
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
