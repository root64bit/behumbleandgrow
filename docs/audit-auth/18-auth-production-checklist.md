# 18. Authentication Production Checklist
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Pre-Production Launch Verification Checklist

- [x] **Single Authoritative Identity Provider**: Supabase Auth configured with PKCE flow.
- [x] **No Exposed Secrets**: Anon key used in client bundle; secret keys stored in Supabase Edge Secrets.
- [x] **Candidate Registration & Trigger**: `handle_new_user()` trigger auto-provisions profile, candidate, and role.
- [x] **Password Recovery**: Non-enumerating reset link flow via `resetPasswordForEmail()`.
- [x] **Private Document Storage**: 30-minute signed URLs generated server-side for private document access.
- [ ] **Route Guard Development Bypass Removed**: Delete DEV short-circuits in `RouteGuards.tsx`.
- [ ] **Real Authentication on Secondary Portals**: Connect Operations, Partner, and Employer login pages to Supabase.
- [ ] **Real Invitation Token Engine**: Validate single-use tokens against `public.invitations`.
- [ ] **MFA for Privileged Roles**: Require TOTP MFA for Super Admin and Operations accounts.
- [ ] **Security Event Logging**: Audit log table created and populated on security events.
- [ ] **Playwright E2E Verification**: Automated browser tests passing for all portals.
