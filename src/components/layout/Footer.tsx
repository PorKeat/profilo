import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Github } from "@/components/icons/Github";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by AlexKGM (Seng Porkeat). Inspired by <Link href="https://readme.so/" target="_blank" rel="noreferrer" className="text-foreground hover:underline">readme.so</Link>.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/templates"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Templates
          </Link>
          <Link
            href="https://github.com/PorKeat/profilo"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
