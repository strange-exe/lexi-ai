'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContractHealthCard from '@/components/ContractHealthCard';
import DualPaneReader from '@/components/DualPaneReader';
import ContractDiffViewer from '@/components/ContractDiffViewer';
import GroundedChatWidget from '@/components/GroundedChatWidget';
import ObligationTimeline from '@/components/ObligationTimeline';
import RightsNavigator from '@/components/RightsNavigator';
import AttorneyDossierModal from '@/components/AttorneyDossierModal';
import WhyLexiBridgeModal from '@/components/WhyLexiBridgeModal';
import DocumentUploader from '@/components/DocumentUploader';

import { 
  SAMPLE_RESIDENTIAL_LEASE, 
  SAMPLE_FREELANCE_MSA, 
  SAMPLE_COMPARISON_DATA 
} from '@/lib/sample-documents';
import { 
  analyzeDocumentHeuristics, 
  extractObligationsFromDocument, 
  generateAttorneyDossier 
} from '@/lib/legal-engine';
import { ContractHealthReport, ObligationItem, AttorneyDossier } from '@/types/legal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'compare' | 'chat' | 'timeline' | 'rights' | 'dossier'>('analyzer');
  const [currentReport, setCurrentReport] = useState<ContractHealthReport>(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
  const [currentObligations, setCurrentObligations] = useState<ObligationItem[]>(SAMPLE_RESIDENTIAL_LEASE.obligations);
  const [currentDossier, setCurrentDossier] = useState<AttorneyDossier>(SAMPLE_RESIDENTIAL_LEASE.dossier);
  
  const [selectedClauseId, setSelectedClauseId] = useState<string>(SAMPLE_RESIDENTIAL_LEASE.precomputedReport.clauses[1]?.id || '');
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load a demo scenario
  const handleLoadSample = (sampleId: 'lease' | 'freelance' | 'compare') => {
    if (sampleId === 'lease') {
      setCurrentReport(SAMPLE_RESIDENTIAL_LEASE.precomputedReport);
      setCurrentObligations(SAMPLE_RESIDENTIAL_LEASE.obligations);
      setCurrentDossier(SAMPLE_RESIDENTIAL_LEASE.dossier);
      setSelectedClauseId(SAMPLE_RESIDENTIAL_LEASE.precomputedReport.clauses[1].id);
      setActiveTab('analyzer');
    } else if (sampleId === 'freelance') {
      setCurrentReport(SAMPLE_FREELANCE_MSA.precomputedReport);
      setCurrentObligations(SAMPLE_FREELANCE_MSA.obligations);
      setCurrentDossier(SAMPLE_FREELANCE_MSA.dossier);
      setSelectedClauseId(SAMPLE_FREELANCE_MSA.precomputedReport.clauses[1].id);
      setActiveTab('analyzer');
    } else if (sampleId === 'compare') {
      setActiveTab('compare');
    }
  };

  // Analyze custom uploaded document
  const handleAnalyzeCustom = async (text: string, title?: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title }),
      });

      if (res.ok) {
        const report: ContractHealthReport = await res.json();
        setCurrentReport(report);
        setCurrentObligations(extractObligationsFromDocument(report));
        setCurrentDossier(generateAttorneyDossier(report));
        if (report.clauses.length > 0) {
          setSelectedClauseId(report.clauses[0].id);
        }
      } else {
        // Fallback to local heuristic engine
        const report = analyzeDocumentHeuristics(text, title);
        setCurrentReport(report);
        setCurrentObligations(extractObligationsFromDocument(report));
        setCurrentDossier(generateAttorneyDossier(report));
        if (report.clauses.length > 0) {
          setSelectedClauseId(report.clauses[0].id);
        }
      }
    } catch (e) {
      console.warn('API error, falling back locally:', e);
      const report = analyzeDocumentHeuristics(text, title);
      setCurrentReport(report);
      setCurrentObligations(extractObligationsFromDocument(report));
      setCurrentDossier(generateAttorneyDossier(report));
      if (report.clauses.length > 0) {
        setSelectedClauseId(report.clauses[0].id);
      }
    } finally {
      setIsAnalyzing(false);
      setActiveTab('analyzer');
    }
  };

  const handleSelectClause = (clauseId: string) => {
    setSelectedClauseId(clauseId);
    setActiveTab('analyzer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenWhyModal={() => setIsWhyModalOpen(true)}
        documentTitle={currentReport.title}
        onLoadSample={handleLoadSample}
      />

      {/* Main Workspace View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        
        {/* Tab 1: Document X-Ray & Risk Analyzer */}
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            <DocumentUploader
              onAnalyze={handleAnalyzeCustom}
              onSelectSample={handleLoadSample}
              isLoading={isAnalyzing}
            />

            <ContractHealthCard
              report={currentReport}
              onSelectClause={handleSelectClause}
            />

            <DualPaneReader
              clauses={currentReport.clauses}
              selectedClauseId={selectedClauseId}
              onSelectClause={setSelectedClauseId}
            />
          </div>
        )}

        {/* Tab 2: Side-by-Side Comparison & Redlines */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <ContractDiffViewer initialData={SAMPLE_COMPARISON_DATA} />
          </div>
        )}

        {/* Tab 3: Grounded Q&A Assistant */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <GroundedChatWidget
              document={currentReport}
              onSelectClause={handleSelectClause}
            />
          </div>
        )}

        {/* Tab 4: Obligation & Deadline Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <ObligationTimeline
              obligations={currentObligations}
              documentTitle={currentReport.title}
            />
          </div>
        )}

        {/* Tab 5: Rights & Diagnostic Navigator */}
        {activeTab === 'rights' && (
          <div className="space-y-6">
            <RightsNavigator />
          </div>
        )}

      </div>

      {/* Attorney Consultation Intake Dossier Modal */}
      <AttorneyDossierModal
        dossier={currentDossier}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Why LexiBridge vs Generic AI Evaluation Modal */}
      <WhyLexiBridgeModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Lexi AI • Built for the GenAI Legal Assistance & Access Hackathon
          </p>
          <p className="text-slate-600">
            Assists and prepares users for professional counsel • Does not replace an attorney
          </p>
        </div>
      </footer>

    </div>
  );
}
