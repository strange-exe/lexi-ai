import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentHeuristics } from '@/lib/legal-engine';
import { answerDocumentQuestionAI } from '@/lib/ai-provider';
import { ContractHealthReport } from '@/types/legal';
import { sanitizeQueryInput, sanitizeLegalInput, checkRateLimit } from '@/lib/security';
import { SAMPLE_RESIDENTIAL_LEASE } from '@/lib/sample-documents';

export async function GET() {
  const answer = await answerDocumentQuestionAI(
    'What happens if rent is late?',
    SAMPLE_RESIDENTIAL_LEASE.precomputedReport
  );
  return NextResponse.json(answer);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`chat-${ip}`, 60, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many queries. Please slow down.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { question, document, text } = body;

    const queryStr = typeof question === 'string' && question.trim() ? question : 'What are the main risks?';
    const cleanQuestion = sanitizeQueryInput(queryStr);

    let docReport: ContractHealthReport;
    if (document && Array.isArray(document.clauses)) {
      docReport = document as ContractHealthReport;
    } else if (text && typeof text === 'string') {
      docReport = analyzeDocumentHeuristics(sanitizeLegalInput(text));
    } else {
      docReport = SAMPLE_RESIDENTIAL_LEASE.precomputedReport;
    }

    const answer = await answerDocumentQuestionAI(cleanQuestion, docReport);
    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ error: 'Failed to process grounded query' }, { status: 500 });
  }
}
