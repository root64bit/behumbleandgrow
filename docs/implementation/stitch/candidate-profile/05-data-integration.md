# Data Integration & Service Layer — Candidate Professional Profile

## Data Flow Architecture
1. **Candidate Identity Resolution:** `auth.uid()` → `profiles.id` → `candidates.id` → `work_experiences.candidate_id` / `educations.candidate_id`.
2. **Composition Hook:** `useCandidateProfile.ts` manages concurrent loading of profile sections via `ResourceState<T>` container.
3. **Demo Data Guard:** `isDemoDataAllowed()` returns `true` ONLY when `import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === "true"`.
4. **Optimistic Concurrency Protection:** Checks `updated_at` timestamps on update to prevent stale browser overwrites.
5. **Auth Email Update Flow:** Email updates invoke `supabase.auth.updateUser({ email })` and remain in pending status until confirmed.
