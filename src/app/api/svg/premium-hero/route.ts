import { NextRequest, NextResponse } from 'next/server';
import { generatePremiumHeroSvg } from '@/lib/svg/premium-hero-generator';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const theme = searchParams.get('theme') === 'light' ? 'light' : 'dark';
  const name = searchParams.get('name') || 'Developer';
  
  // Parse arrays safely
  let titles = ['Frontend Engineer', 'Full Stack Developer'];
  try {
    const titlesParam = searchParams.get('titles');
    if (titlesParam) titles = titlesParam.split(',').map(t => t.trim());
  } catch (e) {}

  let skills = ['React', 'Next.js', 'TypeScript', 'Tailwind'];
  try {
    const skillsParam = searchParams.get('skills');
    if (skillsParam) skills = skillsParam.split(',').map(s => s.trim());
  } catch (e) {}

  const location = searchParams.get('location') || 'San Francisco, CA';
  const education = searchParams.get('education') || 'Computer Science, B.S.';
  const focus = searchParams.get('focus') || 'Building cool things';
  const portfolio = searchParams.get('portfolio') || 'https://yourwebsite.com';
  const email = searchParams.get('email') || 'hello@yourwebsite.com';
  
  // Socials
  const github = searchParams.get('github') || '';
  const linkedin = searchParams.get('linkedin') || '';
  const twitter = searchParams.get('twitter') || '';

  // Accents & Style
  const customAccent1 = searchParams.get('accent1') || '';
  const customAccent2 = searchParams.get('accent2') || '';
  const customAccent3 = searchParams.get('accent3') || '';
  const style = searchParams.get('style') as 'solid' | 'gradient' || 'gradient';

  let avatarBase64 = '';
  let avatarUrl = searchParams.get('avatarUrl');
  
  if (avatarUrl) {
    // Auto-fix github profile URLs to point to their avatar image
    if (avatarUrl.startsWith('https://github.com/') && !avatarUrl.includes('.png') && !avatarUrl.includes('.jpg')) {
      avatarUrl = `${avatarUrl}.png`;
    }

    try {
      const res = await fetch(avatarUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        const type = res.headers.get('content-type');
        if (type && type.startsWith('image/')) {
          const buffer = await res.arrayBuffer();
          const base64Str = Buffer.from(buffer).toString('base64');
          avatarBase64 = `data:${type};base64,${base64Str}`;
        } else {
          console.error('URL did not return an image. Content-Type:', type);
        }
      }
    } catch (e) {
      console.error('Error fetching avatar:', e);
    }
  }

  const svg = generatePremiumHeroSvg({
    name, titles, location, education, focus, portfolio, email, skills,
    github, linkedin, twitter, theme,
    accent1: customAccent1, accent2: customAccent2, accent3: customAccent3, style,
    avatarBase64
  });

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
