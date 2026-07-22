import { generatePremiumHeroSvg } from '../svg/premium-hero-generator';
import { Block, HeroBlock, PremiumHeroBlock, BannerBlock, TypingBlock, ActivityGraphBlock, SnakeBlock, PacmanBlock, AboutBlock, TechnicalSkillsBlock, GitHubStatsBlock, FeaturedProjectsBlock, SocialLinksBlock, ContactBlock, BlogPostsBlock, TrophiesBlock, SpotifyBlock, SupportBlock, ExperienceBlock, QuoteBlock, TerminalBlock, AccordionBlock, BentoBlock, MinimalistHeroBlock } from '@/types/blocks';
import { ThemeId } from '@/types/theme';
import { POPULAR_SKILLS } from '../constants/skills';
import { PLATFORMS } from '../constants/platforms';

export function generateMarkdown(blocks: Block[], themeId: ThemeId, isPreview: boolean = false, previewMode?: 'dark' | 'light'): string {
  let markdown = '';

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    
    if (block.layout === 'half') {
      const nextBlock = blocks[i + 1];
      if (nextBlock && nextBlock.layout === 'half') {
        // Render both side-by-side in a table
        markdown += `<table width="100%">\n`;
        markdown += `  <tr>\n`;
        markdown += `    <td width="50%" valign="top">\n`;
        markdown += generateBlockMarkdown(block, themeId, isPreview, previewMode);
        markdown += `    </td>\n`;
        markdown += `    <td width="50%" valign="top">\n`;
        markdown += generateBlockMarkdown(nextBlock, themeId, isPreview, previewMode);
        markdown += `    </td>\n`;
        markdown += `  </tr>\n`;
        markdown += `</table>\n`;
        i++; // Skip the next block since it's already rendered
      } else {
        // Render normally if it's a half block but no partner
        markdown += generateBlockMarkdown(block, themeId, isPreview, previewMode);
      }
    } else {
      markdown += generateBlockMarkdown(block, themeId, isPreview, previewMode);
    }
    
    // Add separator if it's not the last block
    if (i < blocks.length - 1) {
      markdown += '\n<br />\n\n';
    }
  }

  return markdown.trim();
}

