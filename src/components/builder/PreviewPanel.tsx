'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { generateMarkdown } from '@/lib/markdown/generator';
import { generateWorkflows } from '@/lib/markdown/workflows';
import JSZip from 'jszip';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Download, Eye, Code2, ChevronDown, Check, Zap, Bot, Sparkles, Sun, Moon, AlertTriangle, FileText } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { setTheme as setProfileTheme } from '@/store/builderSlice';
import { ThemeId } from '@/lib/types/theme';
import type { Components } from 'react-markdown';
import type { SupportBlock, FeaturedProjectsBlock, ExperienceBlock, HeroBlock } from '@/lib/types/blocks';

// ─── Theme definitions ────────────────────────────────────────────────────────
type ThemeStyles = {
  text: string;
  heading: string;
  subText: string;
  link: string;
  codeBg: string;
  codeText: string;
  borderColor: string;
  hrColor: string;
  strongColor: string;
};

type ThemeMeta = {
  label: string;
  swatch: string;
  swatchAlt: string;
  icon: React.ReactNode;
};

const THEME_META: Record<ThemeId, ThemeMeta> = {
  'github-classic': { label: 'GitHub Classic', swatch: '#58a6ff', swatchAlt: '#0d1117', icon: <Zap      className="w-3.5 h-3.5" /> },
  'cyberpunk':      { label: 'Cyberpunk',       swatch: '#00ff9f', swatchAlt: '#d300c5', icon: <Bot      className="w-3.5 h-3.5" /> },
  'purple-gradient':{ label: 'Purple Gradient', swatch: '#d8b4fe', swatchAlt: '#7e22ce', icon: <Sparkles className="w-3.5 h-3.5" /> },
  'clean-light':    { label: 'Clean Light',     swatch: '#0366d6', swatchAlt: '#f6f8fa', icon: <Sun      className="w-3.5 h-3.5" /> },
};

const THEME_STYLES: Record<ThemeId, ThemeStyles> = {
  'github-classic': {
    text:        '#c9d1d9',
    heading:     '#58a6ff',
    subText:     '#8b949e',
    link:        '#79c0ff',
    codeBg:      '#161b22',
    codeText:    '#ff7b72',
    borderColor: '#30363d',
    hrColor:     '#30363d',
    strongColor: '#e6edf3',
  },
  'cyberpunk': {
    text:        '#e0e0e0',
    heading:     '#00ff9f',
    subText:     '#ff00ff',
    link:        '#d300c5',
    codeBg:      '#1a0030',
    codeText:    '#00ff9f',
    borderColor: '#d300c5',
    hrColor:     '#4a0060',
    strongColor: '#ffffff',
  },
  'purple-gradient': {
    text:        '#e9d5ff',
    heading:     '#d8b4fe',
    subText:     '#a855f7',
    link:        '#c084fc',
    codeBg:      '#2e1065',
    codeText:    '#f0abfc',
    borderColor: '#7e22ce',
    hrColor:     '#581c87',
    strongColor: '#f3e8ff',
  },
  'clean-light': {
    text:        '#57606a',
    heading:     '#0366d6',
    subText:     '#6e7781',
    link:        '#0969da',
    codeBg:      '#eef1f5',
    codeText:    '#cf222e',
    borderColor: '#d0d7de',
    hrColor:     '#d8dee4',
    strongColor: '#24292f',
  },
};

const THEME_ORDER: ThemeId[] = ['github-classic', 'cyberpunk', 'purple-gradient', 'clean-light'];
// ─────────────────────────────────────────────────────────────────────────────
interface PreviewPanelProps {
  isFullscreen?: boolean;
}

