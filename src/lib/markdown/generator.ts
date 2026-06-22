import { Block, HeroBlock, BannerBlock, TypingBlock, ActivityGraphBlock, SnakeBlock, PacmanBlock, AboutBlock, TechnicalSkillsBlock, GitHubStatsBlock, FeaturedProjectsBlock, SocialLinksBlock, ContactBlock, BlogPostsBlock, TrophiesBlock, SpotifyBlock, SupportBlock, ExperienceBlock, QuoteBlock } from '../types/blocks';
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
        markdown += generateBanner(block, themeId);
        break;
      case 'typing':
        markdown += generateTyping(block, themeId);
        break;
      case 'about':
        markdown += generateAbout(block);
        break;
      case 'skills':
        markdown += generateSkills(block, themeId);
        break;
      case 'github-stats':
        markdown += generateGitHubStats(block, themeId, isPreview);
        break;
      case 'activity-graph':
        markdown += generateActivityGraph(block, themeId, isPreview);
        break;
      case 'snake':
        markdown += generateSnake(block, isPreview);
        break;
      case 'pacman':
        markdown += generatePacman(block, isPreview);
        break;
      case 'projects':
        markdown += generateProjects(block, themeId);
        break;
      case 'socials':
        markdown += generateSocials(block);
        break;
      case 'contact':
        markdown += generateContact(block);
        break;
      case 'blog-posts':
        markdown += generateBlogPosts(block, isPreview);
        break;
      case 'trophies':
        markdown += generateTrophies(block, isPreview);
        break;
      case 'spotify':
        markdown += generateSpotify(block);
        break;
      case 'support':
        markdown += generateSupport(block, isPreview);
        break;
      case 'experience':
        markdown += generateExperience(block);
        break;
      case 'quote':
        markdown += generateQuote(block, isPreview);
        break;
    }
    
    // Add separator if it's not the last block
    if (index < blocks.length - 1) {
      markdown += '\n<br />\n\n';
    }
  });

  return markdown.trim();
}

function getThemeColorParams(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':
      return `&bg_color=0b0314&title_color=00ff9f&text_color=ffffff&icon_color=d300c5&border_color=d300c5`;
    case 'purple-gradient':
      return `&bg_color=150a24&title_color=a855f7&text_color=e9d5ff&icon_color=d8b4fe&border_color=a855f7`;
    case 'clean-light':
      return `&bg_color=ffffff&title_color=24292e&text_color=24292e&icon_color=24292e&border_color=e1e4e8`;
    case 'github-classic':
    default:
      return `&bg_color=0d1117&title_color=58a6ff&text_color=c9d1d9&icon_color=58a6ff&border_color=30363d`;
  }
}

function getStreakThemeColorParams(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':
      return `&background=0b0314&border=d300c5&ring=00ff9f&fire=d300c5&currStreakNum=ffffff&sideNums=ffffff&currStreakLabel=00ff9f&sideLabels=00ff9f&dates=ffffff`;
    case 'purple-gradient':
      return `&background=150a24&border=a855f7&ring=d8b4fe&fire=a855f7&currStreakNum=e9d5ff&sideNums=e9d5ff&currStreakLabel=a855f7&sideLabels=a855f7&dates=e9d5ff`;
    case 'clean-light':
      return `&background=ffffff&border=e1e4e8&ring=24292e&fire=24292e&currStreakNum=24292e&sideNums=24292e&currStreakLabel=24292e&sideLabels=24292e&dates=24292e`;
    case 'github-classic':
    default:
      return `&background=0d1117&border=30363d&ring=58a6ff&fire=58a6ff&currStreakNum=c9d1d9&sideNums=c9d1d9&currStreakLabel=58a6ff&sideLabels=58a6ff&dates=c9d1d9`;
  }
}

function getActivityGraphColorParams(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':
      return `&bg_color=0b0314&color=00ff9f&line=d300c5&point=ffffff`;
    case 'purple-gradient':
      return `&bg_color=150a24&color=a855f7&line=d8b4fe&point=ffffff`;
    case 'clean-light':
      return `&bg_color=ffffff&color=24292e&line=24292e&point=24292e`;
    case 'github-classic':
    default:
      return `&bg_color=0d1117&color=58a6ff&line=58a6ff&point=ffffff`;
  }
}

// Returns the primary accent hex (no #) for a given theme used in widget URLs
function getThemeAccent(themeId: ThemeId): { color: string; bg: string; fontColor: string } {
  switch (themeId) {
    case 'cyberpunk':
      return { color: '0b0314', bg: '0b0314', fontColor: '00ff9f' };
    case 'purple-gradient':
      return { color: '150a24', bg: '150a24', fontColor: 'd8b4fe' };
    case 'clean-light':
      return { color: 'f0f6ff', bg: 'f0f6ff', fontColor: '0366d6' };
    case 'github-classic':
    default:
      return { color: '0d1117', bg: '0d1117', fontColor: '58a6ff' };
  }
}

// Returns the typing SVG text color for a given theme
function getThemeTypingColor(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':       return '00ff9f';
    case 'purple-gradient': return 'd8b4fe';
    case 'clean-light':     return '0366d6';
    case 'github-classic':
    default:                return '58a6ff';
  }
}