function generateBlockMarkdown(block: Block, themeId: ThemeId, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  switch (block.type) {
    case 'hero':
      return generateHero(block as HeroBlock);
    case 'premium-hero':
      return generatePremiumHero(block as PremiumHeroBlock, isPreview, previewMode);
    case 'minimalist-hero':
      return generateMinimalistHero(block as MinimalistHeroBlock);
    case 'banner':
      return generateBanner(block as BannerBlock);
    case 'typing':
      return generateTyping(block as TypingBlock, isPreview);
    case 'about':
      return generateAbout(block as AboutBlock, themeId);
    case 'skills':
      return generateSkills(block as TechnicalSkillsBlock, themeId);
    case 'github-stats':
      return generateGitHubStats(block as GitHubStatsBlock, themeId, isPreview, previewMode);
    case 'activity-graph':
      return generateActivityGraph(block as ActivityGraphBlock, themeId, isPreview, previewMode);
    case 'snake':
      return generateSnake(block as SnakeBlock, isPreview);
    case 'pacman':
      return generatePacman(block as PacmanBlock, isPreview);
    case 'projects':
      return generateProjects(block as FeaturedProjectsBlock, themeId, isPreview);
    case 'socials':
      return generateSocials(block as SocialLinksBlock);
    case 'contact':
      return generateContact(block as ContactBlock);
    case 'blog-posts':
      return generateBlogPosts(block as BlogPostsBlock, isPreview);
    case 'trophies':
      return generateTrophies(block as TrophiesBlock, isPreview, previewMode);
    case 'spotify':
      return generateSpotify(block as SpotifyBlock);
    case 'support':
      return generateSupport(block as SupportBlock, isPreview);
    case 'experience':
      return generateExperience(block as ExperienceBlock, themeId, isPreview);
    case 'quote':
      return generateQuote(block as QuoteBlock);
    case 'terminal':
      return generateTerminal(block as TerminalBlock);
    case 'accordion':
      return generateAccordion(block as AccordionBlock);
    case 'bento':
      return generateBento(block as BentoBlock, themeId);
    default:
      return '';
  }
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

function mapToGoogleFont(id?: string, defaultFont: string = 'Inter'): string {
  switch(id) {
    case 'modern-sans': return 'Inter';
    case 'developer-mono': return 'Fira+Code';
    case 'elegant-serif': return 'Playfair+Display';
    case 'bold-impact': return 'Oswald';
    case 'playful': return 'Fredoka+One';
    case 'classic-sans': return 'Open+Sans';
    default: return defaultFont;
  }
}

function generateSectionTitle(defaultTitle: string, title?: string, color?: string): string {
  const finalTitle = title || defaultTitle;
  if (color && color.trim() !== '') {
    const cleanColor = color.replace('#', '');
    return `<h3><img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=24&duration=1&pause=1000&color=${cleanColor}&width=400&lines=${encodeURIComponent(finalTitle)}" alt="${finalTitle}" /></h3>\n\n`;
  }
  return `## ${finalTitle}\n\n`;
}

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

function getThemeBadgeColor(themeId: ThemeId): string {
  switch (themeId) {
    case 'cyberpunk':       return '00b377';
    case 'purple-gradient': return '7e22ce';
    case 'clean-light':     return '0366d6';
    case 'github-classic':
    default:                return '1f6feb';
  }
}

function generatePremiumHero(block: PremiumHeroBlock, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  const { data } = block;
  const theme = previewMode || 'dark';

  if (isPreview && data.localAvatarBase64) {
    // Generate inline SVG for local preview to support massive base64 uploads without URL limit errors
    const svgContent = generatePremiumHeroSvg({
      name: data.name,
      titles: data.titles,
      location: data.location,
      education: data.education,
      focus: data.currentFocus,
      portfolio: data.portfolioUrl,
      email: data.email,
      skills: data.skills,
      github: data.socials?.github,
      linkedin: data.socials?.linkedin,
      twitter: data.socials?.twitter,
      theme,
      accent1: data.sectionTitleColor,
      accent2: data.iconColor,
      accent3: data.accent3,
      style: data.style || 'gradient',
      avatarBase64: data.localAvatarBase64,
      fontFamily: data.fontFamily
    });
    
    // We can embed the raw SVG straight into markdown, and rehype-raw will render it!
    // We MUST strip newlines because markdown parsers will turn blank lines inside the SVG into <p> tags, breaking the SVG structure.
    const safeSvg = svgContent.replace(/\r?\n|\r/g, ' ');
    return `<div align="center">\n\n${safeSvg}\n\n</div>\n\n`;
  }

  // Use relative URL for local preview, absolute for export
  const baseUrl = isPreview ? '' : 'https://profilo.vercel.app';
  
  // Create URL params
  const params = new URLSearchParams();
  if (data.name) params.append('name', data.name);
  if (data.titles?.length) params.append('titles', data.titles.join(','));
  if (data.location) params.append('location', data.location);
  if (data.education) params.append('education', data.education);
  if (data.currentFocus) params.append('focus', data.currentFocus);
  if (data.portfolioUrl) params.append('portfolio', data.portfolioUrl);
  if (data.email) params.append('email', data.email);
  if (data.skills?.length) params.append('skills', data.skills.join(','));
  
  if (data.socials?.github) params.append('github', data.socials.github);
  if (data.socials?.linkedin) params.append('linkedin', data.socials.linkedin);
  if (data.socials?.twitter) params.append('twitter', data.socials.twitter);
  if (data.sectionTitleColor) params.append('accent1', data.sectionTitleColor.replace('#', ''));
  if (data.iconColor) params.append('accent2', data.iconColor.replace('#', ''));
  if (data.accent3) params.append('accent3', data.accent3.replace('#', ''));
  if (data.style) params.append('style', data.style);
  if (data.avatarUrl) params.append('avatarUrl', data.avatarUrl);
  if (data.fontFamily) params.append('font', data.fontFamily);

  const query = params.toString();
  
  if (isPreview) {
    return `<img src="${baseUrl}/api/svg/premium-hero?theme=${theme}&${query}" alt="${data.name || 'Developer'} GitHub Profile Hero" width="100%">`;
  }
  
  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${baseUrl}/api/svg/premium-hero?theme=dark&${query}">
  <img src="${baseUrl}/api/svg/premium-hero?theme=light&${query}" alt="${data.name || 'Developer'} GitHub Profile Hero" width="100%">
</picture>`;
}

function generateMinimalistHero(block: MinimalistHeroBlock): string {
  const { data } = block;
  
  const queryParams = new URLSearchParams();
  if (data.name) queryParams.append('name', data.name);
  if (data.title) queryParams.append('title', data.title);
  if (data.bio) queryParams.append('bio', data.bio);
  if (data.bgColor) queryParams.append('bg', data.bgColor);
  if (data.accentColor) queryParams.append('accent', data.accentColor);
  if (data.fontFamily) queryParams.append('font', data.fontFamily);
  if (data.layout) queryParams.append('layout', data.layout);
  if (data.avatarUrl) queryParams.append('avatar', data.avatarUrl);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const svgUrl = `${baseUrl}/api/svg/minimalist-hero?${queryParams.toString()}`;

  let md = `<a href="#">\n`;
  md += `  <img src="${svgUrl}" width="100%" alt="Minimalist Hero" />\n`;
  md += `</a>\n\n`;
  
  return md;
}

function generateHero(block: HeroBlock): string {
  const { name, title, shortIntro, avatarUrl, localAvatarBase64, nameColor, titleColor } = block.data;
  let md = `<div align="center">\n`;
  if (localAvatarBase64) {
    // In actual implementation, we'd handle isPreview via context or similar, for now keeping signature compatible
    md += `  <img src="${localAvatarBase64}" alt="${name}" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />\n\n`;
  } else if (avatarUrl) {
    md += `  <img src="${avatarUrl}" alt="${name}" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />\n\n`;
  }
  
  if (nameColor && nameColor.trim() !== '') {
    const cleanColor = nameColor.replace('#', '');
    const googleFont = mapToGoogleFont(block.data.fontFamily, 'Inter');
    md += `  <h1><img src="https://readme-typing-svg.demolab.com?font=${googleFont}&weight=800&size=32&duration=1&pause=1000&color=${cleanColor}&center=true&vCenter=true&width=500&lines=Hi+there,+I'm+${encodeURIComponent(name)}+%F0%9F%91%8B" alt="Hi there, I'm ${name} 👋" /></h1>\n`;
  } else {
    md += `  <h1>Hi there, I'm ${name} 👋</h1>\n`;
  }

  if (titleColor && titleColor.trim() !== '') {
    const cleanColor = titleColor.replace('#', '');
    const googleFont = mapToGoogleFont(block.data.fontFamily, 'Inter');
    md += `  <h3><img src="https://readme-typing-svg.demolab.com?font=${googleFont}&weight=600&size=20&duration=1&pause=1000&color=${cleanColor}&center=true&vCenter=true&width=500&lines=${encodeURIComponent(title)}" alt="${title}" /></h3>\n`;
  } else {
    md += `  <h3>${title}</h3>\n`;
  }
  
  md += `  <p>${shortIntro}</p>\n`;
  md += `</div>\n`;
  return md;
}

