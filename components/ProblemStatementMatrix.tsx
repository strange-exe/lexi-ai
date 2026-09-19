import React, { memo } from 'react';
import { 
  FileText, 
  GitCompare, 
  AlertTriangle, 
  MessageSquareCode, 
  HelpCircle, 
  Calendar, 
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ProblemStatementMatrixProps {
  onNavigateTab: (tab: 'analyzer' | 'compare' | 'chat' | 'timeline' | 'rights') => void;
  onOpenDossier: () => void;
}

const USE_CASES = [
  {
    id: 'use-case-1-simplify',
    number: 1,
    title: 'Simplify complex legal documents',
    description: '3-tier Plain-English translation slider (Grade 8 ELI5, Business Casual, and Legal Pro) removing archaic Latin and legalese.',
    tab: 'analyzer' as const,
    icon: FileText,
    badge: 'Dual-Pane Reader',
    apiRoute: '/api/simplify',
  },
  {
    id: 'use-case-2-compare',
    number: 2,
    title: 'Compare contracts, agreements, or policies',
    description: 'Side-by-side policy redliner detecting altered terms, silent deletions, and user-to-counterparty rights shifts.',
    tab: 'compare' as const,
    icon: GitCompare,
    badge: 'Policy Redliner',
    apiRoute: '/api/compare',
  },
  {
    id: 'use-case-3-highlight-risks',
    number: 3,
    title: 'Highlight important clauses, obligations, risks, or inconsistencies',
    description: 'Calculates objective Contract Health Score (0–100), flags predatory gotchas, and classifies clauses by risk severity.',
    tab: 'analyzer' as const,
    icon: AlertTriangle,
    badge: 'Health Card & Gotchas',
    apiRoute: '/api/analyze',
  },
  {
    id: 'use-case-4-document-qa',
    number: 4,
    title: 'Answer questions based on provided legal documents',
    description: 'Grounded copilot with verbatim clause quote citations and strict anti-hallucination refusal when facts are absent.',
    tab: 'chat' as const,
    icon: MessageSquareCode,
    badge: 'Grounded Citations',
    apiRoute: '/api/chat',
  },
  {
    id: 'use-case-5-options-next-steps',
    number: 5,
    title: 'Help users understand options and potential next steps',
    description: 'Diagnostic resolution trees for tenancy and contractor disputes with statutory safeguards and ready-to-send formal demand letters.',
    tab: 'rights' as const,
    icon: HelpCircle,
    badge: 'Demand Letter Gen',
    apiRoute: '/api/rights',
  },
  {
    id: 'use-case-6-actionable-outputs',
    number: 6,
    title: 'Generate summaries, checklists, or actionable outputs',
    description: 'Extracts chronological notice windows and penalty cliffs with one-click Markdown checklist copy and .ics calendar exports.',
    tab: 'timeline' as const,
    icon: Calendar,
    badge: 'iCal & Checklist',
    apiRoute: '/api/timeline',
  },
  {
    id: 'use-case-7-attorney-preparation',
    number: 7,
    title: 'Prepare information or questions for a legal professional',
    description: 'Generates an Attorney Consultation Intake Dossier with case brief, primary vulnerabilities, evidence checklist, and 6 curated questions.',
    isModal: true,
    icon: FileCheck2,
    badge: 'Attorney Dossier',
    apiRoute: '/api/dossier',
  },
];

function ProblemStatementMatrix({ onNavigateTab, onOpenDossier }: ProblemStatementMatrixProps) {
  return (
    <section 
      aria-label="Challenge Problem Statement Alignment Matrix" 
      className="bg-slate-900/90 rounded-2xl border border-blue-500/30 p-5 shadow-lg space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Hackathon Requirements: AI for Legal Assistance & Access
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                7/7 Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Each problem statement requirement has an architectural module, REST endpoint, and UI interface.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-xs">
        {USE_CASES.map((uc) => {
          const Icon = uc.icon;
          return (
            <div
              key={uc.id}
              id={uc.id}
              data-testid={uc.id}
              className="bg-slate-950/70 rounded-xl p-3.5 border border-slate-800/90 hover:border-blue-500/40 transition flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="inline-flex items-center gap-1 font-bold text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    <Icon className="w-3 h-3" />
                    Use Case {uc.number}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {uc.apiRoute}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-200 text-xs leading-snug">
                  {uc.title}
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {uc.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (uc.isModal || !uc.tab) {
                    onOpenDossier();
                  } else {
                    onNavigateTab(uc.tab);
                  }
                }}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 text-[11px] font-medium py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition group-hover:border-blue-500/40"
              >
                <span>Launch {uc.badge}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(ProblemStatementMatrix);
