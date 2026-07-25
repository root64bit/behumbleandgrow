# 02. Environment Security & Variable Classification

## Classification Matrix

| Environment Variable | Public / Secret | Classification | Purpose & Scope |
| :--- | :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Public Client Config | Production Required | Firebase Client API Key (`AIzaSyDvX...`) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Public Client Config | Production Required | Firebase Auth domain (`behumbleandgrow.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Public Client Config | Production Required | Firebase Project ID (`behumbleandgrow`) |
| `VITE_FIREBASE_STORAGE_BUCKET` | Public Client Config | Production Required | Firebase Storage bucket (`behumbleandgrow.firebasestorage.app`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Public Client Config | Production Required | Messaging Sender ID (`763967463806`) |
| `VITE_FIREBASE_APP_ID` | Public Client Config | Production Required | Firebase Web App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Public Client Config | Production Required | Google Analytics measurement ID |
| `VITE_SUPABASE_URL` | Public Configuration | Optional / Secondary | Supabase project API URL |
| `VITE_SUPABASE_ANON_KEY` | Public Configuration | Optional / Secondary | Supabase public anonymous key |
| `VITE_APPLICATION_FEE_ENABLED` | Public Configuration | Staging / Development | Feature flag (Set to `false` in Phase 0) |

## Database Security Rules
- **Firebase Firestore Security Rules**: Defined in `firestore.rules` for collections `profiles`, `candidates`, `candidate_documents`, `jobs`, `applications`, `payments`, `refunds`, `audit_logs`.
- **Firebase Storage Rules**: Defined in `storage.rules` protecting private document vaults (`candidate-cv`, `candidate-identity`, `candidate-certificates`).
- **Supabase RLS Policies**: Defined in `20260724000002_rls_policies.sql`.
