# Schema & Data Mapping — Phase A9: Candidate Conditional Offer Details & Decision Workflow

## Candidate Ownership Chain
```text
auth.uid()
→ profiles.id
→ candidates.id
→ applications.candidate_id = auth.uid()
→ offers.application_id = applications.id
```

## Field Mapping Matrix

| Offer Detail Concern | Actual Source Field | Ownership Relationship | Candidate-Visible Fields | RLS Policy / Protection |
|---|---|---|---|---|
| Offer Identity | `offers.id` | `applications.candidate_id = auth.uid()` | `id` | Candidate ownership RLS |
| Offer Reference | `offers.reference` | Candidate ownership | `reference` | Projected only |
| Position & Job | `jobs.title`, `jobs.location` | Candidate ownership | `jobTitle`, `jobLocation` | Projected only |
| Employer Display | `employers.name`, `applications.employer_disclosure_status` | Candidate ownership | `employerDisplayName` | Masked if undisclosed |
| Base Salary | `offers.salary`, `offers.currency` | Candidate ownership | `salary`, `currency` | Exact AED format |
| Payment Frequency | `offers.salary_frequency` | Candidate ownership | `salaryFrequency` | Monthly default |
| Allowances & Benefits | `offers.benefits` | Candidate ownership | `benefitsSummary`, `allowances` | Structured benefit chips |
| Contract Type | `offers.contract_type` | Candidate ownership | `contractType` | Limited duration / Permanent |
| Probation Period | `offers.probation_period` | Candidate ownership | `probationPeriod` | Month duration |
| Working Hours | `offers.working_hours` | Candidate ownership | `workingHours` | Hrs/week |
| Proposed Start Date | `offers.start_date` | Candidate ownership | `proposedStartDate` | Non-guaranteed label |
| Offer Issue Date | `offers.created_at` | Candidate ownership | `issuedAt` | Timestamps |
| Offer Expiry | `offers.valid_until` | Candidate ownership | `expiresAt` | Trusted timestamp |
| Document Access | `offers.document_path` | Candidate ownership | Short-lived signed URL | Level 3 ephemeral URL |
| Decision Acceptance | `offers.status`, `offers.candidate_decision` | Candidate ownership | `status`, `decision` | Server RPC / mutation |
| Internal Notes | `offers.internal_notes` | EXCLUDED | EXCLUDED | Never returned to client |
