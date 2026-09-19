import React from 'react';
import { FileText, GitCompare, MessageSquareCode, Calendar, HelpCircle, FileCheck2, Sparkles } from 'lucide-react';
import LexiLogo from './LexiLogo';

interface NavbarProps {
  activeTab: 'analyzer' | 'compare' | 'chat' | 'timeline' | 'rights' | 'dossier';
  setActiveTab: (tab: 'analyzer' | 'compare' | 'chat' | 'timeline' | 'rights' | 'dossier') => void;
  onOpenDossier: () => void;
  onOpenWhyModal: () => void;
  documentTitle?: string;
  onLoadSample: (sampleId: 'lease' | 'freelance' | 'compare') => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenDossier,
  onOpenWhyModal,
  documentTitle,
  onLoadSample,
}: NavbarProps) {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <LexiLogo size={40} showStatusDot={true} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  Lexi AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Legal Access Copilot
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Democratizing legal literacy, contracts & citizen rights
              </p>
            </div>
          </div>

          {/* Quick Scenario Pre-loaders */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo:
            </span>
            <button
              onClick={() => onLoadSample('lease')}
              className="px-2.5 py-1 rounded hover:bg-slate-700 text-slate-200 font-medium transition"
              title="Predatory residential lease with 48h eviction & deposit trap"
            >
              Lease (Predatory)
            </button>
            <button
              onClick={() => onLoadSample('freelance')}
              className="px-2.5 py-1 rounded hover:bg-slate-700 text-slate-200 font-medium transition"
              title="Contractor agreement with IP transfer & Net 90 terms"
            >
              Freelancer MSA
            </button>
            <button
              onClick={() => onLoadSample('compare')}
              className="px-2.5 py-1 rounded hover:bg-slate-700 text-slate-200 font-medium transition"
              title="SaaS Terms of Service v1 vs v2 with forced arbitration"
            >
              SaaS Policy Diff
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWhyModal}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs px-3 py-2 rounded-lg transition"
              title="Why Lexi AI is superior to a generic ChatGPT prompt"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Why Not Generic AI?</span>
            </button>

            <button
              onClick={onOpenDossier}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg shadow-sm shadow-blue-500/30 transition active:scale-95"
            >
              <FileCheck2 className="w-4 h-4 text-blue-200" />
              <span>Attorney Dossier</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm border-t border-slate-800/80 pt-2">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'analyzer'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document X-Ray & Risks</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare Policies & Redlines</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>Grounded Q&A</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Obligation Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('rights')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 'rights'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Rights & Next Steps</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
