'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Home, Info, Mail, LayoutTemplate, PenTool } from 'lucide-react';
import { Github } from '@/components/icons/Github';

export function GlobalCommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Do not trigger global CMD+K inside the builder, as it has its own block palette
    if (pathname === '/builder') return;

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [pathname]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="bg-[#080810]/95 border border-white/10 shadow-2xl backdrop-blur-3xl rounded-xl focus:outline-none">
        <CommandInput placeholder="Type a command or search..." className="text-foreground" />
        <CommandList className="bg-transparent text-foreground/80">
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push('/'))} className="cursor-pointer aria-selected:bg-primary/20">
              <Home className="mr-2 h-4 w-4" /> Home
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/about'))} className="cursor-pointer aria-selected:bg-primary/20">
              <Info className="mr-2 h-4 w-4" /> About Profilo
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/templates'))} className="cursor-pointer aria-selected:bg-primary/20">
              <LayoutTemplate className="mr-2 h-4 w-4" /> Templates
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/contact'))} className="cursor-pointer aria-selected:bg-primary/20">
              <Mail className="mr-2 h-4 w-4" /> Contact Us
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator className="bg-white/10" />
          
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => router.push('/builder'))} className="cursor-pointer aria-selected:bg-primary/20 text-primary">
              <PenTool className="mr-2 h-4 w-4" /> Start Building
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator className="bg-white/10" />

          <CommandGroup heading="Social">
            <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/PorKeat/profilo', '_blank'))} className="cursor-pointer aria-selected:bg-primary/20">
              <Github className="mr-2 h-4 w-4" /> GitHub Repository
            </CommandItem>
          </CommandGroup>

        </CommandList>
      </Command>
    </CommandDialog>
  );
}
