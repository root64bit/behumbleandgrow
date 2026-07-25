import type { UserRoleName } from '../supabase/types';

export interface StagingTestUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleName;
  organisationId?: string;
  status: 'active' | 'suspended';
  description: string;
}

const RAW_STAGING_TEST_USERS: StagingTestUser[] = [
  {
    id: 'user-cand-a',
    email: 'candidate.a@staging.test',
    fullName: 'Amina Mabote (Test Candidate A)',
    role: 'candidate',
    status: 'active',
    description: 'Primary candidate test profile for application flow testing.',
  },
  {
    id: 'user-cand-b',
    email: 'candidate.b@staging.test',
    fullName: 'Carlos Cumbane (Test Candidate B)',
    role: 'candidate',
    status: 'active',
    description: 'Secondary candidate test profile for data isolation verification.',
  },
  {
    id: 'user-ops-reviewer',
    email: 'ops.reviewer@staging.test',
    fullName: 'Operations Officer (Test Reviewer)',
    role: 'document_reviewer',
    status: 'active',
    description: 'Internal reviewer account for candidate dossier & application verification.',
  },
  {
    id: 'user-partner-a-admin',
    email: 'partner.a@staging.test',
    fullName: 'Recruitment Partner A Admin',
    role: 'recruitment_partner_admin',
    organisationId: 'org-partner-a',
    status: 'active',
    description: 'Partner administrator for Agency A lead management.',
  },
  {
    id: 'user-partner-b-admin',
    email: 'partner.b@staging.test',
    fullName: 'Recruitment Partner B Admin',
    role: 'recruitment_partner_admin',
    organisationId: 'org-partner-b',
    status: 'active',
    description: 'Partner administrator for Agency B (isolated tenant).',
  },
  {
    id: 'user-employer-a-admin',
    email: 'employer.a@staging.test',
    fullName: 'Employer A (Premier Hospitality Dubai)',
    role: 'employer_admin',
    organisationId: 'org-employer-a',
    status: 'active',
    description: 'Employer administrator for Hospitality Group A.',
  },
  {
    id: 'user-employer-b-admin',
    email: 'employer.b@staging.test',
    fullName: 'Employer B (Al Maktoum Hotels)',
    role: 'employer_admin',
    organisationId: 'org-employer-b',
    status: 'active',
    description: 'Employer administrator for Hotel Group B (isolated tenant).',
  },
  {
    id: 'user-cand-suspended',
    email: 'suspended.candidate@staging.test',
    fullName: 'Suspended Candidate (Test Account)',
    role: 'candidate',
    status: 'suspended',
    description: 'Suspended candidate account for security denial testing.',
  },
  {
    id: 'user-org-suspended',
    email: 'suspended.partner@staging.test',
    fullName: 'Suspended Partner Member',
    role: 'recruiter',
    organisationId: 'org-partner-suspended',
    status: 'suspended',
    description: 'Suspended organization member for access denial testing.',
  },
];

/**
 * Returns staging test users only in DEV or STAGING environments.
 * Returns empty array in PRODUCTION mode to prevent client-side account creation.
 */
export function getStagingTestUsers(): StagingTestUser[] {
  if (import.meta.env.PROD) {
    return [];
  }
  return RAW_STAGING_TEST_USERS;
}

export const STAGING_TEST_USERS = getStagingTestUsers();
