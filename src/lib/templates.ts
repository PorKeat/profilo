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
          color: '0:4a0000,50:b30000,100:4b86f7',
          fontColor: 'ffffff',
          section: 'header',
        }
      },
      {
        id: uuidv4(),
        type: 'typing',
        data: {
          lines: ['Automating the Future', 'Building Scalable Infrastructure', 'Cloud Native | CI/CD | Containers', 'Turning Coffee into Pipelines'],
          color: '4b86f7',
          size: 24,
          center: true,
          vCenter: true
        }
      },
      {
        id: uuidv4(),
        type: 'about',
        data: {
          paragraph: 'Passionate Site Reliability and DevOps Engineer with a focus on designing, building, and maintaining highly available cloud infrastructure. I believe in Infrastructure as Code, relentless automation, and building paved roads for developers.',
          currentlyLearning: 'eBPF, Cilium, Advanced Kubernetes Operators',
          currentlyWorkingOn: 'Building a multi-region active-active cloud architecture',
          askMeAbout: 'Terraform, AWS, CI/CD Pipelines, and Incident Management'
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'Jenkins', 'GitHub Actions', 'Linux', 'Python', 'Go', 'Bash'],
          style: 'for-the-badge'
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          username: 'PorKeat',
          showStats: true,
          showTopLanguages: true,
          showStreak: false,
          showActivityGraph: false,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: true,
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '000000', title: '4b86f7', text: 'ffffff', icon: '4b86f7', border: '4b86f7' }
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          style: 'cards',
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '000000', title: '4b86f7', text: 'ffffff', icon: '4b86f7', border: '4b86f7' },
          projects: [
            { id: uuidv4(), name: 'K8s Cluster Autoscaler', description: 'Custom controller for scaling nodes based on custom metrics.', githubUrl: 'https://github.com/PorKeat', demoUrl: '', techStack: ['Go', 'Kubernetes'] },
            { id: uuidv4(), name: 'Terraform AWS Modules', description: 'Production-ready IaC modules for AWS VPC, EKS, and RDS.', githubUrl: 'https://github.com/PorKeat', demoUrl: '', techStack: ['Terraform', 'AWS'] }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'activity-graph',
        data: {
          username: 'PorKeat',
          theme: 'react',
          useCustomColors: false,
          customColors: { bg: '000000', color: '4b86f7', line: '4b86f7', point: 'ffffff' }
        }
      },
      {
        id: uuidv4(),
        type: 'pacman',
        data: {
          username: 'PorKeat',
        }
      },
      {
        id: uuidv4(),
        type: 'socials',
        data: {
          github: 'PorKeat',
          linkedin: 'PorKeat',
          twitter: 'PorKeat',
          portfolio: '',
          email: 'hello@example.com'
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
        type: 'banner',
        data: {
          bannerType: 'soft',
          height: 120,
          text: '',
          desc: '',
          color: '0:f8f9fa,100:e9ecef',
          fontColor: '000000',
          section: 'header',
        }
      },
      {
        id: uuidv4(),
        type: 'hero',
        data: {
          name: 'Alex Developer',
          title: 'Frontend Engineer',
          shortIntro: 'Less is more. Focusing on performance and beautiful typography.',
          bannerStyle: 'none'
        }
      },
      {
        id: uuidv4(),
        type: 'about',
        data: {
          paragraph: 'I am a software engineer with a passion for building clean, fast, and accessible user interfaces. I believe in minimalism in both code and design. When I am not coding, I enjoy reading about typography and architecture.',
          currentlyLearning: 'Rust & WebAssembly',
          currentlyWorkingOn: 'A minimal, distraction-free writing app',
          askMeAbout: 'UI/UX Design, Performance optimization, Accessibility'
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Figma', 'Vercel'],
          style: 'flat-square'
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
          useCustomColors: true,
          theme: 'default',
          customColors: { bg: 'f6f8fa', title: '0366d6', text: '24292f', icon: '0366d6', border: 'e1e4e8' }
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          style: 'cards',
          useCustomColors: true,
          theme: 'default',
          customColors: { bg: 'f6f8fa', title: '0366d6', text: '24292f', icon: '0366d6', border: 'e1e4e8' },
          projects: [
            { id: uuidv4(), name: 'Minimalist Notes', description: 'A distraction-free markdown note taking application.', githubUrl: 'https://github.com/alex/notes', demoUrl: 'https://notes.app', techStack: ['React', 'TailwindCSS'] },
            { id: uuidv4(), name: 'Typography System', description: 'An open-source design system focused purely on readability.', githubUrl: 'https://github.com/alex/type', demoUrl: '', techStack: ['CSS', 'Figma'] }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'socials',
        data: {
          github: 'alexdev',
          linkedin: 'alexdev',
          twitter: 'alexdev',
          portfolio: 'https://alexdev.com',
          email: 'hello@alexdev.com'
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
