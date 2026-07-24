import { supabase } from '../lib/supabase/client';
import type { Application, Candidate, CandidateDocument, StatusHistory } from '../lib/supabase/types';

export async function getAllApplicationsForOperations(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*, jobs(title, location, employers(organisations(name))), candidates(profiles(full_name, email, phone, country_code), headline, verification_status)')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching applications for ops:', error);
    return [];
  }

  return (data || []) as Application[];
}

export async function getCandidateDetailsForOps(candidateId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', candidateId)
    .single();

  const { data: candidate } = await supabase
    .from('candidates')
    .select('*')
    .eq('id', candidateId)
    .single();

  const { data: documents } = await supabase
    .from('candidate_documents')
    .select('*')
    .eq('candidate_id', candidateId);

  const { data: history } = await supabase
    .from('status_history')
    .select('*')
    .eq('entity_id', candidateId)
    .order('created_at', { ascending: false });

  return {
    profile,
    candidate: candidate as Candidate | null,
    documents: (documents || []) as CandidateDocument[],
    history: (history || []) as StatusHistory[],
  };
}

export async function updateApplicationStatusByOps(
  applicationId: string,
  reviewerId: string,
  reviewerRole: string,
  newStatus: string,
  internalNote?: string,
  candidateMessage?: string
) {
  const { data: existingApp } = await supabase
    .from('applications')
    .select('status')
    .eq('id', applicationId)
    .single();

  const { data: updatedApp, error } = await supabase
    .from('applications')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    } as any)
    .eq('id', applicationId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await supabase.from('status_history').insert({
    entity_type: 'application',
    entity_id: applicationId,
    previous_status: (existingApp as any)?.status || null,
    new_status: newStatus,
    changed_by: reviewerId,
    user_role: reviewerRole,
    internal_note: internalNote,
    candidate_message: candidateMessage,
  } as any);

  return updatedApp;
}
