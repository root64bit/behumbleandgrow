# Data Integration Specification — Candidate Dashboard

## Overview
This document specifies how the Candidate Dashboard connects to PostgreSQL via Supabase RLS and `useAuth()`.

---

## 1. Identity Resolution Architecture
```text
Supabase User (Auth Session)
       │
       ▼
   auth.uid()
       │
       ├──────────────────────────────┬─────────────────────────────┐
       ▼                              ▼                             ▼
profiles (id = auth.uid())    candidates (id = auth.uid())   notifications (user_id = auth.uid())
       │                              │
       ▼                              ├──────────────────────┬──────────────────────┬──────────────────────┐
candidate_documents                   ▼                      ▼                      ▼                      ▼
(candidate_id = auth.uid())      applications           interviews             job_offers             placements
                                (candidate_id)         (candidate_id)         (candidate_id)         (candidate_id)
```

---

## 2. ResourceState<T> Pattern
To ensure section-level resilience, each resource is encapsulated within a `ResourceState<T>` container:

```ts
export type ResourceState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
```

If one query fails (e.g. `loadRecommendedJobs`), only `jobs.error` is set, allowing other sections to render cleanly.

---

## 3. Mandatory Demo Data Guard
Demo fallback data is controlled strictly by:

```ts
export const isDemoDataAllowed = (): boolean => {
  return (
    import.meta.env.DEV === true &&
    import.meta.env.VITE_DEMO_DATA_ENABLED === 'true'
  );
};
```

In staging and production, `VITE_DEMO_DATA_ENABLED` is missing/false, ensuring zero exposure of demo identities. Empty Supabase responses render real empty states rather than triggering demo fallbacks.
