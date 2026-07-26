export type MetricChangeDirection = 'up' | 'down' | 'neutral';
export type ActionSeverity = 'critical' | 'high' | 'medium' | 'normal';
export type PartnerSlaStatus = 'performing' | 'monitor' | 'action_required' | 'suspended';
export type ServiceStatus = 'operational' | 'degraded' | 'delayed' | 'outage' | 'not_configured';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SuperAdminKpiMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  change?: number;
  changeDirection?: MetricChangeDirection;
  comparisonLabel?: string;
  status?: 'normal' | 'warning' | 'critical';
  category: 'candidates' | 'applications' | 'recruitment' | 'finance';
  tooltip: string;
  lastUpdatedAt: string;
}

export interface ActionCentreItem {
  id: string;
  title: string;
  category: 'Partners' | 'Employers' | 'Applications' | 'Finance' | 'Compliance' | 'Security';
  count: number;
  severity: ActionSeverity;
  oldestPendingAt: string;
  responsibleTeam: string;
  queueRoute: string;
}

export interface ConversionFunnelStage {
  id: string;
  stageName: string;
  totalCount: number;
  conversionRate: number; // percentage
  dropOffRate: number; // percentage
  periodComparison: string;
}

export interface RecruitmentPipelineStage {
  id: string;
  stageName: string;
  count: number;
  averageTimeInStage: string;
  delayedCount: number;
}

export interface CandidateMarketRecord {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  registrations: number;
  applications: number;
  qualificationRate: number;
  placementRate: number;
  periodChange: number;
}

export interface PartnerPerformanceRecord {
  id: string;
  agencyName: string;
  country: string;
  activeLeads: number;
  acceptedLeads: number;
  employerSubmissions: number;
  interviewsCount: number;
  offersCount: number;
  placementsCount: number;
  averageResponseTimeHours: number;
  slaStatus: PartnerSlaStatus;
  riskStatus: 'healthy' | 'at_risk' | 'flagged';
}

export interface EmployerActivityRecord {
  id: string;
  companyName: string;
  industry: string;
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Ras Al Khaimah' | 'Fujairah' | 'Umm Al Quwain';
  activeVacancies: number;
  candidateSubmissions: number;
  pendingDecisions: number;
  averageResponseTimeDays: number;
  verificationStatus: 'verified' | 'pending_verification' | 'action_needed';
}

export interface FinancialSummary {
  gbpCollected: number;
  formattedGbpCollected: string;
  aedCollected: number;
  formattedAedCollected: string;
  totalRefundsPendingCount: number;
  totalRefundsPendingAmountGbp: number;
  recentTransactions: Array<{
    id: string;
    reference: string;
    candidateName: string;
    amount: number;
    currency: 'GBP' | 'AED' | 'USD';
    formattedAmount: string;
    paymentProvider: 'Stripe' | 'Bank Transfer' | 'Postpay';
    status: 'completed' | 'processing' | 'failed' | 'refunded';
    timestamp: string;
  }>;
}

export interface PlatformHealthService {
  id: string;
  name: string;
  category: 'Core' | 'Database' | 'Storage' | 'Payments' | 'Messaging' | 'Analytics';
  status: ServiceStatus;
  responseTimeMs?: number;
  uptimePercentage: number;
  lastCheckedAt: string;
}

export interface AuditLogEntry {
  id: string;
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  riskLevel: RiskLevel;
  timestamp: string;
}

export interface DashboardFilters {
  dateRange: '7d' | '30d' | '90d' | '12m' | 'ytd';
  country?: string;
  emirate?: string;
  partnerId?: string;
  employerId?: string;
  applicationStage?: string;
}
