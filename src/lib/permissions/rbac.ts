import type { UserRoleName } from '../supabase/types';

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
  return userRoles.some((role) => targetRoles.includes(role));
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
