import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_COMPARISON_DATA } from '@/lib/sample-documents';
import { sanitizeLegalInput, checkRateLimit } from '@/lib/security';
import { comparePoliciesAI } from '@/lib/ai-provider';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`compare-${ip}`, 20, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many comparison requests. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { docA, docB, titleA, titleB } = body;

    // If no texts provided or requesting sample comparison
    if (!docA && !docB) {
      return NextResponse.json(SAMPLE_COMPARISON_DATA);
    }

    const cleanDocA = sanitizeLegalInput(docA || '');
    const cleanDocB = sanitizeLegalInput(docB || '');
    const cleanTitleA = titleA ? sanitizeLegalInput(titleA).slice(0, 100) : 'Version A';
    const cleanTitleB = titleB ? sanitizeLegalInput(titleB).slice(0, 100) : 'Version B';

    const aiResult = await comparePoliciesAI(cleanDocA, cleanDocB, cleanTitleA, cleanTitleB);
    if (aiResult) {
      return NextResponse.json(aiResult);
    }

    return NextResponse.json(SAMPLE_COMPARISON_DATA);
  } catch (error) {
    console.error('Error in /api/compare:', error);
    return NextResponse.json({ error: 'Failed to compare documents' }, { status: 500 });
  }
}
