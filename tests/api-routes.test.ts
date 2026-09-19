import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { NextRequest } from 'next/server';

import { GET as getSimplify, POST as postSimplify } from '../app/api/simplify/route';
import { GET as getCompare, POST as postCompare } from '../app/api/compare/route';
import { GET as getAnalyze, POST as postAnalyze } from '../app/api/analyze/route';
import { GET as getChat, POST as postChat } from '../app/api/chat/route';
import { GET as getTimeline, POST as postTimeline } from '../app/api/timeline/route';
import { GET as getDossier, POST as postDossier } from '../app/api/dossier/route';
import { GET as getRights, POST as postRights } from '../app/api/rights/route';

import { SAMPLE_RESIDENTIAL_LEASE } from '../lib/sample-documents';

describe('Lexi AI — API Route Endpoints Integration Tests', () => {

  it('1. GET /api/simplify returns default precomputed simplification', async () => {
    const res = await getSimplify();
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(data.clauses.length > 0);
    assert.ok(data.title.length > 0);
  });

  it('2. POST /api/simplify translates provided text', async () => {
    const req = new NextRequest('http://localhost:3000/api/simplify', {
      method: 'POST',
      body: JSON.stringify({ text: SAMPLE_RESIDENTIAL_LEASE.rawText, title: 'Sample Lease' }),
    });
    const res = await postSimplify(req);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(data.clauses.length > 0);
  });

  it('3. GET & POST /api/compare returns contract diff', async () => {
    const resGet = await getCompare();
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.ok(dataGet.clauses.length > 0);

    const reqPost = new NextRequest('http://localhost:3000/api/compare', {
      method: 'POST',
      body: JSON.stringify({ docA: 'Old clause', docB: 'New clause' }),
    });
    const resPost = await postCompare(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.ok(dataPost.majorTakeaways.length > 0);
  });

  it('4. GET & POST /api/analyze evaluates legal document health', async () => {
    const resGet = await getAnalyze();
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.ok(typeof dataGet.healthScore === 'number');

    const reqPost = new NextRequest('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: SAMPLE_RESIDENTIAL_LEASE.rawText, title: 'Test Lease' }),
    });
    const resPost = await postAnalyze(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.strictEqual(dataPost.scoreGrade, 'F');
  });

  it('5. GET & POST /api/chat answers questions with citations', async () => {
    const resGet = await getChat();
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.ok(dataGet.text.length > 0);

    const reqPost = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        question: 'Can the landlord enter without notice?',
        text: SAMPLE_RESIDENTIAL_LEASE.rawText,
      }),
    });
    const resPost = await postChat(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.ok(dataPost.citations.length > 0);
  });

  it('6. GET & POST /api/timeline generates obligations and calendar outputs', async () => {
    const resGet = await getTimeline();
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.ok(dataGet.obligations.length > 0);
    assert.ok(dataGet.icsCalendarContent.includes('BEGIN:VCALENDAR'));

    const reqPost = new NextRequest('http://localhost:3000/api/timeline', {
      method: 'POST',
      body: JSON.stringify({ text: SAMPLE_RESIDENTIAL_LEASE.rawText }),
    });
    const resPost = await postTimeline(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.ok(dataPost.markdownChecklist.includes('# Actionable Legal Checklist'));
  });

  it('7. GET & POST /api/dossier generates attorney consultation intake dossiers', async () => {
    const resGet = await getDossier();
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.ok(dataGet.curatedConsultationQuestions.length >= 3);

    const reqPost = new NextRequest('http://localhost:3000/api/dossier', {
      method: 'POST',
      body: JSON.stringify({ text: SAMPLE_RESIDENTIAL_LEASE.rawText }),
    });
    const resPost = await postDossier(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.ok(dataPost.primaryVulnerabilities.length > 0);
  });

  it('8. GET & POST /api/rights returns dispute scenarios and demand letters', async () => {
    const reqGet = new NextRequest('http://localhost:3000/api/rights?scenarioId=scenario-security-deposit');
    const resGet = await getRights(reqGet);
    const dataGet = await resGet.json();
    assert.strictEqual(resGet.status, 200);
    assert.strictEqual(dataGet.selectedScenario.id, 'scenario-security-deposit');

    const reqPost = new NextRequest('http://localhost:3000/api/rights', {
      method: 'POST',
      body: JSON.stringify({ scenarioId: 'scenario-freelance-unpaid-invoice' }),
    });
    const resPost = await postRights(reqPost);
    const dataPost = await resPost.json();
    assert.strictEqual(resPost.status, 200);
    assert.strictEqual(dataPost.selectedScenario.id, 'scenario-freelance-unpaid-invoice');
  });

});
