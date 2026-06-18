'use client';


import { HeroEditor } from '../blocks/HeroEditor';
import { AboutEditor } from '../blocks/AboutEditor';
import { SkillsEditor } from '../blocks/SkillsEditor';
import { GitHubStatsEditor } from '../blocks/GitHubStatsEditor';
import { ProjectsEditor } from '../blocks/ProjectsEditor';
import { SocialsEditor } from '../blocks/SocialsEditor';
import { ContactEditor } from '../blocks/ContactEditor';
import { BannerEditor } from '../blocks/BannerEditor';
import { TypingEditor } from '../blocks/TypingEditor';
import { ActivityGraphEditor } from '../blocks/ActivityGraphEditor';
import { SnakeEditor } from '../blocks/SnakeEditor';
import { Block, HeroBlock, AboutBlock, TechnicalSkillsBlock, GitHubStatsBlock, FeaturedProjectsBlock, SocialLinksBlock, ContactBlock, BannerBlock, TypingBlock, ActivityGraphBlock, SnakeBlock, PacmanBlock } from '@/lib/types/blocks';
import { PacmanEditor } from '../blocks/PacmanEditor';

interface BlockEditorProps {
  block: Block;
}

export function BlockEditor({ block }: BlockEditorProps) {
  switch (block.type) {
    case 'hero':
      return <HeroEditor block={block as HeroBlock} />;
    case 'about':
      return <AboutEditor block={block as AboutBlock} />;
    case 'skills':
      return <SkillsEditor block={block as TechnicalSkillsBlock} />;
    case 'github-stats':
      return <GitHubStatsEditor block={block as GitHubStatsBlock} />;
    case 'projects':
      return <ProjectsEditor block={block as FeaturedProjectsBlock} />;
    case 'socials':
      return <SocialsEditor block={block as SocialLinksBlock} />;
    case 'contact':
      return <ContactEditor block={block as ContactBlock} />;
    case 'banner':
      return <BannerEditor block={block as BannerBlock} />;
    case 'typing':
      return <TypingEditor block={block as TypingBlock} />;
    case 'activity-graph':
      return <ActivityGraphEditor block={block as ActivityGraphBlock} />;
    case 'snake':
      return <SnakeEditor block={block as SnakeBlock} />;
    case 'pacman':
      return <PacmanEditor block={block as PacmanBlock} />;
    default:
      return <div>Unknown block type</div>;
  }
}
