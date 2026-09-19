import React, { useState } from 'react';
import { AttorneyDossier } from '@/types/legal';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileCheck2, 
  AlertTriangle, 
  HelpCircle, 
  CheckSquare, 
  Building, 
  User,
  Scale
} from 'lucide-react';

interface AttorneyDossierModalProps {
  dossier: AttorneyDossier;
  isOpen: boolean;
  onClose: () => void;
}

export default function AttorneyDossierModal({ dossier, isOpen, onClose }: AttorneyDossierModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyMarkdown = () => {
    const md = `# ATTORNEY CONSULTATION INTAKE DOSSIER
Prepared via Lexi AI for legal professional review
Date: ${dossier.dateGenerated}
Document: ${dossier.documentTitle} (${dossier.documentType})

## PARTIES
- Client / Signatory: ${dossier.clientRole}
- Counterparty: ${dossier.counterpartyRole}

## EXECUTIVE SUMMARY
${dossier.executiveBrief}

## PRIMARY VULNERABILITIES IDENTIFIED
${dossier.primaryVulnerabilities.map((v, i) => `### ${i + 1}. ${v.clauseTitle}
- Quote: "${v.originalQuote}"
- Identified Risk: ${v.identifiedRisk}
- Potential Exposure: ${v.potentialExposure}
`).join('\n')}

## CURATED CONSULTATION QUESTIONS FOR COUNSEL
${dossier.curatedConsultationQuestions.map((q, i) => `### Question ${i + 1}: ${q.question}
- Context: ${q.context}
- Target Outcome: ${q.suggestedGoal}
`).join('\n')}

## SUGGESTED EVIDENCE FOR INTAKE
${dossier.recommendedIntakeEvidence.map(e => `- [ ] ${e}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  Attorney Consultation Readiness Dossier
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Intake Packet
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Synthesized client brief to maximize billable hour efficiency with legal counsel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdown}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
              title="Copy dossier as markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
          
          {/* Metadata Banner */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Target Document:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {dossier.documentTitle}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Agreement Type:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {dossier.documentType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              <span>Client: <strong>{dossier.clientRole}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Counterparty: <strong>{dossier.counterpartyRole}</strong></span>
            </div>
          </div>

          {/* Executive Brief */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-600" />
              Executive Matter Brief
            </h4>
            <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 leading-relaxed text-slate-800 dark:text-slate-200">
              {dossier.executiveBrief}
            </div>
          </div>

          {/* Top Vulnerabilities */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              High-Exposure Clauses & Legal Vulnerabilities
            </h4>
            <div className="space-y-2.5">
              {dossier.primaryVulnerabilities.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {v.clauseTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-600 border border-red-500/20">
                      FLAGGED VULNERABILITY
                    </span>
                  </div>
                  <p className="italic font-serif text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                    "{v.originalQuote}"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Identified Risk:</strong>{' '}
                      <span className="text-slate-600 dark:text-slate-400">{v.identifiedRisk}</span>
                    </div>
                    <div>
                      <strong className="text-red-700 dark:text-red-400">Potential Exposure:</strong>{' '}
                      <span className="text-slate-600 dark:text-slate-400">{v.potentialExposure}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Curated Questions for Consultation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              Curated Questions to Ask During Your Legal Consultation
            </h4>
            <div className="space-y-2">
              {dossier.curatedConsultationQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 space-y-1"
                >
                  <div className="font-semibold text-indigo-950 dark:text-indigo-200">
                    {idx + 1}. {q.question}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Why to ask:</span> {q.context}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    <span className="font-medium">Target Advice:</span> {q.suggestedGoal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Evidence Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              Recommended Intake Materials & Evidence to Bring
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {dossier.recommendedIntakeEvidence.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <span className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attorney Notice Footer */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 text-center leading-relaxed">
            Note to Attorney: This dossier was prepared using Lexi AI document comprehension heuristics to outline the client's commercial context and prioritize key issues for your legal evaluation.
          </div>

        </div>

      </div>
    </div>
  );
}
