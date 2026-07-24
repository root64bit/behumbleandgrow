# Local Audit Report Template

- **ID:** AUDIT-LOCAL-XXX
- **Date:** YYYY-MM-DD
- **Tool:** Local CLI / Antigravity / Manual Audit
- **Branch:** `staging`

---

## 1. Objective
[Purpose of the local audit.]

---

## 2. Scope
- **Inspected Modules:** [e.g., Auth, SuperAdmin, Morador]

---

## 3. Do Not Touch Verification
- Verified non-target modules were untouched.

---

## 4. Files Inspected
- `src/**/*`
- `api/**/*`

---

## 5. Files Allowed for Auditing
- Entire repository (read-only mode).

---

## 6. Validation Commands
```bash
npm run check
npm run build
git status
```

---

## 7. Expected Output
- Static code analysis results, type check status, mock data identification.

---

## 8. Final Report Requirements
- **Completion Percentage:** [e.g., 75%]
- **Critical Findings:** [List any blockers or defects]
- **Recommendation:** [Pass / Warn / Fail]
- **Linked Prompt ID:** YAKA-PROMPT-XXX
