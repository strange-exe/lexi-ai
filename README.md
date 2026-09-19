# Lexi AI — Accessible Legal Intelligence & Assistance Platform

> **Submission for Hack2Skill / Prompt Wars: AI for Legal Assistance & Access**  
> *Empowering citizens, tenants, freelancers, and small businesses to comprehend, audit, compare, and navigate complex legal documents with grounded confidence.*

---

## 📌 1. Chosen Vertical

### **Vertical: AI for Legal Assistance & Access**
- **Target Audience / Personas**: Non-lawyer individuals, tenants, freelance contractors, gig-workers, consumers, and small business owners who face complex, adversarial legal agreements without regular access to an attorney.
- **Problem Addressed**: Severe legal information asymmetry. Most users click "Agree" or sign leases and service agreements without understanding hidden penalties, unilateral termination rights, liability shifts, or intellectual property expropriation.
- **Core Stance**: Provide powerful comprehension, risk quantification, and consultation readiness without violating Unauthorized Practice of Law (UPL) boundaries.

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

## ⚙️ 3. How the Solution Works

### End-to-End User Flow:
1. **Document Ingestion**:
   - Users can upload text/markdown contracts, paste custom text, or select one of the pre-audited high-risk benchmarks (Residential Lease, Freelancer MSA, or SaaS Policy Diff).
2. **Clause Segmentation & Decomposition**:
   - The document parser segments the agreement into discrete, numbered contractual provisions.
3. **Multi-Tier Simplification ("The Comprehension Slider")**:
   - Users view clauses in dual-pane synchronization and toggle reading difficulty:
     - **Grade 8 / ELI5**: Plain everyday English removing all Latin/archaic legalese.
     - **Business Casual**: Practical operational takeaways for everyday decisions.
     - **Attorney Scrutiny**: Jurisprudential and statutory references.
4. **Semantic Redlining & Policy Comparison**:
   - Compares previous vs. updated policies (e.g., CloudSync Terms 2023 vs 2024), detecting rights shifts, silent deletions, forced arbitration waivers, and AI training clauses.
5. **Grounded Q&A Assistant**:
   - Users ask conversational questions; clicking any citation automatically scrolls and highlights the relevant clause in the dual-pane reader.
6. **Chronological Obligation Timeline**:
   - Extracts deadlines, 30-day notice windows, cure periods, and late penalty triggers into an exportable `.ics` calendar format.
7. **Attorney Consultation Dossier Generator**:
   - In 1 click, compiles a structured intake packet summarizing the matter, primary vulnerabilities, evidence checklist, and 6 curated questions to ask an attorney.

---

## 📝 4. Key Assumptions Made

1. **Informational & Educational Scope**: Lexi AI assumes the role of an intelligent comprehension copilot. It explicitly disclaims establishing an attorney-client relationship.
2. **Statutory Baseline**: Heuristics are benchmarked against prevailing statutory consumer and tenancy protections (e.g., statutory habitability, mitigation of damages, FTC non-compete rules).
3. **Plain Text & Markdown Ingestion**: Initial prototype assumes digital textual agreements (PDF text, TXT, Markdown, pasted text) prior to OCR document image conversion.
4. **Privacy First**: Sensitive agreements can be analyzed locally through the deterministic engine without external cloud telemetry.

---

## 🚀 5. Quick Start & Execution

### Prerequisites
- Node.js 18+ (Tested on Node.js v24)
- npm or pnpm

### Run Locally
```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (7/7 tests passing)
npm test

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

### Optional Google Gemini Integration
To use live Google Gemini API calls for arbitrary novel contracts, create a `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: Lexi AI operates with full interactive fidelity even with zero API keys).*

---

## 🧪 6. Automated Testing

Lexi AI includes a comprehensive test suite in `tests/legal-engine.test.ts`:
- `npm test` runs 7 automated unit and integration tests with **100% pass rate**:
  - Clause segmentation accuracy
  - Predatory clause detection & Health Score (Grade F)
  - 3-tier plain-English translation generation
  - **Anti-Hallucination & Absence-of-Information validation**
  - Citation quote anchoring
  - Chronological obligation extraction
  - Attorney Dossier generation

---

## 📦 7. Repository Compliance Rules

- **Repository Size**: Tracked source code is **~0.28 MB** (well below the 10 MB limit).
- **Single Branch**: All commits are strictly maintained on the `main` branch.
- **Public Visibility**: Configured for public repository hosting on GitHub.