// Returns a shields.io badge style color for skills
function getThemeBadgeColor(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':       return '00b377';
    case 'purple-gradient': return '7e22ce';
    case 'clean-light':     return '0366d6';
    case 'github-classic':
    default:                return '1f6feb';
  }
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

function generateBanner(block: BannerBlock, themeId: ThemeId): string {
  const { bannerType, height, text, desc, section } = block.data;
  const safeText = encodeURIComponent(text);
  const safeDesc = encodeURIComponent(desc);
  const accent = getThemeAccent(themeId);
  // Use theme color for the banner gradient; fontColor follows theme accent
  const bannerColor = accent.color;
  const bannerFontColor = accent.fontColor;
  let md = `<div align="center">\n`;
  md += `  <img src="https://capsule-render.vercel.app/api?type=${bannerType}&color=${bannerColor}&height=${height}&section=${section}&text=${safeText}&desc=${safeDesc}&fontColor=${bannerFontColor}&fontSize=80&descSize=22&fontAlignY=38&descAlignY=60" alt="Banner" />\n`;
  md += `</div>\n`;
  return md;
}

function generateTyping(block: TypingBlock, themeId: ThemeId): string {
  const { lines, size, center, vCenter } = block.data;
  const safeLines = lines.map(l => encodeURIComponent(l)).join(';');
  // Override the typing color with the active theme accent color
  const typingColor = getThemeTypingColor(themeId);
  let md = `<div align="center">\n`;
  md += `  <a href="https://git.io/typing-svg">\n`;
  md += `    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=${size}&pause=1000&color=${typingColor}&center=${center}&vCenter=${vCenter}&width=600&lines=${safeLines}" alt="Typing SVG" />\n`;
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

function generateSkills(block: TechnicalSkillsBlock, themeId: ThemeId): string {
  const { skills, style } = block.data;
  if (skills.length === 0) return '';
  
  // Use per-skill color if defined, otherwise fall back to the active theme color
  const themeBadgeColor = getThemeBadgeColor(themeId);
  
  let md = `## Technical Skills\n\n`;
  md += `<div align="left">\n`;
  
  skills.forEach(skill => {
    const skillDef = POPULAR_SKILLS.find(s => s.name === skill);
    const safeSkillName = encodeURIComponent(skill);
    const iconName = skillDef ? skillDef.icon : skill.toLowerCase().replace(/\s+/g, '');
    // Use per-skill brand color if available; otherwise use the active theme badge color
    const badgeColor = skillDef?.color || themeBadgeColor;
    md += `  <img src="https://img.shields.io/badge/-${safeSkillName}-${badgeColor}?style=${style}&logo=${iconName}&logoColor=white" alt="${skill}" />\n`;
  });
  
  md += `</div>\n\n`;
  return md;
}

function generateGitHubStats(block: GitHubStatsBlock, themeId: ThemeId, isPreview: boolean): string {
  const { username, showStats, showTopLanguages, showStreak, showActivityGraph, showSnake, show3dContrib, showProfileViews, useCustomColors, customColors } = block.data;
  let md = `## GitHub Statistics\n\n`;
  md += `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? targetUsername : username;
  
  let colorParams = '';
  if (useCustomColors && customColors) {
    colorParams = `&bg_color=${customColors.bg}&title_color=${customColors.title}&text_color=${customColors.text}&icon_color=${customColors.icon}&border_color=${customColors.border}`;
  } else {
    colorParams = getThemeColorParams(themeId);
  }
  
  if (showProfileViews) {
    const vcColor = useCustomColors && customColors ? customColors.title : (themeId === 'cyberpunk' ? '00ff9f' : (themeId === 'purple-gradient' ? 'a855f7' : '4b86f7'));
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
      streakParams = getStreakThemeColorParams(themeId);
    }
    md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${streakParams}" alt="GitHub Streak" />\n`;
  }
  
  if (showActivityGraph) {
    md += `  <br />\n`;
    const activityParams = getActivityGraphColorParams(themeId);
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${activityParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
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

function generateActivityGraph(block: ActivityGraphBlock, themeId: ThemeId, isPreview: boolean): string {
  const { username, useCustomColors, customColors } = block.data;
  let md = `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? 'torvalds' : targetUsername;
  
  let colorParams = '';
  if (useCustomColors && customColors) {
    colorParams = `&bg_color=${customColors.bg}&color=${customColors.color}&line=${customColors.line}&point=${customColors.point}`;
  } else {
    colorParams = getActivityGraphColorParams(themeId);
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

function generateProjects(block: FeaturedProjectsBlock, themeId: ThemeId): string {
  const { projects, style, useCustomColors, theme, customColors } = block.data;
  if (!projects || projects.length === 0) return '';
  
  let md = `## Featured Projects\n\n`;
  
  if (style === 'cards') {
    md += `<div align="center">\n`;
    let colorParams = '';
    if (useCustomColors && customColors) {
      colorParams = `&bg_color=${customColors.bg}&title_color=${customColors.title}&text_color=${customColors.text}&icon_color=${customColors.icon}&border_color=${customColors.border}`;
    } else {
      colorParams = getThemeColorParams(themeId);
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

function generateBlogPosts(block: BlogPostsBlock, isPreview: boolean): string {
  const { platform } = block.data;
  let md = `## ✍️ Latest Blog Posts\n\n`;
  md += `<!-- NOTE: You need to set up the gautamkrishnar/blog-post-workflow GitHub Action for this to work -->\n`;
  if (isPreview) {
    md += `- [Building scalable web applications with React](https://example.com)\n`;
    md += `- [10 things you didn't know about TypeScript](https://example.com)\n`;
    md += `- [My journey transitioning to a DevOps role](https://example.com)\n`;
    md += `- [A deep dive into Tailwind CSS v4](https://example.com)\n`;
    md += `- [Why open source matters more than ever](https://example.com)\n\n`;
  } else {
    md += `<!-- BLOG-POST-LIST:START -->\n<!-- BLOG-POST-LIST:END -->\n\n`;
  }
  return md;
}

function generateTrophies(block: TrophiesBlock, isPreview: boolean): string {
  const { username, theme, columns, noFrame, noBg } = block.data;
  let md = `## 🏆 GitHub Trophies\n\n`;
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? 'torvalds' : targetUsername;
  
  let params = `username=${previewUsername}&theme=${theme}&column=${columns}`;
  if (noFrame) params += '&no-frame=true';
  if (noBg) params += '&no-bg=true';

  md += `<div align="center">\n`;
  md += `  <a href="https://github.com/ryo-ma/github-profile-trophy">\n`;
  md += `    <img src="https://github-profile-trophy.vercel.app/?${params}" alt="${username} trophies" />\n`;
  md += `  </a>\n`;
  md += `</div>\n\n`;
  return md;
}

function generateSpotify(block: SpotifyBlock): string {
  const { spotifyUrl, theme } = block.data;
  let md = `## 🎧 Currently Listening\n\n`;
  md += `<div align="center">\n`;
  
  // Just use novatorem for demo since user won't have it set up unless they deploy vercel.
  // We provide the standard readme snippet.
  md += `  <!-- NOTE: This Spotify widget requires setting up novatorem/novatorem in Vercel. -->\n`;
  md += `  <a href="${spotifyUrl || 'https://spotify.com'}">\n`;
  md += `    <img src="https://spotify-github-profile.kittinanx.com/api/view?uid=123456789&cover_image=true&theme=${theme}&show_offline=false&background_color=121212&interchange=true&bar_color_cover=false" alt="Spotify" />\n`;
  md += `  </a>\n`;
  md += `</div>\n\n`;
  return md;
}

function generateSupport(block: SupportBlock, isPreview: boolean): string {
  const { buyMeACoffee, patreon, kofi, github, qrCodeBase64, qrCodeLabel } = block.data;
  let md = `## ☕ Support Me\n\n`;
  md += `<div align="center">\n`;
  
  if (buyMeACoffee) {
    md += `  <a href="https://www.buymeacoffee.com/${buyMeACoffee}">\n`;
    md += `    <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />\n`;
    md += `  </a>\n`;
  }
  if (patreon) {
    md += `  <a href="https://patreon.com/${patreon}">\n`;
    md += `    <img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon" />\n`;
    md += `  </a>\n`;
  }
  if (kofi) {
    md += `  <a href="https://ko-fi.com/${kofi}">\n`;
    md += `    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi" />\n`;
    md += `  </a>\n`;
  }
  if (github) {
    md += `  <a href="https://github.com/sponsors/${github}">\n`;
    md += `    <img src="https://img.shields.io/badge/GitHub_Sponsors-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="GitHub Sponsors" />\n`;
    md += `  </a>\n`;
  }
  
  if (qrCodeBase64) {
    const src = isPreview ? qrCodeBase64 : './support-qr.png';
    md += `  <br /><br />\n`;
    if (qrCodeLabel) {
      md += `  <p><strong>${qrCodeLabel}</strong></p>\n`;
    }
    md += `  <img src="${src}" alt="${qrCodeLabel || 'QR Code'}" width="200" style="border-radius: 8px; border: 1px solid #e1e4e8;" />\n`;
  }
  
  md += `</div>\n\n`;
  return md;
}

function generateExperience(block: ExperienceBlock): string {
  const { jobs } = block.data;
  if (!jobs || jobs.length === 0) return '';

  let md = `## 💼 Work Experience\n\n`;
  jobs.forEach(job => {
    md += `### ${job.title} at ${job.company}\n`;
    md += `🗓️ _${job.duration}_\n\n`;
    if (job.description) {
      // Split description by newlines to make sure blockquotes are handled well, or just output text
      md += `${job.description}\n\n`;
    }
    md += `---\n\n`;
  });
  return md;
}

function generateQuote(block: QuoteBlock, isPreview: boolean): string {
  const { theme, layout } = block.data;
  let md = `<div align="center">\n`;
  md += `  <img src="https://quotes-github-readme.vercel.app/api?type=${layout}&theme=${theme}" alt="Random Quote" />\n`;
  md += `</div>\n\n`;
  return md;
}
