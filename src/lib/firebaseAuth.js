// src/lib/firebaseAuth.js
// Firebase Authentication Client & Custom Claims Helper for Be Humble & Grow Platform

import { FIREBASE_CONFIG } from './firebaseClient';

/**
 * Extracts and parses custom user claims from a Firebase ID token payload
 * @param {Object} decodedToken Decoded Firebase ID Token
 * @returns {Object} Claims summary
 */
export function extractFirebaseUserClaims(decodedToken) {
  if (!decodedToken) return null;

  return {
    uid: decodedToken.uid || decodedToken.sub,
    email: decodedToken.email,
    roles: decodedToken.user_roles || ['candidate'],
    activeOrgId: decodedToken.active_org_id || null,
    orgType: decodedToken.org_type || null,
    countryCode: decodedToken.country_code || 'AE',
    mfaVerified: !!decodedToken.mfa_verified,
    permissions: decodedToken.permissions || [],
  };
}

/**
 * Formats custom claims object for setting via Firebase Admin SDK
 */
export function buildCustomClaimsPayload({ roles, activeOrgId, orgType, countryCode, mfaVerified, permissions }) {
  return {
    user_roles: roles || ['candidate'],
    active_org_id: activeOrgId || null,
    org_type: orgType || 'recruitment_partner',
    country_code: countryCode || 'AE',
    mfa_verified: !!mfaVerified,
    permissions: permissions || [],
  };
}
