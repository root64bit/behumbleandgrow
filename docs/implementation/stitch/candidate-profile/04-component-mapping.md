# Component Mapping — Candidate Professional Profile

## Component Breakdown

| Component Name | File Location | Purpose | Reusable / Page-level |
|---|---|---|---|
| `CandidateProfileHeader` | `src/components/candidate/profile/CandidateProfileHeader.tsx` | Hero card with radial completion gauge ring, candidate ID, eligibility badge, and verification CTA | Reusable |
| `CandidateProfileSectionNav` | `src/components/candidate/profile/CandidateProfileSectionNav.tsx` | Section navigator / accordion tab controls matching Stitch design | Reusable |
| `CandidatePersonalInformationForm` | `src/components/candidate/profile/CandidatePersonalInformationForm.tsx` | Legal name, nationality, and Document Vault passport indicator | Reusable |
| `CandidateContactInformationForm` | `src/components/candidate/profile/CandidateContactInformationForm.tsx` | Phone, address, and Supabase Auth email change flow notice | Reusable |
| `CandidateProfessionalSummaryForm` | `src/components/candidate/profile/CandidateProfessionalSummaryForm.tsx` | Title headline, location, and bio overview textarea | Reusable |
| `CandidateWorkExperienceList` | `src/components/candidate/profile/CandidateWorkExperienceList.tsx` | Timeline nodes & repeatable record-level CRUD | Reusable |
| `CandidateEducationList` | `src/components/candidate/profile/CandidateEducationList.tsx` | Repeatable education record-level CRUD | Reusable |
| `CandidateSkillsEditor` | `src/components/candidate/profile/CandidateSkillsEditor.tsx` | Skill taxonomy selector & atomic section save | Reusable |
| `CandidateLanguagesEditor` | `src/components/candidate/profile/CandidateLanguagesEditor.tsx` | Language proficiency scale (Basic to Native) | Reusable |
| `CandidateCertificationsList` | `src/components/candidate/profile/CandidateCertificationsList.tsx` | Certification list linking evidence to `/candidate/documents` | Reusable |
| `CandidateEmploymentPreferencesForm` | `src/components/candidate/profile/CandidateEmploymentPreferencesForm.tsx` | Preferred roles, emirates, minimum AED salary, matching disclaimer | Reusable |
| `CandidateRelocationForm` | `src/components/candidate/profile/CandidateRelocationForm.tsx` | Relocation availability, travel readiness, UAE visa disclaimer | Reusable |
| `CandidateProfilePhotoEditor` | `src/components/candidate/profile/CandidateProfilePhotoEditor.tsx` | Profile photo upload with 5MB limit & MIME validation | Reusable |
| `CandidateProfileSaveBar` | `src/components/candidate/profile/CandidateProfileSaveBar.tsx` | Sticky global save bar for simple profile fields | Reusable |
| `CandidateProfileSetupState` | `src/components/candidate/profile/CandidateProfileSetupState.tsx` | Setup view for unprovisioned candidate accounts | Reusable |
| `CandidateProfileConflictState` | `src/components/candidate/profile/CandidateProfileConflictState.tsx` | Optimistic concurrency conflict dialog | Reusable |
| `CandidateProfileSectionError` | `src/components/candidate/profile/CandidateProfileSectionError.tsx` | Section-level error boundary | Reusable |
| `CandidateProfileSkeleton` | `src/components/candidate/profile/CandidateProfileSkeleton.tsx` | Stitch skeleton loading loader | Reusable |
| `CandidateProfileErrorState` | `src/components/candidate/profile/CandidateProfileErrorState.tsx` | Fatal page error state | Reusable |
| `CandidateProfilePage` | `src/pages/candidate/CandidateProfilePage.tsx` | Main page view assembled with `CandidateLayout` | Page |
