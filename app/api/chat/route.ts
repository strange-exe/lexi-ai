import { NextRequest, NextResponse } from 'next/server';
import { answerDocumentQuestion } from '@/lib/legal-engine';
import { ContractHealthReport } from '@/types/legal';
import { sanitizeQueryInput, checkRateLimit } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`chat-${ip}`, 60, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many queries. Please slow down.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { question, document } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'A valid question string is required' }, { status: 400 });
    }

    if (!document || typeof document !== 'object' || !Array.isArray(document.clauses)) {
      return NextResponse.json({ error: 'A valid analyzed document object is required' }, { status: 400 });
    }

    const cleanQuestion = sanitizeQueryInput(question);
    if (!cleanQuestion) {
      return NextResponse.json({ error: 'Question cannot be empty' }, { status: 400 });
    }

    const answer = answerDocumentQuestion(cleanQuestion, document as ContractHealthReport);
    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ error: 'Failed to process grounded query' }, { status: 500 });
  }
}
