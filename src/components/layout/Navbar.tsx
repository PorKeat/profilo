/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Moon, Sun } from 'lucide-react';
import { Github } from "@/components/icons/Github";
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme as setProfileTheme } from '@/store/builderSlice';
import { ThemeId } from '@/lib/types/theme';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const dispatch = useAppDispatch();
  const currentProfileTheme = useAppSelector(state => state.builder?.themeId || 'github-classic');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleThemeChange = (value: string | null) => {
    if (value) {
      dispatch(setProfileTheme(value as ThemeId));
    }
  };

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const profileThemes = [
    { id: 'clean-light', label: 'Clean Light' },
    { id: 'devops-blue', label: 'DevOps Blue' },
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'github-classic', label: 'GitHub Classic' },
    { id: 'purple-gradient', label: 'Purple Gradient' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center gap-1">
            <img src="/logo.png" alt="Profilo Logo" className="h-8 w-auto object-contain" onError={(e) => {
              // Fallback to the icon if image not found
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
              e.currentTarget.nextElementSibling?.classList.add('flex');
            }} />
            <div className="hidden">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <span className="hidden sm:inline-block font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Profilo
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === route.path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2 mr-2">
              <span className="text-xs text-muted-foreground font-medium">Profile Theme:</span>
              <Select value={currentProfileTheme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs bg-background">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {profileThemes.map(t => (
                    <SelectItem key={t.id} value={t.id} className="text-xs">{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Link href="https://github.com/PorKeat/profilo" target="_blank" rel="noreferrer">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Link href="/builder">
              <Button size="sm">Start Building</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
