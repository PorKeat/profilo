import { Block } from './types/blocks';
import { ThemeId } from './types/theme';
import { v4 as uuidv4 } from 'uuid';

export type TemplateCategory = 'Minimal' | 'Creative' | 'Professional' | 'Data-Driven' | 'Fun & Quirky';

export interface Template {
  id: string;
  name: string;
  desc: string;
  themeId: ThemeId;
  category: TemplateCategory;
  blocks: Block[];
}

export const TEMPLATES: Template[] = [
  {
    id: 'devops',
    name: 'DevOps Engineer',
    desc: 'Focus on tools, CI/CD pipelines, and GitHub stats. (PorKeat configuration)',
    themeId: 'github-classic',
    category: 'Professional',
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
    category: 'Minimal',
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
    category: 'Creative',
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
    category: 'Data-Driven',
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
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead / Engineering Manager',
    desc: 'Focuses on team leadership, architecture, and extensive experience.',
    themeId: 'github-classic',
    category: 'Professional',
    blocks: [
      { id: uuidv4(), type: 'hero', data: { name: 'Sarah Connor', title: 'Director of Engineering', shortIntro: 'Building high-performance teams and scalable distributed systems.', bannerStyle: 'gradient' } },
      { id: uuidv4(), type: 'about', data: { paragraph: 'Engineering leader with 10+ years of experience scaling infrastructure and growing teams from 5 to 50+ engineers. Passionate about system design, mentorship, and fostering a culture of engineering excellence.', askMeAbout: 'System Architecture, Engineering Management, Scaling Teams' } },
      { id: uuidv4(), type: 'skills', data: { skills: ['System Design', 'Kubernetes', 'AWS', 'Go', 'Microservices', 'Agile Leadership', 'Engineering Strategy'], style: 'flat' } },
      { id: uuidv4(), type: 'experience', data: { jobs: [{ id: uuidv4(), company: 'Cyberdyne Systems', title: 'Tech Lead', duration: '2020 - Present', description: 'Led the migration from monolith to microservices, reducing deployment times by 40%. Managed a team of 12 engineers.' }] } }
    ]
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    desc: 'Highlights analytical skills, activity graphs, and Python data stacks.',
    themeId: 'purple-gradient',
    category: 'Data-Driven',
    blocks: [
      { id: uuidv4(), type: 'hero', data: { name: 'Ada Lovelace', title: 'Machine Learning Engineer', shortIntro: 'Turning raw data into actionable insights and predictive models.', bannerStyle: 'image' } },
      { id: uuidv4(), type: 'skills', data: { skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'R', 'Pandas', 'Jupyter', 'Scikit-Learn'], style: 'for-the-badge' } },
      { id: uuidv4(), type: 'activity-graph', data: { username: 'torvalds', theme: 'react', useCustomColors: true, customColors: { bg: '0d1117', color: 'd8b4fe', line: 'a855f7', point: 'ffffff' } } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: true, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: true, showProfileViews: false, useCustomColors: true, theme: 'tokyonight', customColors: { bg: '1a1b26', title: 'c0caf5', text: 'a9b1d6', icon: 'bb9af7', border: '24283b' } } }
    ]
  },
  {
    id: 'neon-hacker',
    name: 'Neon Hacker',
    desc: 'Terminal aesthetics, aggressive glowing borders, and cyber themes.',
    themeId: 'cyberpunk',
    category: 'Creative',
    blocks: [
      { id: uuidv4(), type: 'typing', data: { lines: ['> _Initializing root access...', '> _Bypassing mainframe security...', '> _Access granted.'], color: '00ff00', size: 24, center: false, vCenter: true } },
      { id: uuidv4(), type: 'skills', data: { skills: ['C++', 'Assembly', 'Rust', 'Kali Linux', 'Metasploit', 'Wireshark', 'Reverse Engineering'], style: 'plastic' } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: true, showPacman: false, show3dContrib: false, showProfileViews: true, useCustomColors: true, theme: 'radical', customColors: { bg: '000000', title: '00ff00', text: '00ff00', icon: '00ff00', border: '00ff00' } } }
    ]
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Designer',
    desc: 'Highly visual with a focus on project presentation and color.',
    themeId: 'clean-light',
    category: 'Creative',
    blocks: [
      { id: uuidv4(), type: 'hero', data: { name: 'Alex Design', title: 'Product Designer', shortIntro: 'Creating intuitive, beautiful digital experiences.', bannerStyle: 'gradient' } },
      { id: uuidv4(), type: 'projects', data: { style: 'cards', useCustomColors: false, theme: 'default', customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' }, projects: [{ id: uuidv4(), name: 'Fintech Dashboard UX', description: 'Redesigned the core user flow, increasing conversion by 25%.', githubUrl: '', demoUrl: 'https://dribbble.com', techStack: ['Figma', 'Framer'] }, { id: uuidv4(), name: 'Design System', description: 'Comprehensive component library used by 50+ developers.', githubUrl: '', demoUrl: 'https://figma.com', techStack: ['Figma', 'Storybook'] }] } },
      { id: uuidv4(), type: 'skills', data: { skills: ['Figma', 'Adobe XD', 'Framer', 'Prototyping', 'User Research', 'Wireframing', 'CSS'], style: 'flat' } }
    ]
  },
  {
    id: 'backend-eng',
    name: 'Backend Engineer',
    desc: 'No-nonsense layout heavy on infrastructure, APIs, and databases.',
    themeId: 'github-classic',
    category: 'Professional',
    blocks: [
      { id: uuidv4(), type: 'about', data: { paragraph: 'Backend engineer specializing in distributed systems, API design, and high-performance databases. I ensure the servers never go down.', currentlyLearning: 'Distributed Consensus Algorithms', askMeAbout: 'Database Sharding, gRPC, Event-Driven Architecture' } },
      { id: uuidv4(), type: 'skills', data: { skills: ['Go', 'Rust', 'Java', 'PostgreSQL', 'Redis', 'Kafka', 'GraphQL', 'Docker'], style: 'flat-square' } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, showProfileViews: false, useCustomColors: false, theme: 'default', customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' } } }
    ]
  },
  {
    id: 'student',
    name: 'Student / Junior',
    desc: 'Focused on current learning goals, university projects, and contact info.',
    themeId: 'clean-light',
    category: 'Minimal',
    blocks: [
      { id: uuidv4(), type: 'hero', data: { name: 'CS Student', title: 'Aspiring Software Engineer', shortIntro: 'Currently studying Computer Science. Looking for Summer Internships!', bannerStyle: 'none' } },
      { id: uuidv4(), type: 'about', data: { paragraph: 'I am a passionate computer science student eager to learn and build impactful software. I love participating in hackathons and contributing to open source.', currentlyLearning: 'React, Node.js, Data Structures', askMeAbout: 'Hackathons, Algorithms' } },
      { id: uuidv4(), type: 'projects', data: { style: 'text', useCustomColors: false, theme: 'default', customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' }, projects: [{ id: uuidv4(), name: 'University Capstone', description: 'A web app for tracking campus events.', githubUrl: 'https://github.com/student/repo', demoUrl: '', techStack: ['JavaScript', 'HTML'] }] } },
      { id: uuidv4(), type: 'socials', data: { github: 'student', linkedin: 'student', twitter: '', portfolio: '', email: 'student@university.edu' } }
    ]
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    desc: 'Integrates Dev.to/Medium blog posts natively with a vibrant hero section.',
    themeId: 'purple-gradient',
    category: 'Creative',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'waving', height: 200, text: 'Hello, World! 👋', desc: 'I write about code and design.', color: '0:8a2387,50:e94057,100:f27121', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'blog-posts', data: { platform: 'dev.to', username: 'devteam' } },
      { id: uuidv4(), type: 'socials', data: { github: 'devteam', linkedin: '', twitter: 'devteam', portfolio: '', email: '' } },
      { id: uuidv4(), type: 'support', data: { kofi: 'devteam', buyMeACoffee: '', patreon: '', qrCodeBase64: '' } }
    ]
  },
  {
    id: 'game-dev',
    name: 'Game Developer',
    desc: 'Features Pacman and Snake animations prominently.',
    themeId: 'cyberpunk',
    category: 'Fun & Quirky',
    blocks: [
      { id: uuidv4(), type: 'hero', data: { name: 'Player One', title: 'Indie Game Developer', shortIntro: 'Press Start to continue.', bannerStyle: 'image' } },
      { id: uuidv4(), type: 'skills', data: { skills: ['Unity', 'C#', 'Unreal Engine', 'C++', 'Godot', 'Blender', 'HLSL'], style: 'for-the-badge' } },
      { id: uuidv4(), type: 'pacman', data: { username: 'torvalds' } },
      { id: uuidv4(), type: 'snake', data: { username: 'torvalds' } }
    ]
  }
];
