import { NextRequest, NextResponse } from 'next/server';
import { generateMinimalistHeroSvg } from '@/lib/svg/minimalist-hero-generator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name') || 'Your Name';
    const title = searchParams.get('title') || 'Your Title';
    const bio = searchParams.get('bio') || 'Your short bio here.';
    const bgColor = searchParams.get('bg') || '#000000';
    const accentColor = searchParams.get('accent') || '#ffffff';
    const fontFamily = searchParams.get('font') || undefined;
    const layout = (searchParams.get('layout') as 'left' | 'right') || 'left';
    
    // We cannot easily pass large base64 strings via GET URL params,
    // so for dynamic generation via markdown we rely on placeholder or an external URL if provided.
    // In a real app, images might be fetched from a provided URL and embedded, 
    // but here we just pass the URL if we can fetch it, or leave it empty.
    let avatarBase64 = '';
    const avatarUrl = searchParams.get('avatar');
    if (avatarUrl && avatarUrl.startsWith('http')) {
      try {
        const imgRes = await fetch(avatarUrl);
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          const contentType = imgRes.headers.get('content-type') || 'image/png';
          avatarBase64 = `data:${contentType};base64,${base64}`;
        }
      } catch (e) {
        console.error('Failed to fetch avatar URL:', e);
      }
    }

    const svg = generateMinimalistHeroSvg({
      name,
      title,
      bio,
      bgColor,
      accentColor,
      fontFamily,
      layout,
      avatarBase64
    });

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating minimalist hero SVG:', error);
    return new NextResponse('<svg xmlns="http://www.w3.org/2000/svg"><text>Error generating SVG</text></svg>', {
      status: 500,
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
}
