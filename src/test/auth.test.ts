import { describe, it, expect } from 'vitest';
import {
  hasRole,
  isOperationsUser,
  isRecruiterUser,
  isEmployerUser,
  isCandidateUser,
} from '../lib/permissions/rbac';
import type { UserRoleName } from '../lib/supabase/types';

describe('RBAC & Role Isolation Controls', () => {
  it('correctly identifies operations roles', () => {
    const opsUser: UserRoleName[] = ['operations_admin'];
    const candUser: UserRoleName[] = ['candidate'];

    expect(isOperationsUser(opsUser)).toBe(true);
    expect(isOperationsUser(candUser)).toBe(false);
  });

  it('correctly isolates candidate from operations or employer access', () => {
    const candidateRoles: UserRoleName[] = ['candidate'];

    expect(isCandidateUser(candidateRoles)).toBe(true);
    expect(isOperationsUser(candidateRoles)).toBe(false);
    expect(isRecruiterUser(candidateRoles)).toBe(false);
    expect(isEmployerUser(candidateRoles)).toBe(false);
  });

  it('enforces multi-role authorization checks', () => {
    const recruiterRoles: UserRoleName[] = ['recruiter', 'recruitment_manager'];
    expect(hasRole(recruiterRoles, ['recruiter'])).toBe(true);
    expect(hasRole(recruiterRoles, ['employer_admin'])).toBe(false);
  });
});
