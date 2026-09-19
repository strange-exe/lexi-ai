/**
 * Use Case 1: Simplify complex legal documents
 * Translates dense legalese into 3-tier plain English explanations (Grade 8 ELI5, Business Casual, Legal Pro).
 */
import { ClauseAnalysis } from '@/types/legal';
import { segmentDocumentIntoClauses, analyzeDocumentHeuristics } from '@/lib/legal-engine';

export function simplifyLegalDocument(text: string, title?: string): {
  title: string;
  clauses: ClauseAnalysis[];
  totalClauses: number;
} {
  const report = analyzeDocumentHeuristics(text, title);
  return {
    title: report.title,
    clauses: report.clauses,
    totalClauses: report.clauses.length,
  };
}
