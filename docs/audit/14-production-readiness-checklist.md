# 14. Production Readiness Checklist

## 1. Codebase & Infrastructure
- [x] Production build passes clean compilation (`npm run build`)
- [ ] TypeScript typechecking configured and passing (`npm run typecheck`)
- [ ] ESLint rules configured and passing without errors (`npm run lint`)
- [ ] Dead code (`src/main.js`) removed
- [ ] Public bundle size optimized (< 250 kB per chunk)

## 2. Authentication & Authorization
- [ ] Real user login & registration flow active
- [ ] Password strength & email verification enforced
- [ ] JWT tokens & custom claim checks verified on server
- [ ] Portal switching protected by role permissions
- [ ] Multi-tenant isolation verified across candidates, partners, and employers

## 3. Database & Storage
- [ ] Database schema deployed to production PostgreSQL/Supabase
- [ ] RLS policies enabled and verified via automated pgTAP tests
- [ ] Database indexes created for high-traffic query columns
- [ ] Private document uploads forced through pre-signed storage URLs
- [ ] Audit log immutability trigger tested against UPDATE/DELETE statements

## 4. Financial & Payment Integrity
- [ ] Stripe / Square SDK integrated with server-side payment creation
- [ ] Webhook HMAC signature verification active on server
- [ ] Dual-approval threshold enforced for high-value refunds
- [ ] Money values handled strictly in fixed-precision or minor integer units

## 5. Security & Privacy
- [ ] No API keys or secrets committed to Git repository
- [ ] Content-Security-Policy & HTTPS security headers active
- [ ] Privacy Policy & candidate consent agreements active
- [ ] Account deletion & data retention workflow supported
