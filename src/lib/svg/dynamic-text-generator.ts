import { getFontStack } from '../constants/fonts';

export interface DynamicTextSvgProps {
  style: 'code-editor' | 'terminal-scroll' | 'marquee' | 'vertical-scroll' | 'glitch' | 'neon' | 'arcade' | 'matrix';
  text: string;
  color: string;
  background?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  direction?: 'normal' | 'reverse';
  fontFamily?: string;
}

export function generateDynamicTextSvg(props: DynamicTextSvgProps): string {
  const {
    style,
    text,
    color,
    background = '#0d1117', // default dark
    width = 800,
    height = 400,
    fontSize = 16,
    direction = 'normal',
    fontFamily
  } = props;

  const lines = text.split('\n').filter(l => l.trim().length > 0 || l === '');
  const cleanColor = color.startsWith('#') ? color : `#${color}`;
  const cleanBg = background.startsWith('#') ? background : `#${background}`;

  switch (style) {
    case 'code-editor':
      return generateCodeEditor(lines, cleanColor, cleanBg, width, Math.max(height, lines.length * (fontSize * 1.5) + 60), fontSize, fontFamily);
    case 'terminal-scroll':
      return generateTerminalScroll(lines, cleanColor, cleanBg, width, height, fontSize, fontFamily);
    case 'marquee':
      return generateMarquee(lines.join(' • '), cleanColor, cleanBg, width, 60, fontSize + 4, direction, fontFamily);
    case 'vertical-scroll':
      return generateVerticalScroll(lines, cleanColor, cleanBg, width, height, fontSize, direction, fontFamily);
    case 'glitch':
      return generateGlitch(lines.join(' • '), cleanColor, cleanBg, width, 120, fontSize + 8, fontFamily);
    case 'neon':
      return generateNeon(lines.join(' '), cleanColor, cleanBg, width, 120, fontSize + 8, fontFamily);
    case 'arcade':
      return generateArcade(lines.join(' '), cleanColor, cleanBg, width, 120, fontSize + 4, fontFamily);
    case 'matrix':
      return generateMatrix(lines, cleanColor, cleanBg, width, height, fontSize, fontFamily);
    default:
      return generateMarquee('Invalid Style', '#ff0000', cleanBg, width, 60, fontSize, 'normal', fontFamily);
  }
}

