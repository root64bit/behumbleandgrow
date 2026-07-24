// src/lib/postgresClient.js
// PostgreSQL Database Client & Claim Context Injector for Be Humble & Grow Platform

import { SUPABASE_CONFIG } from './supabaseClient';

/**
 * Prepares session context query setting Firebase Auth JWT claims in PostgreSQL
 * @param {Object} firebaseClaims Decoded Firebase custom claims
 * @returns {String} SQL session parameter statement
 */
export function buildPostgresClaimContext(firebaseClaims) {
  const claimsJson = JSON.stringify({
    sub: firebaseClaims.uid,
    email: firebaseClaims.email,
    app_metadata: {
      user_roles: firebaseClaims.roles || ['candidate'],
      active_org_id: firebaseClaims.activeOrgId || null,
      org_type: firebaseClaims.orgType || null,
      country_code: firebaseClaims.countryCode || 'AE',
      mfa_verified: !!firebaseClaims.mfaVerified,
    },
  });

  return `SET LOCAL request.jwt.claims = '${claimsJson.replace(/'/g, "''")}';`;
}
