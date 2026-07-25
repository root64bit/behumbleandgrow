# Employer Disclosure Policy

## Database-Backed Disclosure Rules
1. **Source of Truth**: Employer disclosure is determined by trusted database state (`employer_disclosure_status`, `employer_disclosed_at`) or policy, NOT solely by a client-calculated progress percentage or stage.
2. **Pre-Disclosure State**: Displays `"Approved UAE Employer"`.
3. **Post-Disclosure State**: Discloses authorized legal/trading company name.
4. **Fallback Protection**: If employer name is null or authorization is absent, the UI safely falls back to `"Approved UAE Employer"`.
