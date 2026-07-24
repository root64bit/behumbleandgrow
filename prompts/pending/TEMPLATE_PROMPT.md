# Prompt Definition Template (Pending)

- **ID:** YAKA-PROMPT-XXX
- **Date:** YYYY-MM-DD
- **Tool:** [Codex / AI Studio / Antigravity / Manual]
- **Branch:** `codex/feature-name`

---

## 1. Objective
[Concise summary of what this prompt aims to accomplish.]

---

## 2. Scope
- **Target Area:** [e.g., Morador portal backend data integration]
- **Functional Goal:** [e.g., Replace mock data in Morador views with Supabase queries]

---

## 3. Do Not Touch
- Do not modify application logic outside defined scope.
- Do not touch Real Estate, payment gateway, broker modules.
- Do not touch Supabase Auth configuration or `/api/` auth endpoints.
- Do not touch database migrations unless explicitly specified.

---

## 4. Files to Inspect
- [ ] `src/path/to/file1.ts`
- [ ] `src/path/to/file2.tsx`

---

## 5. Files Allowed for Modification
- [ ] `src/path/to/target1.ts`
- [ ] `src/path/to/target2.tsx`

---

## 6. Validation Commands
```bash
npm run check
npm run build
git status
```

---

## 7. Expected Output
- [Detail exact expected runtime or static output upon completion.]

---

## 8. Final Report Requirements
1. Summary of modified files.
2. Verification command execution results.
3. Next recommended prompt ID and target branch.
