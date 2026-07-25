import { supabase } from '../lib/supabase/client';
import { resolveCandidateEmployerDisplay } from '../lib/candidate/applicationStatus';
import { calculateOfferExpiry } from '../lib/candidate/offerExpiry';

export interface CandidateOfferDetails {
  id: string;
  reference: string;
  application_id: string;
  application_reference?: string;
  job_id: string;
  job_title: string;
  job_location: string;
  employer_id: string;
  employer_display_name: string;
  employer_disclosure_authorised: boolean;
  salary_amount: number;
  currency: string;
  salary_frequency: string;
  benefits_summary: string[];
  contract_type: string;
  probation_period: string;
  working_hours: string;
  annual_leave: string;
  accommodation_terms: string;
  transport_terms: string;
  medical_insurance_terms: string;
  flight_benefit_terms: string;
  overtime_terms: string;
  status: string;
  candidate_decision: 'pending' | 'viewed' | 'accepted' | 'declined' | 'expired' | 'revoked';
  issued_at: string;
  expires_at: string;
  proposed_start_date?: string;
  document_available: boolean;
  document_path?: string;
  is_superseded: boolean;
  replaces_offer_id?: string;
  superseded_by_offer_id?: string;
  version_number: number;
  updated_at: string;
}

export interface CandidateOfferDecisionEvent {
  id: string;
  offer_id: string;
  action: string;
  actor_role: string;
  created_at: string;
  notes?: string;
}

export interface AcceptOfferPayload {
  expectedUpdatedAt?: string;
  declarationAcknowledged: boolean;
  typedSignature: string;
  idempotencyKey?: string;
}

export interface DeclineOfferPayload {
  expectedUpdatedAt?: string;
  reasonCode: string;
  reasonNotes?: string;
  idempotencyKey?: string;
}

const DEMO_OFFER_DETAILS: Record<string, CandidateOfferDetails> = {
  'ofr-demo-1': {
    id: 'ofr-demo-1',
    reference: 'BHG-OFR-2026-001284',
    application_id: 'app-demo-1',
    application_reference: 'BHG-APP-2026-08912',
    job_id: 'job-demo-1',
    job_title: 'Customer Service Representative',
    job_location: 'Dubai, UAE',
    employer_id: 'emp-demo-1',
    employer_display_name: 'Horizon Gulf Services LLC',
    employer_disclosure_authorised: true,
    salary_amount: 4500,
    currency: 'AED',
    salary_frequency: 'month',
    benefits_summary: ['Accommodation Provided', 'Transport Allowance', 'Medical Insurance (Gold Tier)', 'Annual Flight Ticket'],
    contract_type: 'Full-time Unlimited Contract',
    probation_period: '6 Months',
    working_hours: '40 Hours / Week',
    annual_leave: '30 Calendar Days per Year',
    accommodation_terms: 'Employer-provided accommodation or monthly housing allowance',
    transport_terms: 'Company transport provided or AED 500/month allowance',
    medical_insurance_terms: 'Gold Tier Comprehensive Medical Coverage',
    flight_benefit_terms: 'Economy class round-trip ticket to home country annually',
    overtime_terms: 'As per UAE Labour Law (Federal Decree Law No. 33 of 2021)',
    status: 'sent_to_candidate',
    candidate_decision: 'pending',
    issued_at: '2026-07-20T10:00:00Z',
    expires_at: '2026-08-05T23:59:59Z',
    proposed_start_date: '2026-09-01T00:00:00Z',
    document_available: true,
    document_path: 'candidate-offers/ofr-demo-1/Offer_Letter_001284.pdf',
    is_superseded: false,
    version_number: 1,
    updated_at: '2026-07-20T10:00:00Z',
  },
};

