import { NextRequest, NextResponse } from 'next/server';
import { analyzeLegalDocumentAI } from '@/lib/ai-provider';

export async function POST(req: NextRequest) {
  try {
    const { text, title } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    const report = await analyzeLegalDocumentAI(text, title);
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json({ error: 'Failed to analyze document' }, { status: 500 });
  }
}
