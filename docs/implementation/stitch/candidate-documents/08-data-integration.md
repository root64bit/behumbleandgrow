# Data Integration & Service Layer — Candidate Document Vault

## Data Architecture
1. **Ownership Chain**: `auth.uid()` → `profiles.id` → `candidates.id` → `candidate_documents.candidate_id`.
2. **Composition Hook**: `useCandidateDocuments.ts` manages vault state, upload progress, replacement workflows, and preview modals.
3. **Demo Data Restrictions**: Controlled strictly by `import.meta.env.DEV && import.meta.env.VITE_DEMO_DATA_ENABLED === "true"`. Empty database queries return an intentional empty state (`CandidateDocumentEmptyState`) without sample files.
4. **Safe Query Projection**: `loadCandidateDocuments()` selects explicit safe fields, preventing exposure of internal Operations review notes over the network.
