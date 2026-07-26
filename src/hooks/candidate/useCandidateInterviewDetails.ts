import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import {
  loadMyInterviewDetails,
  requestMySecureMeetingAccess,
  confirmMyInterviewAttendance,
  requestMyInterviewReschedule,
  type CandidateInterviewDetailData,
  type SecureMeetingAccessResult,
} from '../../services/candidate-interview-details.service';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

const DEMO_INTERVIEW_DETAIL: CandidateInterviewDetailData = {
  id: 'int-demo-101',
  application_id: 'app-demo-1',
  job_id: 'job-101',
  job_title: 'Senior UX Designer',
  employer_display_name: 'Global Corp Innovations',
  employer_logo_url: null,
  scheduled_at: '2026-07-30T10:00:00Z',
  duration_minutes: 45,
  format: 'Video Interview',
  location: null,
  status: 'awaiting_candidate_confirmation',
  meetingLinkAvailable: true,
  updated_at: '2026-07-25T12:00:00Z',
  candidateProfileTimeZone: 'Africa/Maputo',
  instructions: [
    'Ensure you are in a quiet, well-lit environment with a stable internet connection.',
    'The interview will be recorded for internal review purposes with your consent.',
    'Be ready to present your screen for the design walkthrough portion of the interview.',
  ],
  preparationItems: [
    { id: 'prep-1', label: 'Review Case Study & Design Systems Work', done: true, category: 'book' },
    { id: 'prep-2', label: 'Research Disclosed Employer Profile', done: true, category: 'book' },
    { id: 'prep-3', label: 'Test Camera, Microphone & Internet Connection (15 mins before)', done: false, category: 'tech' },
    { id: 'prep-4', label: 'Prepare 3 questions for the hiring team', done: false, category: 'questions' },
  ],
  requiredDocuments: [
    { id: 'doc-1', documentType: 'Updated Portfolio (PDF)', fileName: 'UX_Portfolio_2026.pdf', isVerified: true },
    { id: 'doc-2', documentType: 'Valid Passport Photo ID', fileName: 'Passport_Scan.pdf', isVerified: false },
  ],
};

export function useCandidateInterviewDetails(interviewId?: string) {
  const { user, profile } = useAuth();
  const [detailState, setDetailState] = useState<ResourceState<CandidateInterviewDetailData>>({ status: 'loading' });

  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [meetingAccessResult, setMeetingAccessResult] = useState<SecureMeetingAccessResult | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!user || !interviewId) return;
    setDetailState({ status: 'loading' });

    try {
      const data = await loadMyInterviewDetails(user.id, interviewId);
      const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';

      if (!data) {
        if (isDemoEnabled && interviewId.startsWith('int-demo')) {
          setDetailState({ status: 'success', data: { ...DEMO_INTERVIEW_DETAIL, id: interviewId } });
        } else {
          setDetailState({ status: 'not_found' });
        }
      } else {
        setDetailState({ status: 'success', data });
      }
    } catch (err: any) {
      setDetailState({
        status: 'error',
        message: err.message || 'Failed to load interview details.',
      });
    }
  }, [user, interviewId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleConfirmAttendance = async () => {
    if (!user || !interviewId || detailState.status !== 'success') return;
    setActionLoading(true);
    setActionError(null);

    try {
      await confirmMyInterviewAttendance(user.id, interviewId, detailState.data.updated_at);
      await fetchDetails();
    } catch (err: any) {
      setActionError(err.message || 'Failed to confirm attendance.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestReschedule = async (reason: string, candidateNote?: string) => {
    if (!user || !interviewId || detailState.status !== 'success') return;
    setActionLoading(true);
    setActionError(null);

    try {
      await requestMyInterviewReschedule(user.id, interviewId, reason, candidateNote, detailState.data.updated_at);
      await fetchDetails();
    } catch (err: any) {
      setActionError(err.message || 'Failed to submit reschedule request.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestMeetingAccess = async () => {
    if (!user || !interviewId) return;
    setActionLoading(true);
    setActionError(null);
    setMeetingAccessResult(null);

    try {
      const res = await requestMySecureMeetingAccess(user.id, interviewId);
      setMeetingAccessResult(res);
      if (res.success && res.redirectUrl) {
        window.open(res.redirectUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (err: any) {
      setActionError(err.message || 'Could not verify meeting access.');
    } finally {
      setActionLoading(false);
    }
  };

  const togglePreparationItem = (itemId: string) => {
    if (detailState.status !== 'success') return;
    setDetailState({
      ...detailState,
      data: {
        ...detailState.data,
        preparationItems: detailState.data.preparationItems.map((item) =>
          item.id === itemId ? { ...item, done: !item.done } : item
        ),
      },
    });
  };

  return {
    profile,
    detailState,
    actionLoading,
    actionError,
    meetingAccessResult,
    handleConfirmAttendance,
    handleRequestReschedule,
    handleRequestMeetingAccess,
    togglePreparationItem,
    refetch: fetchDetails,
  };
}
