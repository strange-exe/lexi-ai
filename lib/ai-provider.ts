import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContractHealthReport, ComparisonResult } from '@/types/legal';
import { analyzeDocumentHeuristics } from './legal-engine';

/**
 * Official Google Gemini GenAI Integration Layer
 * Leverages Google Generative AI (Gemini 1.5 Flash / Pro) with structured JSON schema
 * and graceful zero-key simulation fallback.
 */

export async function analyzeLegalDocumentAI(
  rawText: string, 
  docTitle?: string,
  apiKeyOverride?: string
): Promise<ContractHealthReport> {
  const geminiKey = apiKeyOverride || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        }
      });

      const prompt = `You are a world-class legal comprehension, accessibility, and contract fairness intelligence system.
Analyze the following legal document text and output a valid JSON object adhering strictly to this schema:
{
  "documentId": "string",
  "title": "${docTitle || 'Analyzed Legal Document'}",
  "documentType": "Residential Lease | Independent Contractor Agreement | SaaS Terms of Service | Employment NDA | Vendor Contract | General Agreement",
  "healthScore": number (0 to 100, where 100 is completely fair and balanced, and <50 is predatory or high risk),
  "scoreGrade": "A | B | C | D | F",
  "scoreBreakdown": {
    "clarityScore": number (0-100),
    "fairnessBalanceScore": number (0-100),
    "riskExposureScore": number (0-100)
  },
  "executiveSummary": "string explaining the core implications in plain English",
  "keyStrengths": ["string"],
  "criticalGotchas": ["string explaining specific traps like unilateral termination, forfeiture, or indemnities"],
  "clauses": [
    {
      "id": "clause-1",
      "clauseNumber": "1",
      "title": "string",
      "originalText": "exact verbatim excerpt from text",
      "simplified": {
        "plain": "plain English Grade 8 / ELI5 explanation avoiding all legal jargon",
        "casual": "pragmatic business casual takeaway",
        "professional": "statutory analysis and jurisprudence breakdown"
      },
      "riskLevel": "CRITICAL | HIGH | MEDIUM | LOW | FAVORABLE | NEUTRAL",
      "category": "INDEMNITY | TERMINATION | LIABILITY | PAYMENT | IP_RIGHTS | DISPUTE_RESOLUTION | RESTRICTIVE_COVENANTS | CONFIDENTIALITY | DATA_PRIVACY | GENERAL",
      "explanation": "concise risk explanation",
      "whyItMatters": "practical real-world consequence",
      "negotiationTips": ["practical counter-clause wordings to propose"],
      "unfairnessFlag": "optional short flag"
    }
  ],
  "analyzedAt": "${new Date().toISOString().split('T')[0]}"
}

Legal Document Content:
${rawText.slice(0, 35000)}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) {
        const parsed = JSON.parse(text) as ContractHealthReport;
        return parsed;
      }
    } catch (err) {
      console.warn('[Lexi AI] Google Gemini call failed or key invalid, falling back to verified local engine:', err);
    }
  }

  // Deterministic, zero-hallucination heuristic fallback engine
  return analyzeDocumentHeuristics(rawText, docTitle);
}

export async function comparePoliciesAI(
  docA: string,
  docB: string,
  titleA: string = 'Version A',
  titleB: string = 'Version B',
  apiKeyOverride?: string
): Promise<ComparisonResult | null> {
  const geminiKey = apiKeyOverride || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (geminiKey && docA && docB) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
      });

      const prompt = `Compare these two legal documents/policies:
Document A (${titleA}):
${docA.slice(0, 16000)}

Document B (${titleB}):
${docB.slice(0, 16000)}

Output a valid JSON object matching:
{
  "docATitle": "${titleA}",
  "docBTitle": "${titleB}",
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
      "summaryOfChange": "plain English description of what changed",
      "whoBenefits": "USER | COUNTERPARTY | MUTUAL | NONE"
    }
  ]
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) {
        return JSON.parse(text) as ComparisonResult;
      }
    } catch (e) {
      console.warn('[Lexi AI] Google Gemini comparison failed:', e);
    }
  }

  return null;
}
