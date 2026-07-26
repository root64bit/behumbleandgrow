import { supabase } from './client';

export interface StagingHealthStatus {
  authReachable: boolean;
  databaseReachable: boolean;
  storageReachable: boolean;
  timestamp: string;
}

/**
 * Development-only health check to verify backend service connectivity
 * Reports reachability status without exposing keys or credentials.
 */
export async function checkStagingHealth(): Promise<StagingHealthStatus> {
  let authReachable = false;
  let databaseReachable = false;
  let storageReachable = false;

  // 1. Auth Reachability Check
  try {
    const { error } = await supabase.auth.getSession();
    authReachable = !error;
  } catch (err) {
    authReachable = false;
  }

  // 2. Database Reachability Check
  try {
    const { error } = await supabase.from('jobs').select('id').limit(1);
    // If query completes without network error (even if 0 rows returned), DB API is reachable
    databaseReachable = !error || error.code === 'PGRST116';
  } catch (err) {
    databaseReachable = false;
  }

  // 3. Storage Reachability Check
  try {
    const { error } = await supabase.storage.listBuckets();
    storageReachable = !error;
  } catch (err) {
    storageReachable = false;
  }

  return {
    authReachable,
    databaseReachable,
    storageReachable,
    timestamp: new Date().toISOString(),
  };
}
