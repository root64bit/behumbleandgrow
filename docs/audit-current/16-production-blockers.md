# 16. Current Production Blockers

## 16.1 Categorized Production Blockers

### 1. Blockers for Closed Candidate Pilot
- **BLK-01**: **No API Persistence**: Applications and uploaded documents are not saved to a backend database.
- **BLK-02**: **No Authentication**: Candidate registration and login flows do not issue session tokens or protect candidate profiles.
- **BLK-03**: **Committed Secrets**: Exposed Firebase API credentials in `.env` must be revoked before candidate traffic is accepted.

### 2. Blockers for Paid Advertising
- **BLK-04**: **Non-Persistent Funnel**: Candidates arriving via paid ads cannot complete registration or save eligibility results.
- **BLK-05**: **Unverified Legal Consent**: Mandatory GDPR and UAE Data Protection consent agreements are not bound to candidate profiles.

### 3. Blockers for Live Payments
- **BLK-06**: **Unverified Payment Status**: Candidate verification fee payment status is visually hardcoded (`Paid ($150 AED)`) without Stripe/Square API capture or webhook signature validation.
- **BLK-07**: **Legal Merchant Compliance**: Recruitment candidate fee structure legal eligibility is unverified with merchant payment processors.

### 4. Blockers for Recruitment Partner Onboarding
- **BLK-08**: **Unenforced Tenant Isolation**: Recruitment partner agency dashboards rely on hardcoded portal tabs (`PortalNavigation.jsx`) without tenant boundary security.

### 5. Blockers for Public Production Launch
- **BLK-09**: **Unapplied Database Migrations**: Database schema (`20260724000001_security_schema.sql`) and RLS policies are unapplied.
- **BLK-10**: **Zero Automated Test Coverage**: No unit or end-to-end tests exist to guard against production regressions.
