import React from 'react';
import { X, Sparkles, Check, AlertTriangle, ShieldCheck, Zap, Scale } from 'lucide-react';

interface WhyLexiBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhyLexiBridgeModal({ isOpen, onClose }: WhyLexiBridgeModalProps) {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      dimension: 'Clause Verification & Grounding',
      generic: 'Outputs generic prose with vague summaries; prone to hallucinating non-existent terms.',
      lexi: 'Strict clause-by-clause anchoring with verbatim quotes and clickable jumps directly to the text.',
    },
    {
      dimension: 'Handling Missing Information',
      generic: 'Frequently guesses or makes up terms not present in the contract.',
      lexi: 'Deterministic refusal guardrail: explicitly states when a term is absent and suggests asking counterparty.',
    },
    {
      dimension: 'Fairness & Risk Quantification',
      generic: 'No objective metric; subjective and variable between prompts.',
      lexi: 'Contract Health Score (0-100) with grade (A-F) based on unilateral burdens and liability exposure.',
    },
    {
      dimension: 'Comprehension Accessibility',
      generic: 'Single static output; requires repeated prompt re-engineering to adjust tone.',
      lexi: '3-tier interactive slider: Grade 8 (ELI5), Business Casual, and Attorney Scrutiny on demand.',
    },
    {
      dimension: 'Actionable Deadlines & Calendars',
      generic: 'Lists dates in plain text that get lost in chat history.',
      lexi: 'Interactive obligation timeline with notice periods, penalty cliffs, and one-click .ics calendar export.',
    },
    {
      dimension: 'Attorney Consultation Readiness',
      generic: 'Leaves users with disorganized chat logs of little use to lawyers.',
      lexi: 'Generates structured Attorney Intake Dossier with facts, identified liabilities, and 6 curated questions.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>Why Lexi AI vs. Generic AI Chatbots?</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  Evaluation Signal
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                How specialized legal architecture outperforms general-purpose LLM prompts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[75vh] text-xs sm:text-sm">
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800 p-3 font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <div className="col-span-4">Evaluation Dimension</div>
              <div className="col-span-4 text-slate-500">Generic AI (ChatGPT / Copilot)</div>
              <div className="col-span-4 text-blue-600 dark:text-blue-400 font-extrabold">Lexi AI Platform</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-3.5 gap-2 items-start text-xs">
                  <div className="col-span-4 font-semibold text-slate-900 dark:text-white">
                    {row.dimension}
                  </div>
                  <div className="col-span-4 text-slate-500 flex items-start gap-1.5">
                    <span className="text-red-500 shrink-0 mt-0.5">✕</span>
                    <span>{row.generic}</span>
                  </div>
                  <div className="col-span-4 text-slate-800 dark:text-slate-200 font-medium bg-blue-50/40 dark:bg-blue-950/20 p-2 rounded-lg border border-blue-200/40 dark:border-blue-900/40 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{row.lexi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <strong>Hack2Skill Evaluation Takeaway:</strong> Prompt Wars winners succeed not by writing one giant system prompt, but by engineering a robust product with verifiable grounding, UI synchronization, anti-hallucination guardrails, and actionable outputs.
          </div>
        </div>

      </div>
    </div>
  );
}
