import { NextRequest, NextResponse } from 'next/server';
import { simplifyLegalDocument } from '@/lib/use-cases/simplify-legal-documents';
import { SAMPLE_RESIDENTIAL_LEASE } from '@/lib/sample-documents';
import { sanitizeLegalInput, checkRateLimit } from '@/lib/security';

export async function GET() {
  const simplified = simplifyLegalDocument(SAMPLE_RESIDENTIAL_LEASE.rawText, SAMPLE_RESIDENTIAL_LEASE.title);
  return NextResponse.json(simplified);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`simplify-${ip}`, 40, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { text, title } = body;

    if (!text || typeof text !== 'string') {
      // Return sample simplification if no text provided
      const sampleResult = simplifyLegalDocument(SAMPLE_RESIDENTIAL_LEASE.rawText, SAMPLE_RESIDENTIAL_LEASE.title);
      return NextResponse.json(sampleResult);
    }

    const cleanText = sanitizeLegalInput(text);
    const cleanTitle = typeof title === 'string' ? sanitizeLegalInput(title).slice(0, 100) : 'Legal Document';

    const result = simplifyLegalDocument(cleanText, cleanTitle);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/simplify:', error);
    return NextResponse.json({ error: 'Failed to simplify document' }, { status: 500 });
  }
}
