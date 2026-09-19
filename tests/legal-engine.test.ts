import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  segmentDocumentIntoClauses, 
  analyzeDocumentHeuristics, 
  answerDocumentQuestion,
  extractObligationsFromDocument,
  generateAttorneyDossier 
} from '../lib/legal-engine';
import { SAMPLE_RESIDENTIAL_LEASE, SAMPLE_FREELANCE_MSA } from '../lib/sample-documents';

describe('Lexi AI — Legal Intelligence Engine Tests', () => {

  it('1. Correctly segments raw contract text into structured clauses', () => {
    const raw = `
SECTION 1: PAYMENT TERMS
Tenant pays $1,000 per month on the 1st.

SECTION 2: ENTRY RESTRICTIONS
Landlord shall give 24 hours written notice before entry.
    `;
    const clauses = segmentDocumentIntoClauses(raw);
    assert.strictEqual(clauses.length, 2);
    assert.strictEqual(clauses[0].number, '1');
    assert.strictEqual(clauses[0].title, 'PAYMENT TERMS');
    assert.ok(clauses[0].text.includes('1,000'));
    assert.strictEqual(clauses[1].number, '2');
    assert.strictEqual(clauses[1].title, 'ENTRY RESTRICTIONS');
  });

  it('2. Flags predatory clauses and computes Health Score (Grade F) for high-risk lease', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText, 'Sample Lease');
    
    // Check score
    assert.ok(report.healthScore < 50, `Expected health score < 50, got ${report.healthScore}`);
    assert.strictEqual(report.scoreGrade, 'F');
    
    // Check critical flags
    const criticalClauses = report.clauses.filter(c => c.riskLevel === 'CRITICAL');
    assert.ok(criticalClauses.length >= 3, `Expected at least 3 critical clauses, got ${criticalClauses.length}`);
    
    // Verify specific illegal gotchas caught
    const gotchaTitles = report.criticalGotchas.join(' ');
    assert.ok(gotchaTitles.includes('eviction') || gotchaTitles.includes('lockout') || gotchaTitles.includes('Quiet enjoyment') || gotchaTitles.includes('statutory'));
  });

  it('3. Generates 3-tier plain English translations for clauses', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const clause = report.clauses[0];
    
    assert.ok(clause.simplified.plain.length > 10, 'Grade 8 ELI5 translation should be generated');
    assert.ok(clause.simplified.casual.length > 10, 'Business casual translation should be generated');
    assert.ok(clause.simplified.professional.length > 10, 'Professional translation should be generated');
  });

  it('4. Refuses to hallucinate when asked questions absent from document (Anti-Hallucination Guardrail)', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText);
    // Question completely unrelated to the lease
    const result = answerDocumentQuestion('Can the tenant keep a pet iguana and sub-lease to a circus?', report);
    
    assert.strictEqual(result.citations?.length || 0, 0, 'Should not return citations for absent facts');
    assert.ok(
      result.text.includes('cannot locate a clause') || result.text.includes('adheres to strict anti-hallucination'),
      'Should explicitly declare information is missing rather than inventing an answer'
    );
  });

  it('5. Returns verbatim citations and clause anchors for relevant document queries', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const result = answerDocumentQuestion('Can the landlord enter my apartment without notice?', report);
    
    assert.ok((result.citations?.length || 0) > 0, 'Must cite relevant clause');
    assert.strictEqual(result.citations![0].clauseTitle.includes('Entry'), true);
    assert.ok(result.text.includes('Clause'), 'Response text must reference exact clause');
  });

  it('6. Chronologically extracts actionable obligations and penalties', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const obligations = extractObligationsFromDocument(report);
    
    assert.ok(obligations.length >= 2, 'Must extract key obligations');
    const paymentObligation = obligations.find(o => o.category === 'PAYMENT');
    assert.ok(paymentObligation, 'Must find payment obligation');
    assert.ok(paymentObligation?.penaltyForBreach, 'Must identify penalty for breach');
  });

  it('7. Generates complete Attorney Consultation Intake Dossier with 6 high-value questions', () => {
    const report = analyzeDocumentHeuristics(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const dossier = generateAttorneyDossier(report);
    
    assert.ok(dossier.documentTitle.length > 0);
    assert.ok(dossier.primaryVulnerabilities.length > 0);
    assert.ok(dossier.curatedConsultationQuestions.length >= 3);
    assert.ok(dossier.recommendedIntakeEvidence.length >= 2);
  });

});
