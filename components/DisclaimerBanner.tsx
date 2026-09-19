import React from 'react';
import { ShieldAlert, Info, Scale, CheckCircle2 } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <aside aria-label="Legal Boundary & Disclaimer" className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 text-xs text-amber-950 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
            §
          </span>
          <p className="leading-snug">
            <strong className="font-semibold text-amber-900 dark:text-amber-300">LEGAL BOUNDARY & ASSISTANCE NOTICE:</strong>{' '}
            Lexi AI provides informational document comprehension, clause breakdown, and negotiation preparation. It does not provide legal advice or establish an attorney-client privilege.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] bg-amber-500/15 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-medium">
            <CheckCircle2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            Anti-Hallucination Grounded
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
            <Scale className="w-3 h-3 text-slate-500" />
            US Statutory Baseline
          </span>
        </div>
      </div>
    </aside>
  );
}
