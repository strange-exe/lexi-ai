import { ContractHealthReport, ComparisonResult, ObligationItem, AttorneyDossier, DisputeScenario } from '@/types/legal';

export const SAMPLE_RESIDENTIAL_LEASE: {
  id: string;
  title: string;
  category: 'Residential Lease';
  rawText: string;
  precomputedReport: ContractHealthReport;
  obligations: ObligationItem[];
  dossier: AttorneyDossier;
} = {
  id: 'lease-predatory-sample',
  title: 'Standard Residential Lease Agreement (Sample with High-Risk Clauses)',
  category: 'Residential Lease',
  rawText: `RESIDENTIAL LEASE AGREEMENT
THIS AGREEMENT entered into this 1st day of October, 2024, by and between Apex Property Holdings LLC ("Landlord") and Jane Doe ("Tenant").

SECTION 1: TERM AND RENT
The term of this lease shall be for twelve (12) months. Tenant agrees to pay monthly rent of $2,400.00, payable on or before the 1st day of each month. A late charge of $150.00 plus $25.00 per day shall apply if rent is not received by 11:59 PM on the 2nd day.

SECTION 2: SECURITY DEPOSIT AND FORFEITURE
Tenant shall deposit with Landlord the sum of $4,800.00 as a security deposit. Landlord reserves the unrestricted right to retain the entire security deposit as liquidated damages if Tenant vacates before the natural expiration of the term, regardless of whether Landlord re-rents the premises immediately. Said deposit shall not bear interest and may be commingled with Landlord's general operating accounts.

SECTION 3: LANDLORD RIGHT OF IMMEDIATE ENTRY
Landlord and Landlord's agents, contractors, and prospective buyers shall have the absolute right to enter the leased premises at any time, day or night, without prior notice, for inspection, repairs, showings, or any convenience of Landlord. Tenant waives all claims of trespass or disturbance of quiet enjoyment.

SECTION 4: INDEMNIFICATION AND WAIVER OF LANDLORD NEGLIGENCE
Tenant agrees to indemnify, defend, and hold harmless Landlord, its owners, and affiliates from and against any and all claims, bodily injuries, property damage, loss of life, or legal fees occurring on the premises, even if caused by the gross negligence, defective maintenance, or intentional misconduct of Landlord or its building staff.

SECTION 5: ACCELERATED EVICTION AND WAIVER OF STATUTORY NOTICE
In the event of any alleged breach of this Agreement, including any late payment or minor noise disturbance, Landlord may terminate this lease upon forty-eight (48) hours electronic notice. Tenant expressly waives all statutory rights to court-adjudicated eviction proceedings, formal summons, or mediation under state landlord-tenant laws, and authorizes Landlord to immediately change door locks and dispose of personal belongings.

SECTION 6: MAINTENANCE AND REPAIR COSTS
Tenant assumes sole responsibility for all structural, plumbing, electrical, and appliance repairs exceeding $50.00, regardless of whether such repairs are necessitated by normal wear and tear, age of equipment, or pre-existing building conditions.

SECTION 7: GUESTS AND OVERNIGHT VISITATION RESTRICTION
Tenant shall not permit any guest or family member to remain on the premises for more than forty-eight (48) consecutive hours without paying an additional unauthorized occupant surcharge of $200.00 per night.`,
  precomputedReport: {
    documentId: 'lease-predatory-sample',
    title: 'Standard Residential Lease Agreement (Sample with High-Risk Clauses)',
    documentType: 'Residential Lease',
    healthScore: 32,
    scoreGrade: 'F',
    scoreBreakdown: {
      clarityScore: 68,
      fairnessBalanceScore: 18,
      riskExposureScore: 12,
    },
    executiveSummary: 'CRITICAL ALERT: This residential lease contains severe, highly predatory, and potentially illegal clauses under standard tenancy laws. It purports to waive statutory eviction protections, allows unannounced landlord entry, imposes unlimited tenant indemnification for landlord gross negligence, and forfeits the security deposit arbitrarily.',
    keyStrengths: [
      'Specifies exact monthly rent and term dates clearly',
      'Defines guest policy boundaries explicitly',
    ],
    criticalGotchas: [
      'Illegal waiver of court eviction proceedings and 48-hour self-help lockout clause',
      'Waiver of quiet enjoyment permitting unannounced 24/7 landlord entry',
      'Indemnification requiring tenant to pay for landlord\'s gross negligence and structural defects',
      'Automatic security deposit forfeiture as penalty regardless of actual mitigation',
      'Shifts structural and pre-existing maintenance obligations onto tenant',
    ],
    analyzedAt: '2024-10-01',
    clauses: [
      {
        id: 'lease-c1',
        clauseNumber: '1',
        title: 'Rent & Late Charges',
        originalText: 'A late charge of $150.00 plus $25.00 per day shall apply if rent is not received by 11:59 PM on the 2nd day.',
        simplified: {
          plain: 'If your rent is just one day late (on the 2nd), you owe an immediate $150 extra plus $25 every single day thereafter.',
          casual: 'There is virtually no grace period. A flat $150 penalty hits on day 2, compounding daily at $25/day.',
          professional: 'Aggressive liquidated damages provision with only a 24-hour grace window, likely exceeding statutory reasonableness thresholds in many jurisdictions.',
        },
        riskLevel: 'HIGH',
        category: 'PAYMENT',
        explanation: 'Most jurisdictions cap late fees at 5% of monthly rent and mandate a 3 to 5 day grace period. Compounding daily late fees can quickly become unconscionable.',
        whyItMatters: 'If rent is delayed by a bank transfer glitch over a holiday weekend, you could owe hundreds of dollars in automated fines within days.',
        negotiationTips: [
          'Request a standard 5-day grace period before late charges accrue.',
          'Cap the fee at a flat 4-5% of monthly rent (e.g. $100 maximum) with no daily compounding.',
        ],
        benchmarkStandard: 'Market standard is 3-5 days grace period and a flat 5% cap.',
      },
      {
        id: 'lease-c2',
        clauseNumber: '2',
        title: 'Security Deposit & Forfeiture',
        originalText: 'Landlord reserves the unrestricted right to retain the entire security deposit as liquidated damages if Tenant vacates before the natural expiration of the term, regardless of whether Landlord re-rents the premises immediately. Said deposit shall not bear interest and may be commingled with Landlord\'s general operating accounts.',
        simplified: {
          plain: 'If you move out early, the landlord keeps all $4,800 even if they find a new tenant the very next day, and they mix your money in their personal bank account.',
          casual: 'The landlord claims total forfeiture of your deposit upon early exit without duty to mitigate losses, and refuses to hold your deposit in an escrow account.',
          professional: 'Unlawful penal clause violating landlord duty of mitigation. Commingling deposits with operational accounts directly violates statutory escrow requirements in numerous states (e.g., NY GOB § 7-103, CA Civil Code § 1950.5).',
        },
        riskLevel: 'CRITICAL',
        category: 'PAYMENT',
        explanation: 'Security deposits legally remain tenant property held in trust. Landlords have an affirmative legal duty to mitigate damages by attempting to re-lease the apartment.',
        whyItMatters: 'You forfeit nearly $5,000 without the landlord having to account for actual verifiable damages or lost rent.',
        negotiationTips: [
          'Strike out the clause permitting commingling; require deposit placement in a dedicated interest-bearing escrow account.',
          'Clarify that early termination damages are strictly tied to actual lost rent until a replacement tenant is secured.',
        ],
        unfairnessFlag: 'Unilateral penalty violating statutory mitigation requirements',
      },
      {
        id: 'lease-c3',
        clauseNumber: '3',
        title: 'Landlord Right of Immediate Entry',
        originalText: 'Landlord and Landlord\'s agents, contractors, and prospective buyers shall have the absolute right to enter the leased premises at any time, day or night, without prior notice, for inspection, repairs, showings, or any convenience of Landlord. Tenant waives all claims of trespass or disturbance of quiet enjoyment.',
        simplified: {
          plain: 'The landlord or their workers can walk into your apartment at 3 AM without knocking, calling, or telling you beforehand, and you cannot complain.',
          casual: 'Total surrender of tenant privacy. Landlord claims zero-notice entry 24/7 for any reason, destroying your right to quiet enjoyment.',
          professional: 'Gross breach of the covenant of quiet enjoyment. In almost all legal jurisdictions, landlords must provide at least 24 to 48 hours written notice before non-emergency entry during reasonable business hours.',
        },
        riskLevel: 'CRITICAL',
        category: 'GENERAL',
        explanation: 'Statutes virtually everywhere prohibit non-emergency landlord entry without reasonable written notice (typically 24-48 hours) and restrict entry to normal daytime hours.',
        whyItMatters: 'Severely compromises your safety, privacy, and living peace.',
        negotiationTips: [
          'Change to: "Landlord must provide at least 24 hours prior written notice before entry, between the hours of 9:00 AM and 6:00 PM, except in bona fide emergencies."',
        ],
        unfairnessFlag: 'Unenforceable and predatory waiver of statutory privacy',
      },
      {
        id: 'lease-c4',
        clauseNumber: '4',
        title: 'Indemnification & Waiver of Landlord Negligence',
        originalText: 'Tenant agrees to indemnify, defend, and hold harmless Landlord, its owners, and affiliates from and against any and all claims, bodily injuries, property damage, loss of life, or legal fees occurring on the premises, even if caused by the gross negligence, defective maintenance, or intentional misconduct of Landlord or its building staff.',
        simplified: {
          plain: 'If the ceiling falls on you or a visitor because the landlord refused to fix a leak, YOU must pay all hospital bills and legal fees, and you cannot sue the landlord.',
          casual: 'You are forced to insure the landlord against their own carelessness, negligence, and even intentional misconduct.',
          professional: 'Broad-form exculpatory and indemnity provision attempting to absolve the landlord from liability for gross negligence or willful misconduct. Generally held void as against public policy in residential leases.',
        },
        riskLevel: 'CRITICAL',
        category: 'INDEMNITY',
        explanation: 'Exculpatory clauses immunizing a landlord from their own gross negligence or failure to maintain habitable premises are routinely struck down by courts as unconscionable.',
        whyItMatters: 'Renders you financially liable for dangerous structural failures or negligent maintenance carried out by the property manager.',
        negotiationTips: [
          'Demand full deletion of this clause or add mutual carveouts: "except to the extent caused by Landlord\'s negligence, willful misconduct, or failure to maintain premises."',
        ],
        unfairnessFlag: 'Attempted exculpation of gross negligence is void under public policy',
      },
      {
        id: 'lease-c5',
        clauseNumber: '5',
        title: 'Accelerated Eviction & Lockout Waiver',
        originalText: 'Landlord may terminate this lease upon forty-eight (48) hours electronic notice. Tenant expressly waives all statutory rights to court-adjudicated eviction proceedings, formal summons, or mediation under state landlord-tenant laws, and authorizes Landlord to immediately change door locks and dispose of personal belongings.',
        simplified: {
          plain: 'The landlord claims they can kick you out with an email within 2 days, change your locks, throw away your furniture, and you have agreed not to go to court.',
          casual: 'Illegal self-help eviction clause. The landlord attempts to bypass the judicial eviction system and lock you out in 48 hours.',
          professional: 'Blatantly illegal self-help eviction and waiver of procedural due process. Eviction requires statutory notice (e.g. 14-30 days), court summons, and sheriff execution; private lockouts are a criminal or tortious offense in most jurisdictions.',
        },
        riskLevel: 'CRITICAL',
        category: 'TERMINATION',
        explanation: 'Self-help evictions (changing locks, shutting off utilities, removing belongings) are strictly illegal. A tenant cannot legally waive statutory eviction proceedings.',
        whyItMatters: 'Leaves you vulnerable to sudden homelessness and unlawful seizure of your possessions without due process.',
        negotiationTips: [
          'This clause must be struck in its entirety. Note to landlord that statutory eviction procedures cannot be contracted away.',
        ],
        unfairnessFlag: 'Illegal self-help eviction clause',
      },
      {
        id: 'lease-c6',
        clauseNumber: '6',
        title: 'Maintenance & Repair Cost Shift',
        originalText: 'Tenant assumes sole responsibility for all structural, plumbing, electrical, and appliance repairs exceeding $50.00, regardless of whether such repairs are necessitated by normal wear and tear, age of equipment, or pre-existing building conditions.',
        simplified: {
          plain: 'If the heater breaks, roof leaks, or old pipes burst, you have to pay for the whole repair if it costs more than $50.',
          casual: 'Shifts primary building maintenance and habitability repairs from the owner onto the renter.',
          professional: 'Violates the implied warranty of habitability. Landlords are legally mandated to maintain structural integrity, plumbing, and heating in habitable condition.',
        },
        riskLevel: 'HIGH',
        category: 'LIABILITY',
        explanation: 'The implied warranty of habitability cannot be waived. The landlord is responsible for maintaining major systems and structural repairs unless caused by tenant misuse.',
        whyItMatters: 'A broken HVAC compressor or boiler could cost you thousands of dollars despite being a building asset.',
        negotiationTips: [
          'Revise so tenant is only responsible for damage caused by tenant\'s own negligence or misuse, with landlord retaining full responsibility for structural, plumbing, and appliance maintenance.',
        ],
      },
    ],
  },
  obligations: [
    {
      id: 'ob-1',
      deadlineOrTrigger: '1st of every month (11:59 PM cutoff)',
      responsibleParty: 'USER',
      description: 'Pay monthly rent of $2,400.00 via approved portal',
      penaltyForBreach: '$150 late fee + $25/day compounding penalty starting on 2nd day',
      priority: 'CRITICAL',
      clauseReference: 'Section 1',
      category: 'PAYMENT',
    },
    {
      id: 'ob-2',
      deadlineOrTrigger: 'Upon lease signing / before move-in',
      responsibleParty: 'USER',
      description: 'Transfer $4,800.00 security deposit to Landlord',
      penaltyForBreach: 'Lease cancellation / denied possession',
      priority: 'IMPORTANT',
      clauseReference: 'Section 2',
      category: 'PAYMENT',
    },
    {
      id: 'ob-3',
      deadlineOrTrigger: 'Continuous throughout lease term',
      responsibleParty: 'USER',
      description: 'Limit any overnight guest to under 48 consecutive hours',
      penaltyForBreach: '$200.00/night unauthorized occupant fee',
      priority: 'ROUTINE',
      clauseReference: 'Section 7',
      category: 'COMPLIANCE',
    },
    {
      id: 'ob-4',
      deadlineOrTrigger: 'Immediate upon occurrence',
      responsibleParty: 'USER',
      description: 'Pay all repair bills exceeding $50 for plumbing, electrical, or structural items',
      penaltyForBreach: 'Default notice and threatened 48-hour eviction',
      priority: 'CRITICAL',
      clauseReference: 'Section 6',
      category: 'COMPLIANCE',
    },
    {
      id: 'ob-5',
      deadlineOrTrigger: '60 days prior to lease end (assumed statutory)',
      responsibleParty: 'BOTH',
      description: 'Provide written notice of intent to renew or vacate premises',
      penaltyForBreach: 'Automatic month-to-month conversion at heightened rate',
      priority: 'IMPORTANT',
      clauseReference: 'General Law',
      category: 'NOTICE',
    },
  ],
  dossier: {
    documentTitle: 'Apex Property Holdings Lease Agreement',
    documentType: 'Residential Tenancy Contract',
    dateGenerated: '2024-10-01',
    clientRole: 'Prospective Tenant (Jane Doe)',
    counterpartyRole: 'Landlord (Apex Property Holdings LLC)',
    executiveBrief: 'Tenant is being asked to sign an unconscionable residential lease containing multiple clauses that appear facially void under state landlord-tenant jurisprudence, specifically attempting to waive statutory eviction notice, authorization of unannounced 24/7 entry, and shift of gross negligence liability.',
    primaryVulnerabilities: [
      {
        clauseTitle: 'Section 5: Accelerated Eviction',
        originalQuote: 'Tenant expressly waives all statutory rights to court-adjudicated eviction proceedings... and authorizes Landlord to immediately change door locks',
        identifiedRisk: 'Unlawful self-help eviction waiver; bypasses procedural due process',
        potentialExposure: 'Immediate lockout without court hearing or opportunity to cure.',
      },
      {
        clauseTitle: 'Section 4: Indemnification',
        originalQuote: 'Tenant agrees to indemnify... even if caused by the gross negligence... of Landlord',
        identifiedRisk: 'Exculpatory clause shielding landlord from tort liability and gross negligence',
        potentialExposure: 'Unlimited financial liability for building maintenance failures.',
      },
      {
        clauseTitle: 'Section 2: Security Deposit Forfeiture',
        originalQuote: 'right to retain the entire security deposit as liquidated damages... regardless of whether Landlord re-rents',
        identifiedRisk: 'Penal liquidated damages violating landlord\'s legal duty to mitigate damages',
        potentialExposure: 'Loss of $4,800.00 deposit without accounting.',
      },
    ],
    criticalDatesAndDeadlines: [
      'Rent due: 1st of month (harsh penalties on 2nd)',
      'Threatened cure window: 48 hours before purported lock change',
      'Maximum guest duration: 48 continuous hours',
    ],
    curatedConsultationQuestions: [
      {
        question: 'Are clauses 3, 4, and 5 severable, or does their presence render the lease voidable in our jurisdiction?',
        context: 'State statutes generally declare waivers of eviction procedures and habitability void as contrary to public policy.',
        suggestedGoal: 'Determine if landlord can be compelled to provide standard tenancy terms.',
      },
      {
        question: 'What is the statutory limit on late fees and mandated grace periods in our municipality?',
        context: 'The lease charges $150 + $25/day on day 2.',
        suggestedGoal: 'Establish statutory ceiling to replace Section 1.',
      },
      {
        question: 'If I have already signed or paid a deposit under these terms, what immediate notice must I serve to preserve rights?',
        context: 'Tenant may have already wired holding funds.',
        suggestedGoal: 'Prevent forfeiture of $4,800 security deposit.',
      },
    ],
    recommendedIntakeEvidence: [
      'Copy of signed lease agreement or draft document',
      'Proof of deposit payment and bank receipts',
      'Written email/SMS correspondence with landlord or leasing broker',
      'Local tenant rights municipal code reference sheet',
    ],
  },
};

