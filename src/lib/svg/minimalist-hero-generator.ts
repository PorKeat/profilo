import { getFontStack } from '../constants/fonts';

export interface MinimalistHeroSvgProps {
  name: string;
  title: string;
  bio: string;
  avatarBase64?: string;
  bgColor?: string;
  accentColor?: string;
  fontFamily?: string;
  layout?: 'left' | 'right'; // layout="right" means avatar on the left, layout="left" means avatar on the right (default)
}

export function generateMinimalistHeroSvg(props: MinimalistHeroSvgProps): string {
  const {
    name,
    title,
    bio,
    avatarBase64,
    bgColor = '#000000',
    accentColor = '#ffffff',
    fontFamily,
    layout = 'left' // default text on left, avatar on right
  } = props;

  const width = 800;
  const height = 400;
  
  const fontStack = getFontStack(fontFamily, "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif");
  
  const isTextLeft = layout === 'left';
  const textX = isTextLeft ? 60 : 380;
  const avatarCx = isTextLeft ? 620 : 180;
  
  // Create circular clip path for the avatar
  const avatarSize = 240;
  const avatarRadius = avatarSize / 2;
  
  // If no avatar is provided, use a placeholder
  const hasAvatar = avatarBase64 && avatarBase64.length > 0;
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>
        .font-sans { font-family: ${fontStack}; }
        .text-accent { fill: ${accentColor}; }
        .text-primary { fill: #ffffff; }
        .text-secondary { fill: rgba(255, 255, 255, 0.7); }
        .title-text {
          font-weight: 800;
          font-size: 48px;
          letter-spacing: -1.5px;
        }
        .subtitle-text {
          font-weight: 600;
          font-size: 24px;
          letter-spacing: -0.5px;
        }
        .bio-text {
          font-weight: 400;
          font-size: 18px;
          line-height: 1.5;
        }
      </style>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${bgColor}" rx="24" />

      <!-- Minimalist Layout -->
      
      <!-- Text Side -->
      <g transform="translate(${textX}, 140)">
        <text class="font-sans title-text text-primary" x="0" y="0">${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
        <text class="font-sans subtitle-text text-accent" x="0" y="35">${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
        
        <!-- Bio Multiline (Max 3 lines approx) -->
        <foreignObject x="0" y="60" width="350" height="150">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: ${fontStack}; color: rgba(255,255,255,0.7); font-size: 18px; line-height: 1.5; text-align: left;">
            ${bio.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
        </foreignObject>
      </g>

      <!-- Avatar Side -->
      <g transform="translate(${avatarCx}, 200)">
        <defs>
          <clipPath id="avatar-clip">
            <circle cx="0" cy="0" r="${avatarRadius}" />
          </clipPath>
          <linearGradient id="avatar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.2" />
          </linearGradient>
        </defs>
        
        <!-- Glow/Ring -->
        <circle cx="0" cy="0" r="${avatarRadius + 8}" fill="url(#avatar-glow)" />
        <circle cx="0" cy="0" r="${avatarRadius}" fill="#111111" />
        
        ${hasAvatar ? `
          <image href="${avatarBase64}" x="-${avatarRadius}" y="-${avatarRadius}" width="${avatarSize}" height="${avatarSize}" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar-clip)" />
        ` : `
          <!-- Placeholder avatar -->
          <text class="font-sans" x="0" y="10" font-size="64" fill="rgba(255,255,255,0.2)" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
            ${name ? name.charAt(0).toUpperCase() : '?'}
          </text>
        `}
      </g>
    </svg>
  `;
}
