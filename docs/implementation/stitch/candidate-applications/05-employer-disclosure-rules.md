# Employer Disclosure Rules

## Policy Rules
1. **Prior to Stage 5 (`employer_submitted`)**:
   - Employer identity is masked. The system returns `"Approved UAE Employer"`.
2. **Post Stage 5 (`employer_submitted` and beyond)**:
   - Employer trading name is disclosed once authorized by recruitment operations.
3. **Fallback Guard**:
   - If organization name is null or missing, the system falls back safely to `"Approved UAE Employer"`.
