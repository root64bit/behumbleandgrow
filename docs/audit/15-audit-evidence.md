# 15. Audit Evidence Log

## 15.1 Terminal Diagnostics Log

### Diagnostic Command 1: Production Build Test
```bash
npm run build
```
- **Exit Code**: `0` (Success)
- **Execution Duration**: `6.94 seconds`
- **Output Transcript**:
```text
> behumbleandgrow@1.0.0 build
> vite build

vite v5.4.21 building for production...
transforming...
✓ 1821 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.50 kB │ gzip:   0.80 kB
dist/assets/index-B4fbB6CU.css    3.17 kB │ gzip:   1.27 kB
dist/assets/index-BJ8tbH2A.js   552.33 kB │ gzip: 161.25 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
✓ built in 6.94s
```

---

## 15.2 Codebase File Inspection Log

### Inspected Files & Security Verification:
1. `package.json`: Plain JavaScript project (`type: module`), Vite 5.4.2, React 19.2.8, Remotion 4.0.499. No test libraries installed.
2. `.env`: Active Firebase API credentials discovered in line 2 (`VITE_FIREBASE_API_KEY=AIzaSyDvXvvPIfNZTZj0d...`).
3. `src/App.jsx`: Main entry point rendering `PortalManager` wrapping public landing sections.
4. `src/components/portals/PortalManager.jsx`: Portals implemented as client React state (`activePortal`). Hardcoded candidate identity (`Amina Mabote`) and hardcoded payment text (`Paid ($150 AED)`).
5. `src/lib/supabaseClient.js`: Placeholder credentials (`https://placeholder.supabase.co`).
6. `src/lib/paymentSecurity.js`: Node `require('crypto')` check on line 29 causes runtime errors if invoked directly in browser JS context.
7. `supabase/migrations/20260724000001_security_schema.sql`: Contains 19 table definitions, 4 custom ENUMs, and `protect_audit_logs()` immutability trigger.
8. `supabase/migrations/20260724000002_rls_policies.sql`: Contains 15 SQL RLS policies with tenant & role check helper functions.
