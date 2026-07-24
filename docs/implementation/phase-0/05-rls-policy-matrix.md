# 05. Row-Level Security (RLS) Policy Matrix

| Target Table | Candidate Role | Operations Roles | Partner Recruiter Role | Employer Role | Policy Logic |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `public.profiles` | Own record read/update | Read all profiles | Read assigned candidates | Read job applicants | `id = auth.uid()` |
| `public.candidates` | Own record read/update | Read all candidates | Read assigned leads | Read job applicants | RLS join on `lead_assignments` / `applications` |
| `public.candidate_documents` | Own docs read/insert | Read all docs (with review role) | DENIED | DENIED | Private vault protection |
| `public.jobs` | Read published jobs | Full read/write | Read authorized jobs | Manage owned jobs | `status = 'published'` or `employer_id = active_org_id()` |
| `public.applications` | Own apps read/insert | Full read/update | Read assigned leads | Read job applications | `candidate_id = auth.uid()` or employer org matching |
| `public.status_history` | Read own entries | Full read/write | Read org entries | Read org entries | Append-only status tracking |
| `public.audit_logs` | DENIED | Read (Admin + MFA) | DENIED | DENIED | Database trigger immutability |