function generateBanner(block: BannerBlock): string {
  const { bannerType, height, text, desc, section, color, fontColor } = block.data;
  const safeText = encodeURIComponent(text);
  const safeDesc = encodeURIComponent(desc);
  
  const cleanColor = (color || '000000').replace('#', '');
  const cleanFontColor = (fontColor || 'ffffff').replace('#', '');

  let md = `<div align="center">\n`;
  md += `  <img src="https://capsule-render.vercel.app/api?type=${bannerType}&color=${cleanColor}&height=${height}&section=${section}&text=${safeText}&desc=${safeDesc}&fontColor=${cleanFontColor}&fontSize=80&descSize=22&fontAlignY=38&descAlignY=60" alt="Banner" />\n`;
  md += `</div>\n`;
  return md;
}

function generateTyping(block: TypingBlock, isPreview: boolean): string {
  const { lines, size, center, vCenter, color, style, text, background, direction } = block.data;
  const cleanColor = (color || 'ff0000').replace('#', '');
  
  if (!style || style === 'typewriter') {
    const safeLines = lines.map(l => encodeURIComponent(l)).join(';');
    const googleFont = mapToGoogleFont(block.data.fontFamily, 'Fira+Code');
    let md = `<div align="center">\n`;
    md += `  <a href="https://git.io/typing-svg">\n`;
    md += `    <img src="https://readme-typing-svg.demolab.com?font=${googleFont}&weight=500&size=${size}&pause=1000&color=${cleanColor}&center=${center}&vCenter=${vCenter}&width=600&lines=${safeLines}" alt="Typing SVG" />\n`;
    md += `  </a>\n`;
    md += `</div>\n`;
    return md;
  }

  // Handle dynamic text SVGs
  const currentText = text || (lines ? lines.join('\\n') : '');
  const cleanBg = (background || '0d1117').replace('#', '');
  const query = new URLSearchParams({
    style,
    text: currentText,
    color: cleanColor,
    bg: cleanBg,
    fs: String(size || 16)
  });
  
  if (direction && direction !== 'normal') {
    query.append('dir', direction);
  }
  
  if (block.data.fontFamily) {
    query.append('font', block.data.fontFamily);
  }
  
  if (isPreview) {
    query.append('v', String(Date.now()));
  }
  
  // Use relative URL for preview to avoid CORS/production sync issues
  const baseUrl = isPreview ? '' : 'https://profilo.app';
  
  let md = `<div align="center">\n`;
  md += `  <img src="${baseUrl}/api/svg/dynamic-text?${query.toString()}" alt="Dynamic Text SVG" />\n`;
  md += `</a>\n\n`;
  return md;
}

function generateAbout(block: AboutBlock, themeId: ThemeId): string {
  const { sectionTitle, sectionTitleColor, iconColor, paragraph, currentlyLearning, currentlyWorkingOn, askMeAbout, bullets } = block.data;
  let md = generateSectionTitle('About Me', sectionTitle, sectionTitleColor);
  if (paragraph) md += `${paragraph}\n\n`;
  
  const themeAccent = getThemeAccent(themeId).color.replace('#', '');
  const accentColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : themeAccent;
  
  if (bullets && bullets.length > 0) {
    bullets.forEach(bullet => {
      if (bullet.icon) {
        md += `- <img src="https://api.iconify.design/lucide/${bullet.icon}.svg?color=%23${accentColor}" width="16" height="16" style="vertical-align: -3px;" /> ${bullet.text}\n`;
      } else if (bullet.emoji) {
        md += `- ${bullet.emoji} ${bullet.text}\n`;
      } else {
        md += `- ${bullet.text}\n`;
      }
    });
  } else {
    if (currentlyWorkingOn) md += `- <img src="https://api.iconify.design/lucide/telescope.svg?color=%23${accentColor}" width="16" height="16" style="vertical-align: -3px;" /> I’m currently working on **${currentlyWorkingOn}**\n`;
    if (currentlyLearning) md += `- <img src="https://api.iconify.design/lucide/sprout.svg?color=%23${accentColor}" width="16" height="16" style="vertical-align: -3px;" /> I’m currently learning **${currentlyLearning}**\n`;
    if (askMeAbout) md += `- <img src="https://api.iconify.design/lucide/message-square.svg?color=%23${accentColor}" width="16" height="16" style="vertical-align: -3px;" /> Ask me about **${askMeAbout}**\n`;
  }
  
  md += `\n`;
  return md;
}

