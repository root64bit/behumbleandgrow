import { 
  SuperAdminKpiMetric, 
  ActionCentreItem, 
  ConversionFunnelStage, 
  RecruitmentPipelineStage,
  CandidateMarketRecord,
  PartnerPerformanceRecord,
  EmployerActivityRecord,
  FinancialSummary,
  PlatformHealthService,
  AuditLogEntry,
  DashboardFilters
} from '../types/superadmin';

export class SuperAdminService {
  
  static getKpiMetrics(filters?: DashboardFilters): SuperAdminKpiMetric[] {
    return [
      {
        id: 'kpi-1',
        label: 'Total Active Candidates',
        value: 12450,
        formattedValue: '12,450',
        change: 14.2,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'candidates',
        tooltip: 'Verified candidates registered on platform actively seeking opportunities.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-2',
        label: 'New Candidates (30d)',
        value: 1840,
        formattedValue: '1,840',
        change: 18.5,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'candidates',
        tooltip: 'Newly registered candidates who created an account this month.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-3',
        label: 'Active Applications',
        value: 3820,
        formattedValue: '3,820',
        change: 11.4,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'applications',
        tooltip: 'Applications actively progressing through review or employer submission.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-4',
        label: 'Qualified Applications',
        value: 2410,
        formattedValue: '2,410',
        change: 9.8,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'applications',
        tooltip: 'Applications that have passed document verification and eligibility check.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-5',
        label: 'Interviews Scheduled',
        value: 485,
        formattedValue: '485',
        change: 15.3,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'recruitment',
        tooltip: 'Employer and candidate video interviews scheduled across active jobs.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-6',
        label: 'Offers Accepted',
        value: 192,
        formattedValue: '192',
        change: 8.4,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'recruitment',
        tooltip: 'Conditional employer offers formally accepted by candidates.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-7',
        label: 'Active Placements',
        value: 154,
        formattedValue: '154',
        change: 12.1,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'recruitment',
        tooltip: 'Candidates with issued work-permits undergoing travel or onboarding.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-8',
        label: 'Application Fees Collected',
        value: 18450,
        formattedValue: '£18,450',
        change: 16.7,
        changeDirection: 'up',
        comparisonLabel: 'vs. previous 30 days',
        category: 'finance',
        tooltip: 'Total platform verification fees collected in GBP reporting currency.',
        lastUpdatedAt: 'Just now'
      }
    ];
  }

  static getActionCentreItems(): ActionCentreItem[] {
    return [
      {
        id: 'action-1',
        title: 'Recruitment Partners Awaiting Verification',
        category: 'Partners',
        count: 4,
        severity: 'high',
        oldestPendingAt: '2 days ago',
        responsibleTeam: 'Partner Ops',
        queueRoute: '/superadmin/organisations'
      },
      {
        id: 'action-2',
        title: 'Employers Awaiting Business License Review',
        category: 'Employers',
        count: 6,
        severity: 'high',
        oldestPendingAt: '1 day ago',
        responsibleTeam: 'Employer Ops',
        queueRoute: '/superadmin/organisations'
      },
      {
        id: 'action-3',
        title: 'Refund Requests Pending Senior Approval',
        category: 'Finance',
        count: 2,
        severity: 'critical',
        oldestPendingAt: '4 hours ago',
        responsibleTeam: 'Finance Team',
        queueRoute: '/superadmin/finance'
      },
      {
        id: 'action-4',
        title: 'Flagged Document Verification Reviews',
        category: 'Compliance',
        count: 9,
        severity: 'medium',
        oldestPendingAt: '3 days ago',
        responsibleTeam: 'Document Compliance',
        queueRoute: '/operations/candidates'
      },
      {
        id: 'action-5',
        title: 'Privileged Role Access Requests',
        category: 'Security',
        count: 3,
        severity: 'medium',
        oldestPendingAt: '5 hours ago',
        responsibleTeam: 'Security Admin',
        queueRoute: '/superadmin/users'
      }
    ];
  }

  static getConversionFunnel(): ConversionFunnelStage[] {
    return [
      { id: 'funnel-1', stageName: 'Homepage Visitors', totalCount: 45200, conversionRate: 100, dropOffRate: 0, periodComparison: '+12%' },
      { id: 'funnel-2', stageName: 'Eligibility Started', totalCount: 22800, conversionRate: 50.4, dropOffRate: 49.6, periodComparison: '+15%' },
      { id: 'funnel-3', stageName: 'Eligibility Completed', totalCount: 16400, conversionRate: 71.9, dropOffRate: 28.1, periodComparison: '+18%' },
      { id: 'funnel-4', stageName: 'Account Created', totalCount: 12450, conversionRate: 75.9, dropOffRate: 24.1, periodComparison: '+14%' },
      { id: 'funnel-5', stageName: 'Profile & CV Completed', totalCount: 8900, conversionRate: 71.4, dropOffRate: 28.6, periodComparison: '+10%' },
      { id: 'funnel-6', stageName: 'Application Submitted', totalCount: 3820, conversionRate: 42.9, dropOffRate: 57.1, periodComparison: '+11%' }
    ];
  }

