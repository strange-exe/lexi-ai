import { NextRequest, NextResponse } from 'next/server';
import { answerDocumentQuestion } from '@/lib/legal-engine';
import { ContractHealthReport } from '@/types/legal';

export async function POST(req: NextRequest) {
  try {
    const { question, document } = await req.json();
    if (!question || !document) {
      return NextResponse.json({ error: 'Question and document are required' }, { status: 400 });
    }

    const answer = answerDocumentQuestion(question, document as ContractHealthReport);
    return NextResponse.json(answer);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ error: 'Failed to process chat query' }, { status: 500 });
  }
}
