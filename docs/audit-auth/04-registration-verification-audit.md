# 04. Registration & Email Verification Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. Candidate Registration End-to-End Tracing

```text
[Candidate Registration Form]
         │
         ▼
[Client-Side Validation] ──(Fails)──> Show Error Message
         │ (Passes)
         ▼
[supabase.auth.signUp({ email, password, options: { emailRedirectTo, data } })]
         │
         ▼
[PostgreSQL Trigger: handle_new_user() ON auth.users]
         ├─► INSERT INTO public.profiles (status='active', default_role='candidate')
         ├─► INSERT INTO public.candidates (stage='registered', verification_status='pending')
         └─► INSERT INTO public.user_roles (role='candidate')
         │
         ▼
[Supabase Auth Server] ──► Delivers Verification Email with PKCE Link
         │
         ▼
[Navigate Client to /verify-email]
```

---

## 2. Parameter Manipulation & Exploit Payload Test Results

We evaluated candidate registration (`RegisterPage.tsx`) against malicious payloads attempting role escalation or unauthorized organization association:

| Malicious Payload Attempt | Target Field | Frontend / Database Handling | Exploit Result | Safety Status |
| :--- | :--- | :--- | :--- | :---: |
| `role: 'super_admin'` | Metadata | Trigger sets `user_roles` strictly to `'candidate'` for public signups. | **REJECTED** | ✅ Safe |
| `role: 'operations_admin'` | Metadata | PostgreSQL trigger ignores user-supplied admin roles. | **REJECTED** | ✅ Safe |
| `organisation_id: 'org-123'` | Metadata | Public signup ignores `organisation_id` metadata. | **REJECTED** | ✅ Safe |
| `status: 'active'` | Metadata | Trigger hardcodes initial candidate status to `'active'`, but verification to `'pending'`. | **NEUTRAL** | ✅ Safe |
| `verification_status: 'verified'`| Metadata | Candidates table inserts `verification_status='pending'` explicitly in SQL trigger. | **REJECTED** | ✅ Safe |

---

## 3. Email Verification Security Findings

- **Redirect URL Validation**: `RegisterPage.tsx` passes `emailRedirectTo: '${window.location.origin}/login'`, ensuring the verification link returns users safely to the application origin.
- **Verification Resend Integration**: `VerifyEmailPage.tsx` calls `supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo } })`.
- **Default Rate Limit Warning**: Default Supabase SMTP infrastructure limits free projects to **3 emails per hour**. For production, custom SMTP (SendGrid, AWS SES, or Postmark) must be configured in the Supabase Dashboard.
