import { 
  CandidateSummary, 
  CandidateNextStep, 
  CandidateJourneyStep, 
  ProfileCompletionSection,
  CandidateDocumentRecord,
  RecommendedJob,
  CandidateApplication,
  CandidateInterview,
  CandidateConditionalOffer,
  CandidatePlacementProgress
} from '../types/candidate';

export class CandidateService {

  static getCandidateSummary(): CandidateSummary {
    return {
      id: 'cand-user-1',
      candidateName: 'Amina Mabote',
      candidateId: 'BH-MZ-9041',
      country: 'Mozambique',
      countryCode: 'MZ',
      flag: '🇲🇿',
      profession: 'Customer Experience & Hospitality Lead',
      profileCompletionPercent: 78,
      eligibilityStatus: 'qualified',
      currentStageIndex: 6 // Stage 7: Interview Scheduled
    };
  }

  static getNextStep(): CandidateNextStep {
    return {
      id: 'next-1',
      title: 'Confirm Video Interview Attendance',
      description: 'Your employer video interview for F&B Outlet Captain at Premier Hospitality Group is scheduled for Tomorrow at 14:00 GST. Please confirm attendance.',
      estimatedMinutes: 3,
      priority: 'urgent',
      actionLabel: 'Confirm Interview Attendance',
      destinationRoute: '/candidate/interviews'
    };
  }

  static getJourneySteps(): CandidateJourneyStep[] {
    return [
      { stageNumber: 1, title: 'Account Created', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '12 Jan 2026' },
      { stageNumber: 2, title: 'Eligibility Checked', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '14 Jan 2026' },
      { stageNumber: 3, title: 'Profile Completed', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '18 Jan 2026' },
      { stageNumber: 4, title: 'Documents Verified', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '22 Jan 2026' },
      { stageNumber: 5, title: 'Application Submitted', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '25 Jan 2026' },
      { stageNumber: 6, title: 'Recruitment Review', status: 'completed', isCompleted: true, isCurrent: false, timestamp: '28 Jan 2026' },
      { stageNumber: 7, title: 'Employer Interview', status: 'current', isCompleted: false, isCurrent: true, timestamp: 'Active Now' },
      { stageNumber: 8, title: 'Conditional Offer', status: 'upcoming', isCompleted: false, isCurrent: false },
      { stageNumber: 9, title: 'Work Permit & Visa', status: 'upcoming', isCompleted: false, isCurrent: false },
      { stageNumber: 10, title: 'Travel & Placement', status: 'upcoming', isCompleted: false, isCurrent: false }
    ];
  }

  static getProfileSections(): ProfileCompletionSection[] {
    return [
      { id: 'sec-1', name: 'Personal & Contact Details', isCompleted: true, isRequired: true },
      { id: 'sec-2', name: 'Work Experience & History', isCompleted: true, isRequired: true },
      { id: 'sec-3', name: 'Education & Qualifications', isCompleted: true, isRequired: true },
      { id: 'sec-4', name: 'Languages & English Level', isCompleted: true, isRequired: true },
      { id: 'sec-5', name: 'Passport & Identity Verification', isCompleted: true, isRequired: true },
      { id: 'sec-6', name: 'Certifications & Medical Clearances', isCompleted: false, isRequired: false }
    ];
  }

  static getDocuments(): CandidateDocumentRecord[] {
    return [
      { id: 'doc-1', name: 'Passport Scan (Bio Page)', type: 'passport', status: 'verified', expiryDate: '14 Nov 2029', lastUploadedAt: '18 Jan 2026' },
      { id: 'doc-2', name: 'Curriculum Vitae (CV)', type: 'cv', status: 'verified', lastUploadedAt: '15 Jan 2026' },
      { id: 'doc-3', name: 'National Identity Document', type: 'national_id', status: 'verified', lastUploadedAt: '14 Jan 2026' },
      { id: 'doc-4', name: 'Hospitality Diploma Certificate', type: 'education', status: 'verified', lastUploadedAt: '18 Jan 2026' },
      { id: 'doc-5', name: 'Police Clearance Certificate', type: 'police_clearance', status: 'under_review', lastUploadedAt: '20 Jan 2026' }
    ];
  }