export const SAMPLE_FREELANCE_MSA: {
  id: string;
  title: string;
  category: 'Independent Contractor Agreement';
  rawText: string;
  precomputedReport: ContractHealthReport;
  obligations: ObligationItem[];
  dossier: AttorneyDossier;
} = {
  id: 'contractor-msa-sample',
  title: 'Master Services Agreement — Contractor (High IP & Indemnity Risk)',
  category: 'Independent Contractor Agreement',
  rawText: `INDEPENDENT CONTRACTOR MASTER SERVICES AGREEMENT
BETWEEN: Nexus Global Enterprises Inc. ("Client") and Alex Morgan ("Contractor").

SECTION 1: SERVICES AND DELIVERABLES
Contractor agrees to perform software development and consulting services as described in Statements of Work executed under this Agreement.

SECTION 2: COMPENSATION AND PAYMENT TERMS
Client shall pay Contractor the rates specified in each SOW. Invoices shall be submitted monthly. Client shall remit payment within ninety (90) days of receipt and formal written approval of invoice ("Net 90"). Client reserves the unilateral right to withhold up to 30% of any invoice if Client subjectively determines deliverables require revision.

SECTION 3: INTELLECTUAL PROPERTY ASSIGNMENT (WORK FOR HIRE & PRE-EXISTING IP)
Contractor hereby irrevocably assigns and transfers to Client all right, title, and interest in and to all Work Product, code, inventions, and concepts created during the term. Furthermore, Contractor grants Client exclusive, perpetual, worldwide, royalty-free ownership of any and all prior background code, libraries, frameworks, or tools utilized or incorporated into deliverables, transferring full copyright of Contractor's pre-existing software assets to Client.

SECTION 4: UNLIMITED INDEMNIFICATION
Contractor shall defend, indemnify, and hold harmless Client, its officers, directors, clients, and affiliates from and against any and all claims, liabilities, losses, damages, settlements, costs, and attorneys' fees arising out of or related to Contractor's performance, alleged breach of warranty, or any third-party claim alleging intellectual property infringement, without any monetary cap or liability limitation.

SECTION 5: LIMITATION OF CLIENT LIABILITY
In no event shall Client's aggregate liability under this Agreement exceed the sum of $500.00, regardless of the theory of liability or whether Contractor has performed tens of thousands of dollars in unpaid work.

SECTION 6: NON-COMPETITION AND NON-SOLICITATION
During the term of this Agreement and for a period of two (2) years following termination, Contractor shall not directly or indirectly provide any software engineering or consulting services to any business operating in any field remotely related to Client's current or prospective products, globally.`,
  precomputedReport: {
    documentId: 'contractor-msa-sample',
    title: 'Master Services Agreement — Contractor (High IP & Indemnity Risk)',
    documentType: 'Independent Contractor Agreement',
    healthScore: 41,
    scoreGrade: 'F',
    scoreBreakdown: {
      clarityScore: 74,
      fairnessBalanceScore: 22,
      riskExposureScore: 18,
    },
    executiveSummary: 'HIGH SEVERITY ALERT: This contractor agreement contains severe asymmetric traps. It strips the contractor of their own pre-existing software tools and background IP, imposes 90-day delayed payment terms with arbitrary withholding, forces uncapped indemnity on the contractor while capping client liability at a trivial $500, and includes an overbroad global 2-year non-compete.',
    keyStrengths: [
      'Clear scope of work reference structure',
      'Well-defined invoice submission process',
    ],
    criticalGotchas: [
      'Pre-existing IP transfer: You lose exclusive ownership of your own previous tools and libraries',
      'Net-90 payment terms with unilateral 30% subjective fee withholding',
      'One-sided liability: Contractor faces uncapped liability while Client is capped at $500',
      'Uncapped third-party patent/copyright indemnification without defense control',
      'Worldwide 2-year non-compete restricting contractor from working in software fields',
    ],
    analyzedAt: '2024-10-01',
    clauses: [
      {
        id: 'msa-c1',
        clauseNumber: '2',
        title: 'Payment Terms & Withholding',
        originalText: 'Client shall remit payment within ninety (90) days of receipt and formal written approval of invoice ("Net 90"). Client reserves the unilateral right to withhold up to 30% of any invoice if Client subjectively determines deliverables require revision.',
        simplified: {
          plain: 'You have to wait 3 months after they approve your bill to get paid, and they can hold back 30% of your earnings anytime they feel like it.',
          casual: 'Net 90 terms mean you are financing their cash flow for a quarter of a year, plus they can withhold almost a third of your paycheck based on pure subjective whims.',
          professional: 'Highly onerous deferred payment schedule combined with a subjective, standardless retainage provision that impairs contractor cash flow and remedies for non-payment.',
        },
        riskLevel: 'HIGH',
        category: 'PAYMENT',
        explanation: 'Standard contractor payment terms are Net 15 or Net 30. Net 90 combined with subjective withholding creates massive financial vulnerability.',
        whyItMatters: 'You could work for months without receiving payment, unable to pay your own bills while the client holds your cash.',
        negotiationTips: [
          'Change payment terms to Net 15 or Net 30.',
          'Eliminate subjective withholding; replace with objective acceptance criteria and a mandatory 7-day review window.',
        ],
        benchmarkStandard: 'Market standard is Net 15 to Net 30 with 1.5% interest on late invoices.',
      },
      {
        id: 'msa-c2',
        clauseNumber: '3',
        title: 'IP Trap — Pre-Existing IP Assignment',
        originalText: 'Furthermore, Contractor grants Client exclusive, perpetual, worldwide, royalty-free ownership of any and all prior background code, libraries, frameworks, or tools utilized or incorporated into deliverables, transferring full copyright of Contractor\'s pre-existing software assets to Client.',
        simplified: {
          plain: 'If you use any code, templates, or tools you created before this job, the client now completely owns them and you can never use your own tools again for anyone else.',
          casual: 'Hidden asset seizure: The agreement transfers complete ownership of your pre-existing code and toolkits to the client forever.',
          professional: 'Inappropriate assignment of background technology. Market standard dictates that pre-existing materials remain contractor property, granting client only a non-exclusive license for project utilization.',
        },
        riskLevel: 'CRITICAL',
        category: 'IP_RIGHTS',
        explanation: 'Contractors should never assign background IP. A client should receive ownership of custom project deliverables, but only a non-exclusive license to use background code.',
        whyItMatters: 'Signing this could destroy your career tools and subject you to copyright infringement claims if you use your favorite templates in future jobs.',
        negotiationTips: [
          'Replace with: "Contractor retains full ownership of Pre-Existing IP and Background Technology, granting Client a non-exclusive, perpetual license solely to utilize the Deliverable as intended."',
        ],
        unfairnessFlag: 'Expropriation of independent contractor pre-existing intellectual property',
      },
      {
        id: 'msa-c3',
        clauseNumber: '4',
        title: 'Uncapped Indemnification',
        originalText: 'Contractor shall defend, indemnify, and hold harmless Client... without any monetary cap or liability limitation.',
        simplified: {
          plain: 'If anyone sues the client over the software, you have to pay all their million-dollar court bills and damages out of your personal pocket with no limit.',
          casual: 'Unlimited financial liability for third-party lawsuits, exposing your personal savings and assets.',
          professional: 'Uncapped, one-sided indemnity without mutual standard of gross negligence or carveout for client-directed specifications.',
        },
        riskLevel: 'CRITICAL',
        category: 'INDEMNITY',
        explanation: 'Indemnity should always be capped (typically at total fees paid under the contract) and limited to direct intentional breach or willful infringement.',
        whyItMatters: 'A patent troll lawsuit against the client could bankrupt an individual freelancer under this clause.',
        negotiationTips: [
          'Cap indemnity at 100% of fees received under the relevant SOW.',
          'Require client to provide immediate notice and control of defense.',
        ],
        unfairnessFlag: 'Uncapped liability on solo individual vs corporate entity',
      },
      {
        id: 'msa-c4',
        clauseNumber: '5',
        title: 'Asymmetric Client Liability Cap ($500)',
        originalText: 'In no event shall Client\'s aggregate liability under this Agreement exceed the sum of $500.00, regardless of the theory of liability or whether Contractor has performed tens of thousands of dollars in unpaid work.',
        simplified: {
          plain: 'Even if they owe you $50,000 for finished work, the most you can ever sue them for is $500.',
          casual: 'Gross asymmetry: You have unlimited liability, but the client caps their responsibility to you at $500.',
          professional: 'Glaringly unconscionable liability limitation effectively gutting contractor remedies for breach of contract or unpaid invoices.',
        },
        riskLevel: 'CRITICAL',
        category: 'LIABILITY',
        explanation: 'Liability caps should be reciprocal and must specifically exclude unpaid contract fees from the cap.',
        whyItMatters: 'The client can breach with impunity, knowing their worst-case legal exposure is $500.',
        negotiationTips: [
          'Make liability reciprocal, and carve out fees owed: "Neither party\'s liability shall exceed total fees paid or payable, except for breach of confidentiality and Client\'s obligation to pay undisputed invoices."',
        ],
      },
      {
        id: 'msa-c5',
        clauseNumber: '6',
        title: 'Global 2-Year Non-Compete',
        originalText: 'During the term... and for a period of two (2) years... Contractor shall not directly or indirectly provide any software engineering or consulting services to any business operating in any field remotely related to Client\'s current or prospective products, globally.',
        simplified: {
          plain: 'You cannot work as a software engineer for any competitor anywhere in the world for 2 whole years after this gig ends.',
          casual: 'Unenforceable and oppressive restraint of trade that attempts to block your ability to make a living.',
          professional: 'Overbroad non-competition covenant lacking geographical or scope reasonableness, running afoul of FTC guidelines and statutory prohibitions (e.g., Cal. Bus. & Prof. Code § 16600).',
        },
        riskLevel: 'CRITICAL',
        category: 'RESTRICTIVE_COVENANTS',
        explanation: 'Non-competes imposed on independent contractors are increasingly void under modern regulatory scrutiny and antitrust enforcement.',
        whyItMatters: 'Threatens your livelihood and right to take on clients in your domain of expertise.',
        negotiationTips: [
          'Delete the non-compete entirely. Offer reasonable non-solicitation of direct clients instead.',
        ],
        unfairnessFlag: 'Illegal restraint of trade under modern contractor standards',
      },
    ],
  },
  obligations: [
    {
      id: 'msa-ob-1',
      deadlineOrTrigger: 'Monthly on 1st',
      responsibleParty: 'USER',
      description: 'Submit itemized invoices for services rendered',
      penaltyForBreach: 'Delayed review cycles',
      priority: 'IMPORTANT',
      clauseReference: 'Section 2',
      category: 'PAYMENT',
    },
    {
      id: 'msa-ob-2',
      deadlineOrTrigger: 'Within 90 days of invoice approval',
      responsibleParty: 'COUNTERPARTY',
      description: 'Client pays contractor fees minus any retained percentage',
      penaltyForBreach: 'Contractor breach rights limited by $500 liability cap',
      priority: 'CRITICAL',
      clauseReference: 'Section 2',
      category: 'PAYMENT',
    },
    {
      id: 'msa-ob-3',
      deadlineOrTrigger: 'Throughout engagement & 2 years post-term',
      responsibleParty: 'USER',
      description: 'Refrain from working for any competing software enterprise worldwide',
      penaltyForBreach: 'Threatened injunction and uncapped damages claim',
      priority: 'CRITICAL',
      clauseReference: 'Section 6',
      category: 'COMPLIANCE',
    },
  ],
  dossier: {
    documentTitle: 'Nexus Global Contractor Agreement',
    documentType: 'Independent Contractor Services Contract',
    dateGenerated: '2024-10-01',
    clientRole: 'Software Consultant / Contractor (Alex Morgan)',
    counterpartyRole: 'Hiring Company (Nexus Global Enterprises Inc.)',
    executiveBrief: 'Contractor is facing a heavily one-sided consulting agreement that attempts to commandeer pre-existing background code, subjects invoices to 90-day delayed payment with unilateral deductions, binds the contractor to unlimited indemnification, and restricts employment opportunities for 2 years globally.',
    primaryVulnerabilities: [
      {
        clauseTitle: 'Section 3: Background IP Assignment',
        originalQuote: 'Contractor grants Client exclusive, perpetual, worldwide, royalty-free ownership of any and all prior background code',
        identifiedRisk: 'Inadvertent permanent surrender of personal intellectual property and software assets',
        potentialExposure: 'Loss of ability to reuse code templates, vulnerability to copyright infringement.',
      },
      {
        clauseTitle: 'Section 5: Asymmetric Liability Cap',
        originalQuote: 'Client\'s aggregate liability under this Agreement exceed the sum of $500.00',
        identifiedRisk: 'Client cannot be held financially accountable for non-payment or breach',
        potentialExposure: 'Uncollectable consulting fees exceeding $500.',
      },
      {
        clauseTitle: 'Section 6: Worldwide Non-Compete',
        originalQuote: 'not directly or indirectly provide any software engineering... for a period of two (2) years... globally',
        identifiedRisk: 'Restraint of trade restricting future work opportunities',
        potentialExposure: 'Threat of injunction and litigation from future clients.',
      },
    ],
    criticalDatesAndDeadlines: [
      'Invoicing: Monthly submissions',
      'Payment turnaround: Net 90 days',
      'Non-compete duration: 24 months after contract end',
    ],
    curatedConsultationQuestions: [
      {
        question: 'Is the non-compete enforceable against an independent contractor in my state?',
        context: 'Recent FTC regulations and state laws in California, Minnesota, and others ban contractor non-competes.',
        suggestedGoal: 'Strike Section 6 with statutory backing.',
      },
      {
        question: 'What is the precise legal phrasing needed to carve out Background Technology and Tools from Work Product assignment?',
        context: 'Need language to protect pre-existing libraries while granting client a perpetual license.',
        suggestedGoal: 'Insert standard Pre-Existing IP reservation of rights.',
      },
      {
        question: 'How should the liability cap be restructured to be mutual while excluding payment defaults?',
        context: 'Current cap is $500 for client and unlimited for contractor.',
        suggestedGoal: 'Establish mutual 1x contract fees cap with unpaid fees carved out.',
      },
    ],
    recommendedIntakeEvidence: [
      'Draft Master Services Agreement and Statement of Work (SOW)',
      'Inventory of pre-existing code libraries and tools to be preserved',
      'Original email thread discussing hourly/project rates and payment expectations',
    ],
  },
};

