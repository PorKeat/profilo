import { Block, HeroBlock, BannerBlock, TypingBlock, ActivityGraphBlock, SnakeBlock, PacmanBlock, AboutBlock, TechnicalSkillsBlock, GitHubStatsBlock, FeaturedProjectsBlock, SocialLinksBlock, ContactBlock } from '../types/blocks';
import { ThemeId } from '../types/theme';
import { POPULAR_SKILLS } from '../constants/skills';

export function generateMarkdown(blocks: Block[], themeId: ThemeId, isPreview: boolean = false): string {
  let markdown = '';

  blocks.forEach((block, index) => {
    switch (block.type) {
      case 'hero':
        markdown += generateHero(block);
        break;
      case 'banner':
        markdown += generateBanner(block);
        break;
      case 'typing':
        markdown += generateTyping(block);
        break;
      case 'about':
        markdown += generateAbout(block);
        break;
      case 'skills':
        markdown += generateSkills(block);
        break;
      case 'github-stats':
        markdown += generateGitHubStats(block, isPreview);
        break;
      case 'activity-graph':
        markdown += generateActivityGraph(block, isPreview);
        break;
      case 'snake':
        markdown += generateSnake(block, isPreview);
        break;
      case 'pacman':
        markdown += generatePacman(block, isPreview);
        break;
      case 'projects':
        markdown += generateProjects(block);
        break;
      case 'socials':
        markdown += generateSocials(block);
        break;
      case 'contact':
        markdown += generateContact(block);
        break;
    }
    
    // Add separator if it's not the last block
    if (index < blocks.length - 1) {
      markdown += '\n<br />\n\n';
    }
  });

  return markdown.trim();
}

function generateHero(block: HeroBlock): string {
  const { name, title, shortIntro, avatarUrl } = block.data;
  let md = `<div align="center">\n`;
  if (avatarUrl) {
    md += `  <img src="${avatarUrl}" alt="${name}" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />\n\n`;
  }
  md += `  <h1>Hi there, I'm ${name} 👋</h1>\n`;
  md += `  <h3>${title}</h3>\n`;
  md += `  <p>${shortIntro}</p>\n`;
  md += `</div>\n`;
  return md;
}

function generateBanner(block: BannerBlock): string {
  const { bannerType, height, text, desc, color, fontColor, section } = block.data;
  const safeText = encodeURIComponent(text);
  const safeDesc = encodeURIComponent(desc);
  let md = `<div align="center">\n`;
  md += `  <img src="https://capsule-render.vercel.app/api?type=${bannerType}&color=${color}&height=${height}&section=${section}&text=${safeText}&desc=${safeDesc}&fontColor=${fontColor}&fontSize=80&descSize=22&fontAlignY=38&descAlignY=60" alt="Banner" />\n`;
  md += `</div>\n`;
  return md;
}

function generateTyping(block: TypingBlock): string {
  const { lines, color, size, center, vCenter } = block.data;
  const safeLines = lines.map(l => encodeURIComponent(l)).join(';');
  let md = `<div align="center">\n`;
  md += `  <a href="https://git.io/typing-svg">\n`;
  md += `    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=${size}&pause=1000&color=${color}&center=${center}&vCenter=${vCenter}&width=600&lines=${safeLines}" alt="Typing SVG" />\n`;
  md += `  </a>\n`;
  md += `</div>\n`;
  return md;
}

function generateAbout(block: AboutBlock): string {
  const { paragraph, currentlyLearning, currentlyWorkingOn, askMeAbout } = block.data;
  let md = `## About Me\n\n`;
  if (paragraph) md += `${paragraph}\n\n`;
  if (currentlyWorkingOn) md += `- 🔭 I’m currently working on **${currentlyWorkingOn}**\n`;
  if (currentlyLearning) md += `- 🌱 I’m currently learning **${currentlyLearning}**\n`;
  if (askMeAbout) md += `- 💬 Ask me about **${askMeAbout}**\n`;
  md += `\n`;
  return md;
}

function generateSkills(block: TechnicalSkillsBlock): string {
  const { skills, style } = block.data;
  if (skills.length === 0) return '';
  
  let md = `## Technical Skills\n\n`;
  md += `<div align="left">\n`;
  
  skills.forEach(skill => {
    const skillDef = POPULAR_SKILLS.find(s => s.name === skill);
    const safeSkillName = encodeURIComponent(skill);
    const iconName = skillDef ? skillDef.icon : skill.toLowerCase().replace(/\s+/g, '');
    
    md += `  <img src="https://img.shields.io/badge/${safeSkillName}-informational?style=${style}&logo=${iconName}&logoColor=white&color=2bbc8a" alt="${skill}" />\n`;
  });
  
  md += `</div>\n\n`;
  return md;
}