  static getRecommendedJobs(): RecommendedJob[] {
    return [
      {
        id: 'job-1',
        slug: 'fb-outlet-captain-palm-jumeirah',
        title: 'F&B Outlet Captain (Palm Jumeirah)',
        employerName: 'Premier Hospitality Group',
        emirate: 'Dubai, UAE',
        salaryText: 'AED 4,500 - 5,500 / month',
        matchScore: 94,
        matchReason: '94% Match: Strong hospitality experience and fluent C1 English',
        deadline: '15 Feb 2026'
      },
      {
        id: 'job-2',
        slug: 'guest-relations-officer-marina',
        title: 'Guest Relations Officer (Dubai Marina)',
        employerName: 'Al Maktoum Hotel & Suites',
        emirate: 'Dubai, UAE',
        salaryText: 'AED 4,200 - 5,000 / month',
        matchScore: 88,
        matchReason: '88% Match: Customer experience background',
        deadline: '20 Feb 2026'
      }
    ];
  }

  static getApplications(): CandidateApplication[] {
    return [
      {
        id: 'app-1',
        reference: 'APP-2026-8801',
        jobTitle: 'F&B Outlet Captain (Palm Jumeirah)',
        employerName: 'Premier Hospitality Group',
        emirate: 'Dubai',
        submittedAt: '25 Jan 2026',
        currentStage: 'Employer Interview Scheduled',
        progressPercent: 70,
        requiredAction: 'Confirm Video Interview Attendance'
      }
    ];
  }

  static getInterviews(): CandidateInterview[] {
    return [
      {
        id: 'int-cand-1',
        jobTitle: 'F&B Outlet Captain',
        employerName: 'Premier Hospitality Group',
        uaeTime: 'Tomorrow, 14:00 GST (UAE)',
        localTime: 'Tomorrow, 12:00 CAT (Mozambique)',
        interviewType: 'Video Call',
        status: 'pending_confirmation',
        prepChecklist: [
          { id: 'prep-1', label: 'Review Job Description & Responsibilities', done: true },
          { id: 'prep-2', label: 'Research Employer Profile (Premier Hospitality)', done: true },
          { id: 'prep-3', label: 'Test Camera, Microphone & Internet Connection', done: false },
          { id: 'prep-4', label: 'Have Passport Identification Ready', done: false }
        ]
      }
    ];
  }

  static getConditionalOffer(): CandidateConditionalOffer | null {
    return {
      id: 'off-1',
      reference: 'OFFER-2026-4402',
      position: 'F&B Outlet Captain',
      employerName: 'Premier Hospitality Group',
      salaryText: 'AED 4,800 / month + Accommodation & Flights',
      benefitsText: 'Full UAE Medical Insurance, Annual Flight Allowance, Meal Allowance',
      issueDate: '24 Jan 2026',
      expiryDate: '30 Jan 2026',
      status: 'sent_to_candidate'
    };
  }

  static getPlacementProgress(): CandidatePlacementProgress | null {
    return {
      id: 'plc-cand-1',
      employerName: 'Premier Hospitality Group',
      currentStage: 'Work Permit Submitted',
      expectedArrival: '15 Aug 2026',
      visaStatus: 'Work Permit Application Submitted to UAE MOHRE',
      workPermitStatus: 'Processing with UAE Ministry of Human Resources'
    };
  }

}

// Exported standalone functions for compatibility with CandidateProfilePage & CandidateDocumentsPage
export async function getCandidateProfile(userId?: string) {
  const summary = CandidateService.getCandidateSummary();
  return {
    id: summary.id,
    user_id: userId || 'user-1',
    full_name: summary.candidateName,
    nationality: summary.country,
    candidate_reference: summary.candidateId,
    completion_percentage: summary.profileCompletionPercent,
    status: summary.eligibilityStatus,
    work_experiences: [
      { id: 'exp-1', job_title: summary.profession, company_name: 'Maputo Grand Hotel', start_date: '2022-01-01', end_date: null, is_current: true }
    ],
    education_records: [
      { id: 'edu-1', degree: 'Diploma in Hospitality', institution: 'Eduardo Mondlane University', graduation_year: 2021 }
    ]
  };
}

export async function updateCandidateProfile(userId: string, data: any) {
  return { success: true };
}

export async function addWorkExperience(profileId: string, data: any) {
  return { id: 'exp-new', ...data };
}

export async function addEducation(profileId: string, data: any) {
  return { id: 'edu-new', ...data };
}

export async function getCandidateDocuments(userId?: string) {
  return CandidateService.getDocuments().map(doc => ({
    id: doc.id,
    document_type: doc.type,
    file_name: doc.name,
    status: doc.status,
    uploaded_at: doc.lastUploadedAt
  }));
}

export async function uploadCandidateDocument(userId: string, docType: string, file: File) {
  return { id: 'doc-uploaded', document_type: docType, file_name: file.name, status: 'uploaded' };
}

export async function getCandidateApplications(userId?: string) {
  return CandidateService.getApplications();
}