export const SAMPLE_COMPARISON_DATA: ComparisonResult = {
  docATitle: 'CloudSync Terms of Service (Version 2023 - Previous)',
  docBTitle: 'CloudSync Terms of Service (Version 2024 - Updated)',
  overallSummary: 'The 2024 Terms of Service update introduces significant shifts that negatively impact user privacy, legal recourse, and operational costs. Most critically, it introduces mandatory binding arbitration with a class-action waiver, grants CloudSync an expansive license to train artificial intelligence models on all uploaded user documents, and reduces price increase notice from 30 days to 72 hours.',
  netAdvantageShift: 'USER_LOST_RIGHTS',
  majorTakeaways: [
    'Forced surrender of right to jury trial and class action via binding individual arbitration',
    'Broad AI training clause permitting ingestion of confidential user files into commercial models',
    '30-day price increase notice slashed to 3 days, with continued use deemed acceptance',
    'Removal of provider obligation to notify users of third-party government subpoena requests',
  ],
  clauses: [
    {
      clauseName: 'Section 4: Dispute Resolution & Class Action Waiver',
      docAText: 'Disputes arising under this Agreement shall be resolved in state or federal courts located in Dover, Delaware. Both parties retain all rights to pursue claims in court or participate in class litigation.',
      docBText: 'All disputes must be resolved through mandatory, confidential, binding individual arbitration administered by JAMS. User expressly WAIVES ANY RIGHT TO PARTICIPATE IN A CLASS ACTION, collective action, or private attorney general proceeding.',
      changeType: 'MODIFIED',
      riskImpact: 'HIGH_RISK',
      summaryOfChange: 'Swapped open court litigation for mandatory confidential binding arbitration with complete class action waiver.',
      whoBenefits: 'COUNTERPARTY',
    },
    {
      clauseName: 'Section 7: License to User Content & AI Training',
      docAText: 'You retain all ownership of your files. CloudSync is granted only a limited license to host and store your data solely for the purpose of operating the storage service.',
      docBText: 'You grant CloudSync a perpetual, worldwide license to host, parse, analyze, and use all uploaded content to train, tune, develop, and commercialize machine learning and generative artificial intelligence models.',
      changeType: 'MODIFIED',
      riskImpact: 'HIGH_RISK',
      summaryOfChange: 'Added broad commercial AI training license covering all user uploaded files and confidential materials.',
      whoBenefits: 'COUNTERPARTY',
    },
    {
      clauseName: 'Section 11: Pricing Changes & Notice Period',
      docAText: 'CloudSync may modify subscription fees upon providing at least thirty (30) days advance written email notice to User before renewal.',
      docBText: 'CloudSync may update fees at any time by posting notice on the website seventy-two (72) hours in advance. Continued usage constitutes binding acceptance of modified rates.',
      changeType: 'MODIFIED',
      riskImpact: 'UNFAVORABLE',
      summaryOfChange: 'Notice window reduced from 30 days via direct email to 72 hours via website posting.',
      whoBenefits: 'COUNTERPARTY',
    },
    {
      clauseName: 'Section 14: Government Subpoena Notification',
      docAText: 'CloudSync shall promptly notify User in writing upon receipt of any civil subpoena or governmental inquiry seeking disclosure of User data, allowing User to seek protective orders.',
      docBText: 'CloudSync may disclose User data in compliance with governmental or judicial requests without notice to User, unless explicitly mandated by court order.',
      changeType: 'REMOVED',
      riskImpact: 'UNFAVORABLE',
      summaryOfChange: 'Removed protective user notification for third-party and government subpoenas.',
      whoBenefits: 'COUNTERPARTY',
    },
    {
      clauseName: 'Section 16: Security Encryption Standard',
      docAText: 'User data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards.',
      docBText: 'User data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards with audited SOC-2 Type II compliance.',
      changeType: 'MODIFIED',
      riskImpact: 'FAVORABLE',
      summaryOfChange: 'Added explicit SOC-2 Type II third-party compliance verification.',
      whoBenefits: 'MUTUAL',
    },
  ],
};

