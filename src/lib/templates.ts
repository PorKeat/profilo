import type { Template } from '@/types/templates';
import { v4 as uuidv4 } from 'uuid';

export const TEMPLATES: Template[] = [
  {
    id: 'premium-dev',
    name: 'Premium Engineer',
    desc: 'Stand out with the highly animated, cyber-style premium hero and glassmorphism stats.',
    themeId: 'cyberpunk',
    category: 'Professional',
    blocks: [
      {
        id: uuidv4(),
        type: 'premium-hero',
        data: {
          name: 'Jane Doe',
          titles: ['Senior Frontend Engineer', 'UI/UX Enthusiast', 'Open Source Maintainer'],
          location: 'Cambodia',
          education: 'Computer Science, B.S.',
          currentFocus: 'Building Next.js 15 apps',
          portfolioUrl: 'https://janedoe.com',
          email: 'hello@janedoe.com',
          skills: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
          sectionTitleColor: '#7C3AED',
          iconColor: '#22D3EE',
          accent3: '#10B981',
          style: 'gradient',
          socials: { github: 'janedoe', linkedin: 'in/janedoe', twitter: 'janedoe' }
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
          showProfileViews: true,
          useCustomColors: true,
          theme: 'github_dark',
          customColors: { bg: '0f172a', title: '60a5fa', text: 'e2e8f0', icon: '2dd4bf', border: '334155' }
        }
      }
    ]
  },
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
          height: 180,
          text: 'Seng Porkeat',
          desc: 'DevOps Engineer | Cloud and Automation Enthusiast',
          color: '0:0f172a,55:1d4ed8,100:0f766e',
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
          theme: 'github_dark',
          customColors: { bg: '0f172a', title: '60a5fa', text: 'e2e8f0', icon: '2dd4bf', border: '334155' }
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          style: 'cards',
          useCustomColors: true,
          theme: 'github_dark',
          customColors: { bg: '0f172a', title: '60a5fa', text: 'e2e8f0', icon: '2dd4bf', border: '334155' },
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
      { id: uuidv4(), type: 'banner', data: { bannerType: 'rect', height: 160, text: 'Netrunner', desc: 'Security-minded software engineer', color: '0:020617,75:064e3b,100:111827', fontColor: 'e5e7eb', section: 'header' } },
      { id: uuidv4(), type: 'terminal', data: { username: 'netrunner', lines: ['> scanning services...', '> hardening interfaces...', '> access granted.'], color: '22c55e' } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: true, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, showProfileViews: false, useCustomColors: true, theme: 'github_dark', customColors: { bg: '020617', title: '22c55e', text: 'e5e7eb', icon: '22c55e', border: '1f2937' } } },
      { id: uuidv4(), type: 'activity-graph', data: { username: 'torvalds', theme: 'github', useCustomColors: true, customColors: { bg: '020617', color: 'e5e7eb', line: '22c55e', point: '86efac' } } },
      { id: uuidv4(), type: 'snake', data: { username: 'torvalds' } }
    ]
  },
  {
    id: 'opensource',
    name: 'Open Source Maintainer',
    desc: 'Showcases repositories, contributions, and community stats.',
    themeId: 'github-classic',
    category: 'Data-Driven',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'waving', height: 160, text: 'Open Source', desc: 'Building tools for the community.', color: '0:052e16,55:166534,100:0f172a', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'about', data: { paragraph: 'Hi! I am a passionate open source contributor and maintainer of several popular libraries. I believe in free software and building tools for the community.', currentlyLearning: 'Rust, WebAssembly', currentlyWorkingOn: 'Optimizing compiler performance', askMeAbout: 'TypeScript, open source licensing, system architecture' } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: false, showPacman: false, show3dContrib: false, showProfileViews: false, useCustomColors: true, theme: 'github_dark', customColors: { bg: '052e16', title: '86efac', text: 'dcfce7', icon: '22c55e', border: '166534' } } },
      { id: uuidv4(), type: 'activity-graph', data: { username: 'torvalds', theme: 'github', useCustomColors: true, customColors: { bg: '052e16', color: 'dcfce7', line: '22c55e', point: '86efac' } } },
      { id: uuidv4(), type: 'support', data: { github: 'torvalds' } }
    ]
  },
  {
    id: 'tech-lead',
    name: 'Tech Lead / Engineering Manager',
    desc: 'Focuses on team leadership, architecture, and extensive experience.',
    themeId: 'github-classic',
    category: 'Professional',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'rect', height: 150, text: 'Sarah Connor', desc: 'Director of Engineering', color: '0:18181b,100:92400e', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'about', data: { paragraph: 'Engineering leader with 10+ years of experience scaling infrastructure and growing teams from 5 to 50+ engineers. Passionate about system design, mentorship, and fostering a culture of engineering excellence.', askMeAbout: 'System Architecture, Engineering Management, Scaling Teams' } },
      { id: uuidv4(), type: 'skills', data: { sectionTitleColor: 'f59e0b', iconColor: 'f59e0b', skills: ['System Design', 'Kubernetes', 'AWS', 'Go', 'Microservices', 'Agile Leadership', 'Engineering Strategy'], style: 'for-the-badge' } },
      { id: uuidv4(), type: 'accordion', data: { sectionTitle: 'My Leadership Philosophy', sectionTitleColor: 'f59e0b', items: [{ id: uuidv4(), title: 'How I measure success', content: 'I measure team success through delivery velocity, system uptime, and team retention.' }, { id: uuidv4(), title: 'My approach to 1:1s', content: 'Regular, unstructured, and focused entirely on the engineer\'s growth and blockers.' }] } },
      { id: uuidv4(), type: 'experience', data: { sectionTitleColor: 'f59e0b', iconColor: 'f59e0b', jobs: [{ id: uuidv4(), company: 'Cyberdyne Systems', title: 'Tech Lead', duration: '2020 - Present', description: 'Led the migration from monolith to microservices, reducing deployment times by 40%. Managed a team of 12 engineers.' }] } }
    ]
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    desc: 'Highlights analytical skills, activity graphs, and Python data stacks.',
    themeId: 'purple-gradient',
    category: 'Data-Driven',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'waving', height: 170, text: 'Ada Lovelace', desc: 'Machine Learning Engineer', color: '0:1e1b4b,55:7c3aed,100:be185d', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'skills', data: { sectionTitleColor: 'a78bfa', iconColor: 'a78bfa', skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'R', 'Pandas', 'Jupyter', 'Scikit-Learn'], style: 'flat-square' } },
      { id: uuidv4(), type: 'activity-graph', data: { sectionTitleColor: 'a78bfa', username: 'torvalds', theme: 'react', useCustomColors: true, customColors: { bg: '1e1b4b', color: 'e9d5ff', line: 'a78bfa', point: 'f9a8d4' } } },
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
      { id: uuidv4(), type: 'banner', data: { bannerType: 'cylinder', height: 160, text: 'system.audit()', desc: 'Security research and low-level tooling', color: '0:020617,100:064e3b', fontColor: 'e5e7eb', section: 'header' } },
      { id: uuidv4(), type: 'typing', data: { lines: ['> analyzing binaries...', '> tracing packets...', '> hardening attack surfaces...'], color: '22c55e', size: 22, center: false, vCenter: true } },
      { id: uuidv4(), type: 'skills', data: { sectionTitleColor: '22c55e', iconColor: '22c55e', skills: ['C++', 'Assembly', 'Rust', 'Kali Linux', 'Metasploit', 'Wireshark', 'Reverse Engineering'], style: 'plastic' } },
      { id: uuidv4(), type: 'github-stats', data: { username: 'torvalds', showStats: true, showTopLanguages: true, showStreak: false, showActivityGraph: false, showSnake: true, showPacman: false, show3dContrib: false, showProfileViews: true, useCustomColors: true, theme: 'github_dark', customColors: { bg: '020617', title: '22c55e', text: 'e5e7eb', icon: '22c55e', border: '1f2937' } } }
    ]
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Designer',
    desc: 'Highly visual with a focus on project presentation and color.',
    themeId: 'clean-light',
    category: 'Creative',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'soft', height: 180, text: 'Alex Design', desc: 'Product Designer', color: '0:fce7f3,50:e0f2fe,100:dbeafe', fontColor: '0f172a', section: 'header' } },
      { id: uuidv4(), type: 'bento', data: { sectionTitleColor: 'ec4899', iconColor: 'ec4899', githubUsername: 'alexdesign', bio: 'Creating intuitive, beautiful digital experiences with a focus on micro-interactions and accessible design systems.', role: 'Senior Product Designer', skills: ['Figma', 'Framer', 'React', 'CSS', 'User Research', 'Prototyping'] } },
      { id: uuidv4(), type: 'projects', data: { style: 'cards', useCustomColors: false, theme: 'default', customColors: { bg: 'ffffff', title: '000000', text: '333333', icon: '000000', border: 'e2e8f0' }, projects: [{ id: uuidv4(), name: 'Fintech Dashboard UX', description: 'Redesigned the core user flow, increasing conversion by 25%.', githubUrl: '', demoUrl: 'https://dribbble.com', techStack: ['Figma', 'Framer'] }, { id: uuidv4(), name: 'Design System', description: 'Comprehensive component library used by 50+ developers.', githubUrl: '', demoUrl: 'https://figma.com', techStack: ['Figma', 'Storybook'] }] } }
    ]
  },
  {
    id: 'backend-eng',
    name: 'Backend Engineer',
    desc: 'Production-grade API, database, and distributed systems profile.',
    themeId: 'github-classic',
    category: 'Professional',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'waving', height: 165, text: 'Backend Engineer', desc: 'APIs | Databases | Distributed Systems', color: '0:083344,55:0e7490,100:1e293b', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'typing', data: { lines: ['Designing resilient APIs', 'Scaling databases carefully', 'Shipping observable backend systems', 'Making latency boring'], color: '22d3ee', size: 22, center: true, vCenter: true } },
      {
        id: uuidv4(),
        type: 'about',
        data: {
          sectionTitle: 'About Me',
          sectionTitleColor: '22d3ee',
          paragraph: 'Backend engineer focused on building reliable APIs, event-driven platforms, and data-heavy services. I care about clean boundaries, predictable deployments, strong observability, and systems that stay calm when traffic spikes.',
          currentlyLearning: 'Distributed tracing, consensus protocols, and database internals',
          currentlyWorkingOn: 'A high-throughput event pipeline with Kafka, Redis, and PostgreSQL',
          askMeAbout: 'API design, database performance, queues, caching, and production debugging'
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          sectionTitle: 'Backend Toolbox',
          sectionTitleColor: '22d3ee',
          iconColor: '22d3ee',
          skills: ['Go', 'Rust', 'Java', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'GraphQL', 'gRPC', 'Docker', 'Kubernetes', 'Prometheus'],
          groups: [
            { id: uuidv4(), name: 'Languages', skills: ['Go', 'Rust', 'Java', 'TypeScript'] },
            { id: uuidv4(), name: 'Data Layer', skills: ['PostgreSQL', 'Redis', 'Kafka', 'MongoDB'] },
            { id: uuidv4(), name: 'Platform', skills: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'] }
          ],
          style: 'for-the-badge'
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          sectionTitle: 'Engineering Signals',
          sectionTitleColor: '22d3ee',
          username: 'torvalds',
          showStats: true,
          showTopLanguages: true,
          showStreak: true,
          showActivityGraph: true,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: true,
          useCustomColors: true,
          theme: 'github_dark',
          customColors: { bg: '083344', title: '67e8f9', text: 'e2e8f0', icon: '22d3ee', border: '155e75' }
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          sectionTitle: 'Production Projects',
          sectionTitleColor: '22d3ee',
          style: 'cards',
          useCustomColors: true,
          theme: 'github_dark',
          customColors: { bg: '083344', title: '67e8f9', text: 'e2e8f0', icon: '22d3ee', border: '155e75' },
          projects: [
            { id: uuidv4(), name: 'Realtime Event Gateway', description: 'High-throughput event ingestion service with retries, dead-letter queues, tracing, and backpressure controls.', githubUrl: 'https://github.com/backend/event-gateway', demoUrl: '', techStack: ['Go', 'Kafka', 'Redis'] },
            { id: uuidv4(), name: 'API Observability Kit', description: 'Drop-in middleware for metrics, structured logs, request IDs, and distributed traces across microservices.', githubUrl: 'https://github.com/backend/observability-kit', demoUrl: '', techStack: ['TypeScript', 'OpenTelemetry', 'Prometheus'] }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'experience',
        data: {
          sectionTitle: 'Backend Impact',
          sectionTitleColor: '22d3ee',
          iconColor: '22d3ee',
          jobs: [
            { id: uuidv4(), company: 'Platform Team', title: 'Backend Engineer', duration: '2022 - Present', description: 'Designed service boundaries, optimized database queries, and improved API reliability for production workloads.', techStack: ['Go', 'PostgreSQL', 'Kafka', 'Kubernetes'] }
          ]
        }
      },
      { id: uuidv4(), type: 'terminal', data: { sectionTitle: 'Ship Log', sectionTitleColor: '22d3ee', username: 'backend', lines: ['$ curl /healthz -> 200 OK', '$ p95 latency: 42ms', '$ deploy --canary --observe', '$ incidents prevented > incidents fixed'], color: '22d3ee' } },
      { id: uuidv4(), type: 'socials', data: { github: 'backenddev', linkedin: 'backenddev', twitter: '', portfolio: 'https://backend.dev', email: 'hello@backend.dev' } }
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
      { id: uuidv4(), type: 'banner', data: { bannerType: 'waving', height: 165, text: 'Hello, World!', desc: 'Writing about code and design.', color: '0:831843,55:be123c,100:92400e', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'blog-posts', data: { platform: 'dev.to', username: 'devteam' } },
      { id: uuidv4(), type: 'socials', data: { github: 'devteam', linkedin: '', twitter: 'devteam', portfolio: '', email: '' } },
      { id: uuidv4(), type: 'support', data: { kofi: 'devteam', buyMeACoffee: '', patreon: '', qrCodeBase64: '' } }
    ]
  },
  {
    id: 'game-dev',
    name: 'Game Developer',
    desc: 'Arcade-inspired portfolio for gameplay, tools, engines, and shipped prototypes.',
    themeId: 'cyberpunk',
    category: 'Fun & Quirky',
    blocks: [
      { id: uuidv4(), type: 'banner', data: { bannerType: 'cylinder', height: 165, text: 'Game Developer', desc: 'Gameplay Systems | Tools | Prototypes', color: '0:1e1b4b,55:4338ca,100:be185d', fontColor: 'ffffff', section: 'header' } },
      { id: uuidv4(), type: 'typing', data: { lines: ['Press START to continue', 'Building responsive game feel', 'Designing tools for faster levels', 'Shaders, systems, boss fights'], color: 'c084fc', size: 22, center: true, vCenter: true } },
      {
        id: uuidv4(),
        type: 'bento',
        data: {
          sectionTitle: 'Player Profile',
          sectionTitleColor: 'c084fc',
          iconColor: 'c084fc',
          githubUsername: 'playerone',
          role: 'Indie Game Developer',
          bio: 'I build small games with expressive controls, punchy feedback, and systems that make players want one more run.',
          skills: ['Unity', 'Unreal Engine', 'Godot', 'C#', 'C++', 'Shaders', 'Game Feel', 'Level Design']
        }
      },
      {
        id: uuidv4(),
        type: 'about',
        data: {
          sectionTitle: 'Quest Log',
          sectionTitleColor: 'c084fc',
          paragraph: 'Game developer focused on mechanics-first prototypes, polished moment-to-moment feel, and technical art pipelines. I enjoy turning rough ideas into playable loops, then tuning the tiny details until the game feels alive.',
          currentlyLearning: 'Procedural animation, shader graph tricks, and multiplayer netcode',
          currentlyWorkingOn: 'A neon roguelite prototype with reactive enemies and upgrade synergies',
          askMeAbout: 'Game feel, Unity tooling, combat systems, shaders, and rapid prototyping'
        }
      },
      {
        id: uuidv4(),
        type: 'skills',
        data: {
          sectionTitle: 'Loadout',
          sectionTitleColor: 'c084fc',
          iconColor: 'c084fc',
          skills: ['Unity', 'C#', 'Unreal Engine', 'C++', 'Godot', 'Blender', 'HLSL', 'FMOD', 'Aseprite', 'Git'],
          groups: [
            { id: uuidv4(), name: 'Engines', skills: ['Unity', 'Unreal Engine', 'Godot'] },
            { id: uuidv4(), name: 'Code', skills: ['C#', 'C++', 'HLSL', 'Lua'] },
            { id: uuidv4(), name: 'Creative Tools', skills: ['Blender', 'Aseprite', 'FMOD'] }
          ],
          style: 'for-the-badge'
        }
      },
      {
        id: uuidv4(),
        type: 'projects',
        data: {
          sectionTitle: 'Featured Builds',
          sectionTitleColor: 'c084fc',
          style: 'cards',
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '1e1b4b', title: 'c084fc', text: 'f8fafc', icon: 'f472b6', border: '4c1d95' },
          projects: [
            { id: uuidv4(), name: 'Neon Dungeon Runner', description: 'Fast roguelite prototype with dash combat, reactive enemy waves, and procedural room pacing.', githubUrl: 'https://github.com/playerone/neon-dungeon-runner', demoUrl: 'https://itch.io', techStack: ['Unity', 'C#', 'HLSL'] },
            { id: uuidv4(), name: 'Level Forge Toolkit', description: 'Editor extension for snapping modular rooms, testing spawn points, and balancing encounters from one panel.', githubUrl: 'https://github.com/playerone/level-forge', demoUrl: '', techStack: ['Unity', 'C#', 'Editor Tools'] }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'github-stats',
        data: {
          sectionTitle: 'Arcade Stats',
          sectionTitleColor: 'c084fc',
          username: 'torvalds',
          showStats: true,
          showTopLanguages: true,
          showStreak: true,
          showActivityGraph: false,
          showSnake: false,
          showPacman: false,
          show3dContrib: false,
          showProfileViews: true,
          useCustomColors: true,
          theme: 'radical',
          customColors: { bg: '1e1b4b', title: 'c084fc', text: 'f8fafc', icon: 'f472b6', border: '4c1d95' }
        }
      },
      { id: uuidv4(), type: 'pacman', data: { username: 'torvalds' } },
      { id: uuidv4(), type: 'snake', data: { username: 'torvalds' } },
      { id: uuidv4(), type: 'quote', data: { theme: 'radical', layout: 'horizontal' } },
      { id: uuidv4(), type: 'socials', data: { github: 'playerone', linkedin: '', twitter: 'playerone', portfolio: 'https://playerone.dev', email: 'hello@playerone.dev' } }
    ]
  }
];
