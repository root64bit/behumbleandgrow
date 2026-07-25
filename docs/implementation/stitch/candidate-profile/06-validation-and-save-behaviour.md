# Validation & Save Behaviour — Candidate Professional Profile

## Save Model Architecture
1. **Core Simple Fields:** Saved via global sticky save bar (`CandidateProfileSaveBar`).
2. **Work Experience & Education:** Saved per record independently via modal/form submit.
3. **Skills & Languages:** Saved atomically per section.
4. **Certifications:** Evidence files uploaded to private Document Vault (`/candidate/documents`).

## Validation Rules
- **Date Chronology:** End date cannot precede start date (`new Date(endDate) >= new Date(startDate)`).
- **Duplicate Prevention:** Prevents duplicate skill badges and language options.
- **Photo Upload:** 5MB file size limit and JPEG/PNG/WebP MIME type enforcement.
- **Legal Compliance Disclaimers:** Displayed on Employment Preferences (*"Preferences help improve matching but do not guarantee selection..."*) and Relocation Availability (*"Work-permit and visa decisions are made by relevant UAE authorities..."*).
