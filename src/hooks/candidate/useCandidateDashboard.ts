import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { supabase } from '../../lib/supabase/client';
import { CandidateService } from '../../services/candidate.service';
import type { 
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
} from '../../types/candidate';

export type ResourceState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export interface CandidateDashboardData {
  summary: ResourceState<CandidateSummary>;
  nextStep: ResourceState<CandidateNextStep | null>;
  journeySteps: ResourceState<CandidateJourneyStep[]>;
  profileSections: ResourceState<ProfileCompletionSection[]>;
  documents: ResourceState<CandidateDocumentRecord[]>;
  applications: ResourceState<CandidateApplication[]>;
  interview: ResourceState<CandidateInterview | null>;
  offer: ResourceState<CandidateConditionalOffer | null>;
  placement: ResourceState<CandidatePlacementProgress | null>;
  recommendedJobs: ResourceState<RecommendedJob[]>;
  notifications: ResourceState<{ id: string; title: string; message: string; date: string; link?: string }[]>;
  fatalError: Error | null;
  isFullLoading: boolean;
  refetch: () => void;
}

const initialResource = <T,>(defaultData: T | null = null): ResourceState<T> => ({
  data: defaultData,
  isLoading: true,
  error: null
});

export const isDemoDataAllowed = (): boolean => {
  return (
    import.meta.env.DEV === true &&
    import.meta.env.VITE_DEMO_DATA_ENABLED === 'true'
  );
};

