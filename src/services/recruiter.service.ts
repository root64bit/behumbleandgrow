import { 
  PartnerOrganisationCard,
  PartnerKpiMetric, 
  PartnerActionItem, 
  PartnerLead,
  RecruiterWorkloadRecord,
  EmployerSubmissionRecord,
  UpcomingInterviewRecord,
  OfferProgressRecord,
  PlacementProgressRecord,
  PartnerPerformanceMetric,
  PartnerFilters
} from '../types/recruiter';

export class RecruiterService {
  
  static getOrganisationCard(): PartnerOrganisationCard {
    return {
      id: 'org-partner-1',
      agencyName: 'Nairobi Global Placement Agency',
      partnerReference: 'PARTNER-KE-2026-084',
      verificationStatus: 'approved',
      agreementStatus: 'Active (Expires Dec 2026)',
      activeRecruiters: 8,
      activeLeads: 145,
      leadCapacity: 200,
      slaStatus: 'performing',
      operationsContactName: 'Marcus Vance (Senior Ops Lead)',
      operationsContactEmail: 'marcus.vance@behumbleandgrow.com'
    };
  }

  static getKpiMetrics(filters?: PartnerFilters): PartnerKpiMetric[] {
    return [
      {
        id: 'kpi-1',
        label: 'New Assigned Leads',
        value: 18,
        formattedValue: '18',
        change: 22.4,
        comparisonLabel: 'vs. previous 30 days',
        destinationRoute: '/recruiter/leads?stage=new',
        tooltip: 'Qualified candidate leads recently assigned to your agency by operations.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-2',
        label: 'Leads Awaiting Acceptance',
        value: 12,
        formattedValue: '12',
        status: 'warning',
        comparisonLabel: 'Requires action today',
        destinationRoute: '/recruiter/leads?stage=awaiting_acceptance',
        tooltip: 'Assigned leads requiring acceptance or decline with reason.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-3',
        label: 'Active Candidate Leads',
        value: 145,
        formattedValue: '145',
        change: 14.2,
        comparisonLabel: 'vs. previous 30 days',
        destinationRoute: '/recruiter/leads',
        tooltip: 'Total active candidates currently being processed by your agency recruiters.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-4',
        label: 'Employer Submissions',
        value: 112,
        formattedValue: '112',
        change: 18.1,
        comparisonLabel: 'vs. previous 30 days',
        destinationRoute: '/recruiter/submissions',
        tooltip: 'Candidates formally submitted to UAE employers for review.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-5',
        label: 'Upcoming Interviews',
        value: 48,
        formattedValue: '48',
        change: 15.0,
        comparisonLabel: 'Scheduled this week',
        destinationRoute: '/recruiter/interviews',
        tooltip: 'Employer video interviews scheduled for your agency candidates.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-6',
        label: 'Offers in Progress',
        value: 24,
        formattedValue: '24',
        change: 8.5,
        comparisonLabel: 'Pending candidate response',
        destinationRoute: '/recruiter/offers',
        tooltip: 'Employer conditional offers issued to candidates.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-7',
        label: 'Active Placements',
        value: 20,
        formattedValue: '20',
        change: 12.0,
        comparisonLabel: 'Undergoing visa/travel',
        destinationRoute: '/recruiter/placements',
        tooltip: 'Candidates with accepted offers undergoing UAE work permit processing.',
        lastUpdatedAt: 'Just now'
      },
      {
        id: 'kpi-8',
        label: 'Overdue Actions',
        value: 3,
        formattedValue: '3',
        status: 'critical',
        comparisonLabel: 'Requires immediate action',
        destinationRoute: '/recruiter/leads?stage=action_required',
        tooltip: 'Leads or interview feedback exceeding your agency SLA deadline.',
        lastUpdatedAt: 'Just now'
      }
    ];
  }

  static getActionCentreItems(): PartnerActionItem[] {
    return [
      {
        id: 'action-1',
        title: 'New Assigned Leads Awaiting Acceptance',
        category: 'Leads',
        count: 5,
        priority: 'urgent',
        oldestPendingAt: '3 hours ago',
        responsibleRecruiter: 'Unassigned',
        queueRoute: '/recruiter/leads?filter=awaiting'
      },
      {
        id: 'action-2',
        title: 'Employer Video Interviews Awaiting Post-Interview Feedback',
        category: 'Interviews',
        count: 3,
        priority: 'high',
        oldestPendingAt: '1 day ago',
        responsibleRecruiter: 'Sarah Jenkins',
        queueRoute: '/recruiter/interviews'
      },
      {
        id: 'action-3',
        title: 'Clarification Requested by Operations on Candidate Passport Scan',
        category: 'Clarification',
        count: 2,
        priority: 'normal',
        oldestPendingAt: '2 days ago',
        responsibleRecruiter: 'David Ochieng',
        queueRoute: '/recruiter/leads'
      }
    ];
  }

