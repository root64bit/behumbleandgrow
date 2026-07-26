import { supabase } from '../lib/supabase/client';
import type { Job } from '../lib/supabase/types';

export async function getPublishedJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, employers(industry, company_website, organisations(name))')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published jobs:', error);
    return [];
  }

  return (data || []) as Job[];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, employers(industry, company_website, organisations(name))')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    return null;
  }

  return data as Job;
}
