export type BlockType = 'hero' | 'about' | 'skills' | 'github-stats' | 'projects' | 'socials' | 'contact' | 'banner' | 'typing' | 'activity-graph' | 'snake' | 'pacman' | 'blog-posts' | 'trophies' | 'spotify' | 'support' | 'experience' | 'quote' | 'terminal' | 'accordion' | 'bento';

export interface BaseBlock {
  id: string;
  type: BlockType;
  layout?: 'full' | 'half';
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: {
    name: string;
    title: string;
    shortIntro: string;
    avatarUrl?: string;
    localAvatarBase64?: string;
    bannerStyle: 'solid' | 'gradient' | 'image' | 'none';
  };
}

export interface BannerBlock extends BaseBlock {
  type: 'banner';
  data: {
    bannerType: 'waving' | 'rect' | 'soft' | 'cylinder' | 'transparent';
    height: number;
    text: string;
    desc: string;
    color: string;
    fontColor: string;
    section: 'header' | 'footer';
  };
}

export interface TypingBlock extends BaseBlock {
  type: 'typing';
  data: {
    lines: string[];
    color: string;
    size: number;
    center: boolean;
    vCenter: boolean;
  };
}

export interface ActivityGraphBlock extends BaseBlock {
  type: 'activity-graph';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    username: string;
    theme: string;
    useCustomColors: boolean;
    customColors: {
      bg: string;
      color: string;
      line: string;
      point: string;
    };
  };
}

export interface SnakeBlock extends BaseBlock {
  type: 'snake';
  data: {
    username: string;
  };
}

export interface PacmanBlock extends BaseBlock {
  type: 'pacman';
  data: {
    username: string;
  };
}

export interface AboutBlock extends BaseBlock {
  type: 'about';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    paragraph: string;
    currentlyLearning?: string;
    currentlyWorkingOn?: string;
    askMeAbout?: string;
    bullets?: { id: string; emoji?: string; icon?: string; text: string; }[];
  };
}

export interface TechnicalSkillsBlock extends BaseBlock {
  type: 'skills';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    skills: string[];
    groups?: { id: string; name: string; skills: string[] }[];
    style: 'flat' | 'plastic' | 'flat-square' | 'for-the-badge' | 'social';
  };
}

export interface GitHubStatsBlock extends BaseBlock {
  type: 'github-stats';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    username: string;
    showStats: boolean;
    showTopLanguages: boolean;
    showStreak: boolean;
    showActivityGraph: boolean;
    showSnake: boolean;
    showPacman: boolean;
    show3dContrib: boolean;
    showProfileViews: boolean;
    useCustomColors: boolean;
    theme: string;
    customColors: {
      bg: string;
      title: string;
      text: string;
      icon: string;
      border: string;
    };
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  techStack: string[];
  localImageBase64?: string;
}

export interface FeaturedProjectsBlock extends BaseBlock {
  type: 'projects';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    style: 'text' | 'cards';
    useCustomColors: boolean;
    theme: string;
    customColors: {
      bg: string;
      title: string;
      text: string;
      icon: string;
      border: string;
    };
    projects: Project[];
  };
}

export interface SocialLinksBlock extends BaseBlock {
  type: 'socials';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    links?: { id: string; platform: string; url: string; color: string; icon: string }[];
    badgeStyle?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    email?: string;
  };
}

export interface ContactBlock extends BaseBlock {
  type: 'contact';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    email: string;
    message: string;
  };
}

export interface BlogPostsBlock extends BaseBlock {
  type: 'blog-posts';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    platform: 'dev.to' | 'medium' | 'hashnode';
    username: string;
  };
}

export interface TrophiesBlock extends BaseBlock {
  type: 'trophies';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    username: string;
    theme: string;
    columns: number;
    noFrame: boolean;
    noBg: boolean;
  };
}

export interface SpotifyBlock extends BaseBlock {
  type: 'spotify';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    spotifyUrl: string;
    theme: string;
  };
}

export interface SupportBlock extends BaseBlock {
  type: 'support';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    supportMode?: 'international' | 'local';
    buyMeACoffee?: string;
    patreon?: string;
    kofi?: string;
    github?: string;
    qrCodeBase64?: string;
    qrCodeLabel?: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  companyLogoBase64?: string;
  techStack?: string[];
}

export interface ExperienceBlock extends BaseBlock {
  type: 'experience';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    jobs: Experience[];
  };
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  data: {
    theme: string;
    layout: 'horizontal' | 'vertical';
    quote?: string;
    author?: string;
    showAuthor?: boolean;
  };
}

export interface TerminalBlock extends BaseBlock {
  type: 'terminal';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    username: string;
    lines: string[];
    color: string;
  };
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface AccordionBlock extends BaseBlock {
  type: 'accordion';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    items: AccordionItem[];
  };
}

export interface BentoBlock extends BaseBlock {
  type: 'bento';
  data: {
    sectionTitle?: string;
    sectionTitleColor?: string;
    iconColor?: string;
    bio: string;
    githubUsername: string;
    skills: string[];
    role: string;
  };
}

export type Block =
  | HeroBlock
  | BannerBlock
  | TypingBlock
  | ActivityGraphBlock
  | SnakeBlock
  | PacmanBlock
  | AboutBlock
  | TechnicalSkillsBlock
  | GitHubStatsBlock
  | FeaturedProjectsBlock
  | SocialLinksBlock
  | ContactBlock
  | BlogPostsBlock
  | TrophiesBlock
  | SpotifyBlock
  | SupportBlock
  | ExperienceBlock
  | QuoteBlock
  | TerminalBlock
  | AccordionBlock
  | BentoBlock;
