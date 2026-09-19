/**
 * Use Case 3: Highlight important clauses, obligations, risks, or inconsistencies
 * Calculates Contract Health Score (0-100), identifies predatory clauses,
 * assigns risk tiers (CRITICAL, HIGH, MEDIUM, LOW, FAVORABLE), and flags critical gotchas.
 */
import { ContractHealthReport, ClauseAnalysis } from '@/types/legal';
import { analyzeDocumentHeuristics } from '@/lib/legal-engine';

export function highlightRisksAndObligations(text: string, title?: string): {
  report: ContractHealthReport;
  criticalClauses: ClauseAnalysis[];
  highRiskCount: number;
  healthScore: number;
  scoreGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  criticalGotchas: string[];
} {
  const report = analyzeDocumentHeuristics(text, title);
  const criticalClauses = report.clauses.filter(c => c.riskLevel === 'CRITICAL' || c.riskLevel === 'HIGH');

  return {
    report,
    criticalClauses,
    highRiskCount: criticalClauses.length,
    healthScore: report.healthScore,
    scoreGrade: report.scoreGrade,
    criticalGotchas: report.criticalGotchas,
  };
}
