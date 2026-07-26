# 11. Row-Level Security (RLS) Integration Audit
**Platform**: Be Humble & Grow  
**Audit Date**: July 25, 2026  

---

## 1. RLS Policy Inventory Across Core Database Tables

| Database Table | RLS Status | SELECT Policy | INSERT / UPDATE Policy | Status |
| :--- | :---: | :--- | :--- | :---: |
| **`public.profiles`** | **ENABLED** | `id = auth.uid()` | `id = auth.uid()` | ✅ `SECURE` |
| **`public.candidates`** | **ENABLED** | `id = auth.uid()` | `id = auth.uid()` | ✅ `SECURE` |
| **`public.jobs`** | **ENABLED** | `status = 'published'` | Employer / Admin restrict | ✅ `SECURE` |
| **`public.applications`** | **ENABLED** | Candidate ID or Employer | Candidate self-insert | ✅ `SECURE` |
| **`public.payments`** | **ENABLED** | `user_id = auth.uid()` | Restricted to Edge Server | ✅ `SECURE` |

---

## 2. Test Flaw: Synthetic Unit Test Assertions (`isolation.test.ts`)

In `src/test/isolation.test.ts`:
```typescript
it('1. Candidate A cannot read Candidate B profile', () => {
  const isOwner = candidateA.id === candidateB.id;
  expect(isOwner).toBe(false);
});
```
*Audit Note*: These Vitest unit tests evaluate client-side JavaScript boolean equality rather than executing real SQL queries against Supabase RLS. True RLS verification requires running Supabase Local CLI with authenticated database sessions.
