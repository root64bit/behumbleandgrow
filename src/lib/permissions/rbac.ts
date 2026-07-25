import type { UserRoleName } from '../supabase/types';

export const SUPER_ADMIN_ROLES: UserRoleName[] = [
  'super_admin'
];

export const OPERATIONS_ROLES: UserRoleName[] = [
  'operations_admin',
  'operations_manager',
  'candidate_reviewer',
  'document_reviewer',
  'finance_reviewer',
  'support_agent',
];

export const RECRUITER_ROLES: UserRoleName[] = [
  'recruitment_partner_admin',
  'recruitment_manager',
  'recruiter',
  'interview_coordinator',
];

export const EMPLOYER_ROLES: UserRoleName[] = [
  'employer_admin',
  'employer_reviewer',
];

export function hasRole(userRoles: UserRoleName[], targetRoles: UserRoleName[]): boolean {
  if (userRoles.includes('super_admin')) return true;
  return userRoles.some((role) => targetRoles.includes(role));
}

export function isSuperAdminUser(userRoles: UserRoleName[]): boolean {
  return hasRole(userRoles, SUPER_ADMIN_ROLES);
}

export function isOperationsUser(userRoles: UserRoleName[]): boolean {
  return hasRole(userRoles, OPERATIONS_ROLES);
}

export function isRecruiterUser(userRoles: UserRoleName[]): boolean {
  return hasRole(userRoles, RECRUITER_ROLES);
}

export function isEmployerUser(userRoles: UserRoleName[]): boolean {
  return hasRole(userRoles, EMPLOYER_ROLES);
}

export function isCandidateUser(userRoles: UserRoleName[]): boolean {
  return userRoles.includes('candidate');
}

/**
 * Returns the single authoritative default landing page for a set of database roles
 */
export function getRoleDefaultRoute(userRoles: UserRoleName[]): string {
  if (!userRoles || userRoles.length === 0) return '/login';
  if (userRoles.includes('super_admin')) return '/superadmin';
  if (hasRole(userRoles, OPERATIONS_ROLES)) return '/operations';
  if (hasRole(userRoles, RECRUITER_ROLES)) return '/recruiter/dashboard';
  if (hasRole(userRoles, EMPLOYER_ROLES)) return '/employer';
  if (userRoles.includes('candidate')) return '/candidate/dashboard';
  return '/candidate/dashboard';
}
