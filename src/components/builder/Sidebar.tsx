'use client';

import { useAppDispatch } from '@/store/hooks';
import { addBlock } from '@/store/builderSlice';
import { BlockType } from '@/lib/types/blocks';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Info, Code2, FolderGit2, Share2, Mail, LayoutTemplate, GripVertical, Trash2, Settings, ChevronDown, ChevronUp, Palette } from 'lucide-react';
import { Github } from "@/components/icons/Github";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeId } from '@/lib/types/theme';
import { setTheme } from '@/store/builderSlice';
import { useAppSelector } from '@/store/hooks';

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
    { type: 'about', label: 'About Me', icon: Info },
    { type: 'skills', label: 'Technical Skills', icon: Code2 },
    { type: 'github-stats', label: 'GitHub Statistics', icon: Github },
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
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left text-xs"
              onClick={() => handleAddBlock(type as BlockType)}
            >
              <Icon className="w-3 h-3 mr-2" />
              {label}
            </Button>
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
    case 'about':
      return { id, type, data: { paragraph: 'I am a passionate developer.', currentlyLearning: 'Next.js', currentlyWorkingOn: 'A cool open source project', askMeAbout: 'React and TypeScript' } };
    case 'skills':
      return { id, type, data: { skills: ['React', 'TypeScript', 'Node.js'], style: 'flat' } };
    case 'github-stats':
      return { id, type, data: { username: 'yourusername', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, theme: 'radical' } };
    case 'projects':
      return { id, type, data: { projects: [{ id: uuidv4(), name: 'Project 1', description: 'A cool project', githubUrl: '', demoUrl: '', techStack: ['React'] }] } };
    case 'socials':
      return { id, type, data: { github: '', linkedin: '', twitter: '', portfolio: '', email: '' } };
    case 'contact':
      return { id, type, data: { email: 'your@email.com', message: 'Feel free to reach out to me!' } };
  }
}