function generateGitHubStats(block: GitHubStatsBlock, isPreview: boolean): string {
  const { username, showStats, showTopLanguages, showStreak, showActivityGraph, showSnake, show3dContrib, showProfileViews, useCustomColors, customColors, theme } = block.data;
  let md = `## GitHub Statistics\n\n`;
  md += `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? targetUsername : username;
  
  let colorParams = '';
  if (useCustomColors && customColors) {
    colorParams = `&bg_color=${customColors.bg}&title_color=${customColors.title}&text_color=${customColors.text}&icon_color=${customColors.icon}&border_color=${customColors.border}`;
  } else {
    colorParams = `&theme=${theme}`;
  }
  
  if (showProfileViews) {
    const vcColor = useCustomColors && customColors ? customColors.title : 'ff003c';
    md += `  <img src="https://komarev.com/ghpvc/?username=${previewUsername}&color=${vcColor}&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views" />\n  <br /><br />\n`;
  }
  
  if (showStats) {
    md += `  <img src="https://github-readme-stats.vercel.app/api?username=${previewUsername}&show_icons=true${colorParams}" alt="${username}'s GitHub stats" />\n`;
  }
  if (showTopLanguages) {
    md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${previewUsername}&layout=compact${colorParams}" alt="Top Languages" />\n`;
  }
  if (showStreak) {
    let streakParams = '';
    if (useCustomColors && customColors) {
      streakParams = `&background=${customColors.bg}&border=${customColors.border}&ring=${customColors.icon}&fire=${customColors.icon}&currStreakNum=${customColors.text}&sideNums=${customColors.text}&currStreakLabel=${customColors.title}&sideLabels=${customColors.title}&dates=${customColors.text}`;
    } else {
      streakParams = `&theme=${theme}`;
    }
    md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${streakParams}" alt="GitHub Streak" />\n`;
  }
  
  if (showActivityGraph) {
    md += `  <br />\n`;
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}&bg_color=1F222E&color=F8D866&line=F8D866&point=FFFFFF&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
  }
  if (showSnake) {
    md += `  <br />\n`;
    md += `  <!-- Note: The snake animation requires setting up the Platane/snk GitHub Action. -->\n`;
    if (isPreview) {
      md += `  <img src="https://raw.githubusercontent.com/Platane/Platane/output/github-contribution-grid-snake.svg" alt="GitHub Snake Animation Preview" />\n`;
    } else {
      md += `  <img src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" alt="GitHub Snake Animation" />\n`;
    }
  }
  if (show3dContrib) {
    md += `  <br />\n`;
    md += `  <!-- Note: The 3D contribution graph requires setting up the yoshi389111/github-profile-3d-contrib Action. -->\n`;
    if (isPreview) {
      md += `  <img src="https://raw.githubusercontent.com/yoshi389111/yoshi389111/main/profile-3d-contrib/profile-night-rainbow.svg" alt="3D Contribution Graph Preview" />\n`;
    } else {
      md += `  <img src="https://raw.githubusercontent.com/${username}/${username}/main/profile-3d-contrib/profile-night-rainbow.svg" alt="3D Contribution Graph" />\n`;
    }
  }
  if (block.data.showPacman) {
    md += `  <br />\n`;
    md += `  <!-- Note: The Pacman animation requires setting up the abozanona/pacman-contribution-graph Action. -->\n`;
    if (isPreview) {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/abozanona/abozanona/main/images/github-snake-dark.svg" />\n`;
      md += `    <img src="https://raw.githubusercontent.com/abozanona/abozanona/main/images/github-snake.svg" alt="Pacman Animation Preview" />\n`;
      md += `  </picture>\n`;
    } else {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph-dark.svg" />\n`;
      md += `    <img src="https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg" alt="Pacman Animation" />\n`;
      md += `  </picture>\n`;
    }
  }
  
  md += `</div>\n\n`;
  return md;
}

