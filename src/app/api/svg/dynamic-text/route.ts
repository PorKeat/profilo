import { NextRequest, NextResponse } from 'next/server';
import { generateDynamicTextSvg } from '@/lib/svg/dynamic-text-generator';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  const style = (searchParams.get('style') || 'marquee') as 'code-editor' | 'terminal-scroll' | 'marquee' | 'vertical-scroll' | 'glitch';
  const text = searchParams.get('text') || 'Hello World';
  const color = searchParams.get('color') || '00ff9f';
  const background = searchParams.get('bg') || '0d1117';
  const width = parseInt(searchParams.get('w') || '800', 10);
  const height = parseInt(searchParams.get('h') || '400', 10);
  const fontSize = parseInt(searchParams.get('fs') || '16', 10);

  const svg = generateDynamicTextSvg({
    style,
    text,
    color,
    background,
    width,
    height,
    fontSize
  });

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