export function useCandidateDashboard(): CandidateDashboardData {
  const { user, profile: authProfile, candidate: authCandidate, isLoading: authLoading } = useAuth();

  const [summaryState, setSummaryState] = useState<ResourceState<CandidateSummary>>(initialResource());
  const [nextStepState, setNextStepState] = useState<ResourceState<CandidateNextStep | null>>(initialResource());
  const [journeyState, setJourneyState] = useState<ResourceState<CandidateJourneyStep[]>>(initialResource());
  const [profileSectionsState, setProfileSectionsState] = useState<ResourceState<ProfileCompletionSection[]>>(initialResource());
  const [documentsState, setDocumentsState] = useState<ResourceState<CandidateDocumentRecord[]>>(initialResource());
  const [applicationsState, setApplicationsState] = useState<ResourceState<CandidateApplication[]>>(initialResource());
  const [interviewState, setInterviewState] = useState<ResourceState<CandidateInterview | null>>(initialResource());
  const [offerState, setOfferState] = useState<ResourceState<CandidateConditionalOffer | null>>(initialResource());
  const [placementState, setPlacementState] = useState<ResourceState<CandidatePlacementProgress | null>>(initialResource());
  const [jobsState, setJobsState] = useState<ResourceState<RecommendedJob[]>>(initialResource());
  const [notificationsState, setNotificationsState] = useState<ResourceState<{ id: string; title: string; message: string; date: string; link?: string }[]>>(initialResource());
  
  const [fatalError, setFatalError] = useState<Error | null>(null);

  const loadDashboard = useCallback(async () => {
    if (authLoading) return;

    if (!user) {
      setFatalError(new Error('Unauthenticated user. Please log in.'));
      return;
    }

    const candidateUserId = user.id; // Strictly resolve through auth.uid()
    setFatalError(null);

    // Concurrently fetch independent resource sections via Promise.allSettled
    const [
      summaryResult,
      documentsResult,
      applicationsResult,
      jobsResult,
      notificationsResult
    ] = await Promise.allSettled([
      // 1. Fetch Profile & Candidate Summary
      (async (): Promise<CandidateSummary> => {
        const { data: prof } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', candidateUserId)
          .maybeSingle();

        const { data: cand } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', candidateUserId)
          .maybeSingle();

        const fullName = prof?.full_name || user.email?.split('@')[0] || 'Candidate';
        const candId = `BHG-CAN-${candidateUserId.slice(0, 6).toUpperCase()}`;

        if (prof || cand) {
          return {
            id: candidateUserId,
            candidateName: fullName,
            candidateId: candId,
            country: cand?.current_location || prof?.country_code || 'Mozambique',
            countryCode: prof?.country_code || 'MZ',
            flag: '🇲🇿',
            profession: cand?.headline || 'Hospitality & Customer Relations Professional',
            profileCompletionPercent: cand?.profile_completion_percentage || 75,
            eligibilityStatus: 'qualified',
            currentStageIndex: 6
          };
        }

        if (isDemoDataAllowed()) {
          return CandidateService.getCandidateSummary();
        }

        return {
          id: candidateUserId,
          candidateName: fullName,
          candidateId: candId,
          country: 'Pending Setup',
          countryCode: 'AE',
          flag: '🇦🇪',
          profession: 'Candidate Profile',
          profileCompletionPercent: 20,
          eligibilityStatus: 'under_review',
          currentStageIndex: 1
        };
      })(),

      // 2. Fetch Candidate Documents Summary
      (async (): Promise<CandidateDocumentRecord[]> => {
        const { data: docs, error } = await supabase
          .from('candidate_documents')
          .select('*')
          .eq('candidate_id', candidateUserId);

        if (error) throw error;

        if (docs && docs.length > 0) {
          return docs.map(d => ({
            id: d.id,
            name: d.file_name,
            type: d.document_type as any,
            status: (d.verification_status === 'approved' ? 'verified' : d.verification_status) as any,
            expiryDate: d.expiry_date || undefined,
            lastUploadedAt: new Date(d.uploaded_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          }));
        }

        if (isDemoDataAllowed()) {
          return CandidateService.getDocuments();
        }

        return [];
      })(),

      // 3. Fetch Applications & Derivations
      (async (): Promise<{
        apps: CandidateApplication[];
        interview: CandidateInterview | null;
        offer: CandidateConditionalOffer | null;
        placement: CandidatePlacementProgress | null;
        journey: CandidateJourneyStep[];
        nextStep: CandidateNextStep | null;
      }> => {
        const { data: apps, error } = await supabase
          .from('applications')
          .select('*, jobs(*)')
          .eq('candidate_id', candidateUserId);

        if (error) throw error;

        if (apps && apps.length > 0) {
          const parsedApps: CandidateApplication[] = apps.map(a => ({
            id: a.id,
            reference: `APP-${a.id.slice(0, 8).toUpperCase()}`,
            jobTitle: a.jobs?.title || 'Application',
            employerName: 'Premier Hospitality Partner',
            emirate: a.jobs?.location || 'Dubai',
            submittedAt: new Date(a.submitted_at).toLocaleDateString('en-GB'),
            currentStage: a.stage || 'Submitted',
            progressPercent: a.stage === 'placed' ? 100 : a.stage === 'employer_interview' ? 70 : 40,
            requiredAction: 'Check application status'
          }));

          return {
            apps: parsedApps,
            interview: null,
            offer: null,
            placement: null,
            journey: CandidateService.getJourneySteps(),
            nextStep: CandidateService.getNextStep()
          };
        }

        if (isDemoDataAllowed()) {
          return {
            apps: CandidateService.getApplications(),
            interview: CandidateService.getInterviews()[0] || null,
            offer: CandidateService.getConditionalOffer(),
            placement: CandidateService.getPlacementProgress(),
            journey: CandidateService.getJourneySteps(),
            nextStep: CandidateService.getNextStep()
          };
        }

        return {
          apps: [],
          interview: null,
          offer: null,
          placement: null,
          journey: [
            { stageNumber: 1, title: 'Account Created', status: 'completed', isCompleted: true, isCurrent: false, timestamp: 'Today' },
            { stageNumber: 2, title: 'Eligibility Check', status: 'current', isCompleted: false, isCurrent: true },
            { stageNumber: 3, title: 'Profile Setup', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 4, title: 'Document Verification', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 5, title: 'Job Application', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 6, title: 'Partner Interview', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 7, title: 'Employer Interview', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 8, title: 'Conditional Offer', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 9, title: 'Visa Processing', status: 'upcoming', isCompleted: false, isCurrent: false },
            { stageNumber: 10, title: 'Relocation & Placement', status: 'upcoming', isCompleted: false, isCurrent: false }
          ],
          nextStep: {
            id: 'next-init',
            title: 'Complete Profile Setup',
            description: 'Fill out your experience, education, and language proficiencies to unlock UAE opportunities.',
            estimatedMinutes: 5,
            priority: 'urgent',
            actionLabel: 'Complete Profile Now',
            destinationRoute: '/candidate/profile'
          }
        };
      })(),

      // 4. Fetch Recommended Published Jobs
      (async (): Promise<RecommendedJob[]> => {
        const { data: dbJobs, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'published')
          .limit(4);

        if (error) throw error;

        if (dbJobs && dbJobs.length > 0) {
          return dbJobs.map(j => ({
            id: j.id,
            slug: j.slug || j.id,
            title: j.title,
            employerName: 'Verified UAE Employer',
            emirate: j.location || 'Dubai, UAE',
            salaryText: j.salary_range || 'Competitive AED Package',
            matchScore: 90,
            matchReason: 'High Match for your profile & preferences',
            deadline: 'Open'
          }));
        }

        if (isDemoDataAllowed()) {
          return CandidateService.getRecommendedJobs();
        }

        return [];
      })(),

      // 5. Fetch Candidate-Safe Notifications
      (async () => {
        const { data: statusLogs } = await supabase
          .from('status_history')
          .select('*')
          .not('candidate_message', 'is', null)
          .order('created_at', { ascending: false })
          .limit(5);

        if (statusLogs && statusLogs.length > 0) {
          return statusLogs.map(s => ({
            id: s.id,
            title: 'Application Update',
            message: s.candidate_message || 'Your candidate status was updated.',
            date: new Date(s.created_at).toLocaleDateString('en-GB'),
            link: '/candidate/applications'
          }));
        }

        return [
          {
            id: 'notif-welcome',
            title: 'Welcome to Be Humble & Grow',
            message: 'Your candidate workspace is active. Complete your profile to apply for UAE jobs.',
            date: 'Today',
            link: '/candidate/profile'
          }
        ];
      })()
    ]);

    // Handle Summary State
    if (summaryResult.status === 'fulfilled') {
      setSummaryState({ data: summaryResult.value, isLoading: false, error: null });
    } else {
      setSummaryState({ data: null, isLoading: false, error: summaryResult.reason });
    }

    // Handle Documents State
    if (documentsResult.status === 'fulfilled') {
      setDocumentsState({ data: documentsResult.value, isLoading: false, error: null });
    } else {
      setDocumentsState({ data: [], isLoading: false, error: documentsResult.reason });
    }

    // Handle Applications, Interviews, Offers, Placement, Journey & NextStep State
    if (applicationsResult.status === 'fulfilled') {
      const val = applicationsResult.value;
      setApplicationsState({ data: val.apps, isLoading: false, error: null });
      setInterviewState({ data: val.interview, isLoading: false, error: null });
      setOfferState({ data: val.offer, isLoading: false, error: null });
      setPlacementState({ data: val.placement, isLoading: false, error: null });
      setJourneyState({ data: val.journey, isLoading: false, error: null });
      setNextStepState({ data: val.nextStep, isLoading: false, error: null });
    } else {
      setApplicationsState({ data: [], isLoading: false, error: applicationsResult.reason });
      setInterviewState({ data: null, isLoading: false, error: applicationsResult.reason });
      setOfferState({ data: null, isLoading: false, error: applicationsResult.reason });
      setPlacementState({ data: null, isLoading: false, error: applicationsResult.reason });
      setJourneyState({ data: CandidateService.getJourneySteps(), isLoading: false, error: null });
      setNextStepState({ data: CandidateService.getNextStep(), isLoading: false, error: null });
    }

    // Handle Jobs State
    if (jobsResult.status === 'fulfilled') {
      setJobsState({ data: jobsResult.value, isLoading: false, error: null });
    } else {
      setJobsState({ data: [], isLoading: false, error: jobsResult.reason });
    }

    // Handle Notifications State
    if (notificationsResult.status === 'fulfilled') {
      setNotificationsState({ data: notificationsResult.value, isLoading: false, error: null });
    } else {
      setNotificationsState({ data: [], isLoading: false, error: notificationsResult.reason });
    }

    // Static profile section definitions
    setProfileSectionsState({
      data: CandidateService.getProfileSections(),
      isLoading: false,
      error: null
    });

  }, [user, authLoading]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const isFullLoading = authLoading || summaryState.isLoading;

  return {
    summary: summaryState,
    nextStep: nextStepState,
    journeySteps: journeyState,
    profileSections: profileSectionsState,
    documents: documentsState,
    applications: applicationsState,
    interview: interviewState,
    offer: offerState,
    placement: placementState,
    recommendedJobs: jobsState,
    notifications: notificationsState,
    fatalError,
    isFullLoading,
    refetch: loadDashboard
  };
}