function generateActivityGraph(block: ActivityGraphBlock, isPreview: boolean): string {
  const { username, theme, useCustomColors, customColors } = block.data;
  let md = `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? 'ashutosh00710' : targetUsername;
  
  let colorParams = '';
  if (useCustomColors && customColors) {
    colorParams = `&bg_color=${customColors.bg}&color=${customColors.color}&line=${customColors.line}&point=${customColors.point}`;
  } else {
    colorParams = `&theme=${theme}`;
  }
  
  md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${colorParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
  md += `</div>\n`;
  return md;
}

function generateSnake(block: SnakeBlock, isPreview: boolean): string {
  const { username } = block.data;
  let md = `<div align="center">\n`;
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  
  md += `  <!-- Note: The snake animation requires setting up the Platane/snk GitHub Action. -->\n`;
  if (isPreview || targetUsername === 'torvalds') {
    md += `  <img src="https://raw.githubusercontent.com/Platane/Platane/output/github-contribution-grid-snake.svg" alt="GitHub Snake Animation Preview" />\n`;
  } else {
    md += `  <img src="https://raw.githubusercontent.com/${targetUsername}/${targetUsername}/output/github-contribution-grid-snake.svg" alt="GitHub Snake Animation" />\n`;
  }
  md += `</div>\n`;
  return md;
}

function generatePacman(block: PacmanBlock, isPreview: boolean): string {
  const { username } = block.data;
  let md = `<div align="center">\n`;
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  
  md += `  <!-- Note: The Pacman animation requires setting up the abozanona/pacman-contribution-graph Action. -->\n`;
  if (isPreview || targetUsername === 'torvalds') {
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/abozanona/pacman-contribution-graph/main/assets/demo/pacman-dark.svg" />\n`;
    md += `    <img src="https://raw.githubusercontent.com/abozanona/pacman-contribution-graph/main/assets/demo/pacman.svg" alt="Pacman Animation Preview" />\n`;
    md += `  </picture>\n`;
  } else {
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${targetUsername}/${targetUsername}/output/pacman-contribution-graph-dark.svg" />\n`;
    md += `    <img src="https://raw.githubusercontent.com/${targetUsername}/${targetUsername}/output/pacman-contribution-graph.svg" alt="Pacman Animation" />\n`;
    md += `  </picture>\n`;
  }
  md += `</div>\n`;
  return md;
}

function generateProjects(block: FeaturedProjectsBlock): string {
  const { projects, style, useCustomColors, theme, customColors } = block.data;
  if (!projects || projects.length === 0) return '';
  
  let md = `## Featured Projects\n\n`;
  
  if (style === 'cards') {
    md += `<div align="center">\n`;
    let colorParams = '';
    if (useCustomColors && customColors) {
      colorParams = `&bg_color=${customColors.bg}&title_color=${customColors.title}&text_color=${customColors.text}&icon_color=${customColors.icon}&border_color=${customColors.border}`;
    } else {
      colorParams = `&theme=${theme}`;
    }
    
    projects.forEach(project => {
      if (project.githubUrl) {
        // extract username and repo from github URL
        const parts = project.githubUrl.replace(/\/$/, '').split('/');
        const repo = parts.pop();
        const user = parts.pop();
        if (user && repo) {
          md += `  <a href="${project.githubUrl}">\n`;
          md += `    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repo}${colorParams}" width="400" />\n`;
          md += `  </a>\n`;
        }
      }
    });
    md += `</div>\n\n`;
  } else {
    projects.forEach(project => {
      md += `### ${project.name}\n`;
      md += `${project.description}\n\n`;
      if (project.techStack && project.techStack.length > 0) {
        md += `**Tech Stack:** ${project.techStack.join(', ')}\n\n`;
      }
      if (project.githubUrl) {
        md += `[GitHub Repository](${project.githubUrl}) `;
      }
      if (project.demoUrl) {
        md += `| [Live Demo](${project.demoUrl})`;
      }
      md += `\n\n`;
    });
  }
  return md;
}

function generateSocials(block: SocialLinksBlock): string {
  const { github, linkedin, twitter, portfolio, email } = block.data;
  let md = `## Connect With Me\n\n`;
  md += `<p align="left">\n`;
  
  if (github) md += `  <a href="${github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>\n`;
  if (linkedin) md += `  <a href="${linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
  if (twitter) md += `  <a href="${twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
  if (portfolio) md += `  <a href="${portfolio}"><img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=globe&logoColor=white" alt="Portfolio" /></a>\n`;
  if (email) md += `  <a href="mailto:${email}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
  
  md += `</p>\n\n`;
  return md;
}

function generateContact(block: ContactBlock): string {
  const { email, message } = block.data;
  let md = `## Contact\n\n`;
  md += `${message}\n\n`;
  md += `You can reach me at: [${email}](mailto:${email})\n\n`;
  return md;
}