function generateCodeEditor(lines: string[], color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const lineHeight = fs * 1.5;
  let textElements = '';
  let styles = '';
  const fontStack = getFontStack(fontId, "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace");

  lines.forEach((line, i) => {
    const y = 70 + i * lineHeight;
    const begin = i * 1.5;
    const dur = 1.5;
    
    // CSS-based typing effect using clip-path inset (top right bottom left)
    // 0 100% 0 0 completely hides it by clipping 100% from the right
    styles += `
      .line-${i} {
        clip-path: inset(0 100% 0 0);
        animation: type-${i} ${dur}s steps(40, end) ${begin}s forwards;
      }
      @keyframes type-${i} {
        from { clip-path: inset(0 100% 0 0); }
        to { clip-path: inset(0 0 0 0); }
      }
    `;

    // Simple syntax highlighting heuristic for Javascript/Typescript-like code
    let formattedLine = line
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
      
    // Very basic coloring
    if (formattedLine.includes('function') || formattedLine.includes('const') || formattedLine.includes('let')) {
      formattedLine = formattedLine.replace(/\\b(function|const|let|import|from|export|return)\\b/g, '<tspan fill="#ff7b72">$1</tspan>');
    }
    formattedLine = formattedLine.replace(/\\b(true|false|null|undefined)\\b/g, '<tspan fill="#79c0ff">$1</tspan>');
    formattedLine = formattedLine.replace(/(['"].*?['"])/g, '<tspan fill="#a5d6ff">$1</tspan>');

    textElements += `
      <text x="20" y="${y}" class="line-${i}" font-family="${fontStack}" font-size="${fs}" fill="${color}">
        ${formattedLine}
      </text>
    `;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>${styles}</style>
      <rect width="100%" height="100%" rx="12" fill="${bg}" stroke="#30363d" stroke-width="1"/>
      <!-- Mac Window Controls -->
      <circle cx="20" cy="20" r="6" fill="#ff5f56" />
      <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
      <circle cx="60" cy="20" r="6" fill="#27c93f" />
      
      <g>
        ${textElements}
      </g>
    </svg>
  `.trim();
}

function generateMarquee(text: string, color: string, bg: string, w: number, h: number, fs: number, dir: 'normal'|'reverse', fontId?: string): string {
  const from = dir === 'normal' ? `${w}px` : '-100%';
  const to = dir === 'normal' ? '-100%' : `${w}px`;
  const fontStack = getFontStack(fontId, 'system-ui, -apple-system, sans-serif');
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        .marquee {
          animation: scroll 15s linear infinite;
          font-family: ${fontStack};
          font-weight: 700;
          font-size: ${fs}px;
          fill: ${color};
        }
        @keyframes scroll {
          0% { transform: translateX(${from}); }
          100% { transform: translateX(${to}); }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="8" />
      <text x="0" y="${h / 2 + fs / 3}" class="marquee">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    </svg>
  `.trim();
}

function generateVerticalScroll(lines: string[], color: string, bg: string, w: number, h: number, fs: number, dir: 'normal'|'reverse', fontId?: string): string {
  const lineHeight = fs * 1.6;
  const totalHeight = lines.length * lineHeight;
  const fontStack = getFontStack(fontId, 'system-ui, -apple-system, sans-serif');
  
  const from = dir === 'normal' ? h : -totalHeight;
  const to = dir === 'normal' ? -totalHeight : h;
  
  const textElements = lines.map((line, i) => {
    return `<text x="50%" y="${i * lineHeight}" text-anchor="middle" font-family="${fontStack}" font-size="${fs}" fill="${color}">${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`;
  }).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        .scroll {
          animation: vscroll 20s linear infinite;
        }
        @keyframes vscroll {
          0% { transform: translateY(${from}px); }
          100% { transform: translateY(${to}px); }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="12" />
      <g class="scroll" transform="translate(0, ${h})">
        ${textElements}
      </g>
      <!-- Gradient overlays to fade out top and bottom -->
      <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${bg}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${bg}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
      </linearGradient>
      <rect width="100%" height="${fs * 3}" fill="url(#fadeTop)" />
      <rect y="${h - fs * 3}" width="100%" height="${fs * 3}" fill="url(#fadeBottom)" />
    </svg>
  `.trim();
}

function generateTerminalScroll(lines: string[], color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const lineHeight = fs * 1.5;
  const totalHeight = lines.length * lineHeight;
  
  let styles = '';
  let textElements = '';
  const fontStack = getFontStack(fontId, "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace");
  
  lines.forEach((line, i) => {
    const y = 70 + i * lineHeight;
    const begin = i * 0.5;

    styles += `
      .term-line-${i} {
        clip-path: inset(0 100% 0 0);
        animation: term-type-${i} 0.5s steps(40, end) ${begin}s forwards;
      }
      @keyframes term-type-${i} {
        from { clip-path: inset(0 100% 0 0); }
        to { clip-path: inset(0 0 0 0); }
      }
    `;

    textElements += `
      <text x="20" y="${y}" class="term-line-${i}" font-family="${fontStack}" font-size="${fs}" fill="${color}">
        <tspan fill="#ff7b72">~</tspan> <tspan fill="#79c0ff">❯</tspan> ${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>
    `;
  });

  const scrollDur = Math.max((lines.length * 0.5), 10);
  const maxTranslate = Math.max(0, totalHeight - h + 70);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        ${styles}
        .terminal-scroll {
          animation: panup ${scrollDur}s linear infinite;
        }
        @keyframes panup {
          0%, ${Math.min(50, (h / totalHeight) * 100)}% { transform: translateY(0); }
          80%, 100% { transform: translateY(-${maxTranslate}px); }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="12" stroke="#30363d" stroke-width="1" />
      
      <!-- Terminal Header -->
      <rect width="100%" height="32" fill="#161b22" rx="12" />
      <!-- Square bottom corners for header so it merges into terminal body smoothly -->
      <rect width="100%" height="12" y="20" fill="#161b22" /> 
      
      <circle cx="20" cy="16" r="6" fill="#ff5f56" />
      <circle cx="40" cy="16" r="6" fill="#ffbd2e" />
      <circle cx="60" cy="16" r="6" fill="#27c93f" />
      <text x="50%" y="20" text-anchor="middle" font-family="${fontStack}" font-size="12" fill="#8b949e">user@macbook:~</text>
      
      <g class="${maxTranslate > 0 ? 'terminal-scroll' : ''}">
        ${textElements}
      </g>
    </svg>
  `.trim();
}

function generateGlitch(text: string, color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const fontStack = getFontStack(fontId, 'system-ui, -apple-system, sans-serif');
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        .glitch {
          font-family: ${fontStack};
          font-weight: 900;
          font-size: ${fs}px;
          text-anchor: middle;
        }
        .layer1 { fill: #0ff; animation: glitch-anim-1 2s infinite linear alternate-reverse; }
        .layer2 { fill: #f0f; animation: glitch-anim-2 3s infinite linear alternate-reverse; }
        .layer3 { fill: ${color}; }
        
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 1px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, -2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 2px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, -1px); }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="8" />
      
      <text x="50%" y="${h / 2 + fs / 3}" class="glitch layer1">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
      <text x="50%" y="${h / 2 + fs / 3}" class="glitch layer2">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
      <text x="50%" y="${h / 2 + fs / 3}" class="glitch layer3">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    </svg>
  `.trim();
}

export function generateNeon(text: string, color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const fontStack = getFontStack(fontId, "system-ui, -apple-system, sans-serif");
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feGaussianBlur stdDeviation="15" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>
        .neon-text {
          font-family: ${fontStack};
          font-size: ${fs}px;
          font-weight: 800;
          fill: #ffffff;
          filter: url(#neonGlow);
          text-anchor: middle;
          dominant-baseline: middle;
          animation: flicker 4s infinite alternate;
        }
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.5; }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="12" />
      <text x="50%" y="50%" class="neon-text" style="color: ${color}; text-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color};">${text}</text>
    </svg>
  `;
}

export function generateArcade(text: string, color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const fontStack = getFontStack(fontId, "'Courier New', Courier, monospace");
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        .arcade-text {
          font-family: ${fontStack};
          font-size: ${fs}px;
          font-weight: 900;
          fill: ${color};
          text-anchor: middle;
          dominant-baseline: middle;
          letter-spacing: 2px;
          animation: blink 1s step-end infinite;
          text-transform: uppercase;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="12" />
      <text x="50%" y="50%" class="arcade-text">${text}</text>
      <!-- Subtle pixel grid overlay -->
      <path d="M0,0 L${w},0 L${w},${h} L0,${h} Z" fill="url(#grid)" opacity="0.05" />
      <defs>
        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" stroke="#ffffff" stroke-width="0.5" />
        </pattern>
      </defs>
    </svg>
  `;
}

export function generateMatrix(lines: string[], color: string, bg: string, w: number, h: number, fs: number, fontId?: string): string {
  const fontStack = getFontStack(fontId, "monospace");
  let styles = '';
  let columns = '';
  const colCount = Math.floor(w / (fs * 0.8));
  
  for(let i = 0; i < colCount; i++) {
    const x = i * (fs * 0.8);
    const delay = Math.random() * 5;
    const dur = 3 + Math.random() * 5;
    
    // Pick a random snippet from lines, or random chars
    const lineSrc = lines[i % lines.length] || '010101';
    let colText = '';
    for(let j=0; j<Math.floor(h/fs); j++) {
      colText += `<tspan x="${x}" dy="${fs}">${lineSrc[Math.floor(Math.random() * lineSrc.length)] || String.fromCharCode(33 + Math.floor(Math.random() * 90))}</tspan>`;
    }
    
    styles += `
      .matrix-col-${i} {
        animation: fall-${i} ${dur}s linear ${delay}s infinite;
        opacity: 0;
      }
      @keyframes fall-${i} {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100%); opacity: 0; }
      }
    `;
    
    columns += `<text class="matrix-col-${i}" font-family="${fontStack}" font-size="${fs}" fill="${color}" style="white-space: pre;">${colText}</text>`;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <style>
        ${styles}
        .matrix-overlay { mix-blend-mode: multiply; }
      </style>
      <rect width="100%" height="100%" fill="${bg}" rx="12" />
      <g opacity="0.8">
        ${columns}
      </g>
      <rect width="100%" height="100%" fill="url(#fade)" class="matrix-overlay" rx="12" />
      <defs>
        <linearGradient id="fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${bg}" stop-opacity="1" />
          <stop offset="50%" stop-color="${bg}" stop-opacity="0" />
          <stop offset="100%" stop-color="${bg}" stop-opacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  `;
}
