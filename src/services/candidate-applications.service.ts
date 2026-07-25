import { supabase } from '../lib/supabase/client';
import type { Application } from '../lib/supabase/types';

export interface LoadApplicationsOptions {
  userId: string;
  statusFilter?: string;
  searchQuery?: string;
  sortBy?: 'updated_at' | 'submitted_at' | 'title';
  page?: number;
  limit?: number;
}

export interface CandidateApplicationsListResult {
  applications: Application[];
  totalCount: number;
  hasMore: boolean;
}

// Safe Candidate Select Query (Excludes internal Operations, Employer & Recruiter notes)
const SAFE_CANDIDATE_APP_COLUMNS = `
  id,
  job_id,
  candidate_id,
  stage,
  status,
  submitted_at,
  updated_at,
  jobs (
    id,
    title,
    location,
    salary_range,
    employer_id
  )
`;

export async function loadMyApplications(options: LoadApplicationsOptions): Promise<CandidateApplicationsListResult> {
  const { userId, statusFilter = 'all', searchQuery = '', page = 1, limit = 10 } = options;

  let query = supabase
    .from('applications')
    .select(SAFE_CANDIDATE_APP_COLUMNS, { count: 'exact' })
    .eq('candidate_id', userId)
    .order('submitted_at', { ascending: false });

  // Status Filter Logic
  if (statusFilter === 'active') {
    query = query.not('status', 'in', '("rejected","withdrawn","closed")');
  } else if (statusFilter === 'closed') {
    query = query.in('status', ['rejected', 'withdrawn', 'closed']);
  } else if (statusFilter === 'interviews') {
    query = query.eq('stage', 'employer_interview');
  } else if (statusFilter === 'offers') {
    query = query.in('stage', ['offer_issued', 'offer_accepted']);
  } else if (statusFilter === 'action_required') {
    query = query.eq('stage', 'onboarding');
  }

  // Pagination bounds
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching candidate applications:', error);
    return { applications: [], totalCount: 0, hasMore: false };
  }

  const apps = (data || []) as unknown as Application[];
  const total = count || apps.length;

  // Search filtering client-side
  let filteredApps = apps;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredApps = apps.filter((app: any) => {
      const title = app.jobs?.title?.toLowerCase() || '';
      const location = app.jobs?.location?.toLowerCase() || '';
      const ref = app.id.toLowerCase();
      return title.includes(q) || location.includes(q) || ref.includes(q);
    });
  }

  return {
    applications: filteredApps,
    totalCount: total,
    hasMore: from + apps.length < total,
  };
}

export async function withdrawMyApplication(userId: string, applicationId: string): Promise<boolean> {
  const { data: app } = await supabase
    .from('applications')
    .select('id, status, candidate_id')
    .eq('id', applicationId)
    .eq('candidate_id', userId)
    .single();

  if (!app) {
    throw new Error('Application not found or unauthorized.');
  }

  if (app.status === 'placed' || app.status === 'withdrawn') {
    throw new Error(`Application cannot be withdrawn in status '${app.status}'.`);
  }

  const { error } = await supabase
    .from('applications')
    .update({
      status: 'withdrawn',
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', applicationId)
    .eq('candidate_id', userId);

  if (error) {
    throw new Error(error.message || 'Failed to withdraw application.');
  }

  await supabase.from('status_history').insert({
    entity_type: 'application',
    entity_id: applicationId,
    previous_status: app.status,
    new_status: 'withdrawn',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: 'Application withdrawn by candidate.',
  } as any);

  return true;
}
