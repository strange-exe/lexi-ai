# Interactive Video Walkthrough Script & Storyboard: Lexi AI

> **Required Artifact for Hack2Skill / Prompt Wars Submission**:
> 2 to 3-minute interactive screen recording walkthrough demonstrating prototype functionality and user experience (no face cam needed).

---

## 🎬 Video Overview

- **Target Duration**: 2 Minutes 30 Seconds
- **Resolution**: 1080p (1920x1080) Full Screen
- **Format**: Screen capture with clear cursor highlight + voiceover or captions
- **Live Demo URL**: `http://localhost:3000`

---

## ⏱️ Minute-by-Minute Interactive Storyboard

### **Scene 1: Introduction & The Core Problem (0:00 - 0:25)**
- **Screen Action**:
  - Show the landing page at `http://localhost:3000`.
  - Highlight the top banner: **"LEGAL BOUNDARY & ASSISTANCE NOTICE: Informational document comprehension, not legal advice"**.
  - Click on the **"Why Not Generic AI?"** button in the navbar to display the comparison modal.
- **Voiceover / Narration**:
  > *"Legal contracts and agreements are notoriously dense, one-sided, and adversarial. When ordinary citizens or small business owners paste contracts into generic chatbots, they risk ungrounded answers, hallucinations, and zero quantification of risk.*
  > 
  > *Meet Lexi AI: a specialized, GenAI-powered legal intelligence copilot engineered with official Google Generative AI, deterministic anti-hallucination guardrails, and actionable outputs that bridge the gap between citizens and legal professionals."*

---

### **Scene 2: Document X-Ray, Risk Health Score & Multi-Tier Simplifier (0:25 - 1:05)**
- **Screen Action**:
  - Close modal. In the top bar, click the **"Lease (Predatory)"** instant demo button.
  - Show the animated **Contract Health Score Meter (32/100, Grade F)** and the three sub-meters (*Fairness Balance: 18%*, *Risk Exposure Safety: 12%*, *Language Clarity: 68%*).
  - Scroll down to the **Dual-Pane Reader**: Click on **Clause 3 (Landlord Right of Immediate Entry)** and then **Clause 5 (Accelerated Eviction & Lockout Waiver)**.
  - In the right-hand Inspector pane, click between the **3-Tier Simplifier levels**:
    1. *Grade 8 / ELI5*: *"The landlord claims they can kick you out with an email within 2 days..."*
    2. *Business Casual*: *"Illegal self-help eviction clause..."*
    3. *Attorney Annotations*: *"Blatantly illegal self-help eviction violating statutory due process..."*
  - Click **"Copy Wording"** under the Recommended Counter-Negotiation Point to show clipboard interaction.
- **Voiceover / Narration**:
  > *"Lexi AI immediately performs a clause-by-clause decomposition, computing an objective Fairness and Health Score. Here on a residential lease, it flags 5 critical traps, including an unlawful 48-hour self-help eviction.*
  > 
  > *With our 3-tier Plain-Language slider, users can translate legalese from a Grade 8 ELI5 level up to attorney-grade statutory citations, complete with market-standard counter-clauses they can copy directly into negotiations."*

---

### **Scene 3: Semantic Redlining & Side-by-Side Policy Diff (1:05 - 1:35)**
- **Screen Action**:
  - Click the **"Compare Policies & Redlines"** tab in the navbar.
  - Display the comparison between *CloudSync Terms 2023* vs *CloudSync Terms 2024*.
  - Point to the **"User Lost Substantive Rights"** badge.
  - Highlight the side-by-side card for **Section 4: Dispute Resolution** (swapping court jury trial for mandatory binding arbitration).
  - Highlight **Section 7: AI Model Training License** on user uploaded private files.
- **Voiceover / Narration**:
  > *"Under the Compare tab, Lexi AI acts as an automated redlining engine. When software terms or policies change, it doesn't just show text differences—it analyzes the legal shift in balance.*
  > 
  > *Here, it immediately detects that the updated policy silently introduced mandatory binding arbitration and an expansive license to train commercial AI models on private user uploads."*

---

### **Scene 4: Grounded Q&A with Verifiable Citation Anchors (1:35 - 2:05)**
- **Screen Action**:
  - Click the **"Grounded Q&A"** tab.
  - Click the quick prompt: *"Can the landlord enter my apartment without notice?"*.
  - Show the response streaming/populating, emphasizing the exact quote and citation pill: **"Clause 3: Landlord Right of Immediate Entry"**.
  - Click the citation pill: Watch it automatically switch to the Reader and highlight Clause 3!
  - Now type an unmentioned question: *"Can I keep a pet tiger in the apartment?"*
  - Show the system politely refusing to hallucinate: *"I cannot locate a clause addressing this in the contract. Under our anti-hallucination guardrail, we do not invent unmentioned terms."*
- **Voiceover / Narration**:
  > *"Our conversational assistant is grounded with strict anti-hallucination controls. It answers questions citing verbatim clauses and line quotes, and clicking any citation jumps directly into the text.*
  > 
  > *Crucially, as required by the evaluation guidelines, when asked about unmentioned topics like pets, it explicitly states the contract is silent rather than fabricating answers."*

---

### **Scene 5: Obligation Timeline & The Attorney Intake Dossier (2:05 - 2:30)**
- **Screen Action**:
  - Click the **"Obligation Timeline"** tab. Show the chronological notice triggers and penalty warnings.
  - Click **"Export to Calendar (.ics)"** to show instant `.ics` file download.
  - In the navbar, click **"Attorney Dossier"**.
  - Show the clean, professional **Attorney Consultation Readiness Packet** with identified liabilities, recommended evidence checklist, and 6 curated consultation questions.
  - Click **"Print / PDF"** to display the browser print preview.
- **Voiceover / Narration**:
  > *"Finally, Lexi AI turns passive clauses into an Obligation Timeline with exportable calendar events, and compiles a comprehensive Attorney Consultation Dossier.*
  > 
  > *Instead of trying to replace lawyers, Lexi AI prepares clients with structured facts, evidence checklists, and precise questions—saving hours of billable consultation time.*
  > 
  > *Lexi AI: making justice, literacy, and legal clarity accessible to everyone."*

---

## 🛠️ Commands to Run for the Demo
```bash
# 1. Run the test suite to prove code verification
npm test

# 2. Start the interactive prototype
npm run dev

# 3. Open in browser
http://localhost:3000
```
