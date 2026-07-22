'use client';


import { HeroEditor } from '../blocks/HeroEditor';
import { PremiumHeroEditor } from '../blocks/PremiumHeroEditor';
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
import { TerminalEditor } from '../blocks/TerminalEditor';
import { AccordionEditor } from '../blocks/AccordionEditor';
import { BentoEditor } from '../blocks/BentoEditor';
import { MinimalistHeroEditor } from '../blocks/MinimalistHeroEditor';
import { Block, HeroBlock, PremiumHeroBlock, AboutBlock, TechnicalSkillsBlock, GitHubStatsBlock, FeaturedProjectsBlock, SocialLinksBlock, ContactBlock, BannerBlock, TypingBlock, ActivityGraphBlock, SnakeBlock, PacmanBlock, BlogPostsBlock, TrophiesBlock, SpotifyBlock, SupportBlock, ExperienceBlock, QuoteBlock, TerminalBlock, AccordionBlock, BentoBlock, MinimalistHeroBlock } from '@/types/blocks';
import { PacmanEditor } from '../blocks/PacmanEditor';
import { BlogPostsEditor } from '../blocks/BlogPostsEditor';
import { TrophiesEditor } from '../blocks/TrophiesEditor';
import { SpotifyEditor } from '../blocks/SpotifyEditor';
import { SupportEditor } from '../blocks/SupportEditor';
import { ExperienceEditor } from '../blocks/ExperienceEditor';
import { QuoteEditor } from '../blocks/QuoteEditor';

interface BlockEditorProps {
  block: Block;
}

export function BlockEditor({ block }: BlockEditorProps) {
  switch (block.type) {
    case 'hero':
      return <HeroEditor block={block as HeroBlock} />;
    case 'premium-hero':
      return <PremiumHeroEditor block={block as PremiumHeroBlock} />;
    case 'minimalist-hero':
      return <MinimalistHeroEditor block={block as MinimalistHeroBlock} />;
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
    case 'blog-posts':
      return <BlogPostsEditor block={block as BlogPostsBlock} />;
    case 'trophies':
      return <TrophiesEditor block={block as TrophiesBlock} />;
    case 'spotify':
      return <SpotifyEditor block={block as SpotifyBlock} />;
    case 'support':
      return <SupportEditor block={block as SupportBlock} />;
    case 'experience':
      return <ExperienceEditor block={block as ExperienceBlock} />;
    case 'quote':
      return <QuoteEditor block={block as QuoteBlock} />;
    case 'terminal':
      return <TerminalEditor block={block as TerminalBlock} />;
    case 'accordion':
      return <AccordionEditor block={block as AccordionBlock} />;
    case 'bento':
      return <BentoEditor block={block as BentoBlock} />;
    default:
      return <div>Unknown block type</div>;
  }
}
