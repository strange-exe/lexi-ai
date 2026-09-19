import React, { useState } from 'react';
import { DisputeScenario } from '@/types/legal';
import { DISPUTE_SCENARIOS } from '@/lib/sample-documents';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  FileText, 
  AlertTriangle, 
  Scale, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function RightsNavigator() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DISPUTE_SCENARIOS[0].id);
  const [copiedLetter, setCopiedLetter] = useState(false);

  const activeScenario = DISPUTE_SCENARIOS.find(s => s.id === selectedScenarioId) || DISPUTE_SCENARIOS[0];

  const copyLetter = () => {
    navigator.clipboard.writeText(activeScenario.demandLetterSnippet);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="space-y-4">
      
      {/* Scenario Selector Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Rights & Next Steps Diagnostic Navigator
            </h2>
            <p className="text-xs text-slate-500">
              Actionable guides, statutory safeguards, and ready-to-send formal demand letters for common disputes
            </p>
          </div>
        </div>

        {/* Scenario Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DISPUTE_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`text-left p-3.5 rounded-xl border transition flex flex-col justify-between ${
                selectedScenarioId === s.id
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-300'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {s.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">
                  {s.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {s.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Scenario Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Action Steps & Legal Rights */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Rights Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-600" />
              Your Legal Rights in This Scenario
            </h3>
            <div className="space-y-2">
              {activeScenario.yourRightsOverview.map((right, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan Steps */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <ChevronRight className="w-4 h-4 text-indigo-600" />
              Step-by-Step Resolution Roadmap
            </h3>

            <div className="space-y-4">
              {activeScenario.actionPlanSteps.map((step) => (
                <div key={step.stepNumber} className="border-l-2 border-indigo-500 pl-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 p-2 rounded border border-emerald-500/20 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Do this:</strong> {step.doThis}
                      </div>
                    </div>
                    <div className="bg-red-500/10 text-red-900 dark:text-red-300 p-2 rounded border border-red-500/20 flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Avoid:</strong> {step.avoidThis}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When to escalate to a lawyer */}
          <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              When to Stop and Hire a Licensed Attorney
            </h4>
            <div className="space-y-1">
              {activeScenario.whenToEscalateToLawyer.map((crit, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-amber-900 dark:text-amber-300">
                  <span className="font-bold">•</span>
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Copyable Formal Demand Letter */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 sticky top-24">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Formal Notice / Demand Letter
            </h3>
            <button
              onClick={copyLetter}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition"
            >
              {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLetter ? 'Copied to Clipboard' : 'Copy Template'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            Fill in the brackets `[ ]` with your specific dates and dollar figures. Send via Certified Mail or documented email to preserve legal standing.
          </p>

          <pre className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800">
            {activeScenario.demandLetterSnippet}
          </pre>
        </div>

      </div>

    </div>
  );
}
