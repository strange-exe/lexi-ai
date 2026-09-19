# Lexi AI — Accessible Legal Intelligence & Assistance Platform

> **Submission for Hack2Skill / Prompt Wars: AI for Legal Assistance & Access**  
> *Empowering citizens, tenants, freelancers, and small businesses to comprehend, audit, compare, and navigate complex legal documents with grounded confidence.*

---

## 📌 1. Chosen Vertical & Problem Statement Alignment

### **Vertical: AI for Legal Assistance & Access**
- **Target Audience / Personas**: Non-lawyer individuals, tenants, freelance contractors, gig-workers, consumers, and small business owners who face complex, adversarial legal agreements without regular access to an attorney.
- **Problem Addressed**: Severe legal information asymmetry. Most users click "Agree" or sign leases and service agreements without understanding hidden penalties, unilateral termination rights, liability shifts, or intellectual property expropriation.
- **Core Stance**: Provide powerful comprehension, risk quantification, and consultation readiness without violating Unauthorized Practice of Law (UPL) boundaries.

### **Direct 7/7 Problem Statement Use Cases Mapping**

Lexi AI provides an explicit architectural layer and modular implementation for every single use case specified in the challenge:

| Challenge Use Case | Implementation Module | UI Component | Automated Test |
| :--- | :--- | :--- | :--- |
| **1. Simplify complex legal documents** | [`lib/use-cases/simplify-legal-documents.ts`](lib/use-cases/simplify-legal-documents.ts) | `DualPaneReader.tsx` (3-tier comprehension slider: Grade 8 ELI5, Business Casual, Legal Pro) | `tests/use-cases.test.ts` (Case 1) |
| **2. Compare contracts, agreements, or policies** | [`lib/use-cases/compare-contracts.ts`](lib/use-cases/compare-contracts.ts) | `ContractDiffViewer.tsx` (Side-by-side policy diff, delta summary, rights shift detector) | `tests/use-cases.test.ts` (Case 2) |
| **3. Highlight important clauses, obligations, risks, or inconsistencies** | [`lib/use-cases/highlight-risks-and-obligations.ts`](lib/use-cases/highlight-risks-and-obligations.ts) | `ContractHealthCard.tsx` (Health Score 0–100, letter grade, critical gotchas, risk tiers) | `tests/use-cases.test.ts` (Case 3) |
| **4. Answer questions based on provided legal documents** | [`lib/use-cases/document-qa-grounded.ts`](lib/use-cases/document-qa-grounded.ts) | `GroundedChatWidget.tsx` (Strict verbatim clause citations, anchored scroll, anti-hallucination refusal) | `tests/use-cases.test.ts` (Case 4) |
| **5. Help users understand options and potential next steps** | [`lib/use-cases/options-and-next-steps.ts`](lib/use-cases/options-and-next-steps.ts) | `RightsNavigator.tsx` (Interactive dispute decision trees, statutory rights, formal demand letter generator) | `tests/use-cases.test.ts` (Case 5) |
| **6. Generate summaries, checklists, or actionable outputs** | [`lib/use-cases/generate-actionable-outputs.ts`](lib/use-cases/generate-actionable-outputs.ts) | `ObligationTimeline.tsx` (Chronological deadlines, Markdown checklist copy, `.ics` iCalendar export) | `tests/use-cases.test.ts` (Case 6) |
| **7. Prepare information or questions for a legal professional** | [`lib/use-cases/prepare-for-legal-professional.ts`](lib/use-cases/prepare-for-legal-professional.ts) | `AttorneyDossierModal.tsx` (Intake dossier, primary vulnerabilities, evidence checklist, 6 strategic questions) | `tests/use-cases.test.ts` (Case 7) |

---

## 🧠 2. Approach and Logic

### A. Dual-Engine Intelligence Architecture
1. **Google Cloud / Generative AI Engine**: Uses official `@google/generative-ai` SDK (`gemini-1.5-flash`) for deep semantic inference, clause classification, and multi-tier plain-language rewriting with strict JSON schema outputs.
2. **Deterministic Heuristic Fallback Engine**: A zero-key, battle-tested legal rules engine that guarantees 100% offline functionality, immediate evaluation, and consistent test passing without dependency on third-party uptime.

### B. Anti-Hallucination & Verifiable Grounding Logic
- **Verbatim Anchoring**: The system identifies verbatim clause anchors and presents exact text references `[Clause X: Title]` for all insights.
- **Absence-of-Information Handling**: Unlike generic LLMs that hallucinate plausible answers, when a query pertains to terms omitted from the agreement (e.g., asking about pet policies on a contract that does not mention pets), the engine **explicitly refuses to guess**, notifying the user that the document is silent on the matter.

