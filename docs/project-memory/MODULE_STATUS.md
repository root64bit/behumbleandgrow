# Module Status Matrix - YAKA Project Memory

Granular state tracking per application module.

| Module | Status | Data Source | Mock Runtime? | Main Files | Risk | Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth / Login** | Integrated / Stable | Supabase Auth Direct | No | `src/context/AuthContext.tsx`, `src/lib/supabase.ts` | Low | Maintain direct Auth configuration |
| **Super Admin** | Mostly Integrated | `/api/superadmin/*`, Supabase | No | `src/components/portals/SuperAdminPortal.jsx`, `api/superadmin/*` | Low | Verify permission checks |
| **Condo Admin** | Mostly Integrated | `/api/condo-admin/*`, Supabase | No | `src/components/portals/AdminPortal.jsx` | Low | Audit RLS policies |
| **Morador** | Pending Integration | Static `mockData` | **Yes** | `src/components/portals/MoradorPortal.jsx`, `src/lib/mockData.ts` | **High** | Replace mockData with live Supabase & API services (`YAKA-PROMPT-008`) |
| **Portaria** | Mostly Integrated | `/api/portaria/*`, Supabase | No | `src/components/portals/PortariaPortal.jsx` | Medium | Perform edge-case gate checks |
| **Finance** | Partially Integrated | API endpoints / Supabase | Partial | `src/components/admin/FinanceManagement.jsx` | Medium | Connect transaction feeds |
| **Reservations** | Partially Integrated | API endpoints / Supabase | Partial | `src/components/morador/ReservationsView.jsx` | Medium | Wire up booking calendar APIs |
| **Complaints** | Partially Integrated | API endpoints / Supabase | Partial | `src/components/morador/ComplaintsView.jsx` | Low | Test ticket creation flow |
| **Community** | Partially Integrated | API endpoints / Supabase | Partial | `src/components/morador/CommunityFeed.jsx` | Low | Real-time subscription testing |
| **Reports** | Integrated | Backend APIs | No | `src/components/admin/ReportsView.jsx` | Low | Validate report aggregation |
