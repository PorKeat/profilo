export type BlockType = 'hero' | 'about' | 'skills' | 'github-stats' | 'projects' | 'socials' | 'contact';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: {
    name: string;
    title: string;
    shortIntro: string;
    avatarUrl?: string;
    bannerStyle: 'solid' | 'gradient' | 'image' | 'none';
  };
}

export interface AboutBlock extends BaseBlock {
  type: 'about';
  data: {
    paragraph: string;
    currentlyLearning: string;
    currentlyWorkingOn: string;
    askMeAbout: string;
  };
}

export interface TechnicalSkillsBlock extends BaseBlock {
  type: 'skills';
  data: {
    skills: string[];
    style: 'flat' | 'plastic' | 'flat-square' | 'for-the-badge' | 'social';
  };
}

export interface GitHubStatsBlock extends BaseBlock {
  type: 'github-stats';
  data: {
    username: string;
    showStats: boolean;
    showTopLanguages: boolean;
    showStreak: boolean;
    showActivityGraph: boolean;
    showSnake: boolean;
    showPacman: boolean;
    show3dContrib: boolean;
    theme: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  techStack: string[];
}

export interface FeaturedProjectsBlock extends BaseBlock {
  type: 'projects';
  data: {
    projects: Project[];
  };
}

export interface SocialLinksBlock extends BaseBlock {
  type: 'socials';
  data: {
    github: string;
    linkedin: string;
    twitter: string;
    portfolio: string;
    email: string;
  };
}

export interface ContactBlock extends BaseBlock {
  type: 'contact';
  data: {
    email: string;
    message: string;
  };
}

export type Block =
  | HeroBlock
  | AboutBlock
  | TechnicalSkillsBlock
  | GitHubStatsBlock
  | FeaturedProjectsBlock
  | SocialLinksBlock
  | ContactBlock;