function generateSkills(block: TechnicalSkillsBlock, themeId: ThemeId): string {
  const { sectionTitle, sectionTitleColor, skills, groups, style } = block.data;
  let md = generateSectionTitle('Technical Skills', sectionTitle, sectionTitleColor);
  
  if ((!skills || skills.length === 0) && (!groups || groups.length === 0)) return '';
  
  const themeBadgeColor = (block.data.iconColor || sectionTitleColor || getThemeBadgeColor(themeId)).replace('#', '');
  const badgeLogoColor = block.data.iconColor ? block.data.iconColor.replace('#', '') : 'white';
  if (groups && groups.length > 0) {
    groups.forEach(group => {
      if (!group.skills || group.skills.length === 0) return;
      md += `### ${group.name}\n\n`;
      md += `<div align="left">\n`;
      group.skills.forEach(skill => {
        const skillDef = POPULAR_SKILLS.find(s => s.name === skill);
        const safeSkillName = encodeURIComponent(skill);
        const iconName = skillDef ? skillDef.icon : skill.toLowerCase().replace(/\s+/g, '');
        const badgeColor = themeBadgeColor;
        md += `  <img src="https://img.shields.io/badge/-${safeSkillName}-${badgeColor}?style=${style}&logo=${iconName}&logoColor=${badgeLogoColor}" alt="${skill}" />\n`;
      });
      md += `</div>\n\n`;
    });
  } else if (skills && skills.length > 0) {
    md += `<div align="left">\n`;
    skills.forEach(skill => {
      const skillDef = POPULAR_SKILLS.find(s => s.name === skill);
      const safeSkillName = encodeURIComponent(skill);
      const iconName = skillDef ? skillDef.icon : skill.toLowerCase().replace(/\s+/g, '');
      const badgeColor = themeBadgeColor;
      md += `  <img src="https://img.shields.io/badge/-${safeSkillName}-${badgeColor}?style=${style}&logo=${iconName}&logoColor=${badgeLogoColor}" alt="${skill}" />\n`;
    });
    md += `</div>\n\n`;
  }
  
  return md.trim() + '\n\n';
}

