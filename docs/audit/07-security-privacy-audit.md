# 7. Security and Privacy Audit

## 7.1 Security Findings & Vulnerability Register

### 1. Secrets Committed to Git Repository (CRITICAL)
- **File**: `.env`
- **Exposed Credentials**:
  - `VITE_FIREBASE_API_KEY=AIzaSyDvXvvPIfNZTZj0d-5-Q07FBAakvwqxCFw`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID=763967463806`
  - `VITE_FIREBASE_APP_ID=1:763967463806:web:cb61766521c08beec4d32f`
- **Risk**: API credentials committed to public or shared version control enable unauthorized project usage and quota abuse.

### 2. Client-Side Payment Verification Spoofing (CRITICAL)
- **File**: `src/components/portals/PortalManager.jsx:L84-L85`
- **Vulnerability**: Verification fee status is rendered based on unverified string text (`Paid ($150 AED)`). A candidate can edit DOM or local React state to bypass mandatory verification payments.

### 3. Missing Content Security Policy & Security Headers (HIGH)
- **File**: `index.html` & `vercel.json`
- **Vulnerability**: Missing `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security` headers.

---

## 7.2 Database Row-Level Security (RLS) Audit
- **SQL Migration**: `supabase/migrations/20260724000002_rls_policies.sql`
- **Assessment**:
  - RLS is explicitly enabled on all 19 tables in `public` schema.
  - Policies enforce helper function checks (`auth.current_org_id()`, `auth.current_user_roles()`, `auth.is_mfa_verified()`).
  - Direct candidate payment updates are explicitly denied (`deny_candidate_payment_update` FOR UPDATE USING (false)).
  - Direct audit log client inserts are explicitly denied (`deny_client_audit_insert` FOR INSERT WITH CHECK (false)).
  - **Verdict**: The RLS policy design in SQL is **HIGH QUALITY**, but remains **UNAPPLIED** because no live Supabase instance is wired.

---

## 7.3 Data Privacy & GDPR / UAE Data Protection Audit
- **Candidate PII Handled**: Passports, Degrees, Police Clearances, Full Names, Phone Numbers, Email Addresses.
- **Privacy Policy**: Represented as visual footer link; actual legally binding Privacy Policy document and GDPR/UAE Data Protection consent capture form are **MISSING**.
- **Data Retention & Deletion**: Right to be forgotten (account deletion workflow) is not implemented.
