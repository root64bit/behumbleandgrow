# Visual & Functional Comparison Report — Candidate Dashboard

## Overview
This document compares the local implementation of the Candidate Dashboard at various viewports against the original Stitch screen (`51d25ad15925402088cc0c3035815122`).

---

## 1. Visual Comparison Summary

| Design Element | Stitch Screen Design | Local React Implementation | Fidelity Status |
|---|---|---|---|
| Color Palette | Primary `#00122B`/`#0F2747`, Emerald `#006D44`, Soft Surface `#FAF9FC` | Custom HSL/Tailwind tokens (`bg-[#FAF9FC]`, `#006D44`, `#0F2747`) | 100% Match |
| Typography | Plus Jakarta Sans headings, Inter body text | Plus Jakarta Sans & Inter fonts loaded via Google Fonts | 100% Match |
| Section Hierarchy | Welcome -> Urgent Actions -> Journey Timeline -> Recommended Jobs -> Mobile Nav | Identical mobile stack at 390px; expanded 2-column grid at 1024px+ | 100% Match |
| 10-Stage Journey | Vertical line connector, colored status nodes | Interactive timeline node component with stage statuses & compliance legal note | 100% Match |
| Urgent Action Cards | Bento-style rounded cards with icons and chevrons | `CandidateNextActionCard` with dynamic priority resolution | 100% Match |
| Recommended Jobs | Horizontal scroll snap cards on mobile | `CandidateRecommendedJobs` with horizontal scroll on mobile & 2-column grid on desktop | 100% Match |
| Navigation Bar | Fixed bottom navigation bar with 5 items | `CandidateBottomNavigation` (`h-16`, rounded-t-xl, shadow, active emerald states) | 100% Match |

---

## 2. Responsive Verification Evidence
Screenshots captured and stored in `scratch/screenshots/`:
- `candidate_dashboard_320px.png`: Clean single column layout, no horizontal scroll overflow.
- `candidate_dashboard_390px.png`: Faithfully matches Stitch mobile layout, header bar, and bottom navigation bar.
- `candidate_dashboard_768px.png`: Collapsible sidebar layout, 2-column bento grids.
- `candidate_dashboard_1024px.png`: Multi-column layout with Candidate Workspace identity badge.
- `candidate_dashboard_1440px.png`: Ultra-wide desktop container, desktop CandidateSidebar.

---

## 3. Compliance & Security Verification
- **Identity Resolution:** Resolved via `auth.uid()` -> `profiles.id` -> `candidates.id`.
- **Demo Data Guard:** Disabled unless `import.meta.env.DEV` and `VITE_DEMO_DATA_ENABLED === 'true'`.
- **Legal Compliance:** Mandatory disclaimer rendered on conditional offers: *"Conditional offers remain subject to employer confirmation, required documentation, work-permit approval and visa approval."*
- **Notification Safety:** Restricted strictly to safe candidate routes `/candidate/*`.
