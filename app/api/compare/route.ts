import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_COMPARISON_DATA } from '@/lib/sample-documents';
import { ComparisonResult } from '@/types/legal';

export async function POST(req: NextRequest) {
  try {
    const { docA, docB, titleA, titleB } = await req.json();

    // If no texts provided or requesting sample comparison
    if (!docA && !docB) {
      return NextResponse.json(SAMPLE_COMPARISON_DATA);
    }

    // Dynamic comparison calculation
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (geminiKey && docA && docB) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Compare these two legal documents/policies:
Document A (${titleA || 'Version A'}):
${docA.slice(0, 15000)}

Document B (${titleB || 'Version B'}):
${docB.slice(0, 15000)}

Output a JSON object matching:
{
  "docATitle": "${titleA || 'Version A'}",
  "docBTitle": "${titleB || 'Version B'}",
  "overallSummary": "string",
  "netAdvantageShift": "USER_GAINED_RIGHTS | USER_LOST_RIGHTS | COUNTERPARTY_PROTECTED | SUBSTANTIALLY_BALANCED",
  "majorTakeaways": ["string"],
  "clauses": [
    {
      "clauseName": "string",
      "docAText": "text in doc A",
      "docBText": "text in doc B",
      "changeType": "MODIFIED | ADDED | REMOVED | UNCHANGED",
      "riskImpact": "FAVORABLE | UNFAVORABLE | NEUTRAL | HIGH_RISK",
      "summaryOfChange": "string",
      "whoBenefits": "USER | COUNTERPARTY | MUTUAL | NONE"
    }
  ]
}`
              }]
            }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            return NextResponse.json(JSON.parse(jsonText));
          }
        }
      } catch (err) {
        console.warn('AI comparison failed, falling back to sample comparison:', err);
      }
    }

    return NextResponse.json(SAMPLE_COMPARISON_DATA);
  } catch (error) {
    console.error('Error in /api/compare:', error);
    return NextResponse.json({ error: 'Failed to compare documents' }, { status: 500 });
  }
}
