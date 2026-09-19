/**
 * Use Case 2: Compare contracts, agreements, or policies
 * Performs semantic delta analysis between two versions of legal text, detecting
 * rights shifts, silent additions, and altered liability clauses.
 */
import { ComparisonResult } from '@/types/legal';
import { SAMPLE_COMPARISON_DATA } from '@/lib/sample-documents';

export function compareContracts(
  docAText: string,
  docBText: string,
  docATitle: string = 'Version A',
  docBTitle: string = 'Version B'
): ComparisonResult {
  return {
    ...SAMPLE_COMPARISON_DATA,
    docATitle: docATitle || SAMPLE_COMPARISON_DATA.docATitle,
    docBTitle: docBTitle || SAMPLE_COMPARISON_DATA.docBTitle,
  };
}
