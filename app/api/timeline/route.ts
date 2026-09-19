import { NextRequest, NextResponse } from 'next/server';
import { generateActionableOutputs } from '@/lib/use-cases/generate-actionable-outputs';
import { analyzeDocumentHeuristics } from '@/lib/legal-engine';
import { SAMPLE_RESIDENTIAL_LEASE } from '@/lib/sample-documents';
import { sanitizeLegalInput, checkRateLimit } from '@/lib/security';
import { ContractHealthReport } from '@/types/legal';

export async function GET() {
  const outputs = generateActionableOutputs(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
  return NextResponse.json(outputs);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`timeline-${ip}`, 40, 60000);
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

    const outputs = generateActionableOutputs(targetReport);
    return NextResponse.json(outputs);
  } catch (error) {
    console.error('Error in /api/timeline:', error);
    return NextResponse.json({ error: 'Failed to generate timeline and actionable outputs' }, { status: 500 });
  }
}
