import { NextRequest, NextResponse } from 'next/server';
import { getDisputeOptionsAndNextSteps } from '@/lib/use-cases/options-and-next-steps';
import { checkRateLimit } from '@/lib/security';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const scenarioId = searchParams.get('scenarioId') || undefined;
  const options = getDisputeOptionsAndNextSteps(scenarioId);
  return NextResponse.json(options);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-client';
    const rate = checkRateLimit(`rights-${ip}`, 60, 60000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again in 1 minute.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { scenarioId } = body;

    const options = getDisputeOptionsAndNextSteps(scenarioId);
    return NextResponse.json(options);
  } catch (error) {
    console.error('Error in /api/rights:', error);
    return NextResponse.json({ error: 'Failed to retrieve dispute options' }, { status: 500 });
  }
}