  static getAssignedLeads(): PartnerLead[] {
    return [
      {
        id: 'lead-1',
        candidateName: 'Grace W. Njeri',
        candidateId: 'BH-KE-9041',
        country: 'Kenya',
        countryCode: 'KE',
        flag: '🇰🇪',
        profession: 'Registered General Nurse',
        experienceYears: 6,
        englishLevel: 'C1 Fluent',
        eligibilityStatus: 'eligible',
        documentStatus: 'verified',
        assignedJobTitle: 'ICU Staff Nurse (Dubai Healthcare City)',
        employerName: 'Gulf Medical & Diagnostic Services',
        leadPriority: 'urgent',
        assignedAt: 'Today, 09:30 AM',
        responseDeadline: 'In 4 hours',
        assignedRecruiterName: 'Sarah Jenkins',
        leadStatus: 'awaiting_acceptance'
      },
      {
        id: 'lead-2',
        candidateName: 'Emmanuel K. Ruto',
        candidateId: 'BH-KE-9042',
        country: 'Kenya',
        countryCode: 'KE',
        flag: '🇰🇪',
        profession: 'HVAC Technician',
        experienceYears: 5,
        englishLevel: 'B2 Professional',
        eligibilityStatus: 'eligible',
        documentStatus: 'verified',
        assignedJobTitle: 'Senior Facilities HVAC Technician',
        employerName: 'Emirates Facilities & Engineering',
        leadPriority: 'high',
        assignedAt: 'Yesterday',
        responseDeadline: 'In 18 hours',
        assignedRecruiterName: 'David Ochieng',
        leadStatus: 'accepted'
      },
      {
        id: 'lead-3',
        candidateName: 'Mercy A. Mwangi',
        candidateId: 'BH-KE-9043',
        country: 'Kenya',
        countryCode: 'KE',
        flag: '🇰🇪',
        profession: 'Food & Beverage Supervisor',
        experienceYears: 4,
        englishLevel: 'C1 Fluent',
        eligibilityStatus: 'eligible',
        documentStatus: 'verified',
        assignedJobTitle: 'F&B Outlet Captain (Palm Jumeirah)',
        employerName: 'Premier Hospitality Group',
        leadPriority: 'normal',
        assignedAt: '2 days ago',
        responseDeadline: 'Completed',
        assignedRecruiterName: 'Sarah Jenkins',
        leadStatus: 'submitted_to_employer'
      }
    ];
  }

  static getRecruiterWorkload(): RecruiterWorkloadRecord[] {
    return [
      {
        id: 'rec-1',
        recruiterName: 'Sarah Jenkins',
        email: 's.jenkins@nairobiglobal.com',
        activeLeads: 24,
        submissionsCount: 18,
        interviewsCount: 8,
        placementsCount: 6,
        capacityPercentage: 80,
        status: 'balanced'
      },
      {
        id: 'rec-2',
        recruiterName: 'David Ochieng',
        email: 'd.ochieng@nairobiglobal.com',
        activeLeads: 28,
        submissionsCount: 22,
        interviewsCount: 12,
        placementsCount: 7,
        capacityPercentage: 92,
        status: 'near_capacity'
      },
      {
        id: 'rec-3',
        recruiterName: 'Amina Kimani',
        email: 'a.kimani@nairobiglobal.com',
        activeLeads: 12,
        submissionsCount: 8,
        interviewsCount: 4,
        placementsCount: 3,
        capacityPercentage: 45,
        status: 'available'
      }
    ];
  }

  static getEmployerSubmissions(): EmployerSubmissionRecord[] {
    return [
      {
        id: 'sub-1',
        candidateName: 'Mercy A. Mwangi',
        employerName: 'Premier Hospitality Group',
        jobTitle: 'F&B Outlet Captain (Palm Jumeirah)',
        submissionRef: 'SUB-2026-4401',
        submittedAt: '2 days ago',
        status: 'shortlisted',
        daysWaiting: 2
      },
      {
        id: 'sub-2',
        candidateName: 'Brian N. Kiprop',
        employerName: 'Al Hamra Retail Outlets LLC',
        jobTitle: 'Store Operations Supervisor',
        submissionRef: 'SUB-2026-4402',
        submittedAt: '1 day ago',
        status: 'under_review',
        daysWaiting: 1
      }
    ];
  }

  static getUpcomingInterviews(): UpcomingInterviewRecord[] {
    return [
      {
        id: 'int-1',
        candidateName: 'Grace W. Njeri',
        jobTitle: 'ICU Staff Nurse',
        employerName: 'Gulf Medical & Diagnostic Services',
        uaeTime: 'Today, 14:00 GST (UAE)',
        localTime: 'Today, 13:00 EAT (Kenya)',
        interviewType: 'Video Call',
        status: 'confirmed'
      },
      {
        id: 'int-2',
        candidateName: 'Emmanuel K. Ruto',
        jobTitle: 'HVAC Technician',
        employerName: 'Emirates Facilities & Engineering',
        uaeTime: 'Tomorrow, 11:00 GST (UAE)',
        localTime: 'Tomorrow, 10:00 EAT (Kenya)',
        interviewType: 'Technical Screening',
        status: 'pending_confirmation'
      }
    ];
  }

  static getPlacementProgress(): PlacementProgressRecord[] {
    return [
      {
        id: 'plc-1',
        candidateName: 'Joseph M. Ndung\'u',
        employerName: 'Premier Hospitality Group',
        currentStage: 'Work Permit Submitted',
        daysInStage: 4,
        expectedArrival: '15 Aug 2026'
      },
      {
        id: 'plc-2',
        candidateName: 'Faith C. Cheruiyot',
        employerName: 'Gulf Medical & Diagnostic Services',
        currentStage: 'Visa Approved',
        daysInStage: 2,
        expectedArrival: '08 Aug 2026'
      }
    ];
  }

  static getPerformanceSla(): PartnerPerformanceMetric {
    return {
      acceptanceRate: 95.2,
      avgResponseTimeHours: 4.2,
      submissionRate: 84.6,
      interviewConversion: 42.8,
      placementConversion: 18.5,
      slaStatus: 'performing'
    };
  }

}
