import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { SAMPLE_RESIDENTIAL_LEASE, SAMPLE_FREELANCE_MSA } from '@/lib/sample-documents';

interface DocumentUploaderProps {
  onAnalyze: (text: string, title?: string) => void;
  onSelectSample: (sampleId: 'lease' | 'freelance') => void;
  isLoading?: boolean;
}

export default function DocumentUploader({ onAnalyze, onSelectSample, isLoading }: DocumentUploaderProps) {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [pastedText, setPastedText] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onAnalyze(content, file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsText(file);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;
    onAnalyze(pastedText, customTitle.trim() || 'Uploaded Agreement');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>GenAI Document Deconstruction & Fairness Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Understand What You Are Signing Before It's Too Late
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Upload any contract, agreement, lease, or policy. Get an instant Health Score (0-100), plain-English explanations, red-flag risk alerts, and attorney consultation questions.
        </p>
      </div>

      {/* Preset Fast-Demos */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Instant Evaluation Scenarios (Click to Load):
          </span>
          <span className="text-[11px] text-slate-400">Zero wait, pre-audited</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSelectSample('lease')}
            className="text-left p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition group flex items-start justify-between gap-3 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  Residential Apartment Lease
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-500/10 text-red-600">
                  Predatory (Score: 32)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                48h eviction lockouts, quiet enjoyment waiver, unlimited tenant liability.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 mt-1 transition" />
          </button>

          <button
            onClick={() => onSelectSample('freelance')}
            className="text-left p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition group flex items-start justify-between gap-3 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  Freelancer Master Services Agreement
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600">
                  High Risk (Score: 41)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                Net 90 terms, expropriation of pre-existing code, $500 client liability cap.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0 mt-1 transition" />
          </button>
        </div>
      </div>

      {/* Input Options: Paste vs Upload */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'paste'
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Paste Agreement Text
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Upload File (TXT, Markdown)
          </button>
        </div>

        {activeTab === 'paste' ? (
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Document Title (e.g. Non-Disclosure Agreement, Employment Offer)"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the full contract, clauses, terms of service, or employment agreement text here..."
                rows={6}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!pastedText.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Legal Structure...</span>
                  </>
                ) : (
                  <>
                    <span>Deconstruct & Score Agreement</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center space-y-3 hover:border-blue-500 transition cursor-pointer relative bg-slate-50/50 dark:bg-slate-800/30">
            <input
              type="file"
              accept=".txt,.md,.text"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">
                Click or drag legal contract file here
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Supports text files (.txt, .md)</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
