import React, { useState, useMemo, useCallback } from 'react';
import { ClauseAnalysis, RiskLevel, ClauseCategory } from '@/types/legal';
import { 
  AlertCircle, 
  Check, 
  Copy, 
  Eye, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface DualPaneReaderProps {
  clauses: ClauseAnalysis[];
  selectedClauseId?: string;
  onSelectClause: (clauseId: string) => void;
}

export default function DualPaneReader({
  clauses,
  selectedClauseId,
  onSelectClause,
}: DualPaneReaderProps) {
  const [readingLevel, setReadingLevel] = useState<'plain' | 'casual' | 'professional'>('plain');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  const activeClause = useMemo(() => {
    return clauses.find(c => c.id === selectedClauseId) || clauses[0];
  }, [clauses, selectedClauseId]);

  const filteredClauses = useMemo(() => {
    return clauses.filter(c => {
      if (filterRisk === 'ALL') return true;
      if (filterRisk === 'HIGH_RISK') return c.riskLevel === 'CRITICAL' || c.riskLevel === 'HIGH';
      if (filterRisk === 'PAYMENT') return c.category === 'PAYMENT';
      if (filterRisk === 'TERMINATION') return c.category === 'TERMINATION';
      if (filterRisk === 'INDEMNITY') return c.category === 'INDEMNITY' || c.category === 'LIABILITY';
      return c.riskLevel === filterRisk;
    });
  }, [clauses, filterRisk]);

  const getRiskBadge = useCallback((risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30';
      case 'HIGH':
        return 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
      case 'FAVORABLE':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-500/30';
    }
  }, []);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTip(id);
    setTimeout(() => setCopiedTip(null), 2000);
  }, []);

  return (
    <div className="space-y-3">
      
      {/* Filtering & View Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Filter Clauses:</span>
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'ALL', label: `All (${clauses.length})` },
              { id: 'HIGH_RISK', label: 'High Risk / Traps' },
              { id: 'PAYMENT', label: 'Payment' },
              { id: 'TERMINATION', label: 'Eviction / Exit' },
              { id: 'INDEMNITY', label: 'Indemnity & Liability' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterRisk(tab.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition ${
                  filterRisk === tab.id
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Click any clause to inspect</span>
        </div>
      </div>

      {/* Dual Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Pane: Original Document View */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm max-h-[720px] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Original Contract Text
            </h3>
            <span className="text-[11px] text-slate-400">
              Showing {filteredClauses.length} clauses
            </span>
          </div>

          <div className="space-y-2.5 font-serif text-sm">
            {filteredClauses.map((clause) => {
              const isSelected = clause.id === activeClause?.id;
              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause(clause.id)}
                  className={`p-3 rounded-lg cursor-pointer transition border text-left ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-1 ring-blue-500 shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-sans">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        {clause.clauseNumber}
                      </span>
                      {clause.title}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getRiskBadge(clause.riskLevel)}`}>
                      {clause.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {clause.originalText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Interactive Clause Inspector & Simplifier */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5 sticky top-24">
          
          {activeClause ? (
            <>
              {/* Clause Header & Risk Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Clause {activeClause.clauseNumber} • {activeClause.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeClause.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getRiskBadge(activeClause.riskLevel)}`}>
                    {activeClause.riskLevel} RISK
                  </span>
                </div>
              </div>

              {/* 3-Tier Simplifier Selector Slider */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    Plain-Language Comprehension Level:
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[11px]">
                    {readingLevel === 'plain' ? 'Grade 8 / ELI5' : readingLevel === 'casual' ? 'Business Casual' : 'Attorney Scrutiny'}
                  </span>
                </div>

                {/* Level Toggle Buttons */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg">
                  <button
                    onClick={() => setReadingLevel('plain')}
                    className={`py-1.5 text-xs font-medium rounded-md transition ${
                      readingLevel === 'plain'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    1. Plain English (ELI5)
                  </button>
                  <button
                    onClick={() => setReadingLevel('casual')}
                    className={`py-1.5 text-xs font-medium rounded-md transition ${
                      readingLevel === 'casual'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    2. Business Casual
                  </button>
                  <button
                    onClick={() => setReadingLevel('professional')}
                    className={`py-1.5 text-xs font-medium rounded-md transition ${
                      readingLevel === 'professional'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    3. Legal Annotations
                  </button>
                </div>

                {/* Rendered Translation */}
                <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {activeClause.simplified[readingLevel]}
                  </p>
                </div>
              </div>

              {/* Real World Impact & Risk Explanation */}
              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/25 p-3.5 rounded-xl text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                  <h4 className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300 mb-1">
                    <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Why This Matters in Real Life
                  </h4>
                  <p className="leading-relaxed">{activeClause.whyItMatters}</p>
                  {activeClause.benchmarkStandard && (
                    <p className="mt-2 text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                      🏛️ <strong>Market Standard:</strong> {activeClause.benchmarkStandard}
                    </p>
                  )}
                </div>

                {/* Negotiation Counter-Clauses */}
                {activeClause.negotiationTips.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Recommended Counter-Negotiation Points:
                    </h4>
                    <div className="space-y-2">
                      {activeClause.negotiationTips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200"
                        >
                          <span className="flex-1 leading-snug">&ldquo;{tip}&rdquo;</span>
                          <button
                            onClick={() => copyToClipboard(tip, `tip-${idx}`)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 px-2 py-1 rounded bg-emerald-500/15 transition shrink-0"
                            title="Copy counter-clause to clipboard"
                          >
                            {copiedTip === `tip-${idx}` ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Wording</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Original Clause Excerpt */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Verbatim Clause Text:
                  </span>
                  <blockquote className="text-xs font-serif italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                    &ldquo;{activeClause.originalText}&rdquo;
                  </blockquote>
                </div>

              </div>

            </>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>Select a clause on the left to inspect its risk and translation</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
