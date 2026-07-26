// src/lib/authMiddleware.js
// Server-Side Authorisation & Claim Verification Middleware for Be Humble & Grow Platform

/**
 * Validates permission against required permission code and user scopes
 * @param {Object} req Request context containing user JWT claims
 * @param {String} requiredPermission Expected permission (e.g. 'candidate.profile.read_own')
 * @param {Object} options Security options (e.g., mfaRequired, requireOrgMatch)
 */
export function authorizeRequest(req, requiredPermission, options = {}) {
  const { user, claims } = req;

  if (!user || !claims) {
    return { authorized: false, code: 401, error: 'Unauthorized: Missing or invalid token' };
  }

  // 1. Check MFA requirement
  if (options.mfaRequired && !claims.app_metadata?.mfa_verified) {
    return { authorized: false, code: 403, error: 'Forbidden: MFA Verification Required' };
  }

  // 2. Check User Roles & Permissions
  const userRoles = claims.app_metadata?.user_roles || [];
  const userPermissions = claims.app_metadata?.permissions || [];

  // Super Admin bypass for operational actions (Audit log immutable bypass is denied)
  if (userRoles.includes('super_admin') && requiredPermission !== 'audit.log.bypass') {
    return { authorized: true, user, scope: 'global' };
  }

  const hasPermission = userPermissions.includes(requiredPermission);
  if (!hasPermission) {
    return { 
      authorized: false, 
      code: 403, 
      error: `Forbidden: Missing required permission [${requiredPermission}]` 
    };
  }

  // 3. Organisation Isolation Check
  if (options.requireOrgMatch) {
    const activeOrgId = claims.app_metadata?.active_org_id;
    const targetOrgId = req.params?.orgId || req.body?.organisation_id;

    if (!activeOrgId || (targetOrgId && activeOrgId !== targetOrgId)) {
      return { 
        authorized: false, 
        code: 403, 
        error: 'Forbidden: Cross-tenant access attempt blocked' 
      };
    }
  }

  // 4. Record Ownership Check (ABAC)
  if (options.requireOwnership) {
    const targetUserId = req.params?.userId || req.body?.candidate_id;
    if (targetUserId && claims.sub !== targetUserId) {
      return { 
        authorized: false, 
        code: 403, 
        error: 'Forbidden: Record ownership violation' 
      };
    }
  }

  return { authorized: true, user, scope: claims.app_metadata?.scope || 'organisation' };
}

/**
 * Builds structured audit log payload
 */
export function createAuditEvent({ actorId, actorRole, orgId, action, resource, ipAddress, userAgent, metadata = {} }) {
  return {
    actor_id: actorId,
    actor_role: actorRole,
    org_id: orgId,
    action,
    resource,
    ip_address: ipAddress,
    user_agent: userAgent,
    metadata,
    created_at: new Date().toISOString(),
  };
}
