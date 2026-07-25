import { supabase } from '../lib/supabase/client';
import { resolveCandidateEmployerDisplay } from '../lib/candidate/applicationStatus';
import { calculateOfferExpiry } from '../lib/candidate/offerExpiry';

export interface CandidateOfferListItem {
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
  status: string;
  candidate_decision: 'pending' | 'viewed' | 'accepted' | 'declined' | 'expired' | 'revoked';
  issued_at: string;
  expires_at: string;
  proposed_start_date?: string;
  document_available: boolean;
  is_superseded: boolean;
  replaces_offer_id?: string;
  superseded_by_offer_id?: string;
  version_number: number;
}

export interface CandidateOfferSummaryMetrics {
  total: number;
  actionRequired: number;
  accepted: number;
  expiringSoon: number;
  historical: number;
}

export interface CandidateOfferFilters {
  tab?: 'active' | 'action_required' | 'accepted' | 'expired' | 'declined' | 'all';
  searchQuery?: string;
  statusFilter?: string;
  decisionFilter?: string;
  sortBy?: 'expiring_soonest' | 'recently_issued' | 'recently_updated' | 'start_date' | 'job_title';
}

const DEMO_OFFERS: CandidateOfferListItem[] = [
  {
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
    status: 'sent_to_candidate',
    candidate_decision: 'pending',
    issued_at: '2026-07-20T10:00:00Z',
    expires_at: '2026-08-05T23:59:59Z',
    proposed_start_date: '2026-09-01T00:00:00Z',
    document_available: true,
    is_superseded: false,
    version_number: 1,
  },
  {
    id: 'ofr-demo-2',
    reference: 'BHG-OFR-2026-001192',
    application_id: 'app-demo-2',
    application_reference: 'BHG-APP-2026-07741',
    job_id: 'job-demo-2',
    job_title: 'Logistics Coordinator',
    job_location: 'Abu Dhabi, UAE',
    employer_id: 'emp-demo-2',
    employer_display_name: 'Approved UAE Employer',
    employer_disclosure_authorised: false,
    salary_amount: 5200,
    currency: 'AED',
    salary_frequency: 'month',
    benefits_summary: ['Housing Allowance', 'Comprehensive Health Insurance', '30 Days Leave'],
    status: 'accepted',
    candidate_decision: 'accepted',
    issued_at: '2026-07-01T09:00:00Z',
    expires_at: '2026-07-25T23:59:59Z',
    proposed_start_date: '2026-08-15T00:00:00Z',
    document_available: true,
    is_superseded: false,
    version_number: 1,
  },
  {
    id: 'ofr-demo-3',
    reference: 'BHG-OFR-2026-000941',
    application_id: 'app-demo-3',
    application_reference: 'BHG-APP-2026-05510',
    job_id: 'job-demo-3',
    job_title: 'Senior Hospitality Supervisor',
    job_location: 'Dubai, UAE',
    employer_id: 'emp-demo-3',
    employer_display_name: 'Azure Dining Group',
    employer_disclosure_authorised: true,
    salary_amount: 6800,
    currency: 'AED',
    salary_frequency: 'month',
    benefits_summary: ['Accommodation', 'Meals Included', 'Medical Insurance'],
    status: 'expired',
    candidate_decision: 'expired',
    issued_at: '2026-06-10T12:00:00Z',
    expires_at: '2026-06-30T23:59:59Z',
    proposed_start_date: '2026-07-15T00:00:00Z',
    document_available: true,
    is_superseded: false,
    version_number: 1,
  },
];