  static getRecruitmentPipeline(): RecruitmentPipelineStage[] {
    return [
      { id: 'pipe-1', stageName: 'Applications Submitted', count: 3820, averageTimeInStage: '1.2 days', delayedCount: 12 },
      { id: 'pipe-2', stageName: 'Initial Screening', count: 2950, averageTimeInStage: '2.0 days', delayedCount: 8 },
      { id: 'pipe-3', stageName: 'Qualified & Verified', count: 2410, averageTimeInStage: '1.5 days', delayedCount: 5 },
      { id: 'pipe-4', stageName: 'Assigned to Partner', count: 1850, averageTimeInStage: '3.1 days', delayedCount: 14 },
      { id: 'pipe-5', stageName: 'Submitted to Employer', count: 1240, averageTimeInStage: '4.2 days', delayedCount: 18 },
      { id: 'pipe-6', stageName: 'Interviews Scheduled', count: 485, averageTimeInStage: '5.0 days', delayedCount: 6 },
      { id: 'pipe-7', stageName: 'Conditional Offer', count: 240, averageTimeInStage: '2.5 days', delayedCount: 4 },
      { id: 'pipe-8', stageName: 'Offer Accepted', count: 192, averageTimeInStage: '1.8 days', delayedCount: 2 },
      { id: 'pipe-9', stageName: 'Work Permit / Visa Processing', count: 168, averageTimeInStage: '14.0 days', delayedCount: 15 },
      { id: 'pipe-10', stageName: 'Placement Completed', count: 154, averageTimeInStage: 'Completed', delayedCount: 0 }
    ];
  }