### C. Contract Health & Fairness Scoring (0–100)
The objective Health Score is calculated through a structured penalty matrix:
$$\text{HealthScore} = \max(15, \min(98, 100 - (22 \times N_{\text{critical}} + 12 \times N_{\text{high}} + 5 \times N_{\text{medium}})))$$
- **Grades**: A (88–100), B (78–87), C (65–77), D (50–64), F (<50).
- **Sub-Meters**:
  - *Fairness Balance Score*: Proportion of mutual vs. unilateral covenants.
  - *Risk Exposure Safety*: Severity of uncapped indemnity, deposit forfeiture, and procedural waivers.
  - *Language Clarity Score*: Readability index and sentence complexity.

---

## 🛡️ 3. Security, Hardening & Defensive Engineering

Lexi AI implements defense-in-depth across the application:
1. **Input Sanitization & XSS Defense**: [`lib/security.ts`](lib/security.ts) strips malicious `<script>`, `<iframe>`, `<object>`, `<embed>`, inline event handlers (`onclick`, `onload`), and `javascript:` URIs.
2. **HTML Entity Escaping**: `escapeHtml` utility prevents both stored and reflected cross-site scripting vulnerabilities.
3. **Prompt Injection Isolation**: User queries and contract contexts are isolated within strict delimiters (`[LEGAL_DOCUMENT_START]` / `[USER_QUESTION_START]`) with explicit system guardrails to prevent instruction hijacking.
4. **Memory Exhaustion & Payload DoS Defense**: Strict size ceilings (`MAX_DOCUMENT_LENGTH = 150,000`, `MAX_QUERY_LENGTH = 2,000`) protect server memory and prevent ReDoS.
5. **Rate Limiting**: In-memory token bucket limits requests per client window (60 req/min) returning HTTP 429 when exceeded.
6. **HTTP Security Headers**: Configured in [`next.config.mjs`](next.config.mjs):
   - `X-Frame-Options: SAMEORIGIN` (Clickjacking defense)
   - `X-Content-Type-Options: nosniff` (MIME sniffing defense)
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
   - `X-XSS-Protection: 1; mode=block`
   - `poweredByHeader: false` (Information disclosure prevention)

---

## ⚡ 4. Efficiency & Performance Optimizations

1. **Dynamic Code Splitting**: Heavy components (`ContractDiffViewer`, `GroundedChatWidget`, `ObligationTimeline`, `RightsNavigator`, and modals) use `next/dynamic` for lazy-loading, ensuring the initial bundle is minuscule (< 100 KB gzipped).
2. **React Memoization**: High-frequency rendering paths utilize `useMemo` for filtered arrays and `useCallback` for event handlers across all widgets.
3. **HTTP Compression**: Gzip and Brotli compression are natively enabled in Next.js config.
4. **Zero Heavy Runtime Dependencies**: Built with native React 18 and Tailwind CSS without bulky component runtime overhead.

---

## ♿ 5. Accessibility (a11y) Features

1. **WAI-ARIA Tablist Patterns**: Full tab navigation semantics (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `aria-labelledby`).
2. **Screen Reader Live Regions**: Grounded Q&A stream is marked with `role="log"` and `aria-live="polite"` for real-time auditory feedback.
3. **Form & Input Accessibility**: All inputs, sliders, and icon-only buttons include descriptive `aria-label` tags.
4. **Keyboard Focus Management**: Distinct `focus:ring-2 focus:ring-blue-500` visual indicators on all interactive buttons and tabs.
5. **High-Contrast Dark Mode**: Color contrast meets WCAG 2.1 AA requirements across text, badges, and status meters.

---

## 🧪 6. Automated Testing Suite

Lexi AI includes 20 automated tests across 3 comprehensive suites with **100% pass rate**:

```bash
npm test
```

### Test Suites:
1. **`tests/legal-engine.test.ts` (Legal Intelligence Engine)**:
   - Clause segmentation accuracy
   - Predatory clause detection & Health Score (Grade F)
   - 3-tier plain-English translation generation
   - **Anti-Hallucination & Absence-of-Information refusal validation**
   - Verbatim citation quote anchoring
   - Chronological obligation extraction
   - Attorney Dossier compilation
2. **`tests/use-cases.test.ts` (7/7 Problem Statement Use Cases)**:
   - Verification of all 7 challenge use cases
3. **`tests/security.test.ts` (Defensive Security & Sanitization)**:
   - XSS and script stripping
   - HTML entity escaping
   - Query sanitization
   - Payload DoS bounds checking
   - Prompt injection isolation delimiters
   - In-memory rate limiting enforcement

---

## 📦 7. Repository Compliance Rules

- **Repository Size**: Total git repository size is **< 0.3 MB** (strictly below the 10 MB limit).
- **Single Branch**: Maintained strictly on a **single branch** (`main`).
- **Clean Git History**: Excludes build artifacts (`node_modules`, `.next`) while properly tracking the test suite and source code.
- **Public Hosting**: GitHub repository `https://github.com/strange-exe/lexi-ai.git`.

---

## 🚀 8. Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (20/20 passing)
npm test

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000
```
