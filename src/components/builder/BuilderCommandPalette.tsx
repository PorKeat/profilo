'use client';

import { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useAppDispatch } from '@/store/hooks';
import { addBlock } from '@/store/builderSlice';
import { createDefaultBlock } from '@/components/builder/Sidebar';
import { BlockType } from '@/types/blocks';
import { User, Info, Code2, FolderGit2, Share2, Mail, Image as ImageIcon, Type, Activity, PlaySquare, Gamepad2, Rss, Trophy, Music, Coffee, Briefcase, Quote } from 'lucide-react';
import { Github } from '@/components/icons/Github';

export function BuilderCommandPalette() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (type: string) => {
    dispatch(addBlock(createDefaultBlock(type as BlockType)));
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="bg-transparent border-none focus:outline-none">
        <CommandInput placeholder="Type a section or command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Profile & Contact">
          <CommandItem onSelect={() => handleSelect('hero')}><User className="mr-2 h-4 w-4" /> Hero Section</CommandItem>
          <CommandItem onSelect={() => handleSelect('about')}><Info className="mr-2 h-4 w-4" /> About Me</CommandItem>
          <CommandItem onSelect={() => handleSelect('contact')}><Mail className="mr-2 h-4 w-4" /> Contact</CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="Work & Skills">
          <CommandItem onSelect={() => handleSelect('experience')}><Briefcase className="mr-2 h-4 w-4" /> Work Experience</CommandItem>
          <CommandItem onSelect={() => handleSelect('skills')}><Code2 className="mr-2 h-4 w-4" /> Technical Skills</CommandItem>
          <CommandItem onSelect={() => handleSelect('projects')}><FolderGit2 className="mr-2 h-4 w-4" /> Featured Projects</CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="GitHub Stats">
          <CommandItem onSelect={() => handleSelect('github-stats')}><Github className="mr-2 h-4 w-4" /> GitHub Statistics</CommandItem>
          <CommandItem onSelect={() => handleSelect('activity-graph')}><Activity className="mr-2 h-4 w-4" /> Activity Graph</CommandItem>
          <CommandItem onSelect={() => handleSelect('trophies')}><Trophy className="mr-2 h-4 w-4" /> GitHub Trophies</CommandItem>
        </CommandGroup>

        <CommandGroup heading="Widgets & Animations">
          <CommandItem onSelect={() => handleSelect('typing')}><Type className="mr-2 h-4 w-4" /> Dynamic Text (Code, Terminal, Marquee)</CommandItem>
          <CommandItem onSelect={() => handleSelect('banner')}><ImageIcon className="mr-2 h-4 w-4" /> Waving Banner</CommandItem>
          <CommandItem onSelect={() => handleSelect('snake')}><PlaySquare className="mr-2 h-4 w-4" /> Snake Animation</CommandItem>
          <CommandItem onSelect={() => handleSelect('pacman')}><Gamepad2 className="mr-2 h-4 w-4" /> Pacman Animation</CommandItem>
          <CommandItem onSelect={() => handleSelect('quote')}><Quote className="mr-2 h-4 w-4" /> Quote of the Day</CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="Social & Links">
          <CommandItem onSelect={() => handleSelect('socials')}><Share2 className="mr-2 h-4 w-4" /> Social Links</CommandItem>
          <CommandItem onSelect={() => handleSelect('support')}><Coffee className="mr-2 h-4 w-4" /> Support Me</CommandItem>
          <CommandItem onSelect={() => handleSelect('blog-posts')}><Rss className="mr-2 h-4 w-4" /> Latest Blog Posts</CommandItem>
          <CommandItem onSelect={() => handleSelect('spotify')}><Music className="mr-2 h-4 w-4" /> Currently Listening</CommandItem>
        </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
