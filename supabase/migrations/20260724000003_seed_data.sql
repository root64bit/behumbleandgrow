-- Migration: 20260724000003_seed_data.sql
-- Description: Production seed data for Be Humble & Grow Platform

-- 1. ORGANISATIONS SEED
INSERT INTO public.organisations (id, name, type, country_code, license_number, status) VALUES
('00000000-0000-0000-0000-000000000001', 'Be Humble & Grow Global HQ', 'platform', 'AE', 'BHG-HQ-9901', 'active'),
('00000000-0000-0000-0000-000000000002', 'Mozambique Talent Solutions', 'recruitment_partner', 'MZ', 'MZ-PARTNER-402', 'active'),
('00000000-0000-0000-0000-000000000003', 'Cape Town Global Placements', 'recruitment_partner', 'ZA', 'ZA-PARTNER-881', 'active'),
('00000000-0000-0000-0000-000000000004', 'Jumeirah Luxury Hospitality Group', 'employer', 'AE', 'AE-EMP-7712', 'active'),
('00000000-0000-0000-0000-000000000005', 'Emirates Healthcare UAE', 'employer', 'AE', 'AE-EMP-9043', 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. ROLES SEED (All 14 Platform Roles)
INSERT INTO public.roles (name, description) VALUES
('candidate', 'Standard Candidate seeking overseas employment'),
('operations_admin', 'Global Operations Administrator with full system oversight'),
('operations_manager', 'Operations Manager supervising candidate pipelines'),
('candidate_reviewer', 'Reviewer assigned to verify candidate eligibility & profiles'),
('document_reviewer', 'Specialized reviewer inspecting confidential candidate documents'),
('finance_reviewer', 'Finance Officer handling payments, refunds, and financial ledgers'),
('support_agent', 'Support Desk Agent handling user tickets'),
('recruitment_partner_admin', 'Administrator for Recruitment Partner Agency'),
('recruitment_manager', 'Manager at Recruitment Partner Agency supervising recruiters'),
('recruiter', 'Recruiter at Partner Agency managing assigned leads'),
('interview_coordinator', 'Coordinator scheduling interviews between candidates & employers'),
('employer_admin', 'Administrator for Employer Organisation'),
('employer_reviewer', 'Hiring Manager at Employer Organisation reviewing candidates'),
('read_only', 'Auditor or Read-Only Access Account')
ON CONFLICT (name) DO NOTHING;

-- 3. RECRUITMENT PARTNERS DETAILS
INSERT INTO public.recruitment_partners (id, license_number, primary_contact_email, compliance_status) VALUES
('00000000-0000-0000-0000-000000000002', 'MZ-PARTNER-402', 'contact@mozambiquetalent.co.mz', 'active'),
('00000000-0000-0000-0000-000000000003', 'ZA-PARTNER-881', 'info@capetownplacements.co.za', 'active')
ON CONFLICT (id) DO NOTHING;

-- 4. EMPLOYERS DETAILS
INSERT INTO public.employers (id, industry, company_website, verification_status) VALUES
('00000000-0000-0000-0000-000000000004', 'Hospitality & Tourism', 'https://jumeirah.com', 'verified'),
('00000000-0000-0000-0000-000000000005', 'Healthcare & Nursing', 'https://emirateshealth.ae', 'verified')
ON CONFLICT (id) DO NOTHING;

-- 5. JOBS SEED
INSERT INTO public.jobs (id, employer_id, title, slug, description, country_code, location, salary_range, status) VALUES
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000004', 'Senior Hospitality Manager - Dubai', 'senior-hospitality-manager-dubai', 'Lead luxury hotel operations in downtown Dubai. Housing and annual flight tickets provided.', 'AE', 'Dubai, UAE', '14,000 - 18,000 AED / month', 'published'),
('11111111-1111-1111-1111-111111111122', '00000000-0000-0000-0000-000000000005', 'Registered ICU Nurse - Abu Dhabi', 'registered-icu-nurse-abu-dhabi', 'High-paying intensive care nursing position at leading private hospital in Abu Dhabi.', 'AE', 'Abu Dhabi, UAE', '12,000 - 15,000 AED / month', 'published')
ON CONFLICT (id) DO NOTHING;
