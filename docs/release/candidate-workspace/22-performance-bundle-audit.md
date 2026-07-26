# 22 — Performance & Bundle Chunk Audit

- **Production Bundle Size**:
  - `dist/assets/CandidateSettingsPage-CToJ4XpU.js`: 32.60 kB (8.07 kB gzip)
  - `dist/assets/CandidateSupportPage-LNgq2tBt.js`: 46.49 kB (10.60 kB gzip)
  - `dist/assets/CandidateDashboardPage-BMdDr0rw.js`: 45.67 kB (9.75 kB gzip)
  - `dist/assets/CandidatePlacementPage-CmsS2f-S.js`: 42.98 kB (10.14 kB gzip)
  - `dist/assets/CandidateOfferDetailsPage-C0CssPKB.js`: 38.05 kB (8.56 kB gzip)
- **Code Splitting**: All Candidate pages are lazily imported using React `lazy()` and `Suspense` in `src/routes/index.tsx`.
- **Database Pagination**: List views (Applications, Notifications, Support) enforce limit/offset database-level pagination.
