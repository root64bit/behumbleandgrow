# Current Code Audit — Candidate Profile Component & Data Layer

## Executive Summary
Audited `src/pages/candidate/CandidateProfilePage.tsx`, `candidate.service.ts`, database schemas, and current form state.

---

## 1. Key Gaps & Inconsistencies Identified
1. **Hardcoded Identity Fallback:** Component defaults to "Amina Mabote" when `user` is null or database returns no record, violating Rule #1 from Phase A1/A2 (Demo data must require `VITE_DEMO_DATA_ENABLED=true` in DEV).
2. **Missing Profile Sections:** Current profile page only renders basic inputs for Name, Headline, Location, Skills string, Languages string, Bio, Work Experience, and Education. It lacks:
   - Personal Info (DOB, Nationality, Passport masked display)
   - Contact Info (Phone code, WhatsApp, Address, Preferred contact method)
   - Skills Editor (Proficiency taxonomy)
   - Languages Editor (Proficiency scale: Basic, Conversational, Professional, Fluent, Native)
   - Certifications List & Form
   - Employment Preferences Form (Preferred Emirates, Minimum AED salary)
   - Relocation Availability Form & Visa Disclaimer
3. **No Centralized Profile Completion Logic:** Completion percentage was hardcoded or loosely calculated without a unified function (`src/lib/candidate/profileCompletion.ts`).
4. **Lack of Stitch Styling & Structure:** Missing hero completion ring gauge, accordion section navigator, and design tokens (`#0F2747`, `#006D44`, `#FAF9FC`).

---

## 2. Remediation Plan
1. Create `src/lib/candidate/profileCompletion.ts` for deterministic completion calculation across Dashboard & Profile.
2. Create dedicated data hook `src/hooks/candidate/useCandidateProfile.ts` for loading & mutating profile sections via Supabase RLS.
3. Build modular sub-components for all 10 profile sections under `src/components/candidate/profile/`.
4. Enforce strict auth identity resolution (`auth.uid()`).
