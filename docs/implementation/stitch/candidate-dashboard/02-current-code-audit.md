# Current Code Audit — Candidate Portal & Dashboard

## Executive Summary
This document audits the existing Candidate portal and dashboard code prior to integrating the Stitch visual design system.

---

## 1. File & Component Audit

### 1.1 Candidate Page Component
- **File Path:** `src/pages/candidate/CandidateDashboardPage.tsx`
- **Current Behavior:** Uses synchronous `CandidateService` static mock getters to render 7 cards in a single vertical stack.
- **Issues Identified:**
  - Lacks real loading, error, and empty states.
  - Does not connect to `useAuth()` to retrieve the currently logged-in candidate profile or user session.
  - Lacks mobile-first Stitch responsive layout and bottom navigation bar integration.

### 1.2 Layout & Navigation Components
- **Candidate Layout:** `src/layouts/CandidateLayout.tsx`
  - Integrates `CandidateSidebar`, `CandidateTopbar`, and `CandidateBottomNavigation`.
  - Currently contains generic Slate color styles (`bg-slate-50`, `bg-[#0B2342]`) rather than Stitch palette (`#FAF9FC`, `#0F2747`, `#006D44`).
- **Candidate Sidebar:** `src/components/candidate/CandidateSidebar.tsx`
  - Contains candidate routes: Dashboard, Profile, Documents, Eligibility, Jobs, Applications, Interviews, Offers, Placement, Support.
  - Active route matching uses `useLocation()`.
- **Candidate Topbar:** `src/components/candidate/CandidateTopbar.tsx`
  - Displays user header, search, notification trigger, and profile avatar.
- **Candidate Bottom Navigation:** `src/components/candidate/CandidateBottomNavigation.tsx`
  - Mobile navigation bar with quick links. Needs alignment with Stitch icons and styling.

### 1.3 Service & Hooks Audit
- **Service:** `src/services/candidate.service.ts`
  - Provides static mock data for `getCandidateSummary`, `getNextStep`, `getJourneySteps`, `getProfileSections`, `getDocuments`, `getRecommendedJobs`, `getApplications`, `getInterviews`, `getConditionalOffer`, `getPlacementProgress`.
  - Also includes Supabase query fallbacks for `getCandidateProfile`, `updateCandidateProfile`, `getCandidateDocuments`, and `getCandidateApplications`.
  - **Gap:** Data queries are scattered between static mock arrays and partial Supabase queries. A unified composition hook `useCandidateDashboard` is needed to derive real authenticated user state with safe fallbacks.

### 1.4 Auth & Access Control
- **Auth Provider:** `src/lib/auth/AuthContext.tsx`
  - `useAuth()` hook provides `user`, `session`, `profile`, `candidate`, `userRoles`, `isEmailVerified`, `isSuspended`, `logout`, `refreshAuth`.
- **Route Protection:** `src/routes/index.tsx`
  - Protected with `<ProtectedRoute requireEmailVerified={false}><RoleGuard allowedRoles={['candidate']}>`.
  - Unauthenticated users redirect to `/login`. Non-candidate users redirect to `/access-denied`.

---

## 2. Route Inventory & Canonical Verification
| Navigation Item | Canonical Target Route | Status | Guarded? |
|---|---|---|---|
| Dashboard | `/candidate/dashboard` | Active | Yes (`candidate`) |
| Profile | `/candidate/profile` | Active | Yes (`candidate`) |
| Documents | `/candidate/documents` | Active | Yes (`candidate`) |
| Jobs | `/candidate/jobs` | Active | Yes (`candidate`) |
| Applications | `/candidate/applications` | Active | Yes (`candidate`) |
| Interviews | `/candidate/interviews` | Active | Yes (`candidate`) |
| Offers | `/candidate/offers` | Active | Yes (`candidate`) |
| Placement | `/candidate/placement` | Active | Yes (`candidate`) |
| Support | `/candidate/support` | Active | Yes (`candidate`) |
| Settings | `/candidate/settings` | Active | Yes (`candidate`) |

---

## 3. Required Action Plan for Phase A1
1. **Design System Token Alignment:** Centralize Stitch design tokens (navy `#0F2747`, emerald `#006D44`, light green `#7DF7B6`, background `#FAF9FC`) and typography (Plus Jakarta Sans & Inter).
2. **Unified Hook (`useCandidateDashboard`):** Create a dedicated composition hook that fetches authentic Supabase data for the logged-in user with strict error boundary & loading indicators.
3. **Modular Sub-components:** Refactor dashboard widgets into granular, tested components with loading skeletons, empty states, and responsive grids.
4. **Layout Enhancement:** Update `CandidateLayout` and mobile navigation bar to reflect Stitch aesthetics while supporting both 390px mobile and 1440px desktop screens.
5. **Strict Auth & Compliance:** Enforce strict RBAC routing, remove any hardcoded candidate overrides for logged-in users, add legal disclaimer on conditional offers, and protect internal notes.
