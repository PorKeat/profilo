'use client';

import { useAppDispatch } from '@/store/hooks';
import { addBlock, removeBlock } from '@/store/builderSlice';
import { BlockType, Block } from '@/lib/types/blocks';
import { v4 as uuidv4 } from 'uuid';
import { buttonVariants } from '@/components/ui/button';
import { User, Info, Code2, FolderGit2, Share2, Mail, LayoutTemplate, Image, Type, Activity, PlaySquare, Gamepad2, ChevronLeft, Sun, Moon, FileText, Trash2, Rss, Trophy, Music, Coffee, Briefcase, Quote } from 'lucide-react';
import { Github } from "@/components/icons/Github";
import { useAppSelector } from '@/store/hooks';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { generateMarkdown } from '@/lib/markdown/generator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.builder.themeId);
  const blocks = useAppSelector(state => state.builder.blocks);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const isDark = theme === 'dark';

  useEffect(() => { setMounted(true); }, []);

  const handleThemeToggle = async () => {
    if (isAnimating) return;
    if ('startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = btnRef.current?.getBoundingClientRect();
      const x = rect ? `${rect.left + rect.width / 2}px` : '50%';
      const y = rect ? `${rect.top  + rect.height / 2}px` : '50%';
      document.documentElement.style.setProperty('--ripple-x', x);
      document.documentElement.style.setProperty('--ripple-y', y);
      document.documentElement.classList.add('theme-transitioning');
      setIsAnimating(true);
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      // @ts-expect-error — startViewTransition not yet in TS lib
      const transition = document.startViewTransition(() => {
        setTheme(isDark ? 'light' : 'dark');
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsAnimating(false);
      });
    } else {
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type);
    dispatch(addBlock(newBlock));
  };

  const blockTypes = [
    { type: 'hero', label: 'Hero', icon: User },
    { type: 'banner', label: 'Waving Banner', icon: Image },
    { type: 'typing', label: 'Typing Animation', icon: Type },
    { type: 'about', label: 'About Me', icon: Info },
    { type: 'experience', label: 'Work Experience', icon: Briefcase },
    { type: 'skills', label: 'Technical Skills', icon: Code2 },
    { type: 'github-stats', label: 'GitHub Statistics', icon: Github },
    { type: 'activity-graph', label: 'Activity Graph', icon: Activity },
    { type: 'trophies', label: 'GitHub Trophies', icon: Trophy },
    { type: 'blog-posts', label: 'Latest Blog Posts', icon: Rss },
    { type: 'spotify', label: 'Currently Listening', icon: Music },
    { type: 'snake', label: 'Snake Animation', icon: PlaySquare },
    { type: 'pacman', label: 'Pacman Animation', icon: Gamepad2 },
    { type: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { type: 'quote', label: 'Quote of the Day', icon: Quote },
    { type: 'support', label: 'Support Me', icon: Coffee },
    { type: 'socials', label: 'Social Links', icon: Share2 },
    { type: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col h-full">
      {/* ── Top Bar ── */}
      <div className="p-4 border-b flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 group">
            <img src="/logo.png" alt="Profilo Logo" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              Profilo
            </span>
          </Link>
          
          {/* Theme toggle pill */}
          <button
            ref={btnRef}
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
            disabled={isAnimating}
            className="relative w-[3.25rem] h-6 rounded-full border border-border/60 bg-muted/50 hover:bg-muted flex items-center px-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Sun  className="absolute left-1.5 w-2.5 h-2.5 text-amber-400 opacity-60" />
            <Moon className="absolute right-1.5 w-2.5 h-2.5 text-blue-400 opacity-60" />
            <motion.div
              animate={{ x: mounted && isDark ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="w-5 h-5 rounded-full bg-background border border-border shadow-sm flex items-center justify-center z-10 relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && isDark ? (
                  <motion.span key="moon"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                  >
                    <Moon className="w-2.5 h-2.5 text-primary" />
                  </motion.span>
                ) : (
                  <motion.span key="sun"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                  >
                    <Sun className="w-2.5 h-2.5 text-amber-500" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </div>
        <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Website
        </Link>
      </div>

      <div className="p-4 border-b flex-1 overflow-y-auto">
        <h2 className="font-semibold mb-2 flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4" />
          Current Sections
        </h2>
        <div className="space-y-1 mb-8">
          {blocks.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No sections added yet.</p>
          ) : (
            blocks.map((block, i) => {
              const typeDef = blockTypes.find(t => t.type === block.type);
              const Icon = typeDef?.icon || FileText;
              return (
                <div 
                  key={block.id} 
                  className="group flex items-center justify-between text-xs p-2 rounded bg-muted/20 border border-muted-foreground/10 hover:border-border hover:bg-muted/40 transition-colors text-foreground cursor-pointer"
                  onClick={() => document.getElementById(`block-${block.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="opacity-40 font-mono text-[10px] w-4 shrink-0">{i + 1}.</span>
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{typeDef?.label || 'Section'}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeBlock(block.id));
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded transition-all shrink-0"
                    title="Remove section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <h2 className="font-semibold mb-2 flex items-center gap-2 text-sm">
          <LayoutTemplate className="w-4 h-4" />
          Add Section
        </h2>
        <p className="text-xs text-muted-foreground mb-3">Click to add a section to your README.</p>
        <div className="space-y-2">
          {blockTypes.map(({ type, label, icon: Icon }) => (
            <HoverCard key={type}>
              <HoverCardTrigger 
                className={buttonVariants({ variant: "outline", size: "sm" }) + " w-full justify-start text-left text-xs cursor-pointer"}
                onClick={() => handleAddBlock(type as BlockType)}
              >
                <Icon className="w-3 h-3 mr-2" />
                {label}
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start" className="w-[450px] p-0 overflow-hidden bg-background z-50">
                <div className="bg-muted/30 p-2 border-b text-xs font-medium text-muted-foreground flex items-center justify-between">
                  <span>Preview: {label}</span>
                  <span className="text-[10px] opacity-50">Click to add</span>
                </div>
                <div className="py-4 max-h-[350px] overflow-y-auto overflow-x-hidden flex justify-center">
                  <div className="prose prose-sm dark:prose-invert max-w-none transform scale-[0.75] origin-top w-[500px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {generateMarkdown([createDefaultBlock(type as BlockType)], currentTheme, true)}
                    </ReactMarkdown>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function createDefaultBlock(type: BlockType): Block {
  const id = uuidv4();
  switch (type) {
    case 'hero':
      return { id, type, data: { name: 'Your Name', title: 'Full Stack Developer', shortIntro: 'I build things for the web.', bannerStyle: 'none' } };
    case 'banner':
      return { id, type, data: { bannerType: 'waving', height: 250, text: 'Hello World', desc: 'Welcome to my profile', color: '0:0f172a,50:1e3a8a,100:4b86f7', fontColor: 'ffffff', section: 'header' } };
    case 'typing':
      return { id, type, data: { lines: ['Automating the Future', 'Building Scalable Infrastructure', 'Turning Coffee into Code'], color: '4b86f7', size: 24, center: true, vCenter: true } };
    case 'about':
      return { id, type, data: { paragraph: 'I am a passionate developer.', currentlyLearning: 'Next.js', currentlyWorkingOn: 'A cool open source project', askMeAbout: 'React and TypeScript' } };
    case 'skills':
      return { id, type, data: { skills: ['React', 'TypeScript', 'Node.js'], style: 'flat' } };
    case 'github-stats':
      return { id, type, data: { username: 'yourusername', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, showProfileViews: false, useCustomColors: false, theme: 'radical', customColors: { bg: '000000', title: '4b86f7', text: 'ffffff', icon: '4b86f7', border: '4b86f7' } } };
    case 'activity-graph':
      return { id, type, data: { username: 'yourusername', theme: 'radical', useCustomColors: false, customColors: { bg: '000000', color: '4b86f7', line: '4b86f7', point: 'ffffff' } } };
    case 'snake':
      return { id, type, data: { username: 'yourusername' } };
    case 'pacman':
      return { id, type, data: { username: 'yourusername' } };
    case 'projects':
      return { id, type, data: { style: 'text', useCustomColors: false, theme: 'radical', customColors: { bg: '000000', title: '4b86f7', text: 'ffffff', icon: '4b86f7', border: '4b86f7' }, projects: [{ id: uuidv4(), name: 'Project 1', description: 'A cool project', githubUrl: '', demoUrl: '', techStack: ['React'] }] } };
    case 'blog-posts':
      return { id, type, data: { platform: 'dev.to', username: 'yourusername' } } as Block;
    case 'trophies':
      return { id, type, data: { username: 'yourusername', theme: 'radical', columns: 6, noFrame: false, noBg: false } } as Block;
    case 'spotify':
      return { id, type, data: { spotifyUrl: '', theme: 'novatorem' } } as Block;
    case 'support':
      return { id, type, data: { buyMeACoffee: 'yourname', patreon: '', kofi: '', github: '' } } as Block;
    case 'experience':
      return { id, type, data: { jobs: [{ id: uuidv4(), title: 'Senior Developer', company: 'Tech Corp', duration: '2020 - Present', description: 'Leading the frontend team.' }] } } as Block;
    case 'quote':
      return { id, type, data: { theme: 'radical', layout: 'horizontal' } } as Block;
    case 'socials':
      return { id, type, data: { github: '', linkedin: '', twitter: '', portfolio: '', email: '' } };
    case 'contact':
      return { id, type, data: { email: 'your@email.com', message: 'Feel free to reach out to me!' } };
  }
  return { id, type: 'hero', data: { name: '', title: '', shortIntro: '', bannerStyle: 'none' } } as Block;
}
