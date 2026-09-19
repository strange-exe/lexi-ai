import { NextRequest, NextResponse } from 'next/server';
import { prepareForLegalProfessional } from '@/lib/use-cases/prepare-for-legal-professional';
import { analyzeDocumentHeuristics } from '@/lib/legal-engine';
import { SAMPLE_RESIDENTIAL_LEASE } from '@/lib/sample-documents';
import { sanitizeLegalInput, checkRateLimit } from '@/lib/security';
import { ContractHealthReport } from '@/types/legal';

export async function GET() {
  const dossier = prepareForLegalProfessional(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
  return NextResponse.json(dossier);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`dossier-${ip}`, 40, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { report, text, title } = body;

    let targetReport: ContractHealthReport;

    if (report && Array.isArray(report.clauses)) {
      targetReport = report;
    } else if (text && typeof text === 'string') {
      const cleanText = sanitizeLegalInput(text);
      const cleanTitle = typeof title === 'string' ? sanitizeLegalInput(title).slice(0, 100) : 'Document';
      targetReport = analyzeDocumentHeuristics(cleanText, cleanTitle);
    } else {
      targetReport = SAMPLE_RESIDENTIAL_LEASE.precomputedReport;
    }

    const dossier = prepareForLegalProfessional(targetReport);
    return NextResponse.json(dossier);
  } catch (error) {
    console.error('Error in /api/dossier:', error);
    return NextResponse.json({ error: 'Failed to prepare attorney dossier' }, { status: 500 });
  }
}
