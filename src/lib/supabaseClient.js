// src/lib/supabaseClient.js
// Secure Supabase Client initialization for Be Humble & Grow Platform

/**
 * Creates client configuration with PKCE auth flow and secure token persistence
 */
export const SUPABASE_CONFIG = {
  url: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || '',
  anonKey: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || '',
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storageKey: 'bhg_auth_token',
    },
  },
};

/**
 * Validates JWT claims payload for required security attributes
 * @param {Object} claims Decoded JWT claims payload
 * @returns {Boolean} Valid status
 */
export function validateClaimsPayload(claims) {
  if (!claims || !claims.sub || !claims.exp) {
    return false;
  }
  const now = Math.floor(Date.now() / 1000);
  if (claims.exp < now) {
    return false;
  }
  return true;
}
