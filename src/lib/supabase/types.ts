export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrgType =
  | 'platform'
  | 'platform_hq'
  | 'recruitment_partner'
  | 'employer'
  | 'country_partner'
  | 'training_institution'
  | 'service_provider';

export type CandidateStage =
  | 'registered'
  | 'eligibility_passed'
  | 'onboarding'
  | 'verified'
  | 'lead_assigned'
  | 'partner_interview'
  | 'employer_submitted'
  | 'employer_interview'
  | 'offer_issued'
  | 'offer_accepted'
  | 'visa_processing'
  | 'placed'
  | 'rejected'
  | 'withdrawn';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type DocClassification =
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted'
  | 'secret';

export type UserRoleName =
  | 'candidate'
  | 'super_admin'
  | 'operations_admin'
  | 'operations_manager'
  | 'candidate_reviewer'
  | 'document_reviewer'
  | 'finance_reviewer'
  | 'support_agent'
  | 'recruitment_partner_admin'
  | 'recruitment_manager'
  | 'recruiter'
  | 'interview_coordinator'
  | 'employer_admin'
  | 'employer_reviewer'
  | 'read_only';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  country_code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Organisation {
  id: string;
  name: string;
  type: OrgType;
  country_code: string;
  license_number?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  organisation_id?: string | null;
  stage: CandidateStage;
  verification_status: string;
  headline?: string | null;
  bio?: string | null;
  current_location?: string | null;
  preferred_location?: string | null;
  skills?: string[] | null;
  languages?: string[] | null;
  profile_completion_percentage?: number | null;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: string;
  candidate_id: string;
  company_name: string;
  job_title: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current?: boolean | null;
  description?: string | null;
  created_at: string;
}

export interface Education {
  id: string;
  candidate_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string | null;
  grade?: string | null;
  created_at: string;
}

export interface CandidateDocument {
  id: string;
  candidate_id: string;
  document_type: string;
  file_name: string;
  storage_path: string;
  mime_type: string;
  file_size: number;
  expiry_date?: string | null;
  classification: DocClassification;
  verification_status: string;
  review_notes?: string | null;
  uploaded_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  slug?: string | null;
  description: string;
  country_code: string;
  location?: string | null;
  salary_range?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  partner_id?: string | null;
  stage: CandidateStage;
  status: string;
  screening_answers?: Record<string, any> | null;
  consent_given: boolean;
  submitted_at: string;
  updated_at: string;
}

export interface StatusHistory {
  id: string;
  entity_type: string;
  entity_id: string;
  previous_status?: string | null;
  new_status: string;
  changed_by?: string | null;
  user_role?: string | null;
  organisation_id?: string | null;
  candidate_message?: string | null;
  internal_note?: string | null;
  created_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role_id: string;
  organisation_id?: string | null;
  scope: string;
  created_at: string;
  role?: {
    name: UserRoleName;
  };
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      organisations: { Row: Organisation; Insert: Partial<Organisation>; Update: Partial<Organisation> };
      candidates: { Row: Candidate; Insert: Partial<Candidate>; Update: Partial<Candidate> };
      work_experiences: { Row: WorkExperience; Insert: Partial<WorkExperience>; Update: Partial<WorkExperience> };
      educations: { Row: Education; Insert: Partial<Education>; Update: Partial<Education> };
      candidate_documents: { Row: CandidateDocument; Insert: Partial<CandidateDocument>; Update: Partial<CandidateDocument> };
      jobs: { Row: Job; Insert: Partial<Job>; Update: Partial<Job> };
      applications: { Row: Application; Insert: Partial<Application>; Update: Partial<Application> };
      status_history: { Row: StatusHistory; Insert: Partial<StatusHistory>; Update: Partial<StatusHistory> };
    };
  };
}
