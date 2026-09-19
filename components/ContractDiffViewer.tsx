import React, { useState } from 'react';
import { ComparisonResult, ComparisonDiffClause } from '@/types/legal';
import { SAMPLE_COMPARISON_DATA } from '@/lib/sample-documents';
import { 
  GitCompare, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  MinusCircle, 
  PlusCircle,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

interface ContractDiffViewerProps {
  initialData?: ComparisonResult;
}

export default function ContractDiffViewer({ initialData = SAMPLE_COMPARISON_DATA }: ContractDiffViewerProps) {
  const [data, setData] = useState<ComparisonResult>(initialData);
  const [isComparing, setIsComparing] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'RISKY' | 'MODIFIED'>('ALL');

  const filteredClauses = data.clauses.filter(c => {
    if (filterType === 'RISKY') return c.riskImpact === 'HIGH_RISK' || c.riskImpact === 'UNFAVORABLE';
    if (filterType === 'MODIFIED') return c.changeType === 'MODIFIED' || c.changeType === 'ADDED';
    return true;
  });

  const getShiftBadge = (shift: ComparisonResult['netAdvantageShift']) => {
    switch (shift) {
      case 'USER_LOST_RIGHTS':
        return { label: 'User Lost Substantive Rights', color: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30' };
      case 'COUNTERPARTY_PROTECTED':
        return { label: 'Heavily Shifted to Counterparty Advantage', color: 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30' };
      case 'USER_GAINED_RIGHTS':
        return { label: 'User Gained Legal Protections', color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30' };
      default:
        return { label: 'Substantially Balanced Shift', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30' };
    }
  };

  const getChangeBadge = (type: ComparisonDiffClause['changeType']) => {
    switch (type) {
      case 'MODIFIED':
        return { icon: RefreshCw, label: 'Modified', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20' };
      case 'ADDED':
        return { icon: PlusCircle, label: 'Added', color: 'text-red-600 bg-red-500/10 border-red-500/20' };
      case 'REMOVED':
        return { icon: MinusCircle, label: 'Removed', color: 'text-slate-600 bg-slate-500/10 border-slate-500/20' };
      default:
        return { icon: CheckCircle2, label: 'Unchanged', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' };
    }
  };

  const shiftInfo = getShiftBadge(data.netAdvantageShift);

  return (
    <div className="space-y-4">
      
      {/* Overview Comparison Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Semantic Contract & Policy Redliner
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side comparison tracking clause alterations, silent deletions, and rights shifts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${shiftInfo.color}`}>
              {shiftInfo.label}
            </span>
          </div>
        </div>

        {/* Document Titles Comparison Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Baseline (Version A)
            </span>
            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
              {data.docATitle}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
            <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">
              Updated (Version B)
            </span>
            <p className="font-semibold text-sm text-indigo-950 dark:text-indigo-200 mt-0.5">
              {data.docBTitle}
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs uppercase tracking-wider mb-1">
            Summary of Substantive Impact:
          </h4>
          <p>{data.overallSummary}</p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.majorTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Display Diff:</span>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              filterType === 'ALL'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Clauses ({data.clauses.length})
          </button>
          <button
            onClick={() => setFilterType('RISKY')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              filterType === 'RISKY'
                ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            High Risk & Unfavorable Shifts
          </button>
          <button
            onClick={() => setFilterType('MODIFIED')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              filterType === 'MODIFIED'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Modified / Added Only
          </button>
        </div>
      </div>

      {/* Clause By Clause Diff Cards */}
      <div className="space-y-3">
        {filteredClauses.map((clause, idx) => {
          const change = getChangeBadge(clause.changeType);
          const ChangeIcon = change.icon;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${change.color}`}>
                    <ChangeIcon className="w-3 h-3" />
                    {change.label}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {clause.clauseName}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Benefits:</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    clause.whoBenefits === 'COUNTERPARTY'
                      ? 'bg-red-500/10 text-red-600'
                      : clause.whoBenefits === 'USER'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {clause.whoBenefits === 'COUNTERPARTY' ? 'Company / Counterparty' : clause.whoBenefits === 'USER' ? 'User Advantage' : 'Mutual / Neutral'}
                  </span>
                </div>
              </div>

              {/* Side-by-Side Clauses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-serif text-xs leading-relaxed">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Previous Version:
                  </span>
                  {clause.docAText ? (
                    <p className="text-slate-700 dark:text-slate-300">{clause.docAText}</p>
                  ) : (
                    <p className="italic text-slate-400">None (Clause did not exist in previous version)</p>
                  )}
                </div>

                <div className={`p-3 rounded-lg border ${
                  clause.riskImpact === 'HIGH_RISK'
                    ? 'bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-900 text-red-950 dark:text-red-200'
                    : 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-950 dark:text-blue-200'
                }`}>
                  <span className="font-sans font-bold text-[10px] text-indigo-500 uppercase tracking-wider block mb-1">
                    Updated Version:
                  </span>
                  {clause.docBText ? (
                    <p>{clause.docBText}</p>
                  ) : (
                    <p className="italic text-slate-400">Removed in updated version</p>
                  )}
                </div>
              </div>

              {/* Summary of What Changed */}
              <div className="bg-slate-100/70 dark:bg-slate-800/60 px-3 py-2 rounded-lg text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 font-sans">
                <span className="font-bold text-slate-900 dark:text-slate-100">Plain English Delta:</span>
                <span>{clause.summaryOfChange}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
