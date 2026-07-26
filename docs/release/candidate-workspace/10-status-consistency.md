# 10 — Cross-Module Status & Timeline Consistency Audit

- **Canonical Status Badges**: All candidate UI components use shared utility helper functions (`src/lib/candidate/*`) to render status badges across Dashboard, Applications, Interviews, Offers, Placement, Notifications, and Support.
- **Employer Disclosure Rule**: Employer names are displayed as `"Approved UAE Employer"` prior to candidate application progression authorization, preventing un-authorized pre-interview disclosure.
- **Candidate Action vs Official Milestone Separation**: Candidate acknowledgements (e.g. travel readiness, document upload) update candidate draft state, but official government milestones (e.g. MOHRE work permit issuance, UAE entry permit) are strictly server/admin driven.
