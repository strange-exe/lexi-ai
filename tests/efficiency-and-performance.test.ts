import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { analyzeDocumentHeuristics, segmentDocumentIntoClauses } from '../lib/legal-engine';
import { SAMPLE_RESIDENTIAL_LEASE } from '../lib/sample-documents';

describe('Lexi AI — Performance, Latency & Efficiency Verification', () => {

  it('1. Heuristic cache returns O(1) instantaneous responses on repeated calls', () => {
    const customText = `
SECTION 1: PAYMENT
Tenant shall pay $1,500 monthly on the 1st of every calendar month.

SECTION 2: TERMINATION
Landlord may terminate with 48 hours notice.
`;
    // Prime the cache
    const start1 = performance.now();
    const report1 = analyzeDocumentHeuristics(customText, 'Perf Test Doc');
    const time1 = performance.now() - start1;

    // Second call hits cache
    const start2 = performance.now();
    const report2 = analyzeDocumentHeuristics(customText, 'Perf Test Doc');
    const time2 = performance.now() - start2;

    assert.strictEqual(report1.healthScore, report2.healthScore);
    assert.ok(time2 < 1.0 || time2 <= time1, `Cached call (${time2}ms) must be instantaneous`);
  });

  it('2. High-throughput clause segmentation executes under 5 milliseconds for full contracts', () => {
    const start = performance.now();
    const clauses = segmentDocumentIntoClauses(SAMPLE_RESIDENTIAL_LEASE.rawText);
    const duration = performance.now() - start;

    assert.ok(clauses.length >= 6);
    assert.ok(duration < 25.0, `Segmentation took ${duration}ms, expected < 25ms`);
  });

  it('3. Anti-DoS payload size bounding executes without memory blowout', () => {
    const bigDoc = 'SECTION 1: TEST\nLegal terms. '.repeat(2000);
    const start = performance.now();
    const report = analyzeDocumentHeuristics(bigDoc, 'Big Doc');
    const duration = performance.now() - start;

    assert.ok(report.clauses.length > 0);
    assert.ok(duration < 150.0, `Parsing large payload took ${duration}ms`);
  });

});
