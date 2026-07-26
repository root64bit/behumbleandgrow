# 11 — Employer Disclosure Security Audit

- **Policy**: Candidate modules restrict disclosure of exact Employer company names until candidates reach authorized interview / offer stages.
- **Pre-Authorisation Projection**: `"Approved UAE Employer"`
- **Post-Authorisation Projection**: Verified Employer Company Name (e.g., `"Dubai Central Hospital"`)
- **Modules Covered**: Applications List, Application Details, Interviews List, Interview Details, Offers List, Offer Details, Placement Overview, Support Ticket Context.
- **Security Check**: Network layer excludes direct employer organization ID / company name fields unless `employer_disclosure_status` is explicitly `'disclosed'`.
