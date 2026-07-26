import { supabase } from '../lib/supabase/client';
import type { Application } from '../lib/supabase/types';

export async function submitApplication(
  candidateId: string,
  jobId: string,
  screeningAnswers?: Record<string, any>
): Promise<Application> {
  const { data: existing } = await supabase
    .from('applications')
    .select('id')
    .eq('candidate_id', candidateId)
    .eq('job_id', jobId)
    .single();

  if (existing) {
    throw new Error('You have already submitted an application for this vacancy.');
  }

  const { data: app, error } = await supabase
    .from('applications')
    .insert({
      job_id: jobId,
      candidate_id: candidateId,
      stage: 'employer_submitted',
      status: 'submitted',
      screening_answers: screeningAnswers || {},
      consent_given: true,
      submitted_at: new Date().toISOString(),
    } as any)
    .select()
    .single();

  if (error || !app) throw new Error(error?.message || 'Application creation failed');

  await supabase.from('status_history').insert({
    entity_type: 'application',
    entity_id: (app as any).id,
    previous_status: null,
    new_status: 'submitted',
    changed_by: candidateId,
    user_role: 'candidate',
    candidate_message: 'Application submitted successfully.',
    internal_note: 'Initial submission by candidate.',
  } as any);

  return app as Application;
}

export async function getCandidateApplications(candidateId: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*, jobs(title, location, salary_range, employers(organisations(name)))')
    .eq('candidate_id', candidateId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error loading candidate applications:', error);
    return [];
  }

  return (data || []) as Application[];
}
