import React from 'react';
import { ContractHealthReport } from '@/types/legal';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, BarChart3, AlertOctagon } from 'lucide-react';

interface ContractHealthCardProps {
  report: ContractHealthReport;
  onSelectClause?: (clauseId: string) => void;
}

export default function ContractHealthCard({ report, onSelectClause }: ContractHealthCardProps) {
  const getScoreColor = (score: number) => {
    if (score < 45) return 'text-red-600 dark:text-red-400 border-red-500 bg-red-50 dark:bg-red-950/30';
    if (score < 65) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/30';
    if (score < 80) return 'text-yellow-600 dark:text-yellow-400 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
    return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
  };

  const getScoreRingColor = (score: number) => {
    if (score < 45) return 'stroke-red-500';
    if (score < 65) return 'stroke-amber-500';
    if (score < 80) return 'stroke-yellow-500';
    return 'stroke-emerald-500';
  };

  const criticalCount = report.clauses.filter(c => c.riskLevel === 'CRITICAL').length;
  const highCount = report.clauses.filter(c => c.riskLevel === 'HIGH').length;
  const mediumCount = report.clauses.filter(c => c.riskLevel === 'MEDIUM').length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      
      {/* Top Header & Score Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
              {report.documentType}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-400">Analyzed {report.analyzedAt}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
            {report.title}
          </h2>
        </div>

        {/* Health Score Circle Meter */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${getScoreRingColor(report.healthScore)} transition-all duration-1000 ease-out`}
                strokeDasharray={`${report.healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {report.healthScore}
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-medium">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColor(report.healthScore)}`}>
                Grade: {report.scoreGrade}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {report.healthScore < 50 ? 'Predatory / High Risk' : report.healthScore < 75 ? 'Moderate Risk' : 'Balanced'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {criticalCount} Critical Gotchas • {highCount} High Risks
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Score Breakdown Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
            <span>Fairness Balance</span>
            <span className="font-bold">{report.scoreBreakdown.fairnessBalanceScore}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${report.scoreBreakdown.fairnessBalanceScore < 40 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${report.scoreBreakdown.fairnessBalanceScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Reciprocal rights vs unilateral burdens</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
            <span>Risk Exposure Safety</span>
            <span className="font-bold">{report.scoreBreakdown.riskExposureScore}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full ${report.scoreBreakdown.riskExposureScore < 40 ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${report.scoreBreakdown.riskExposureScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Absence of severe traps & uncapped liability</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
            <span>Language Clarity</span>
            <span className="font-bold">{report.scoreBreakdown.clarityScore}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${report.scoreBreakdown.clarityScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Readability index & legalese density</p>
        </div>

      </div>

      {/* Executive Summary Box */}
      <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
        report.healthScore < 50
          ? 'bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200'
          : 'bg-blue-500/10 border-blue-500/30 text-blue-950 dark:text-blue-200'
      }`}>
        <div className="flex items-start gap-2.5">
          {report.healthScore < 50 ? (
            <AlertOctagon className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-1">
              Executive AI Summary
            </h4>
            <p className="text-xs sm:text-sm">{report.executiveSummary}</p>
          </div>
        </div>
      </div>

      {/* Critical Gotcha Pills */}
      {report.criticalGotchas.length > 0 && (
        <div className="pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Identified Gotcha Clauses & Pitfalls ({report.criticalGotchas.length})
          </h4>
          <div className="space-y-1.5">
            {report.criticalGotchas.map((gotcha, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs bg-red-50/70 dark:bg-red-950/20 text-red-900 dark:text-red-300 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/40"
              >
                <span className="font-bold text-red-600 dark:text-red-400 shrink-0">#{idx + 1}</span>
                <span className="flex-1">{gotcha}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
