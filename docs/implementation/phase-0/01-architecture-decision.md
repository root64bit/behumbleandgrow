# 01. Phase 0 Architecture Decision Record (ADR)

## Executive Summary
This record documents the architectural transformation of **BE HUMBLE & GROW** from a client-side visual prototype into a production-grade, secure, multi-tenant application foundation suitable for internal testing.

## Tech Stack Preservation
- **Frontend Framework**: Vite + React 19 + TypeScript.
- **Styling**: Vanilla Tailwind CSS with custom design tokens.
- **Backend & Auth**: Supabase PostgreSQL, Supabase Auth (PKCE flow), and Supabase Storage.
- **Routing**: `react-router-dom` v7 with nested layout guards.
- **Validation**: Zod schema validation layer.

## Architectural Decisions
1. **Separation of Concerns**: Single Page Application (SPA) routing replaces tab-based client state switching.
2. **Server-Enforced RBAC & RLS**: Frontend route hiding is never trusted as a security boundary. Row-Level Security (RLS) policies on Supabase PostgreSQL enforce candidate, recruiter, employer, and operations tenant isolation.
3. **Private Document Storage**: All candidate identity, CV, and certificate uploads are stored in private storage buckets (`candidate-cv`, `candidate-identity`, `candidate-certificates`) accessed exclusively via short-lived signed URLs.
4. **Append-Only Status History**: Status transitions for candidates, applications, documents, and payments are logged in an append-only `status_history` table.
