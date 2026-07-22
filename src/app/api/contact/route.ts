import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Zod Schema for strict input validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

// 2. In-memory Rate Limiter
// Max 3 requests per 60 seconds per IP
const rateLimit = new LRUCache<string, number>({
  max: 500, // Maximum number of IPs to track
  ttl: 60 * 1000, // 1 minute
});

// 3. HTML Escape Utility to prevent XSS
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    // --- RATE LIMITING ---
    // Get IP address from headers, fallback to 'unknown'
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (ip !== 'unknown') {
      const currentCount = rateLimit.get(ip) || 0;
      if (currentCount >= 3) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      rateLimit.set(ip, currentCount + 1);
    }

    // --- INPUT PARSING ---
    const body = await req.json();

    // --- SCHEMA VALIDATION ---
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ 
        error: 'Invalid input.', 
        details: parsed.error.format() 
      }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    // --- XSS SANITIZATION ---
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message);
    const safeEmail = escapeHtml(email);

    // --- SEND EMAIL ---
    const { error } = await resend.emails.send({
      from: 'Profilo Contact <onboarding@resend.dev>',
      to: ['alexkgm2412@gmail.com'],
      replyTo: email, // Zod already validated this is a pure email
      subject: `[Profilo] New message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text is safe
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #4B86F7; margin-bottom: 4px;">New message from Profilo</h2>
          <p style="color: #888; font-size: 13px; margin-top: 0;">via profilo contact form</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin-top: 8px; white-space: pre-wrap; color: #333;">${safeMessage}</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
