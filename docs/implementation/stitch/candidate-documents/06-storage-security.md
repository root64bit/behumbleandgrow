# Storage Security & Private Bucket Architecture

## Private Bucket Policy Rules
1. **Private Buckets Only**: Identity and credential files are saved in private buckets (`candidate-cv`, `candidate-identity`, `candidate-certificates`). No public URLs are ever generated or exposed.
2. **Sensitivity-Based Signed URL Durations**:
   - `candidate-identity` (International Passport / National ID): **5 minutes** (300 seconds)
   - `candidate-certificates` (Academic / Professional Certificates): **10 minutes** (600 seconds)
   - `candidate-cv` (Curriculum Vitae): **15 minutes** (900 seconds)
3. **No Persistence of Signed URLs**: Signed URLs are generated dynamically for each preview request and cleared from component memory immediately when the modal closes.
4. **Network Privacy**: Candidate database queries select safe columns only, excluding internal Operations review notes (`review_notes` / internal compliance comments).