function generateGitHubStats(block: GitHubStatsBlock, themeId: ThemeId, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  const { sectionTitle, sectionTitleColor, username, showStats, showTopLanguages, showStreak, showActivityGraph, showSnake, show3dContrib, showProfileViews, useCustomColors, customColors } = block.data;
  let md = generateSectionTitle('GitHub Statistics', sectionTitle, sectionTitleColor);
  md += `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? targetUsername : username;
  
  let colorParams = '';
  let lightColorParams = '';
  let darkColorParams = '';
  const isDynamic = !useCustomColors;

  if (useCustomColors && customColors) {
    const bg = (customColors.bg || '').replace('#', '');
    const title = (customColors.title || '').replace('#', '');
    const text = (customColors.text || '').replace('#', '');
    const icon = (customColors.icon || '').replace('#', '');
    const border = (customColors.border || '').replace('#', '');
    colorParams = `&bg_color=${bg}&title_color=${title}&text_color=${text}&icon_color=${icon}&border_color=${border}`;
  } else {
    // For dynamic output
    lightColorParams = getThemeColorParams('clean-light');
    darkColorParams = getThemeColorParams(themeId);
    if (isPreview) {
      colorParams = previewMode === 'light' ? lightColorParams : darkColorParams;
    } else {
      colorParams = darkColorParams; // fallback
    }
  }
  
  if (showProfileViews) {
    const vcColorDark = useCustomColors && customColors ? customColors.title : (themeId === 'cyberpunk' ? '00ff9f' : (themeId === 'purple-gradient' ? 'a855f7' : '4b86f7'));
    const vcColorLight = useCustomColors && customColors ? customColors.title : '0366d6';
    
    if (isDynamic && !isPreview) {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://komarev.com/ghpvc/?username=${previewUsername}&color=${vcColorDark}&style=for-the-badge&label=PROFILE+VIEWS" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://komarev.com/ghpvc/?username=${previewUsername}&color=${vcColorLight}&style=for-the-badge&label=PROFILE+VIEWS" />\n`;
      md += `    <img src="https://komarev.com/ghpvc/?username=${previewUsername}&color=${vcColorDark}&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views" />\n`;
      md += `  </picture>\n  <br /><br />\n`;
    } else {
      const vcColor = (isPreview && previewMode === 'light') ? vcColorLight : vcColorDark;
      md += `  <img src="https://komarev.com/ghpvc/?username=${previewUsername}&color=${vcColor}&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views" />\n  <br /><br />\n`;
    }
  }
  
  if (showStats) {
    if (isDynamic && !isPreview) {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=${previewUsername}&show_icons=true${darkColorParams}" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=${previewUsername}&show_icons=true${lightColorParams}" />\n`;
      md += `    <img src="https://github-readme-stats.vercel.app/api?username=${previewUsername}&show_icons=true${darkColorParams}" alt="${username}'s GitHub stats" />\n`;
      md += `  </picture>\n`;
    } else {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${previewUsername}&show_icons=true${colorParams}" alt="${username}'s GitHub stats" />\n`;
    }
  }
  if (showTopLanguages) {
    if (isDynamic && !isPreview) {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=${previewUsername}&layout=compact${darkColorParams}" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=${previewUsername}&layout=compact${lightColorParams}" />\n`;
      md += `    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${previewUsername}&layout=compact${darkColorParams}" alt="Top Languages" />\n`;
      md += `  </picture>\n`;
    } else {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${previewUsername}&layout=compact${colorParams}" alt="Top Languages" />\n`;
    }
  }
  if (showStreak) {
    let streakParams = '';
    let darkStreakParams = '';
    let lightStreakParams = '';

    if (useCustomColors && customColors) {
      streakParams = `&background=${customColors.bg}&border=${customColors.border}&ring=${customColors.icon}&fire=${customColors.icon}&currStreakNum=${customColors.text}&sideNums=${customColors.text}&currStreakLabel=${customColors.title}&sideLabels=${customColors.title}&dates=${customColors.text}`;
      md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${streakParams}" alt="GitHub Streak" />\n`;
    } else {
      darkStreakParams = getStreakThemeColorParams(themeId);
      lightStreakParams = getStreakThemeColorParams('clean-light');
      if (isPreview) {
        streakParams = previewMode === 'light' ? lightStreakParams : darkStreakParams;
        md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${streakParams}" alt="GitHub Streak" />\n`;
      } else {
        md += `  <picture>\n`;
        md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${darkStreakParams}" />\n`;
        md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${lightStreakParams}" />\n`;
        md += `    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${previewUsername}${darkStreakParams}" alt="GitHub Streak" />\n`;
        md += `  </picture>\n`;
      }
    }
  }
  
  if (showActivityGraph) {
    md += `  <br />\n`;
    let actParams = '';
    let darkActParams = '';
    let lightActParams = '';

    if (useCustomColors && customColors) {
      actParams = `&bg_color=${customColors.bg}&color=${customColors.title}&line=${customColors.icon}&point=${customColors.text}`;
      md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${actParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
    } else {
      darkActParams = getActivityGraphColorParams(themeId);
      lightActParams = getActivityGraphColorParams('clean-light');
      if (isPreview) {
        actParams = previewMode === 'light' ? lightActParams : darkActParams;
        md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${actParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
      } else {
        md += `  <picture>\n`;
        md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${darkActParams}&area=true&hide_border=true" />\n`;
        md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${lightActParams}&area=true&hide_border=true" />\n`;
        md += `    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${darkActParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
        md += `  </picture>\n`;
      }
    }
  }
  if (showSnake) {
    md += `  <br />\n`;
    md += `  <!-- Note: The snake animation requires setting up the Platane/snk GitHub Action. -->\n`;
    if (isPreview) {
      // In preview, we just show the static light or dark snake preview
      const previewUrl = previewMode === 'light' 
        ? "https://raw.githubusercontent.com/Platane/Platane/output/github-contribution-grid-snake.svg"
        : "https://raw.githubusercontent.com/Platane/Platane/output/github-contribution-grid-snake-dark.svg";
      md += `  <img src="${previewUrl}" alt="GitHub Snake Animation Preview" />\n`;
    } else {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" />\n`;
      md += `    <img src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" alt="GitHub Snake Animation" />\n`;
      md += `  </picture>\n`;
    }
  }
  if (show3dContrib) {
    md += `  <br />\n`;
    md += `  <!-- Note: The 3D contribution graph requires setting up the yoshi389111/github-profile-3d-contrib Action. -->\n`;
    if (isPreview) {
      const previewUrl = previewMode === 'light'
        ? "https://raw.githubusercontent.com/yoshi389111/yoshi389111/main/profile-3d-contrib/profile-green-animate.svg"
        : "https://raw.githubusercontent.com/yoshi389111/yoshi389111/main/profile-3d-contrib/profile-night-rainbow.svg";
      md += `  <img src="${previewUrl}" alt="3D Contribution Graph Preview" />\n`;
    } else {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/main/profile-3d-contrib/profile-night-rainbow.svg" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/main/profile-3d-contrib/profile-green-animate.svg" />\n`;
      md += `    <img src="https://raw.githubusercontent.com/${username}/${username}/main/profile-3d-contrib/profile-night-rainbow.svg" alt="3D Contribution Graph" />\n`;
      md += `  </picture>\n`;
    }
  }
  if (block.data.showPacman) {
    md += `  <br />\n`;
    md += `  <!-- Note: The Pacman animation requires setting up the abozanona/pacman-contribution-graph Action. -->\n`;
    if (isPreview) {
      const previewUrl = previewMode === 'light'
        ? "https://raw.githubusercontent.com/abozanona/abozanona/main/images/github-snake.svg"
        : "https://raw.githubusercontent.com/abozanona/abozanona/main/images/github-snake-dark.svg";
      md += `  <img src="${previewUrl}" alt="Pacman Animation Preview" />\n`;
    } else {
      md += `  <picture>\n`;
      md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph-dark.svg" />\n`;
      md += `    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg" />\n`;
      md += `    <img src="https://raw.githubusercontent.com/${username}/${username}/output/pacman-contribution-graph.svg" alt="Pacman Animation" />\n`;
      md += `  </picture>\n`;
    }
  }
  
  md += `</div>\n\n`;
  return md;
}

function generateActivityGraph(block: ActivityGraphBlock, themeId: ThemeId, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  const { sectionTitle, sectionTitleColor, username, useCustomColors, customColors } = block.data;
  let md = generateSectionTitle('Activity Graph', sectionTitle, sectionTitleColor);
  md += `<div align="center">\n`;
  
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? 'torvalds' : targetUsername;
  
  let colorParams = '';
  let darkColorParams = '';
  let lightColorParams = '';
  const isDynamic = !useCustomColors;

  if (useCustomColors && customColors) {
    const bg = (customColors.bg || '').replace('#', '');
    const color = (customColors.color || '').replace('#', '');
    const line = (customColors.line || '').replace('#', '');
    const point = (customColors.point || '').replace('#', '');
    colorParams = `&bg_color=${bg}&color=${color}&line=${line}&point=${point}`;
  } else {
    darkColorParams = getActivityGraphColorParams(themeId);
    lightColorParams = getActivityGraphColorParams('clean-light');
    if (isPreview) {
      colorParams = previewMode === 'light' ? lightColorParams : darkColorParams;
    }
  }
  
  if (isDynamic && !isPreview) {
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${darkColorParams}&area=true&hide_border=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${lightColorParams}&area=true&hide_border=true" />\n`;
    md += `    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${darkColorParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
    md += `  </picture>\n`;
  } else {
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${previewUsername}${colorParams}&area=true&hide_border=true" alt="GitHub Activity Graph" />\n`;
  }
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

function generateProjects(block: FeaturedProjectsBlock, themeId: ThemeId, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  const { sectionTitle, sectionTitleColor, iconColor, style, useCustomColors, customColors, projects } = block.data;
  if (!projects || projects.length === 0) return '';

  const badgeLogoColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : 'white';
  let md = generateSectionTitle('Featured Projects', sectionTitle, sectionTitleColor);
  
  if (style === 'cards') {
    md += `<div align="center">\n`;
    let colorParams = '';
    let darkColorParams = '';
    let lightColorParams = '';
    const isDynamic = !useCustomColors;

    if (useCustomColors && customColors) {
      colorParams = `&bg_color=${customColors.bg}&title_color=${customColors.title}&text_color=${customColors.text}&icon_color=${customColors.icon}&border_color=${customColors.border}`;
    } else {
      darkColorParams = getThemeColorParams(themeId);
      lightColorParams = getThemeColorParams('clean-light');
      if (isPreview) {
        colorParams = previewMode === 'light' ? lightColorParams : darkColorParams;
      }
    }
    
    projects.forEach(project => {
      if (project.githubUrl) {
        const parts = project.githubUrl.replace(/\/$/, '').split('/');
        const repo = parts.pop();
        const user = parts.pop();
        if (user && repo) {
          md += `  <a href="${project.githubUrl}">\n`;
          if (isDynamic && !isPreview) {
            md += `    <picture>\n`;
            md += `      <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repo}${darkColorParams}" />\n`;
            md += `      <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repo}${lightColorParams}" />\n`;
            md += `      <img src="https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repo}${darkColorParams}" width="400" />\n`;
            md += `    </picture>\n`;
          } else {
            md += `    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${user}&repo=${repo}${colorParams}" width="400" />\n`;
          }
          md += `  </a>\n`;
        }
      }
    });
    md += `</div>\n\n`;
  } else {
    projects.forEach(project => {
      md += `### ${project.name}\n\n`;
      
      if (project.localImageBase64) {
        const src = isPreview ? project.localImageBase64 : `./project-${project.id}.png`;
        md += `<img src="${src}" alt="${project.name}" width="400" style="border-radius: 8px;" />\n\n`;
      }
      
      md += `${project.description}\n\n`;
      
      if (project.techStack && project.techStack.length > 0) {
        md += `<div align="left">\n`;
        const badgeColor = (iconColor || sectionTitleColor || getThemeBadgeColor(themeId)).replace('#', '');
        project.techStack.forEach(tech => {
          const safeName = encodeURIComponent(tech).replace(/-/g, '--');
          const iconName = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
          md += `  <img src="https://img.shields.io/badge/-${safeName}-${badgeColor}?style=flat-square&logo=${iconName}&logoColor=${badgeLogoColor}" alt="${tech}" />\n`;
        });
        md += `</div>\n\n`;
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
  const { sectionTitle, sectionTitleColor, iconColor, links, badgeStyle, github, linkedin, twitter, portfolio, email } = block.data;
  const badgeLogoColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : 'white';
  
  const finalLinks = links || [];
  
  if (finalLinks.length === 0) {
    if (github) finalLinks.push({ id: 'legacy-github', platform: 'github', url: github, color: '181717', icon: 'github' });
    if (linkedin) finalLinks.push({ id: 'legacy-linkedin', platform: 'linkedin', url: linkedin, color: '0A66C2', icon: 'linkedin' });
    if (twitter) finalLinks.push({ id: 'legacy-twitter', platform: 'twitter', url: twitter, color: '1DA1F2', icon: 'twitter' });
    if (portfolio) finalLinks.push({ id: 'legacy-portfolio', platform: 'portfolio', url: portfolio, color: '2563EB', icon: 'globe' });
    if (email) finalLinks.push({ id: 'legacy-email', platform: 'email', url: email, color: 'D14836', icon: 'gmail' });
  }

  if (finalLinks.length === 0) return '';

  let md = generateSectionTitle('Connect With Me', sectionTitle, sectionTitleColor);
  md += `<p align="left">\n`;
  
  const style = badgeStyle || 'for-the-badge';

  if (finalLinks && finalLinks.length > 0) {
    finalLinks.forEach(link => {
      const plat = PLATFORMS.find(p => p.id === link.platform);
      const name = plat ? plat.name : link.platform;
      const safeName = encodeURIComponent(name).replace(/-/g, '--');
      const href = link.platform === 'email' ? `mailto:${link.url}` : link.url;
      if (link.url) {
        md += `  <a href="${href}"><img src="https://img.shields.io/badge/${safeName}-${link.color}?style=${style}&logo=${link.icon}&logoColor=${badgeLogoColor}" alt="${name}" /></a>\n`;
      }
    });
  }
  
  md += `</p>\n\n`;
  return md;
}

function generateContact(block: ContactBlock): string {
  const { sectionTitle, sectionTitleColor, email, message } = block.data;
  let md = generateSectionTitle('Contact', sectionTitle, sectionTitleColor);
  if (message) {
    md += `${message}\n\n`;
  }
  md += `You can reach me at: [${email}](mailto:${email})\n\n`;
  return md;
}

function generateBlogPosts(block: BlogPostsBlock, isPreview: boolean): string {
  const { sectionTitle, sectionTitleColor } = block.data;
  let md = generateSectionTitle('✍️ Latest Blog Posts', sectionTitle, sectionTitleColor);
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

function generateTrophies(block: TrophiesBlock, isPreview: boolean, previewMode?: 'dark' | 'light'): string {
  const { sectionTitle, sectionTitleColor, username, theme, columns, noFrame, noBg } = block.data;
  let md = generateSectionTitle('🏆 GitHub Trophies', sectionTitle, sectionTitleColor);
  const targetUsername = username && username !== 'yourusername' ? username : 'torvalds';
  const previewUsername = isPreview ? 'torvalds' : targetUsername;
  
  let darkParams = `username=${previewUsername}&theme=${theme}&column=${columns}`;
  let lightParams = `username=${previewUsername}&theme=flat&column=${columns}`;
  if (noFrame) { darkParams += '&no-frame=true'; lightParams += '&no-frame=true'; }
  if (noBg) { darkParams += '&no-bg=true'; lightParams += '&no-bg=true'; }

  md += `<div align="center">\n`;
  md += `  <a href="https://github.com/ryo-ma/github-profile-trophy">\n`;
  
  if (isPreview) {
    const params = previewMode === 'light' ? lightParams : darkParams;
    md += `    <img src="https://github-profile-trophy.vercel.app/?${params}" alt="${username} trophies" />\n`;
  } else {
    md += `    <picture>\n`;
    md += `      <source media="(prefers-color-scheme: dark)" srcset="https://github-profile-trophy.vercel.app/?${darkParams}" />\n`;
    md += `      <source media="(prefers-color-scheme: light)" srcset="https://github-profile-trophy.vercel.app/?${lightParams}" />\n`;
    md += `      <img src="https://github-profile-trophy.vercel.app/?${darkParams}" alt="${username} trophies" />\n`;
    md += `    </picture>\n`;
  }
  md += `  </a>\n`;
  md += `</div>\n\n`;
  return md;
}

function generateSpotify(block: SpotifyBlock): string {
  const { sectionTitle, sectionTitleColor, spotifyUrl, theme } = block.data;
  let md = generateSectionTitle('🎧 Currently Listening', sectionTitle, sectionTitleColor);
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
  const { sectionTitle, sectionTitleColor, iconColor, supportMode, buyMeACoffee, patreon, kofi, github, qrCodeBase64, qrCodeLabel } = block.data;
  const mode = supportMode || 'international';
  const badgeLogoColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : 'white';
  let md = generateSectionTitle('☕ Support Me', sectionTitle, sectionTitleColor);
  md += `<div align="center">\n`;
  
  if (mode === 'international') {
    if (buyMeACoffee) {
      md += `  <a href="https://www.buymeacoffee.com/${buyMeACoffee}">\n`;
      md += `    <img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />\n`;
      md += `  </a>\n`;
    }
    if (patreon) {
      md += `  <a href="https://patreon.com/${patreon}">\n`;
      md += `    <img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=${badgeLogoColor}" alt="Patreon" />\n`;
      md += `  </a>\n`;
    }
    if (kofi) {
      md += `  <a href="https://ko-fi.com/${kofi}">\n`;
      md += `    <img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=${badgeLogoColor}" alt="Ko-fi" />\n`;
      md += `  </a>\n`;
    }
    if (github) {
      md += `  <a href="https://github.com/sponsors/${github}">\n`;
      md += `    <img src="https://img.shields.io/badge/GitHub_Sponsors-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=${badgeLogoColor}" alt="GitHub Sponsors" />\n`;
      md += `  </a>\n`;
    }
  } else if (mode === 'local') {
    if (qrCodeBase64) {
      const src = isPreview ? qrCodeBase64 : './support-qr.png';
      if (qrCodeLabel) {
        md += `  <p><strong>${qrCodeLabel}</strong></p>\n`;
      }
      md += `  <img src="${src}" alt="${qrCodeLabel || 'QR Code'}" width="200" style="border-radius: 8px; border: 1px solid #e1e4e8;" />\n`;
    }
  }
  
  md += `</div>\n\n`;
  return md;
}

function generateExperience(block: ExperienceBlock, themeId: ThemeId, isPreview: boolean): string {
  const { sectionTitle, sectionTitleColor, iconColor, jobs } = block.data;
  if (!jobs || jobs.length === 0) return '';
  const badgeLogoColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : 'white';
  const badgeColor = (iconColor || sectionTitleColor || getThemeBadgeColor(themeId)).replace('#', '');

  let md = generateSectionTitle('💼 Work Experience', sectionTitle, sectionTitleColor);
  jobs.forEach(job => {
    md += `### ${job.title} at ${job.company}\n`;
    
    if (job.companyLogoBase64) {
      const src = isPreview ? job.companyLogoBase64 : `./company-${job.id}.png`;
      md += `<img src="${src}" alt="${job.company} Logo" height="64" style="border-radius: 4px;" />\n\n`;
    }

    md += `🗓️ _${job.duration}_\n\n`;
    
    if (job.description) {
      md += `${job.description}\n\n`;
    }

    if (job.techStack && job.techStack.length > 0) {
      md += `<div align="left">\n`;
      job.techStack.forEach(tech => {
        const skillDef = POPULAR_SKILLS.find(s => s.name.toLowerCase() === tech.toLowerCase());
        const safeName = encodeURIComponent(tech);
        const iconName = skillDef ? skillDef.icon : tech.toLowerCase().replace(/\s+/g, '');
        md += `  <img src="https://img.shields.io/badge/-${safeName}-${badgeColor}?style=flat-square&logo=${iconName}&logoColor=${badgeLogoColor}" alt="${tech}" />\n`;
      });
      md += `</div>\n\n`;
    }

    md += `---\n\n`;
  });
  return md;
}

function generateQuote(block: QuoteBlock): string {
  const { theme, layout, quote, author, showAuthor } = block.data;
  let md = `<div align="center">\n`;
  
  let url = `https://quotes-github-readme.vercel.app/api?type=${layout}&theme=${theme}`;
  
  if (quote && quote.trim() !== '') {
    url += `&quote=${encodeURIComponent(quote)}`;
  }
  
  if (author && author.trim() !== '') {
    if (showAuthor === false) {
      // If they explicitly disabled it, maybe pass a space or "Unknown"
      url += `&author=${encodeURIComponent(' ')}`;
    } else {
      url += `&author=${encodeURIComponent(author)}`;
    }
  } else if (showAuthor === false) {
    url += `&author=${encodeURIComponent(' ')}`;
  }
  
  md += `  <img src="${url}" alt="Random Quote" />\n`;
  md += `</div>\n\n`;
  return md;
}

function generateTerminal(block: TerminalBlock): string {
  const { username, lines, color, sectionTitle, sectionTitleColor } = block.data;
  let md = generateSectionTitle('', sectionTitle, sectionTitleColor);
  
  const cleanColor = (color || '4ade80').replace('#', '');
  
  md += `<div align="center">\n`;
  md += `  <table width="600" style="border-collapse: collapse; border: 1px solid #30363d; border-radius: 8px; overflow: hidden; background-color: #0d1117;">\n`;
  md += `    <tr style="background-color: #161b22; border-bottom: 1px solid #30363d;">\n`;
  md += `      <td style="padding: 10px; text-align: left;">\n`;
  md += `        <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Apple_macOS_Window_Controls.svg" alt="macOS buttons" width="50" style="vertical-align: middle;"/>\n`;
  md += `        <span style="color: #8b949e; font-family: -apple-system, monospace; font-size: 13px; margin-left: 20px; font-weight: 500;">~/${username}/bash</span>\n`;
  md += `      </td>\n`;
  md += `    </tr>\n`;
  md += `    <tr>\n`;
  md += `      <td style="padding: 20px; text-align: left; background-color: #0d1117;">\n`;
  
  if (lines && lines.length > 0) {
    const safeLines = lines.map(l => encodeURIComponent(l)).join(';');
    const googleFont = 'Fira+Code';
    md += `        <img src="https://readme-typing-svg.demolab.com?font=${googleFont}&weight=500&size=16&pause=1000&color=${cleanColor}&width=560&lines=${safeLines}" alt="Typing SVG" />\n`;
  }
  
  md += `      </td>\n`;
  md += `    </tr>\n`;
  md += `  </table>\n`;
  md += `</div>\n\n`;
  
  return md;
}

function generateAccordion(block: AccordionBlock): string {
  const { items, sectionTitle, sectionTitleColor } = block.data;
  if (!items || items.length === 0) return '';
  
  let md = generateSectionTitle('', sectionTitle, sectionTitleColor);
  
  items.forEach(item => {
    md += `<details>\n`;
    md += `  <summary><b>${item.title}</b></summary>\n\n`;
    md += `  <blockquote>\n`;
    md += `    ${item.content}\n`;
    md += `  </blockquote>\n`;
    md += `</details>\n\n`;
  });
  
  return md;
}

function generateBento(block: BentoBlock, themeId: ThemeId): string {
  const { bio, githubUsername, skills, role, sectionTitle, sectionTitleColor, iconColor } = block.data;
  let md = generateSectionTitle('', sectionTitle, sectionTitleColor);
  
  const badgeLogoColor = (iconColor && iconColor.trim() !== '') ? iconColor.replace('#', '') : 'white';
  const themeBadgeColor = (iconColor || sectionTitleColor || getThemeBadgeColor(themeId)).replace('#', '');
  
  md += `<table width="100%" style="border-collapse: separate; border-spacing: 10px;">\n`;
  md += `  <tr>\n`;
  md += `    <td width="60%" valign="top" style="padding: 20px; border: 1px solid #30363d; border-radius: 12px; background-color: #161b22;">\n`;
  md += `      <h2>Hi, I'm ${githubUsername} 👋</h2>\n`;
  md += `      <p style="color: #8b949e; font-size: 16px;">${role}</p>\n`;
  md += `      <p>${bio}</p>\n`;
  md += `    </td>\n`;
  md += `    <td width="40%" valign="top" style="padding: 20px; border: 1px solid #30363d; border-radius: 12px; background-color: #161b22;" align="center">\n`;
  md += `      <img src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=transparent&title_color=58a6ff&text_color=c9d1d9&icon_color=58a6ff" alt="GitHub Stats" width="100%" />\n`;
  md += `    </td>\n`;
  md += `  </tr>\n`;
  
  if (skills && skills.length > 0) {
    md += `  <tr>\n`;
    md += `    <td colspan="2" style="padding: 20px; border: 1px solid #30363d; border-radius: 12px; background-color: #161b22;">\n`;
    md += `      <h3>Core Technologies</h3>\n`;
    md += `      <div align="left">\n`;
    skills.forEach(skill => {
      const skillDef = POPULAR_SKILLS.find(s => s.name.toLowerCase() === skill.toLowerCase());
      const safeSkillName = encodeURIComponent(skill);
      const iconName = skillDef ? skillDef.icon : skill.toLowerCase().replace(/\s+/g, '');
      const badgeColor = themeBadgeColor;
      md += `        <img src="https://img.shields.io/badge/-${safeSkillName}-${badgeColor}?style=for-the-badge&logo=${iconName}&logoColor=${badgeLogoColor}" alt="${skill}" style="margin-bottom: 5px;" />\n`;
    });
    md += `      </div>\n`;
    md += `    </td>\n`;
    md += `  </tr>\n`;
  }
  md += `</table>\n\n`;
  
  return md;
}
