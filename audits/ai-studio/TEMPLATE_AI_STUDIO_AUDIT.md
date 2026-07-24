# AI Studio Audit Report Template

- **ID:** AUDIT-AISTUDIO-XXX
- **Date:** YYYY-MM-DD
- **Tool:** AI Studio
- **Branch:** `staging`

---

## 1. Objective
[Purpose of the AI Studio visual/component audit.]

---

## 2. Scope
- **UI Views Inspected:** [e.g., Super Admin Portal, Morador Dashboard]

---

## 3. Do Not Touch Verification
- Verified UI modifications do not alter backend API contracts or core state hooks.

---

## 4. Files Inspected
- `src/components/**/*`

---

## 5. Files Allowed for Auditing
- Presentation components and styling tokens.

---

## 6. Validation Commands
```bash
npm run build
```

---

## 7. Expected Output
- Visual design fidelity check, layout responsiveness, UI state validation.

---

## 8. Final Report Requirements
- **Completion Percentage:** [e.g., 96%]
- **Critical Findings:** [Note discrepancies between UI representation and actual git/backend state]
- **Recommendation:** [Approve UI / Request local verification]
- **Linked Prompt ID:** YAKA-PROMPT-XXX
