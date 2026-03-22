import { Block } from './types/blocks';
import { ThemeId } from './types/theme';
import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  desc: string;
  themeId: ThemeId;
  blocks: Block[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'devops',
    name: 'DevOps Engineer',
    desc: 'Focus on tools, CI/CD pipelines, and GitHub stats. (PorKeat configuration)',
    themeId: 'github-classic',
    blocks: [
      {
        id: uuidv4(),
        type: 'banner',
        data: {
          bannerType: 'waving',
          height: 250,
          text: 'Seng Porkeat',
          desc: 'DevOps Engineer | Cloud and Automation Enthusiast',
          color: '0:4a0000,50:b30000,100:ff003c',
          fontColor: 'ffffff',
          section: 'header',
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          username: 'PorKeat',
          showStats: false,
          showTopLanguages: false,
          showStreak: false,
          showActivityGraph: false,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: true,
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '000000', title: 'ff003c', text: 'ffffff', icon: 'ff003c', border: 'ff003c' }
        }
      },
      {
        id: uuidv4(),
        type: 'typing',
        data: {
          lines: ['Automating the Future', 'Building Scalable Infrastructure', 'Cloud Native | CI/CD | Containers', 'Turning Coffee into Pipelines'],
          color: 'ff003c',
          size: 24,
          center: true,
          vCenter: true
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Linux', 'Python', 'Go', 'Bash'],
          style: 'for-the-badge'
        }
      },
      {
        id: uuidv4(),
        type: 'activity-graph',
        data: {
          username: 'PorKeat',
          theme: 'react',
          useCustomColors: false,
          customColors: { bg: '000000', color: 'ff003c', line: 'ff003c', point: 'ffffff' }
        }
      },
      {
        id: uuidv4(),
        type: 'pacman',
        data: {
          username: 'PorKeat',
        }
      }
    ]
  },
  {
    id: 'minimal-dev',
    name: 'Minimal Developer',
    desc: 'Clean, simple, focuses on featured projects and skills.',
    themeId: 'clean-light',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        data: {
          name: 'Jane Doe',
          title: 'Full Stack Developer',
          shortIntro: 'Crafting beautiful, accessible web applications.',
          bannerStyle: 'none'
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'TailwindCSS', 'PostgreSQL'],
          style: 'flat'
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          style: 'cards',
          useCustomColors: false,
          theme: 'default',
          customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' },
          projects: [
            { id: uuidv4(), name: 'E-commerce Platform', description: 'A fully functional modern e-commerce application.', githubUrl: 'https://github.com/janedoe/ecommerce', demoUrl: '', techStack: ['React', 'Node.js'] },
            { id: uuidv4(), name: 'Task Manager', description: 'A sleek productivity tool.', githubUrl: 'https://github.com/janedoe/task-manager', demoUrl: '', techStack: ['Next.js', 'Tailwind'] }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'socials',
        data: {
          github: 'janedoe',
          linkedin: 'janedoe',
          twitter: 'janedoe',
          portfolio: 'https://janedoe.com',
          email: 'hello@janedoe.com'
        }
      }
    ]
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    desc: 'Neon colors, dark mode, high contrast tech style.',
    themeId: 'cyberpunk',
    blocks: [
      {
        id: uuidv4(),
        type: 'banner',
        data: {
          bannerType: 'rect',
          height: 200,
          text: 'V',
          desc: 'Netrunner | Edgerunner',
          color: '0:0f0c29,50:302b63,100:24243e',
          fontColor: '00ff00',
          section: 'header',
        }
      },
      {
        id: uuidv4(),
        type: 'typing',
        data: {
          lines: ['Wake up, samurai.', 'We have a city to burn.'],
          color: '00ff00',
          size: 28,
          center: true,
          vCenter: true
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          username: 'torvalds',
          showStats: true,
          showTopLanguages: true,
          showStreak: true,
          showActivityGraph: false,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: false,
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '0d1117', title: '00ff00', text: 'c9d1d9', icon: 'ff00ff', border: '30363d' }
        }
      },
      {
        id: uuidv4(),
        type: 'snake',
        data: {
          username: 'torvalds'
        }
      }
    ]
  },
  {
    id: 'opensource',
    name: 'Open Source Maintainer',
    desc: 'Showcases repositories, contributions, and community stats.',
    themeId: 'github-classic',
    blocks: [
      {
        id: uuidv4(),
        type: 'about',
        data: {
          paragraph: 'Hi! I am a passionate open source contributor and maintainer of several popular libraries. I believe in free software and building tools for the community.',
          currentlyLearning: 'Rust, WebAssembly',
          currentlyWorkingOn: 'Optimizing compiler performance',
          askMeAbout: 'TypeScript, open source licensing, system architecture'
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          username: 'torvalds',
          showStats: true,
          showTopLanguages: true,
          showStreak: false,
          showActivityGraph: false,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: false,
          useCustomColors: false,
          theme: 'default',
          customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' }
        }
      },
      {
        id: uuidv4(),
        type: 'activity-graph',
        data: {
          username: 'torvalds',
          theme: 'github',
          useCustomColors: false,
          customColors: { bg: 'ffffff', color: '000000', line: '24292e', point: '000000' }
        }
      }
    ]
  }
];
