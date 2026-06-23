import Link from 'next/link';
import { Github } from '@/components/icons/Github';
import { ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Templates', href: '/templates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/8 dark:border-white/5 bg-white/60 dark:bg-black/40 backdrop-blur-xl overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left — brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                <span className="text-primary font-black text-xs">P</span>
              </div>
              <span className="font-extrabold text-foreground tracking-tight">Profilo</span>
            </div>
            <p className="text-xs text-foreground/50 max-w-[220px] text-center md:text-left leading-relaxed">
              Build stunning GitHub profiles with drag-and-drop blocks. Free &amp; open-source.
            </p>
          </div>

          {/* Center — nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right — GitHub CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/PorKeat/profilo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 h-9 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-foreground/35 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Profilo. Built by{' '}
            <Link href="https://github.com/PorKeat" target="_blank" rel="noreferrer" className="hover:text-foreground/60 transition-colors">
              AlexKGM (Seng Porkeat)
            </Link>
            . Inspired by{' '}
            <Link href="https://readme.so/" target="_blank" rel="noreferrer" className="hover:text-foreground/60 transition-colors">
              readme.so
            </Link>
            .
          </p>
          <p className="text-[11px] text-foreground/30">
            Open-source · MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
