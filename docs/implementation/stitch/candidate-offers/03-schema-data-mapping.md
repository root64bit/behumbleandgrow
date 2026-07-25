# Schema & Data Mapping — Phase A8: Candidate Conditional Offers List

## Candidate Ownership Chain
```text
auth.uid()
→ profiles.id
→ candidates.id
→ applications.candidate_id = auth.uid()
→ offers.application_id = applications.id
```

## Field Mapping Matrix

| Offer Concern | Actual Source Field | Ownership Filter | Candidate-Visible Field | Security Rule |
|---|---|---|---|---|
| Offer Identity | `offers.id` | `applications.candidate_id = auth.uid()` | `id` | Relational filter |
| Offer Reference | `offers.reference` | Candidate ownership | `reference` | Projected only |
| Position & Job | `jobs.title`, `jobs.location` | Candidate ownership | `jobTitle`, `location` | Projected only |
| Employer Display | `employers.name`, `applications.employer_disclosure_status` | Candidate ownership | `employerDisplayName` | Masked if undisclosed |
| Salary & Currency | `offers.salary`, `offers.currency` | Candidate ownership | `salary`, `currency` | Exact format AED |
| Benefits | `offers.benefits` | Candidate ownership | `benefitsSummary` | Structured tags |
| Offer Lifecycle | `offers.status` | Candidate ownership | `status` | Mapped to status model |
| Candidate Decision | `offers.candidate_decision` | Candidate ownership | `candidateDecision` | Distinct from lifecycle |
| Issue & Expiry Date | `offers.created_at`, `offers.valid_until` | Candidate ownership | `issuedAt`, `expiresAt` | Trusted timestamps |
| Superseded State | `offers.is_superseded`, `offers.replaces_offer_id` | Candidate ownership | `isSuperseded` | Version tracking |
| Internal Notes | `offers.internal_notes` | EXCLUDED | EXCLUDED | Never returned to client |
