'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Github } from '@/components/icons/Github';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const routes = [
  { name: 'Home',      path: '/'          },
  { name: 'Templates', path: '/templates' },
  { name: 'About',     path: '/about'     },
  { name: 'Contact',   path: '/contact'   },
];

export function Navbar() {
  const pathname  = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted,     setMounted]     = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const isDark = theme === 'dark';


  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change

  useEffect(() => { setMobileOpen(false); }, [pathname]);

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

  return (
    <>
      {/* ── Floating pill navbar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3"
      >
        <div
          className={cn(
            'relative w-full max-w-5xl flex items-center justify-between gap-4 px-4 h-13 rounded-2xl border transition-all duration-300',
            scrolled
              ? 'bg-background/85 backdrop-blur-2xl border-border/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-background/60 backdrop-blur-xl border-border/30 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]'
          )}
        >
          {/* Subtle top shimmer line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center -mr-1"
            >
              { }
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Profilo" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
            </motion.div>
            <span className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              Profilo
            </span>
          </Link>

          {/* ── Center nav links (desktop) ── */}
          <nav
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {routes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onMouseEnter={() => setHoveredPath(route.path)}
                  className={cn(
                    'relative px-4 py-1.5 text-sm font-medium rounded-xl transition-colors duration-200 z-10',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/60 hover:text-foreground'
                  )}
                >
                  {/* Hover pill background */}
                  <AnimatePresence>
                    {hoveredPath === route.path && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-xl bg-foreground/6 dark:bg-white/6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{route.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* GitHub */}
            <motion.a
              href="https://github.com/PorKeat/profilo"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-xl text-foreground/50 hover:text-foreground hover:bg-foreground/6 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
            </motion.a>

            {/* Theme toggle pill */}
            <button
              ref={btnRef}
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
              disabled={isAnimating}
              className="relative w-14 h-7 rounded-full border border-border/60 bg-muted/50 hover:bg-muted flex items-center px-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Sun  className="absolute left-1.5 w-3 h-3 text-amber-400 opacity-60" />
              <Moon className="absolute right-1.5 w-3 h-3 text-blue-400 opacity-60" />
              <motion.div
                animate={{ x: mounted && isDark ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="w-6 h-6 rounded-full bg-background border border-border shadow-sm flex items-center justify-center z-10 relative"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && isDark ? (
                    <motion.span key="moon"
                      initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
                    >
                      <Moon className="w-3 h-3 text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span key="sun"
                      initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
                    >
                      <Sun className="w-3 h-3 text-amber-500" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </button>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hidden md:block">
              <Link href="/builder">
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl px-4 h-8 text-xs shadow-[0_0_16px_rgba(75,134,247,0.35)] hover:shadow-[0_0_24px_rgba(75,134,247,0.5)] transition-all duration-200"
                >
                  Start Building
                </Button>
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-foreground/60 hover:text-foreground hover:bg-foreground/6 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile menu dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1     }}
              exit={{    opacity: 0, y: -8, scale: 0.97  }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[calc(100%+8px)] left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)] p-2 overflow-hidden"
            >
              {/* Shimmer top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {routes.map((route, i) => (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={route.path}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150',
                      pathname === route.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                    )}
                  >
                    {route.name}
                    {pathname === route.path && (
                      <motion.div layoutId="mobile-dot" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-border/40 mx-2 my-2" />

              <div className="flex items-center gap-2 px-2 pb-1">
                <a
                  href="https://github.com/PorKeat/profilo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <Link href="/builder" className="flex-1">
                  <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90 font-bold rounded-xl h-9 text-xs">
                    Start Building
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so page content doesn't hide under the fixed navbar */}
      <div className="h-16" />
    </>
  );
}