export async function loadMyOffers(
  userId: string,
  filters: CandidateOfferFilters = {}
): Promise<{ offers: CandidateOfferListItem[]; hasMore: boolean; nextCursor?: string }> {
  try {
    const { data: offersData, error } = await supabase
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
        employers (
          id,
          name
        ),
        applications!inner (
          id,
          candidate_id,
          stage,
          status,
          employer_disclosure_status,
          employer_disclosed_at,
          jobs (
            id,
            title,
            location
          )
        )
      `)
      .eq('applications.candidate_id', userId)
      .order('valid_until', { ascending: true });

    if (error) throw error;

    let items: CandidateOfferListItem[] = (offersData || []).map((row: any) => {
      const app = row.applications;
      const job = app?.jobs;
      const employer = row.employers || app?.employers;
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
        employer_disclosure_authorised: app?.employer_disclosure_status === 'disclosed' || !!app?.employer_disclosed_at,
        salary_amount: Number(row.salary || 0),
        currency: row.currency || 'AED',
        salary_frequency: 'month',
        benefits_summary: ['Accommodation', 'Transport', 'Medical Insurance', 'Annual Leave'],
        status: row.status || 'issued',
        candidate_decision: row.status === 'accepted' ? 'accepted' : row.status === 'declined' ? 'declined' : 'pending',
        issued_at: row.created_at || new Date().toISOString(),
        expires_at: row.valid_until || new Date(Date.now() + 7 * 86400000).toISOString(),
        document_available: true,
        is_superseded: false,
        version_number: 1,
      };
    });

    const isDemoEnabled = import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === 'true';
    if (items.length === 0 && isDemoEnabled && userId === 'cand-user-1') {
      items = [...DEMO_OFFERS];
    }

    // Apply Tab Filtering
    if (filters.tab) {
      switch (filters.tab) {
        case 'active':
          items = items.filter((o) => ['sent_to_candidate', 'issued', 'available', 'awaiting_candidate_decision'].includes(o.status.toLowerCase()));
          break;
        case 'action_required':
          items = items.filter((o) => ['awaiting_candidate_decision', 'sent_to_candidate', 'issued'].includes(o.status.toLowerCase()) && !calculateOfferExpiry(o.expires_at).isExpired);
          break;
        case 'accepted':
          items = items.filter((o) => o.status.toLowerCase().includes('accept'));
          break;
        case 'expired':
          items = items.filter((o) => o.status.toLowerCase() === 'expired' || calculateOfferExpiry(o.expires_at).isExpired);
          break;
        case 'declined':
          items = items.filter((o) => o.status.toLowerCase().includes('declin'));
          break;
        case 'all':
        default:
          break;
      }
    }

    // Apply Search Query
    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      items = items.filter(
        (o) =>
          o.job_title.toLowerCase().includes(q) ||
          o.reference.toLowerCase().includes(q) ||
          (o.application_reference && o.application_reference.toLowerCase().includes(q)) ||
          o.employer_display_name.toLowerCase().includes(q)
      );
    }

    // Apply Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'expiring_soonest':
          items.sort((a, b) => new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime());
          break;
        case 'recently_issued':
          items.sort((a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime());
          break;
        case 'start_date':
          items.sort((a, b) => new Date(a.proposed_start_date || '9999-12-31').getTime() - new Date(b.proposed_start_date || '9999-12-31').getTime());
          break;
        case 'job_title':
          items.sort((a, b) => a.job_title.localeCompare(b.job_title));
          break;
      }
    }

    return {
      offers: items,
      hasMore: false,
    };
  } catch (err) {
    console.error('Error loading candidate offers:', err);
    return { offers: [], hasMore: false };
  }
}

export async function loadMyOfferSummary(userId: string): Promise<CandidateOfferSummaryMetrics> {
  const { offers } = await loadMyOffers(userId, { tab: 'all' });
  const refTime = Date.now();

  const active = offers.filter((o) => ['sent_to_candidate', 'issued', 'available', 'awaiting_candidate_decision'].includes(o.status.toLowerCase()));
  const actionRequired = offers.filter((o) => ['awaiting_candidate_decision', 'sent_to_candidate', 'issued'].includes(o.status.toLowerCase()) && !calculateOfferExpiry(o.expires_at, refTime).isExpired);
  const accepted = offers.filter((o) => o.status.toLowerCase().includes('accept'));
  const expiringSoon = offers.filter((o) => {
    const exp = calculateOfferExpiry(o.expires_at, refTime);
    return exp.state === 'expiring_soon' || exp.state === 'expires_today';
  });
  const historical = offers.filter((o) => ['expired', 'declined', 'withdrawn', 'superseded', 'cancelled'].includes(o.status.toLowerCase()));

  return {
    total: offers.length,
    actionRequired: actionRequired.length,
    accepted: accepted.length,
    expiringSoon: expiringSoon.length,
    historical: historical.length,
  };
}
