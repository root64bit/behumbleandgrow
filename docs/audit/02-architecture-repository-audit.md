# 2. Architecture and Repository Audit

## 2.1 Framework & Core Technical Stack
- **Framework**: Vite `v5.4.2` (Bundler & Dev Server)
- **UI Runtime**: React `v19.2.8` & React DOM `v19.2.8`
- **Video Rendering Engine**: Remotion `@remotion/cli` & `@remotion/player` `v4.0.499`
- **Icon Library**: `lucide-react` `v1.26.0`
- **Styling Solution**: Tailwind CSS (used via utility class names, formatted in `src/style.css`)
- **Package Manager**: npm (lockfile `package-lock.json` lockfileVersion 3)
- **TypeScript Usage**: **NONE** (Plain JavaScript `.jsx` and `.js` files throughout)

---

## 2.2 Complete Repository File Map

```text
behumbleandgrow/
├── .env                              [ENVIRONMENT] Firebase API credentials (COMMITTED)
├── .gitignore                        [GIT] Standard Node/Vite ignore rules
├── .vercel/                          [DEPLOYMENT] Vercel deployment state metadata
├── be-humble-grow-website-assets/    [ASSETS] Project branding & promotional materials
├── dist/                             [BUILD] Production Vite output build assets
├── firestore.rules                   [SECURITY] Unused Firestore security rules
├── index.html                        [ENTRY] HTML entry point
├── node_modules/                     [DEPENDENCIES] Installed node modules
├── package-lock.json                 [LOCKFILE] Dependency lockfile
├── package.json                      [MANIFEST] Project manifest & scripts
├── public/                           [ASSETS] Static assets
├── src/                              [SOURCE] Application source code
│   ├── App.jsx                       [ROOT] Main layout wrapping PortalManager & Public view
│   ├── main.js                       [ENTRY] Alternate JS entry point (DEAD CODE)
│   ├── main.jsx                      [ENTRY] React root render entry point
│   ├── style.css                     [STYLES] Global Tailwind CSS directives
│   ├── components/                   [COMPONENTS] Presentation UI components
│   │   ├── CandidateBenefits.jsx     [UI] Value proposition breakdown
│   │   ├── CandidateStories.jsx      [UI] Success stories carousel/grid
│   │   ├── CategoryGrid.jsx          [UI] Industry job categories
│   │   ├── FAQPreview.jsx            [UI] Accordion preview for FAQ
│   │   ├── FeaturedOpportunities.jsx [UI] Featured job listings
│   │   ├── FinalCTA.jsx              [UI] Bottom call-to-action block
│   │   ├── HeroSection.jsx           [UI] Landing page hero banner
│   │   ├── HowItWorks.jsx            [UI] Step-by-step process guide
│   │   ├── PartnerAudienceSection.jsx[UI] Partner/Employer onboarding overview
│   │   ├── PlatformJourneyPreview.jsx[UI] Visual timeline of candidate journey
│   │   ├── PublicFooter.jsx          [UI] Public footer navigation & legal links
│   │   ├── PublicHeader.jsx          [UI] Public header & portal switcher button
│   │   ├── RemotionJourneyVideo.jsx  [UI] Integrated Remotion video player
│   │   ├── TrustSafetySection.jsx    [UI] Trust badges & legal guarantees
│   │   ├── TrustStrip.jsx            [UI] Partner logos strip
│   │   └── portals/                  [PORTALS] Role-based management interfaces
│   │       ├── AdminRoleManagement.jsx          [UI/MOCK] SuperAdmin RBAC toggling
│   │       ├── CandidateVerificationVault.jsx   [UI/MOCK] Doc verification & pre-signed URL view
│   │       ├── CompliancePartnerReview.jsx      [UI/MOCK] Partner agency risk audit table
│   │       ├── EmployerJobCreateModal.jsx       [UI/MOCK] Modal for posting jobs
│   │       ├── FinanceRefundApprovalModal.jsx   [UI/MOCK] Dual-approval refund modal
│   │       ├── PortalManager.jsx                [CORE] Single-page portal switcher (React state)
│   │       └── PortalNavigation.jsx             [UI] Top navigation tab bar for portals
│   └── lib/                          [UTILITIES] Security, DB, & Auth stubs
│       ├── authMiddleware.js         [STUB] Pure JS function for RBAC & ABAC claim checks
│       ├── firebaseAuth.js           [STUB] Firebase Auth initialization wrapper
│       ├── firebaseClient.js         [STUB] Firebase client config validation
│       ├── paymentSecurity.js        [STUB] Webhook HMAC & dual-approval calculation helper
│       ├── postgresClient.js         [STUB] PostgreSQL claim context string builder
│       ├── storageSecurity.js        [STUB] Upload intent & fake pre-signed URL generator
│       └── supabaseClient.js         [STUB] Supabase client config & JWT validation stub
├── storage.rules                     [SECURITY] Unused Firebase Storage security rules
├── supabase/                         [DATABASE] PostgreSQL database migrations
│   └── migrations/
│       ├── 20260724000001_security_schema.sql  [SQL] Core schema, enums & tables
│       ├── 20260724000002_rls_policies.sql     [SQL] Production RLS policies & auth helper functions
│       └── 20260724000003_seed_data.sql        [SQL] Seed data for orgs, partners & jobs
└── vercel.json                       [DEPLOYMENT] Vercel SPA rewrite configuration
```

---

## 2.3 Codebase Quality & Anomalies

### 1. Dead & Redundant Files
- **`src/main.js`**: Redundant entry file existing alongside `src/main.jsx`.
- **`firestore.rules` & `storage.rules`**: Firebase Security Rules present in repository root, yet Supabase is defined as the database in `supabase/migrations/`.
- **`be-humble-grow-website-assets/`**: Unprocessed raw design assets located inside project root instead of `public/` directory.

### 2. Missing Architecture Components
- **No Router**: The application relies on `useState('public')` inside `PortalManager.jsx`. Browsing to `/candidate`, `/employer`, or direct URLs is impossible.
- **No Global State Management**: State is isolated inside individual component functions without React Context or Redux/Zustand.
- **No TypeScript**: Zero type definitions (`tsconfig.json` missing). Props and API structures are unvalidated.
