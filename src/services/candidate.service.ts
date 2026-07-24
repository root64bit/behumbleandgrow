import { supabase } from '../lib/supabase/client';
import type { Candidate, Profile, WorkExperience, Education } from '../lib/supabase/types';

export async function getCandidateProfile(candidateId: string) {
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

  const { data: experiences } = await supabase
    .from('work_experiences')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('start_date', { ascending: false });

  const { data: educations } = await supabase
    .from('educations')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('start_date', { ascending: false });

  return {
    profile: profile as Profile | null,
    candidate: candidate as Candidate | null,
    experiences: (experiences || []) as WorkExperience[],
    educations: (educations || []) as Education[],
  };
}

export async function updateCandidateProfile(
  candidateId: string,
  payload: {
    fullName?: string;
    headline?: string;
    bio?: string;
    currentLocation?: string;
    preferredLocation?: string;
    skills?: string[];
    languages?: string[];
  }
) {
  if (payload.fullName) {
    await supabase
      .from('profiles')
      .update({ full_name: payload.fullName, updated_at: new Date().toISOString() } as any)
      .eq('id', candidateId);
  }

  let completionScore = 40;
  if (payload.headline) completionScore += 15;
  if (payload.bio) completionScore += 15;
  if (payload.skills && payload.skills.length > 0) completionScore += 15;
  if (payload.languages && payload.languages.length > 0) completionScore += 15;

  const { data, error } = await supabase
    .from('candidates')
    .upsert({
      id: candidateId,
      headline: payload.headline,
      bio: payload.bio,
      current_location: payload.currentLocation,
      preferred_location: payload.preferredLocation || 'UAE',
      skills: payload.skills,
      languages: payload.languages,
      profile_completion_percentage: completionScore,
      updated_at: new Date().toISOString(),
    } as any)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Candidate;
}

export async function addWorkExperience(candidateId: string, exp: Omit<WorkExperience, 'id' | 'candidate_id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('work_experiences')
    .insert({
      candidate_id: candidateId,
      ...exp,
    } as any)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as WorkExperience;
}

export async function addEducation(candidateId: string, edu: Omit<Education, 'id' | 'candidate_id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('educations')
    .insert({
      candidate_id: candidateId,
      ...edu,
    } as any)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Education;
}
