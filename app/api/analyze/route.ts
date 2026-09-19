import { NextRequest, NextResponse } from 'next/server';
import { analyzeLegalDocumentAI } from '@/lib/ai-provider';
import { sanitizeLegalInput, checkRateLimit } from '@/lib/security';
import { SAMPLE_RESIDENTIAL_LEASE } from '@/lib/sample-documents';

export async function GET() {
  return NextResponse.json(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(ip, 30, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { text, title } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
    }

    const cleanText = sanitizeLegalInput(text);
    const cleanTitle = typeof title === 'string' ? sanitizeLegalInput(title).slice(0, 100) : 'Legal Document';

    if (cleanText.length < 10) {
      return NextResponse.json(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
    }

    const report = await analyzeLegalDocumentAI(cleanText, cleanTitle);
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json({ error: 'Internal server error while analyzing document' }, { status: 500 });
  }
}
