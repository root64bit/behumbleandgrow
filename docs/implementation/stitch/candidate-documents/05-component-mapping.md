# Component Mapping — Candidate Document Vault

| Component Name | File Location | Purpose |
|---|---|---|
| `CandidateDocumentVaultHeader` | `src/components/candidate/documents/CandidateDocumentVaultHeader.tsx` | Vault top app bar with title, back action & candidate avatar |
| `CandidateDocumentReadinessSummary` | `src/components/candidate/documents/CandidateDocumentReadinessSummary.tsx` | Verification progress card with 0-100% emerald progress bar |
| `CandidateDocumentStatusBadge` | `src/components/candidate/documents/CandidateDocumentStatusBadge.tsx` | Canonical status mapper badge component |
| `CandidateDocumentCard` | `src/components/candidate/documents/CandidateDocumentCard.tsx` | Card for individual documents with preview, replace, download actions |
| `CandidateDocumentRequirementGroup` | `src/components/candidate/documents/CandidateDocumentRequirementGroup.tsx` | Grouped required vs optional document card sections |
| `CandidateDocumentUploadSheet` | `src/components/candidate/documents/CandidateDocumentUploadSheet.tsx` | Mobile slide-up action sheet with Camera, Gallery, Files options |
| `CandidateDocumentUploadDialog` | `src/components/candidate/documents/CandidateDocumentUploadDialog.tsx` | Desktop upload modal dialog |
| `CandidateDocumentReplacementDialog` | `src/components/candidate/documents/CandidateDocumentReplacementDialog.tsx` | Modal for replacing rejected/superseded document versions |
| `CandidateDocumentPreviewModal` | `src/components/candidate/documents/CandidateDocumentPreviewModal.tsx` | Secure preview modal rendering sensitivity signed URLs |
| `CandidateDocumentRejectionNotice` | `src/components/candidate/documents/CandidateDocumentRejectionNotice.tsx` | Candidate-visible rejection & replacement notice |
| `CandidateDocumentExpiryNotice` | `src/components/candidate/documents/CandidateDocumentExpiryNotice.tsx` | 90-day expiry warning banner |
| `CandidateDocumentSecurityNotice` | `src/components/candidate/documents/CandidateDocumentSecurityNotice.tsx` | Security & confidentiality disclaimer banner |
| `CandidateDocumentEmptyState` | `src/components/candidate/documents/CandidateDocumentEmptyState.tsx` | Stitch-aligned empty vault state |
| `CandidateDocumentSkeleton` | `src/components/candidate/documents/CandidateDocumentSkeleton.tsx` | Vault loading skeleton loader |
| `CandidateDocumentSectionError` | `src/components/candidate/documents/CandidateDocumentSectionError.tsx` | Section-level error boundary |
| `CandidateDocumentErrorState` | `src/components/candidate/documents/CandidateDocumentErrorState.tsx` | Fatal page error state |
| `CandidateDocumentsPage` | `src/pages/candidate/CandidateDocumentsPage.tsx` | Main page view assembled inside router outlet |