export const DISPUTE_SCENARIOS: DisputeScenario[] = [
  {
    id: 'scenario-security-deposit',
    category: 'TENANT',
    title: 'Landlord Refusing to Return Security Deposit',
    subtitle: 'Moved out weeks ago and the landlord is making unlawful deductions or ghosting you.',
    commonOccurrence: 'Landlord keeps the entire $2,000+ deposit citing "cleaning fees" or "repairs" without providing an itemized invoice within the statutory timeframe (typically 14-30 days).',
    yourRightsOverview: [
      'Landlords must return deposits within statutory timeframes (e.g. 14 days in NY, 21 days in CA, 30 days in TX).',
      'Normal wear and tear (e.g., minor scuffs, sun-faded paint, carpet wear from walking) cannot be legally deducted.',
      'Landlords must provide signed itemized receipts for any deduction exceeding nominal amounts.',
      'Failure to provide timely itemization often forfeits the landlord\'s right to any deductions and may trigger 2x or 3x statutory bad-faith damages.',
    ],
    actionPlanSteps: [
      {
        stepNumber: 1,
        title: 'Document Everything with Time-Stamped Media',
        description: 'Collect your move-out photos/videos, initial walk-through checklist, and key return receipts.',
        doThis: 'Compare move-in photos to move-out photos to prove normal wear and tear.',
        avoidThis: 'Don\'t rely on verbal agreements or unrecorded phone conversations.',
      },
      {
        stepNumber: 2,
        title: 'Check the Statutory Deadline for Your State',
        description: 'Identify the exact calendar day your landlord\'s time window expired.',
        doThis: 'Calculate days starting the day after keys were returned and forwarding address provided.',
        avoidThis: 'Don\'t delay sending your formal written demand letter.',
      },
      {
        stepNumber: 3,
        title: 'Send a Formal Certified Demand Letter',
        description: 'Send a formal demand letter via Certified Mail (Return Receipt Requested) and email.',
        doThis: 'Cite your state\'s specific security deposit statute and demand full return within 10 days.',
        avoidThis: 'Don\'t threaten harassment or emotional retaliation in the letter.',
      },
      {
        stepNumber: 4,
        title: 'File in Small Claims Court if Unresolved',
        description: 'Small claims court requires no attorney and fees are typically $30-$75.',
        doThis: 'Ask for the full deposit plus statutory bad-faith penalties (up to 2x or 3x in many states).',
        avoidThis: 'Don\'t hire a high-rate hourly attorney for small claims where costs exceed recovery.',
      },
    ],
    demandLetterSnippet: `[Date]
To: [Landlord Name / Property Management]
Address: [Landlord Address]

Re: FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT
Premises: [Rental Address, Unit #]
Move-out Date: [Date Keys Surrendered]
Deposit Amount Paid: $[Amount]

Dear [Landlord Name],

I vacated the above-referenced premises on [Date] and surrendered possession along with my forwarding address. Pursuant to [Insert State Statute, e.g., California Civil Code § 1950.5 / New York General Obligations Law § 7-108], you were required to return my security deposit along with an itemized statement of any deductions within [14/21/30] days.

As of today, [Number of Days] days have elapsed, and I have neither received my full deposit nor an itemized accounting with receipts. Under state law, failure to provide timely accounting constitutes a waiver of your right to withhold any portion of the deposit and subjects you to statutory bad-faith damages of up to [2x/3x] the deposit amount.

Please remit the full amount of $[Amount] to my forwarding address below within ten (10) business days of receipt of this notice. If payment is not received by [Deadline Date], I will immediately initiate proceedings in Small Claims Court for the deposit amount plus maximum statutory damages and filing fees.

Forwarding Address:
[Your Name]
[Your Address]
[Your Email & Phone]`,
    whenToEscalateToLawyer: [
      'If the deposit amount exceeds the small claims limit (usually $5,000 to $12,500 depending on state)',
      'If the landlord files a retaliatory counterclaim alleging extensive structural damages',
      'If you signed a commercial lease rather than a residential lease',
    ],
  },
  {
    id: 'scenario-freelance-unpaid-invoice',
    category: 'FREELANCER',
    title: 'Client Refusing to Pay Invoice / Ghosting',
    subtitle: 'Deliverables submitted, client approved or deployed the work, but payment is 45+ days overdue.',
    commonOccurrence: 'Client ignores follow-up emails, claims budgetary freeze, or manufactures last-minute complaints after receiving the final project assets.',
    yourRightsOverview: [
      'A completed deliverable with documented receipt creates an enforceable contract for payment.',
      'Copyright ownership does not fully transfer until agreed compensation is remitted (unless contract explicitly stated otherwise).',
      'Prompt Payment Acts and Freelance Isn\'t Free laws (e.g. in NY, CA, IL) mandate double damages and attorney fee recovery for non-payment.',
    ],
    actionPlanSteps: [
      {
        stepNumber: 1,
        title: 'Audit Agreement & Delivery Trail',
        description: 'Collate signed proposal/contract, email approvals, time logs, and delivered file receipts.',
        doThis: 'Ensure you have written evidence that client accepted or utilized the deliverable.',
        avoidThis: 'Don\'t delete access to backups or alter original timestamps.',
      },
      {
        stepNumber: 2,
        title: 'Issue Final Notice Before Action with Late Fee Assessment',
        description: 'Send a firm, polite, executive-level final demand setting a strict 7-day cure deadline.',
        doThis: 'Indicate that copyright usage permissions will be revoked if unpaid.',
        avoidThis: 'Don\'t vent frustration on social media before formal legal demand.',
      },
      {
        stepNumber: 3,
        title: 'Send DMCA / IP Infringement Warning if Live',
        description: 'If the client deployed your code or designs without paying, they may be infringing copyright.',
        doThis: 'Inform them that unpaid commercial use constitutes copyright infringement.',
        avoidThis: 'Don\'t hack or secretly sabotage deployed systems (illegal access).',
      },
      {
        stepNumber: 4,
        title: 'Small Claims Court or Department of Labor Filing',
        description: 'Freelance protection statutes allow filing complaints with state labor departments or small claims.',
        doThis: 'Request the invoice amount, statutory interest, and filing fees.',
        avoidThis: 'Don\'t accept a 50% discount without a guaranteed immediate wire.',
      },
    ],
    demandLetterSnippet: `[Date]
VIA EMAIL & REGISTERED MAIL
To: [Client Representative / Accounts Payable]
Company: [Client Company Name]

Re: FINAL NOTICE OF PAST-DUE INVOICE #[Invoice Number]
Project: [Project Name / Description]
Original Due Date: [Due Date]
Outstanding Balance: $[Amount]

Dear [Client Name],

This is formal notice that Invoice #[Number], dated [Date] for the sum of $[Amount], is now [Number] days past due. The contracted services were completed, delivered, and acknowledged on [Date].

Under the terms of our agreement and applicable commercial law, title and license to utilize the deliverables is contingent upon receipt of full payment. Continued commercial deployment or reproduction of these materials without satisfaction of this invoice constitutes unauthorized utilization.

Please remit payment of $[Amount] via [Bank Details / Payment Link] within five (5) business days (by [Deadline Date]). 

Failure to settle this balance will leave me no option but to commence immediate legal collection proceedings in [Court Name / Small Claims], where I will seek the principal amount, accrued statutory interest, late charges, and legal costs as provided by law.

Sincerely,
[Your Name / Business Name]
[Contact Information]`,
    whenToEscalateToLawyer: [
      'If the unpaid balance exceeds $10,000',
      'If the client is threatening a countersuit for alleged lost revenue or breach of contract',
      'If third parties or venture-backed entities are acquiring the client company',
    ],
  },
  {
    id: 'scenario-employee-non-compete',
    category: 'EMPLOYEE',
    title: 'Employer Threatening Non-Compete After Leaving',
    subtitle: 'You received an offer from another company, and your former employer threatens legal action.',
    commonOccurrence: 'Employer claims a standard boilerplate non-compete prevents you from working in the same industry, trying to intimidate you or your new employer.',
    yourRightsOverview: [
      'Non-competes are completely void and illegal for most workers in California, North Dakota, Oklahoma, and Minnesota.',
      'The Federal Trade Commission (FTC) and NLRB have found sweeping non-competes to be unfair methods of competition.',
      'Agreements lacking geographic limits or exceeding reasonable duration (e.g. >1 year) are routinely invalidated.',
      'Employers cannot prevent you from using general skills and industry knowledge gained throughout your career.',
    ],
    actionPlanSteps: [
      {
        stepNumber: 1,
        title: 'Locate Your Exact Signed Agreement',
        description: 'Read the exact language of the covenant, choice of law provision, and severability clause.',
        doThis: 'Check what state law governs the agreement (where you live vs where company is incorporated).',
        avoidThis: 'Don\'t assume the agreement is valid just because it sounds intimidating.',
      },
      {
        stepNumber: 2,
        title: 'Separate Trade Secrets from General Skills',
        description: 'Clearly demarcate company confidential materials from your personal professional knowledge.',
        doThis: 'Ensure you returned all company laptops, flash drives, and documents prior to exit.',
        avoidThis: 'NEVER email company client lists or source code to your personal Gmail.',
      },
      {
        stepNumber: 3,
        title: 'Consult with Employment Counsel on Safe Harbor Strategy',
        description: 'An employment attorney can write a "safe harbor" letter clarifying your non-infringing new role.',
        doThis: 'Provide your attorney with the exact job description of your new position.',
        avoidThis: 'Don\'t conceal the existence of the non-compete from your new employer if asked.',
      },
    ],
    demandLetterSnippet: `[Attorney Safe Harbor Response Template]
To: [Former Employer Legal Counsel]
Re: Alex Morgan / Notice of Transition & Restrictive Covenants

Dear Counsel,

We represent [Employee Name] regarding your recent correspondence concerning the restrictive covenants in the [Year] Employment Agreement.

Please be advised that [Employee Name] has complied with all post-employment obligations. All company property and proprietary information were returned on [Exit Date]. [Employee Name] has taken great care to ensure no trade secrets or proprietary algorithms of [Former Employer] are utilized in their upcoming role at [New Company].

The broad non-competition restriction cited in your letter is unenforceable under [Governing State Law, e.g. Cal. Bus. & Prof. Code § 16600], which strictly prohibits restraints on lawful employment. [Employee Name]'s new role focuses on [General Domain] and involves neither misappropriation of proprietary assets nor unlawful solicitation.

We trust this resolves the matter. Please direct all future correspondence to this office.

Sincerely,
[Counsel Name]`,
    whenToEscalateToLawyer: [
      'Immediately if the former employer sends a "Cease and Desist" directly to your new employer',
      'If your agreement involves equity clawbacks or significant severance pay',
      'If you held an executive role or possessed access to patented source code',
    ],
  },
];
