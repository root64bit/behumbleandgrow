# 09. Organisation Membership Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Multi-Tenant Organisation Membership Structure

- **Table Schema**: `public.user_roles` links `profile_id`, `role`, and `organisation_id`.
- **Organisation Types**:
  - `platform_hq`: Operations & Super Admin staff.
  - `recruitment_partner`: Licensed recruitment agencies.
  - `employer`: Corporate hiring entities in the UAE.

---

## 2. Multi-Tenant Isolation Vulnerability Audit

| Vulnerability Scenario | Existing Control | Status | Audit Finding |
| :--- | :--- | :---: | :--- |
| **Partner A accessing Partner B Leads** | RLS policy on `lead_assignments` checks `organisation_id` | 🟡 `PARTIALLY IMPLEMENTED` | Database policies exist, but UI does not yet filter leads dynamically by `activeOrgId`. |
| **Employer A accessing Employer B Jobs** | RLS policy on `jobs` checks `employer_id` | 🟡 `PARTIALLY IMPLEMENTED` | Database policies exist, but UI query uses fallback mocks. |
| **Candidate self-assigning Organisation ID** | DB trigger ignores user metadata `organisation_id` | ✅ `SECURE` | Candidate registration cannot set `organisation_id`. |