  static getCandidateMarkets(): CandidateMarketRecord[] {
    return [
      { id: 'market-1', country: 'Kenya', countryCode: 'KE', flag: '🇰🇪', registrations: 4850, applications: 1520, qualificationRate: 78.4, placementRate: 14.2, periodChange: 16.5 },
      { id: 'market-2', country: 'Mozambique', countryCode: 'MZ', flag: '🇲🇿', registrations: 3210, applications: 980, qualificationRate: 74.2, placementRate: 12.8, periodChange: 14.1 },
      { id: 'market-3', country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦', registrations: 2450, applications: 740, qualificationRate: 82.1, placementRate: 16.4, periodChange: 11.8 },
      { id: 'market-4', country: 'India', countryCode: 'IN', flag: '🇮🇳', registrations: 1940, applications: 580, qualificationRate: 79.8, placementRate: 15.0, periodChange: 9.5 }
    ];
  }

  static getPartnerPerformance(): PartnerPerformanceRecord[] {
    return [
      {
        id: 'partner-1',
        agencyName: 'Nairobi Global Placement Agency',
        country: 'Kenya 🇰🇪',
        activeLeads: 145,
        acceptedLeads: 138,
        employerSubmissions: 112,
        interviewsCount: 48,
        offersCount: 24,
        placementsCount: 20,
        averageResponseTimeHours: 4.2,
        slaStatus: 'performing',
        riskStatus: 'healthy'
      },
      {
        id: 'partner-2',
        agencyName: 'Maputo Talent Solutions LLC',
        country: 'Mozambique 🇲🇿',
        activeLeads: 98,
        acceptedLeads: 90,
        employerSubmissions: 72,
        interviewsCount: 28,
        offersCount: 14,
        placementsCount: 12,
        averageResponseTimeHours: 6.8,
        slaStatus: 'performing',
        riskStatus: 'healthy'
      },
      {
        id: 'partner-3',
        agencyName: 'Cape International Recruiters',
        country: 'South Africa 🇿🇦',
        activeLeads: 84,
        acceptedLeads: 76,
        employerSubmissions: 64,
        interviewsCount: 32,
        offersCount: 18,
        placementsCount: 16,
        averageResponseTimeHours: 8.5,
        slaStatus: 'monitor',
        riskStatus: 'healthy'
      },
      {
        id: 'partner-4',
        agencyName: 'Apex Human Capital Services',
        country: 'India 🇮🇳',
        activeLeads: 62,
        acceptedLeads: 48,
        employerSubmissions: 35,
        interviewsCount: 16,
        offersCount: 8,
        placementsCount: 6,
        averageResponseTimeHours: 18.4,
        slaStatus: 'action_required',
        riskStatus: 'at_risk'
      }
    ];
  }

  static getEmployerActivity(): EmployerActivityRecord[] {
    return [
      {
        id: 'emp-1',
        companyName: 'Premier Hospitality Group',
        industry: 'Hospitality & Tourism',
        emirate: 'Dubai',
        activeVacancies: 12,
        candidateSubmissions: 84,
        pendingDecisions: 6,
        averageResponseTimeDays: 2.1,
        verificationStatus: 'verified'
      },
      {
        id: 'emp-2',
        companyName: 'Emirates Facilities & Engineering',
        industry: 'Construction & Trades',
        emirate: 'Abu Dhabi',
        activeVacancies: 8,
        candidateSubmissions: 56,
        pendingDecisions: 4,
        averageResponseTimeDays: 3.4,
        verificationStatus: 'verified'
      },
      {
        id: 'emp-3',
        companyName: 'Gulf Medical & Diagnostic Services',
        industry: 'Healthcare',
        emirate: 'Sharjah',
        activeVacancies: 5,
        candidateSubmissions: 32,
        pendingDecisions: 3,
        averageResponseTimeDays: 1.8,
        verificationStatus: 'verified'
      },
      {
        id: 'emp-4',
        companyName: 'Al Hamra Retail Outlets LLC',
        industry: 'Retail & Customer Service',
        emirate: 'Ras Al Khaimah',
        activeVacancies: 4,
        candidateSubmissions: 22,
        pendingDecisions: 5,
        averageResponseTimeDays: 5.2,
        verificationStatus: 'action_needed'
      }
    ];
  }

  static getFinancialSummary(): FinancialSummary {
    return {
      gbpCollected: 18450,
      formattedGbpCollected: '£18,450.00',
      aedCollected: 86400,
      formattedAedCollected: 'AED 86,400.00',
      totalRefundsPendingCount: 2,
      totalRefundsPendingAmountGbp: 180,
      recentTransactions: [
        {
          id: 'tx-1',
          reference: 'PAY-2026-8841',
          candidateName: 'Amina Mabote',
          amount: 90,
          currency: 'GBP',
          formattedAmount: '£90.00',
          paymentProvider: 'Stripe',
          status: 'completed',
          timestamp: '10 mins ago'
        },
        {
          id: 'tx-2',
          reference: 'PAY-2026-8840',
          candidateName: 'David K. Mensah',
          amount: 90,
          currency: 'GBP',
          formattedAmount: '£90.00',
          paymentProvider: 'Stripe',
          status: 'completed',
          timestamp: '25 mins ago'
        },
        {
          id: 'tx-3',
          reference: 'PAY-2026-8839',
          candidateName: 'Fatima B. Bello',
          amount: 420,
          currency: 'AED',
          formattedAmount: 'AED 420.00',
          paymentProvider: 'Postpay',
          status: 'completed',
          timestamp: '1 hour ago'
        },
        {
          id: 'tx-4',
          reference: 'PAY-2026-8838',
          candidateName: 'John O. Kamau',
          amount: 90,
          currency: 'GBP',
          formattedAmount: '£90.00',
          paymentProvider: 'Stripe',
          status: 'refunded',
          timestamp: '3 hours ago'
        }
      ]
    };
  }

  static getPlatformHealth(): PlatformHealthService[] {
    return [
      { id: 'srv-1', name: 'Web Portal Frontend', category: 'Core', status: 'operational', responseTimeMs: 45, uptimePercentage: 99.98, lastCheckedAt: 'Just now' },
      { id: 'srv-2', name: 'Authentication Engine', category: 'Core', status: 'operational', responseTimeMs: 62, uptimePercentage: 99.99, lastCheckedAt: 'Just now' },
      { id: 'srv-3', name: 'PostgreSQL Database', category: 'Database', status: 'operational', responseTimeMs: 18, uptimePercentage: 100.0, lastCheckedAt: 'Just now' },
      { id: 'srv-4', name: 'Candidate Document Storage', category: 'Storage', status: 'operational', responseTimeMs: 84, uptimePercentage: 99.95, lastCheckedAt: 'Just now' },
      { id: 'srv-5', name: 'Stripe Payment Gateway', category: 'Payments', status: 'operational', responseTimeMs: 120, uptimePercentage: 99.99, lastCheckedAt: 'Just now' },
      { id: 'srv-6', name: 'Email Delivery (SendGrid)', category: 'Messaging', status: 'operational', responseTimeMs: 140, uptimePercentage: 99.90, lastCheckedAt: 'Just now' },
      { id: 'srv-7', name: 'WhatsApp Business API', category: 'Messaging', status: 'degraded', responseTimeMs: 480, uptimePercentage: 98.40, lastCheckedAt: 'Just now' }
    ];
  }

  static getAuditLogs(): AuditLogEntry[] {
    return [
      { id: 'log-1', userEmail: 'superadmin@behumbleandgrow.com', userRole: 'Super Admin', action: 'Approved Recruitment Partner', resource: 'Nairobi Global Placement Agency', riskLevel: 'medium', timestamp: '15 mins ago' },
      { id: 'log-2', userEmail: 'finance.lead@behumbleandgrow.com', userRole: 'Senior Admin', action: 'Approved Candidate Fee Refund', resource: 'PAY-2026-8838 (£90.00)', riskLevel: 'high', timestamp: '1 hour ago' },
      { id: 'log-3', userEmail: 'ops.manager@behumbleandgrow.com', userRole: 'Operations Staff', action: 'Reassigned Candidate Queue', resource: 'Job #UAE-2026-904', riskLevel: 'low', timestamp: '2 hours ago' },
      { id: 'log-4', userEmail: 'superadmin@behumbleandgrow.com', userRole: 'Super Admin', action: 'Updated Eligibility Rules', resource: 'Mozambique Work Permit Criteria', riskLevel: 'critical', timestamp: '4 hours ago' }
    ];
  }

}
