/**
 * Use Case 7: Prepare information or questions for a legal professional
 * Compiles an Attorney Consultation Intake Dossier including high-value strategic questions,
 * primary vulnerabilities, required intake evidence, and plain-English context.
 */
import { ContractHealthReport, AttorneyDossier } from '@/types/legal';
import { generateAttorneyDossier } from '@/lib/legal-engine';

export function prepareForLegalProfessional(report: ContractHealthReport): AttorneyDossier {
  return generateAttorneyDossier(report);
}
