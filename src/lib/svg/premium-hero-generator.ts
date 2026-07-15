export interface PremiumHeroSvgProps {
  name: string;
  titles: string[];
  location: string;
  education: string;
  focus: string;
  portfolio: string;
  email: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  theme: 'light' | 'dark';
  accent1?: string;
  accent2?: string;
  accent3?: string;
  style?: 'solid' | 'gradient';
  avatarBase64?: string;
}

export function generatePremiumHeroSvg(props: PremiumHeroSvgProps): string {
  const {
    name, titles, location, education, focus, portfolio, email, skills,
    github: _github, linkedin: _linkedin, twitter: _twitter, theme, 
    accent1: customAccent1, accent2: customAccent2, accent3: customAccent3, style, 
    avatarBase64
  } = props;

  const isDark = theme === 'dark';
  const isSolid = style === 'solid';

  // Theme colors
  const bg = isDark ? '#030712' : '#FFFFFF';
  const panel = isDark ? '#0F172A' : '#F8FAFC';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#475569';
  const accent1 = customAccent1 ? (customAccent1.startsWith('#') ? customAccent1 : `#${customAccent1}`) : (isDark ? '#7C3AED' : '#2563EB');
  
  let accent2 = accent1;
  let accent3 = accent1;
  
  if (!isSolid) {
    accent2 = customAccent2 ? (customAccent2.startsWith('#') ? customAccent2 : `#${customAccent2}`) : (isDark ? '#22D3EE' : '#06B6D4');
    accent3 = customAccent3 ? (customAccent3.startsWith('#') ? customAccent3 : `#${customAccent3}`) : (isDark ? '#10B981' : '#10B981');
  }

  // ASCII Portrait (Simulated)
  const asciiLines = [
    "      .:::::::::.",
    "    .::'       `::.",
    "   ::'           `::",
    "  ::               ::",
    "  ::               ::",
    "  ::   .-------.   ::",
    "  ::   |       |   ::",
    "  ::   |       |   ::",
    "  ::   '-------'   ::",
    "   ::.           .::",
    "    `::.       .::'",
    "      `:::::::::'",
    "        `:::::'",
    "          `:'"
  ];

  return `
<svg width="100%" viewBox="0 0 1180 610" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${bg}" />
    </linearGradient>

    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isSolid ? `
      <stop offset="0%" stop-color="${accent1}" />
      <stop offset="100%" stop-color="${accent1}" />
      ` : `
      <stop offset="0%" stop-color="${accent1}">
        <animate attributeName="stop-color" values="${accent1};${accent2};${accent3};${accent1}" dur="8s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="${accent2}">
        <animate attributeName="stop-color" values="${accent2};${accent3};${accent1};${accent2}" dur="8s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="${accent3}">
        <animate attributeName="stop-color" values="${accent3};${accent1};${accent2};${accent3}" dur="8s" repeatCount="indefinite" />
      </stop>
      `}
    </linearGradient>

    <!-- Filters -->
    <filter id="glow-1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-2" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="50" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="blur-glass" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
      <feBlend in="SourceGraphic" in2="glow" mode="normal" />
    </filter>

    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" />
    </filter>
    
    <!-- Clip Paths & Masks -->
    <clipPath id="canvas-clip">
      <rect width="1180" height="610" rx="24" ry="24" />
    </clipPath>

    <clipPath id="left-panel-clip">
      <rect width="400" height="530" rx="16" />
    </clipPath>

    ${avatarBase64 ? `
    <!-- Pattern to simulate horizontal ASCII/Scanline characters -->
    <pattern id="ascii-pattern" width="8" height="6" patternUnits="userSpaceOnUse">
      <rect y="2" width="6" height="2" fill="white" />
    </pattern>
    <mask id="ascii-mask">
      <rect width="400" height="530" fill="url(#ascii-pattern)" />
    </mask>
    <filter id="grayscale">
      <feColorMatrix type="matrix" values="
        0.33 0.33 0.33 0 0
        0.33 0.33 0.33 0 0
        0.33 0.33 0.33 0 0
        0 0 0 1 0" />
    </filter>
    ` : ''}
  </defs>

  <style>
    .font-mono { font-family: 'SF Mono', Consolas, Menlo, monospace; }
    .font-sans { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    .typing-text {
      font-family: 'SF Mono', Consolas, Menlo, monospace;
      fill: ${textPrimary};
      font-size: 24px;
      font-weight: 600;
    }

    .cursor {
      fill: url(#accent-grad);
      animation: blink 1s step-start infinite;
    }

    @keyframes blink {
      50% { opacity: 0; }
    }

    .pill {
      transition: all 0.3s ease;
    }
    
    .pill:hover rect {
      stroke: url(#accent-grad);
      stroke-width: 2;
    }
    
    .pill:hover text {
      fill: url(#accent-grad);
    }
  </style>

  <!-- Background -->
  <g clip-path="url(#canvas-clip)">
    <rect width="1180" height="610" fill="url(#bg-grad)" />
    
    <!-- Animated Glows -->
    <circle cx="200" cy="200" r="400" fill="url(#glow-1)">
      <animate attributeName="cx" values="200;400;200" dur="15s" repeatCount="indefinite" />
      <animate attributeName="cy" values="200;300;200" dur="20s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="900" cy="400" r="500" fill="url(#glow-2)">
      <animate attributeName="cx" values="900;700;900" dur="18s" repeatCount="indefinite" />
      <animate attributeName="cy" values="400;200;400" dur="25s" repeatCount="indefinite" />
    </circle>

    <!-- Noise Overlay -->
    <rect width="1180" height="610" fill="none" filter="url(#noise)" style="mix-blend-mode: overlay;" />

    <!-- Left Side -->
    <g transform="translate(40, 40)">
      <rect width="400" height="530" rx="16" fill="${panel}" fill-opacity="0.4" stroke="${border}" stroke-width="1" filter="url(#blur-glass)" />
      
      ${avatarBase64 ? `
      <!-- Uploaded Avatar Image (Full Panel ASCII Hologram) -->
      <g clip-path="url(#left-panel-clip)">
        <!-- The hologram image mapped to gradient and dotted -->
        <g mask="url(#ascii-mask)">
          <!-- Base tinted background for dark areas -->
          <rect width="400" height="530" fill="url(#accent-grad)" opacity="0.05" />
          <image href="${avatarBase64}" xlink:href="${avatarBase64}" width="400" height="530" preserveAspectRatio="xMidYMid meet" filter="url(#grayscale)" opacity="0.8" />
          <rect width="400" height="530" fill="url(#accent-grad)" opacity="0.5" style="mix-blend-mode: overlay;" />
        </g>
        
        <!-- Intense Scanline over the full avatar -->
        <rect width="400" height="4" fill="url(#accent-grad)" filter="url(#glow-1)" opacity="0.8">
          <animate attributeName="y" values="-10;540;-10" dur="3s" repeatCount="indefinite" />
        </rect>
      </g>
      ` : `
      <!-- ASCII Art Fallback -->
      <g transform="translate(80, 140)" class="font-mono" font-size="16" fill="url(#accent-grad)" font-weight="bold" opacity="0.9">
        <animateTransform attributeName="transform" type="translate" values="80,140; 80,130; 80,140" dur="6s" repeatCount="indefinite" />
        ${asciiLines.map((line, i) => `<text y="${i * 20}" opacity="0">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="${1 + i * 0.1}s" fill="freeze" />
          ${line.replace(/ /g, '&#160;')}
        </text>`).join('')}
      </g>
      `}
      
      <!-- Scanline -->
      <rect x="0" y="0" width="400" height="4" fill="url(#accent-grad)" opacity="0.5">
        <animate attributeName="y" values="0;530;0" dur="4s" repeatCount="indefinite" />
      </rect>
    </g>

    <!-- Right Side (Terminal) -->
    <g transform="translate(480, 40)">
      <rect width="660" height="530" rx="16" fill="${panel}" fill-opacity="0.6" stroke="${border}" stroke-width="1" filter="url(#blur-glass)" />
      
      <!-- Window Controls -->
      <g transform="translate(24, 24)">
        <circle cx="0" cy="0" r="6" fill="#EF4444" opacity="0.8" />
        <circle cx="20" cy="0" r="6" fill="#F59E0B" opacity="0.8" />
        <circle cx="40" cy="0" r="6" fill="#10B981" opacity="0.8" />
      </g>

      <!-- Terminal Content -->
      <g transform="translate(40, 80)">
        <text class="font-sans" font-size="28" font-weight="bold" fill="${textPrimary}">Hi &#128075;</text>
        <text class="font-sans" font-size="48" font-weight="800" fill="${textPrimary}" y="60">I'm <tspan fill="url(#accent-grad)">${name || 'Developer'}</tspan></text>
        
        <!-- Animated Roles -->
        <g transform="translate(0, 110)">
          <text class="typing-text" x="0" y="0">&gt; ${titles[0] || 'Developer'}</text>
          <rect class="cursor" x="${(titles[0] || 'Developer').length * 15 + 25}" y="-20" width="12" height="26" />
        </g>

        <!-- Information List -->
        <g transform="translate(0, 170)" class="font-mono" font-size="15" fill="${textMuted}">
          ${[
            { label: 'Location', val: location },
            { label: 'Education', val: education },
            { label: 'Focus', val: focus },
            ...(portfolio ? [{ label: 'Portfolio', val: portfolio }] : []),
            ...(email ? [{ label: 'Email', val: email }] : [])
          ].map((item, i) => `
            <g transform="translate(0, ${i * 30})" opacity="0">
              <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${1 + i * 0.2}s" fill="freeze" />
              <text><tspan fill="${accent2}" font-weight="bold">${item.label}:</tspan> ${item.val}</text>
            </g>
          `).join('')}
        </g>

        <!-- Skills Section -->
        <g transform="translate(0, 360)">
          <text class="font-mono" font-size="14" fill="${accent1}" font-weight="bold" opacity="0">
            <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.5s" fill="freeze" />
            &gt; SKILLS
          </text>
          
          <!-- Skills Pills -->
          <g transform="translate(0, 20)">
            ${skills.slice(0, 4).map((skill, i) => `
              <g class="pill" transform="translate(${i * 105}, 0)" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${3 + i * 0.1}s" fill="freeze" />
                <rect width="95" height="30" rx="15" fill="${textPrimary}" fill-opacity="0.05" stroke="${border}" stroke-width="1" />
                <text x="47.5" y="19" class="font-sans" font-size="13" fill="${textMuted}" text-anchor="middle" font-weight="500">${skill}</text>
              </g>
              `).join('')}
          </g>
        </g>
      </g>
    </g>

    <!-- Animated Border Shimmer (Main Canvas) -->
    <rect width="1178" height="608" x="1" y="1" rx="23" fill="none" stroke="url(#accent-grad)" stroke-width="2" opacity="0.3">
       <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
    </rect>
  </g>
</svg>
  `.trim();
}