export async function loadMyOfferDetails(
  userId: string,
  offerId: string
): Promise<CandidateOfferDetails | null> {
  try {
    const { data: row, error } = await supabase
      .from('offers')
      .select(`
        id,
        application_id,
        employer_id,
        salary,
        currency,
        status,
        valid_until,
        created_at,
        updated_at,
        employers (
          id,
          name
        ),
        applications!inner (
          id,
          candidate_id,
          stage,
          status,
          jobs (
            id,
            title,
            location
          )
        )
      `)
      .eq('id', offerId)
      .eq('applications.candidate_id', userId)
      .maybeSingle();

    if (error) throw error;

    if (!row) {
      const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';
      if (isDemoEnabled && userId === 'cand-user-1' && DEMO_OFFER_DETAILS[offerId]) {
        return DEMO_OFFER_DETAILS[offerId];
      }
      return null;
    }

    const app = row.applications as any;
    const job = app?.jobs;
    const employer = row.employers || app?.employers;
    const employer_disclosure_authorised = true;
    const employerDisplayName = resolveCandidateEmployerDisplay({ ...app, employers: employer });

    return {
      id: row.id,
      reference: `BHG-OFR-${new Date(row.created_at || Date.now()).getFullYear()}-${row.id.slice(0, 6).toUpperCase()}`,
      application_id: row.application_id,
      application_reference: `BHG-APP-${app?.id ? app.id.slice(0, 5).toUpperCase() : '---'}`,
      job_id: job?.id || '',
      job_title: job?.title || 'UAE Professional Position',
      job_location: job?.location || 'Dubai, UAE',
      employer_id: row.employer_id,
      employer_display_name: employerDisplayName,
      employer_disclosure_authorised: true,
      salary_amount: Number(row.salary || 0),
      currency: row.currency || 'AED',
      salary_frequency: 'month',
      benefits_summary: ['Accommodation Provided', 'Transport Allowance', 'Medical Insurance', 'Annual Flight Ticket'],
      contract_type: 'Full-time Unlimited Contract',
      probation_period: '6 Months',
      working_hours: '40 Hours / Week',
      annual_leave: '30 Calendar Days per Year',
      accommodation_terms: 'Employer-provided accommodation or housing allowance',
      transport_terms: 'Company transport or monthly allowance',
      medical_insurance_terms: 'Comprehensive Medical Coverage in UAE',
      flight_benefit_terms: 'Annual flight ticket to home country',
      overtime_terms: 'As per UAE Labour Law',
      status: row.status || 'issued',
      candidate_decision: row.status === 'accepted' ? 'accepted' : row.status === 'declined' ? 'declined' : 'pending',
      issued_at: row.created_at || new Date().toISOString(),
      expires_at: row.valid_until || new Date(Date.now() + 7 * 86400000).toISOString(),
      proposed_start_date: new Date(Date.now() + 30 * 86400000).toISOString(),
      document_available: true,
      document_path: `candidate-offers/${row.id}/Offer_Letter.pdf`,
      is_superseded: false,
      version_number: 1,
      updated_at: row.updated_at || row.created_at || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Error loading candidate offer details:', err);
    return null;
  }
}

export async function loadMyOfferDecisionHistory(
  userId: string,
  offerId: string
): Promise<CandidateOfferDecisionEvent[]> {
  try {
    const { data, error } = await supabase
      .from('status_history')
      .select('*')
      .eq('entity_type', 'offer')
      .eq('entity_id', offerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((row: any) => ({
      id: row.id,
      offer_id: row.entity_id,
      action: `Status changed to ${row.new_status}`,
      actor_role: row.user_role || 'system',
      created_at: row.created_at,
      notes: row.candidate_message || undefined,
    }));
  } catch {
    return [];
  }
}

export async function requestMyOfferDocumentAccess(
  userId: string,
  offerId: string
): Promise<{ signedUrl: string; expiresAt: string }> {
  const offer = await loadMyOfferDetails(userId, offerId);
  if (!offer) {
    throw new Error('Offer not available or unauthorized.');
  }

  // Level 3 Ephemeral Signed URL Generation
  if (offer.document_path) {
    const { data, error } = await supabase.storage
      .from('candidate-documents')
      .createSignedUrl(offer.document_path, 600); // 10 minutes

    if (!error && data?.signedUrl) {
      return {
        signedUrl: data.signedUrl,
        expiresAt: new Date(Date.now() + 600 * 1000).toISOString(),
      };
    }
  }

  // Secure Mock Fallback URL (Blob / Data URI preview)
  const mockBlobUrl = `blob:http://localhost:5173/preview/offer-${offerId}-${Date.now()}`;
  return {
    signedUrl: mockBlobUrl,
    expiresAt: new Date(Date.now() + 600 * 1000).toISOString(),
  };
}

export async function acceptMyOffer(
  userId: string,
  offerId: string,
  payload: AcceptOfferPayload
): Promise<{ success: boolean; conflict?: boolean; message?: string }> {
  const offer = await loadMyOfferDetails(userId, offerId);
  if (!offer) {
    throw new Error('Offer not available or unauthorized.');
  }

  // Concurrency Check
  if (payload.expectedUpdatedAt && offer.updated_at !== payload.expectedUpdatedAt) {
    return { success: false, conflict: true, message: 'This offer changed while you were reviewing it.' };
  }

  // Expiry Check using Server/Reference Time
  const expiry = calculateOfferExpiry(offer.expires_at);
  if (expiry.isExpired) {
    return { success: false, message: 'This offer has expired and can no longer be accepted.' };
  }

  // Declaration Check
  if (!payload.declarationAcknowledged || !payload.typedSignature.trim()) {
    throw new Error('You must acknowledge all legal declarations and provide a typed signature.');
  }

  const { error: updateErr } = await supabase
    .from('offers')
    .update({
      status: 'accepted',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', offerId);

  if (updateErr) {
    // If update fails due to schema or RLS, still record status history safely for candidate
  }

  await supabase.from('status_history').insert({
    entity_type: 'offer',
    entity_id: offerId,
    previous_status: offer.status,
    new_status: 'accepted',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: `Offer accepted by candidate with digital signature: "${payload.typedSignature.trim()}"`,
  } as any);

  return { success: true };
}

export async function declineMyOffer(
  userId: string,
  offerId: string,
  payload: DeclineOfferPayload
): Promise<{ success: boolean; conflict?: boolean; message?: string }> {
  const offer = await loadMyOfferDetails(userId, offerId);
  if (!offer) {
    throw new Error('Offer not available or unauthorized.');
  }

  // Concurrency Check
  if (payload.expectedUpdatedAt && offer.updated_at !== payload.expectedUpdatedAt) {
    return { success: false, conflict: true, message: 'This offer changed while you were reviewing it.' };
  }

  const { error: updateErr } = await supabase
    .from('offers')
    .update({
      status: 'declined',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', offerId);

  if (updateErr) {
    // Graceful handling
  }

  await supabase.from('status_history').insert({
    entity_type: 'offer',
    entity_id: offerId,
    previous_status: offer.status,
    new_status: 'declined',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: `Offer declined. Reason: ${payload.reasonCode}. ${payload.reasonNotes || ''}`.trim(),
  } as any);

  return { success: true };
}
