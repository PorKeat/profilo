'use client';

import { useAppDispatch } from '@/store/hooks';
import { addBlock } from '@/store/builderSlice';
import { BlockType } from '@/lib/types/blocks';
import { v4 as uuidv4 } from 'uuid';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Info, Code2, FolderGit2, Share2, Mail, LayoutTemplate, GripVertical, Trash2, Settings, ChevronDown, ChevronUp, Palette, Image, Type, Activity, PlaySquare, Gamepad2 } from 'lucide-react';
import { Github } from "@/components/icons/Github";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeId } from '@/lib/types/theme';
import { setTheme } from '@/store/builderSlice';
import { useAppSelector } from '@/store/hooks';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { generateMarkdown } from '@/lib/markdown/generator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(state => state.builder.themeId);

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type);
    dispatch(addBlock(newBlock));
  };

  const handleThemeChange = (value: string | null) => {
    if (value) {
      dispatch(setTheme(value as ThemeId));
      // Since next-themes doesn't handle our custom UI themes yet, we'll just store it in Redux for now
      // We can sync it with next-themes if needed
    }
  };

  const blockTypes = [
    { type: 'hero', label: 'Hero', icon: User },
    { type: 'banner', label: 'Waving Banner', icon: Image },
    { type: 'typing', label: 'Typing Animation', icon: Type },
    { type: 'about', label: 'About Me', icon: Info },
    { type: 'skills', label: 'Technical Skills', icon: Code2 },
    { type: 'github-stats', label: 'GitHub Statistics', icon: Github },
    { type: 'activity-graph', label: 'Activity Graph', icon: Activity },
    { type: 'snake', label: 'Snake Animation', icon: PlaySquare },
    { type: 'pacman', label: 'Pacman Animation', icon: Gamepad2 },
    { type: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { type: 'socials', label: 'Social Links', icon: Share2 },
    { type: 'contact', label: 'Contact', icon: Mail },
  ];

  const themes: { id: ThemeId, label: string }[] = [
    { id: 'clean-light', label: 'Clean Light' },
    { id: 'devops-blue', label: 'DevOps Blue' },
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'github-classic', label: 'GitHub Classic' },
    { id: 'purple-gradient', label: 'Purple Gradient' },
  ];

  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col h-full">
      <div className="p-4 border-b space-y-4">
        <div>
          <h2 className="font-semibold mb-2 flex items-center gap-2 text-sm">
            <Palette className="w-4 h-4" />
            Theme
          </h2>
          <Select value={currentTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map(t => (
                <SelectItem key={t.id} value={t.id} className="text-xs">{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="p-4 border-b">
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
                <div className="p-4 max-h-[350px] overflow-y-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none transform scale-[0.8] origin-top w-[125%] mx-auto">
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

function createDefaultBlock(type: BlockType): any {
  const id = uuidv4();
  switch (type) {
    case 'hero':
      return { id, type, data: { name: 'Your Name', title: 'Full Stack Developer', shortIntro: 'I build things for the web.', bannerStyle: 'none' } };
    case 'banner':
      return { id, type, data: { bannerType: 'waving', height: 250, text: 'Hello World', desc: 'Welcome to my profile', color: '0:4a0000,50:b30000,100:ff003c', fontColor: 'ffffff', section: 'header' } };
    case 'typing':
      return { id, type, data: { lines: ['Automating the Future', 'Building Scalable Infrastructure', 'Turning Coffee into Code'], color: 'ff003c', size: 24, center: true, vCenter: true } };
    case 'about':
      return { id, type, data: { paragraph: 'I am a passionate developer.', currentlyLearning: 'Next.js', currentlyWorkingOn: 'A cool open source project', askMeAbout: 'React and TypeScript' } };
    case 'skills':
      return { id, type, data: { skills: ['React', 'TypeScript', 'Node.js'], style: 'flat' } };
    case 'github-stats':
      return { id, type, data: { username: 'yourusername', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, showProfileViews: false, useCustomColors: false, theme: 'radical', customColors: { bg: '000000', title: 'ff003c', text: 'ffffff', icon: 'ff003c', border: 'ff003c' } } };
    case 'activity-graph':
      return { id, type, data: { username: 'yourusername', theme: 'radical', useCustomColors: false, customColors: { bg: '000000', color: 'ff003c', line: 'ff003c', point: 'ffffff' } } };
    case 'snake':
      return { id, type, data: { username: 'yourusername' } };
    case 'pacman':
      return { id, type, data: { username: 'yourusername' } };
    case 'projects':
      return { id, type, data: { style: 'text', useCustomColors: false, theme: 'radical', customColors: { bg: '000000', title: 'ff003c', text: 'ffffff', icon: 'ff003c', border: 'ff003c' }, projects: [{ id: uuidv4(), name: 'Project 1', description: 'A cool project', githubUrl: '', demoUrl: '', techStack: ['React'] }] } };
    case 'socials':
      return { id, type, data: { github: '', linkedin: '', twitter: '', portfolio: '', email: '' } };
    case 'contact':
      return { id, type, data: { email: 'your@email.com', message: 'Feel free to reach out to me!' } };
  }
}
