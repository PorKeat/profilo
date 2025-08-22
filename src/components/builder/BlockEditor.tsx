'use client';

import { Block } from '@/lib/types/blocks';
import { HeroEditor } from '../blocks/HeroEditor';
import { AboutEditor } from '../blocks/AboutEditor';
import { SkillsEditor } from '../blocks/SkillsEditor';
import { GitHubStatsEditor } from '../blocks/GitHubStatsEditor';
import { ProjectsEditor } from '../blocks/ProjectsEditor';
import { SocialsEditor } from '../blocks/SocialsEditor';
import { ContactEditor } from '../blocks/ContactEditor';
import { BannerEditor } from '../blocks/BannerEditor';
import { TypingEditor } from '../blocks/TypingEditor';

interface BlockEditorProps {
  block: Block;
}

export function BlockEditor({ block }: BlockEditorProps) {
  switch (block.type) {
    case 'hero':
      return <HeroEditor block={block as any} />;
    case 'about':
      return <AboutEditor block={block as any} />;
    case 'skills':
      return <SkillsEditor block={block as any} />;
    case 'github-stats':
      return <GitHubStatsEditor block={block as any} />;
    case 'projects':
      return <ProjectsEditor block={block as any} />;
    case 'socials':
      return <SocialsEditor block={block as any} />;
    case 'contact':
      return <ContactEditor block={block as any} />;
    case 'banner':
      return <BannerEditor block={block as any} />;
    case 'typing':
      return <TypingEditor block={block as any} />;
    default:
      return <div>Unknown block type</div>;
  }
}
