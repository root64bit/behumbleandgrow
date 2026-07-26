# 19. Production Readiness Checklist

## 1. Environment & Credentials
- [ ] Exposed Firebase API keys revoked and removed from `.env`
- [ ] `.env.example` created without live secrets
- [ ] Vercel production environment variables configured

## 2. Infrastructure & Database
- [ ] SQL migrations in `supabase/migrations/` applied to live PostgreSQL
- [ ] Row-Level Security (RLS) enabled and verified on all 19 database tables
- [ ] Database indexes created for high-frequency query columns

## 3. Core Application & Routing
- [ ] Production build succeeds (`npm run build`)
- [ ] Router (`react-router-dom`) installed with explicit URL paths
- [ ] Dynamic code splitting (`React.lazy()`) implemented (< 250 kB chunks)

## 4. Authentication & Multi-Tenancy
- [ ] Real user login & candidate registration active
- [ ] JWT tokens & custom claim verification enforced on backend
- [ ] Multi-tenant isolation verified across candidates, partners, and employers

## 5. Security & Financial Integrity
- [ ] Pre-signed URLs enforced for private candidate document downloads
- [ ] Stripe / Square Checkout SDK integrated with server webhook listener
- [ ] Dual-approval threshold enforced for high-value refunds
- [ ] Audit log immutability trigger tested against UPDATE/DELETE statements