export function PreviewPanel({ isFullscreen = false }: PreviewPanelProps) {
  const dispatch = useAppDispatch();
  const { blocks, themeId } = useAppSelector((state) => state.builder);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [copyWarningOpen, setCopyWarningOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark');

  const generatedMarkdown = generateMarkdown(blocks, themeId, false, previewMode);
  const previewMarkdown = generateMarkdown(blocks, themeId, true, previewMode);

  const [manualMarkdown, setManualMarkdown] = useState<string | null>(null);
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  // Use the active markdown for copying/downloading
  const activeMarkdown = isManuallyEdited ? (manualMarkdown ?? generatedMarkdown) : generatedMarkdown;

  // If user selected clean-light, preview is light by default, but let's just use previewMode explicitly
  const isLight = previewMode === 'light';
  // Fallback to light or dark styles based on toggle
  const s = isLight ? THEME_STYLES['clean-light'] : THEME_STYLES[themeId] || THEME_STYLES['github-classic'];
  const meta = THEME_META[themeId];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = () => {
    const workflows = generateWorkflows(blocks);
    if (workflows.length > 0) {
      setCopyWarningOpen(true);
    } else {
      navigator.clipboard.writeText(activeMarkdown);
    }
  };

  const handleThemeChange = (id: ThemeId) => {
    dispatch(setProfileTheme(id));
    setDropdownOpen(false);
  };

  const handleDownload = async () => {
    const workflows = generateWorkflows(blocks);
    const supportBlock = blocks.find(b => b.type === 'support') as unknown as SupportBlock;
    const qrCodeBase64 = supportBlock?.data?.qrCodeBase64;
    
    const projectBlocks = blocks.filter(b => b.type === 'projects') as unknown as FeaturedProjectsBlock[];
    const projectImages = projectBlocks.flatMap(b => b.data.projects).filter(p => p.localImageBase64);
    
    const experienceBlocks = blocks.filter(b => b.type === 'experience') as unknown as ExperienceBlock[];
    const experienceLogos = experienceBlocks.flatMap(b => b.data.jobs).filter(j => j.companyLogoBase64);
    
    const heroBlock = blocks.find(b => b.type === 'hero') as unknown as HeroBlock;
    const localAvatarBase64 = heroBlock?.data?.localAvatarBase64;
    
    if (workflows.length > 0 || qrCodeBase64 || projectImages.length > 0 || experienceLogos.length > 0 || localAvatarBase64) {
      const zip = new JSZip();
      zip.file('README.md', activeMarkdown);
      
      if (workflows.length > 0) {
        const workflowsFolder = zip.folder('.github/workflows');
        if (workflowsFolder) {
          workflows.forEach(wf => {
            workflowsFolder.file(wf.filename, wf.content);
          });
        }
      }

      if (qrCodeBase64) {
        // Strip the data:image/png;base64, prefix
        const base64Data = qrCodeBase64.split(',')[1];
        if (base64Data) {
          zip.file('support-qr.png', base64Data, { base64: true });
        }
      }

      projectImages.forEach((p: { id: string; localImageBase64?: string }) => {
        if (!p.localImageBase64) return;
        const base64Data = p.localImageBase64.split(',')[1];
        if (base64Data) {
          zip.file(`project-${p.id}.png`, base64Data, { base64: true });
        }
      });

      experienceLogos.forEach((j: { id: string; companyLogoBase64?: string }) => {
        if (!j.companyLogoBase64) return;
        const base64Data = j.companyLogoBase64.split(',')[1];
        if (base64Data) {
          zip.file(`company-${j.id}.png`, base64Data, { base64: true });
        }
      });

      if (localAvatarBase64) {
        const base64Data = localAvatarBase64.split(',')[1];
        if (base64Data) {
          zip.file('avatar.png', base64Data, { base64: true });
        }
      }
      
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'github-profile.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const blob = new Blob([activeMarkdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const markdownComponents: Components = {
     
    img: ({ src, alt }) => {
      const srcStr = typeof src === 'string' ? src : '';
      let finalSrc = srcStr;
      
      if (srcStr && !srcStr.startsWith('data:')) {
        finalSrc = srcStr.includes('?') ? `${srcStr}&_t=${themeId}` : `${srcStr}?_t=${themeId}`;
      }
      
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={finalSrc} alt={alt ?? ''} style={{ maxWidth: '100%', display: 'inline-block' }} />;
    },
    h1: ({ children }) => (
      <h1 style={{ color: s.heading, borderBottom: `2px solid ${s.borderColor}`, paddingBottom: '0.4em', marginBottom: '0.8em', fontSize: '1.8em', fontWeight: 800 }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: s.heading, borderBottom: `1px solid ${s.borderColor}`, paddingBottom: '0.25em', marginBottom: '0.6em', fontSize: '1.4em', fontWeight: 700 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 style={{ color: s.heading, fontSize: '1.1em', fontWeight: 700, marginBottom: '0.4em' }}>{children}</h3>,
    h4: ({ children }) => <h4 style={{ color: s.heading, fontWeight: 600 }}>{children}</h4>,
    p:  ({ children }) => <p  style={{ color: s.text, lineHeight: 1.8, marginBottom: '0.8em' }}>{children}</p>,
    a:  ({ href, children }) => <a href={href} style={{ color: s.link, textDecoration: 'underline', fontWeight: 500 }}>{children}</a>,
    code: ({ children }) => (
      <code style={{ background: s.codeBg, color: s.codeText, padding: '0.15em 0.45em', borderRadius: 5, fontSize: '0.82em', fontFamily: 'monospace' }}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre style={{ background: s.codeBg, borderRadius: 8, padding: '1.2em', overflowX: 'auto', border: `1px solid ${s.borderColor}`, marginBottom: '1em' }}>
        {children}
      </pre>
    ),
    hr: () => <hr style={{ border: 'none', borderTop: `1px solid ${s.hrColor}`, margin: '1.5em 0' }} />,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: `4px solid ${s.link}`, paddingLeft: '1em', color: s.subText, margin: '1em 0', fontStyle: 'italic' }}>
        {children}
      </blockquote>
    ),
    li:     ({ children }) => <li     style={{ color: s.text, marginBottom: '0.2em' }}>{children}</li>,
    strong: ({ children }) => <strong style={{ color: s.strongColor, fontWeight: 700 }}>{children}</strong>,
    em:     ({ children }) => <em     style={{ color: s.subText }}>{children}</em>,
    ul:     ({ children }) => <ul     style={{ paddingLeft: '1.5em', marginBottom: '0.8em' }}>{children}</ul>,
    ol:     ({ children }) => <ol     style={{ paddingLeft: '1.5em', marginBottom: '0.8em' }}>{children}</ol>,
  };

  return (
    <div className={`${isFullscreen ? 'w-full' : 'w-[500px] xl:w-[600px] border-l border-white/5'} bg-background/60 backdrop-blur-xl flex flex-col h-full hidden lg:flex z-10 shadow-2xl transition-all duration-300`}>
      <Tabs defaultValue="preview" className="flex flex-col h-full gap-0">
        <div className="p-3 border-b flex items-center justify-between bg-muted/10 gap-2">
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="gap-1.5 text-xs h-7">
              <Eye className="w-3 h-3" /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1.5 text-xs h-7">
              <Code2 className="w-3 h-3" /> Markdown
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewMode(isLight ? 'dark' : 'light')}
                className="h-8 w-8 text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50"
                title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            {/* ─── Custom Theme Switcher ──────────────────────── */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors text-xs font-medium"
              >
                {/* Swatch */}
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/20"
                  style={{ background: `linear-gradient(135deg, ${meta.swatch}, ${meta.swatchAlt})` }}
                />
                <span className="hidden sm:inline">{meta.label}</span>
                <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-popover border border-border rounded-xl shadow-xl overflow-hidden w-52 py-1">
                  {THEME_ORDER.map(id => {
                    const m = THEME_META[id];
                    const active = themeId === id;
                    return (
                      <button
                        key={id}
                        onClick={() => handleThemeChange(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs text-left transition-colors hover:bg-muted/60 ${active ? 'bg-primary/10' : ''}`}
                      >
                        {/* Gradient swatch */}
                        <span
                          className="w-5 h-5 rounded-md flex-shrink-0 shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${m.swatch}, ${m.swatchAlt})` }}
                        />
                        <span className="flex-1 font-medium">{m.label}</span>
                        <span className="opacity-60" style={{ color: m.swatch }}>{m.icon}</span>
                        {active && <Check className="w-3 h-3 text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {/* ──────────────────────────────────────────────── */}

            <Button variant="outline" size="sm" onClick={handleCopy} className="h-8 text-xs">
              <Copy className="w-3 h-3 mr-1" /> Copy
            </Button>
            <Button size="sm" onClick={handleDownload} className="h-8 text-xs">
              <Download className="w-3 h-3 mr-1" /> Export
            </Button>
          </div>
        </div>

        {/* Preview — matches GitHub background exactly */}
        <TabsContent value="preview" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex flex-col p-0 transition-colors duration-500" style={{ backgroundColor: isLight ? '#ffffff' : '#0d1117' }}>
          <div className="min-h-full w-full flex flex-col">
            {activeMarkdown ? (
              <div className={`w-full flex-1 flex flex-col`}>
                {/* Markdown Content */}
                <div className="p-8 md:p-10">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    urlTransform={(value) => value}
                    components={markdownComponents}
                  >
                    {isManuallyEdited ? (manualMarkdown ?? previewMarkdown) : previewMarkdown}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full text-muted-foreground mt-20">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p>Add sections to preview your README.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="code" className="flex-1 overflow-hidden m-0 data-[state=active]:flex flex-col bg-[#0d1117]">
          {isManuallyEdited && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between shrink-0">
              <span className="text-xs text-amber-500 font-medium">
                Manual override active. Builder changes won&apos;t apply here.
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 text-[10px] bg-background text-foreground border-border/50 hover:bg-muted"
                onClick={() => {
                  setIsManuallyEdited(false);
                  setManualMarkdown(null);
                }}
              >
                Reset to Builder
              </Button>
            </div>
          )}
          <div className="p-0 flex-1 flex flex-col relative group h-full min-h-0">
            {/* Editor Gutter (Visual Only) */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/10 bg-white/[0.02] pointer-events-none" />
            <textarea
              className="flex-1 w-full h-full py-6 pr-6 pl-16 text-[13px] font-mono leading-[1.8rem] text-[#c9d1d9] bg-transparent resize-none focus:outline-none selection:bg-primary/30"
              value={isManuallyEdited ? (manualMarkdown ?? '') : generatedMarkdown}
              onChange={(e) => {
                setIsManuallyEdited(true);
                setManualMarkdown(e.target.value);
              }}
              spellCheck={false}
              placeholder="<!-- Your markdown will appear here -->"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={copyWarningOpen} onOpenChange={setCopyWarningOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <DialogTitle>Action Required</DialogTitle>
            </div>
            <DialogDescription>
              Your current profile includes dynamic sections (like Blog Posts or Animations) that require GitHub Actions to work properly. 
              <br /><br />
              If you just copy the Markdown, these sections will not update or animate. We highly recommend downloading the ZIP file instead, which includes all the pre-configured workflow files.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setCopyWarningOpen(false);
                navigator.clipboard.writeText(activeMarkdown);
              }}
            >
              Copy Markdown Anyway
            </Button>
            <Button 
              onClick={() => {
                setCopyWarningOpen(false);
                handleDownload();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download ZIP instead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
