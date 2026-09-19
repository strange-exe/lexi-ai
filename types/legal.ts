export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'FAVORABLE' | 'NEUTRAL';

export type ClauseCategory = 
  | 'INDEMNITY' 
  | 'TERMINATION' 
  | 'LIABILITY' 
  | 'PAYMENT' 
  | 'IP_RIGHTS' 
  | 'DISPUTE_RESOLUTION' 
  | 'RESTRICTIVE_COVENANTS' 
  | 'CONFIDENTIALITY' 
  | 'DATA_PRIVACY' 
  | 'GENERAL';

export interface ClauseAnalysis {
  id: string;
  clauseNumber: string;
  title: string;
  originalText: string;
  simplified: {
    plain: string;       // Grade 8 / ELI5
    casual: string;      // Business casual
    professional: string;// Legal-accurate breakdown
  };
  riskLevel: RiskLevel;
  category: ClauseCategory;
  explanation: string;
  whyItMatters: string;
  negotiationTips: string[];
  unfairnessFlag?: string;
  benchmarkStandard?: string; // What is market standard
}

export interface ContractHealthReport {
  documentId: string;
  title: string;
  documentType: 'Residential Lease' | 'Independent Contractor Agreement' | 'SaaS Terms of Service' | 'Employment NDA' | 'Vendor Contract' | 'General Agreement';
  healthScore: number; // 0 to 100
  scoreGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  scoreBreakdown: {
    clarityScore: number;       // 0-100
    fairnessBalanceScore: number;// 0-100
    riskExposureScore: number;  // 0-100
  };
  executiveSummary: string;
  keyStrengths: string[];
  criticalGotchas: string[];
  clauses: ClauseAnalysis[];
  analyzedAt: string;
}

export interface ComparisonDiffClause {
  clauseName: string;
  docAText?: string;
  docBText?: string;
  changeType: 'MODIFIED' | 'ADDED' | 'REMOVED' | 'UNCHANGED';
  riskImpact: 'FAVORABLE' | 'UNFAVORABLE' | 'NEUTRAL' | 'HIGH_RISK';
  summaryOfChange: string;
  whoBenefits: 'USER' | 'COUNTERPARTY' | 'MUTUAL' | 'NONE';
}

export interface ComparisonResult {
  docATitle: string;
  docBTitle: string;
  overallSummary: string;
  netAdvantageShift: 'USER_GAINED_RIGHTS' | 'USER_LOST_RIGHTS' | 'COUNTERPARTY_PROTECTED' | 'SUBSTANTIALLY_BALANCED';
  majorTakeaways: string[];
  clauses: ComparisonDiffClause[];
}

export interface ObligationItem {
  id: string;
  deadlineOrTrigger: string;
  responsibleParty: 'USER' | 'COUNTERPARTY' | 'BOTH';
  description: string;
  penaltyForBreach: string;
  priority: 'CRITICAL' | 'IMPORTANT' | 'ROUTINE';
  clauseReference: string;
  category: 'PAYMENT' | 'NOTICE' | 'DELIVERABLE' | 'AUDIT' | 'RENEWAL' | 'COMPLIANCE';
}

export interface AttorneyDossier {
  documentTitle: string;
  documentType: string;
  dateGenerated: string;
  clientRole: string;
  counterpartyRole: string;
  executiveBrief: string;
  primaryVulnerabilities: Array<{
    clauseTitle: string;
    originalQuote: string;
    identifiedRisk: string;
    potentialExposure: string;
  }>;
  criticalDatesAndDeadlines: string[];
  curatedConsultationQuestions: Array<{
    question: string;
    context: string;
    suggestedGoal: string;
  }>;
  recommendedIntakeEvidence: string[];
}

export interface CitationReference {
  clauseId: string;
  clauseTitle: string;
  quote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: CitationReference[];
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface DisputeScenario {
  id: string;
  category: 'TENANT' | 'FREELANCER' | 'EMPLOYEE' | 'CONSUMER';
  title: string;
  subtitle: string;
  commonOccurrence: string;
  yourRightsOverview: string[];
  actionPlanSteps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    doThis: string;
    avoidThis: string;
  }>;
  demandLetterSnippet: string;
  whenToEscalateToLawyer: string[];
}
