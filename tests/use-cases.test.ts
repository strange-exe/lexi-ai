import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  simplifyLegalDocument,
  compareContracts,
  highlightRisksAndObligations,
  answerDocumentQuestionGrounded,
  getDisputeOptionsAndNextSteps,
  generateActionableOutputs,
  prepareForLegalProfessional,
} from '../lib/use-cases';
import { SAMPLE_RESIDENTIAL_LEASE, SAMPLE_COMPARISON_DATA } from '../lib/sample-documents';

describe('Lexi AI — 7/7 Problem Statement Use Cases Verification', () => {

  it('Use Case 1: Simplify complex legal documents into 3 reading levels', () => {
    const res = simplifyLegalDocument(SAMPLE_RESIDENTIAL_LEASE.rawText, 'Lease Test');
    assert.ok(res.totalClauses > 0, 'Should segment and simplify clauses');
    const firstClause = res.clauses[0];
    assert.ok(firstClause.simplified.plain.length > 0, 'Grade 8 translation present');
    assert.ok(firstClause.simplified.casual.length > 0, 'Business casual translation present');
    assert.ok(firstClause.simplified.professional.length > 0, 'Professional translation present');
  });

  it('Use Case 2: Compare contracts, agreements, or policies', () => {
    const diff = compareContracts(
      'Clause 1: User may cancel anytime.',
      'Clause 1: User agrees to mandatory binding arbitration and 12-month lock-in.',
      'Old Terms',
      'New Terms'
    );
    assert.strictEqual(diff.docATitle, 'Old Terms');
    assert.strictEqual(diff.docBTitle, 'New Terms');
    assert.ok(diff.clauses.length > 0, 'Should return differential clauses');
    assert.ok(diff.netAdvantageShift, 'Must identify net advantage shift');
  });

  it('Use Case 3: Highlight important clauses, obligations, risks, or inconsistencies', () => {
    const analysis = highlightRisksAndObligations(SAMPLE_RESIDENTIAL_LEASE.rawText);
    assert.ok(analysis.healthScore < 50, 'Health score must reflect predatory risk');
    assert.strictEqual(analysis.scoreGrade, 'F');
    assert.ok(analysis.criticalGotchas.length > 0, 'Critical gotchas must be flagged');
    assert.ok(analysis.highRiskCount > 0, 'Must identify critical/high risk clauses');
  });

  it('Use Case 4: Answer questions based on provided legal documents with grounded citations', () => {
    const analysis = highlightRisksAndObligations(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const reply = answerDocumentQuestionGrounded('What happens if rent is paid late?', analysis.report);
    assert.ok(reply.text.length > 0);
    assert.ok(reply.citations && reply.citations.length > 0, 'Must include grounded citations');
    assert.ok(reply.citations[0].clauseTitle.toLowerCase().includes('payment') || reply.citations[0].clauseTitle.toLowerCase().includes('rent'));
  });

  it('Use Case 5: Help users understand options and potential next steps', () => {
    const options = getDisputeOptionsAndNextSteps();
    assert.ok(options.scenarios.length >= 2, 'Should provide multiple dispute pathways');
    assert.ok(options.selectedScenario.yourRightsOverview.length > 0, 'Must include statutory rights');
    assert.ok(options.selectedScenario.demandLetterSnippet.length > 50, 'Must generate formal demand letter');
  });

  it('Use Case 6: Generate summaries, checklists, or actionable outputs (Markdown & iCal)', () => {
    const analysis = highlightRisksAndObligations(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const outputs = generateActionableOutputs(analysis.report);
    assert.ok(outputs.obligations.length > 0, 'Should extract obligation items');
    assert.ok(outputs.markdownChecklist.includes('# Actionable Legal Checklist'), 'Markdown checklist generated');
    assert.ok(outputs.icsCalendarContent.includes('BEGIN:VCALENDAR'), 'iCal export generated');
  });

  it('Use Case 7: Prepare information or questions for a legal professional', () => {
    const analysis = highlightRisksAndObligations(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const dossier = prepareForLegalProfessional(analysis.report);
    assert.ok(dossier.documentTitle.length > 0);
    assert.ok(dossier.curatedConsultationQuestions.length >= 3, 'Must prepare structured consultation questions');
    assert.ok(dossier.recommendedIntakeEvidence.length >= 2, 'Must specify intake evidence needed');
  });

});
