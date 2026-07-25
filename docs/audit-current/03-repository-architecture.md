# 3. Repository and Architecture Audit

## 3.1 Stack Discovery & Verification
- **Framework**: Vite `v5.4.2`
- **React**: `v19.2.8` (React DOM `v19.2.8`)
- **Video Rendering Engine**: Remotion `@remotion/cli` & `@remotion/player` `v4.0.499`
- **Icons**: `lucide-react` `v1.26.0`
- **CSS**: Vanilla / Tailwind CSS classes formatted in `src/style.css`
- **TypeScript**: **0%** (Plain JavaScript `.jsx` and `.js` files throughout)

---

## 3.2 Comprehensive File Map

```text
behumbleandgrow/
├── .env                              [ENVIRONMENT] Firebase API credentials (COMMITTED)
├── .gitignore                        [GIT] Standard Node/Vite ignore rules
├── .vercel/                          [DEPLOYMENT] Vercel deployment metadata
├── be-humble-grow-website-assets/    [ASSETS] Project logos, favicons, social previews
│   ├── README.md                     [DOCS] Asset description
│   ├── asset-preview.jpg             [IMAGE] Asset preview banner
│   ├── favicons/                     [ICONS] Favicon packages
│   ├── logos/                        [LOGOS] SVG & PNG platform logos
│   ├── site.webmanifest              [MANIFEST] PWA Web Manifest
│   ├── social/                       [IMAGES] OpenGraph social banners
│   └── source/                       [DESIGN] Vector source files
├── dist/                             [BUILD] Vite production build output
├── docs/                             [DOCUMENTATION] System documentation
│   ├── audit/                        [BASELINE] Baseline production audit reports
│   └── audit-current/                [NEW AUDIT] Fresh current-state audit reports
├── firestore.rules                   [SECURITY] Unused Firebase Firestore security rules
├── index.html                        [ENTRY] HTML entry point
├── node_modules/                     [DEPENDENCIES] Installed node modules
├── package-lock.json                 [LOCKFILE] Dependency lockfile
├── package.json                      [MANIFEST] Project dependencies & scripts
├── public/                           [ASSETS] Static public directory
├── src/                              [SOURCE] Application source code
│   ├── App.jsx                       [ROOT] Main layout component
│   ├── main.js                       [DEAD CODE] Alternate entry file
│   ├── main.jsx                      [ENTRY] React DOM render entry
│   ├── style.css                     [STYLES] Global Tailwind CSS styling
│   ├── components/                   [COMPONENTS] Presentation UI components
│   │   ├── CandidateBenefits.jsx
│   │   ├── CandidateStories.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── FAQPreview.jsx
│   │   ├── FeaturedOpportunities.jsx
│   │   ├── FinalCTA.jsx
│   │   ├── HeroSection.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── PartnerAudienceSection.jsx
│   │   ├── PlatformJourneyPreview.jsx
│   │   ├── PublicFooter.jsx
│   │   ├── PublicHeader.jsx
│   │   ├── RemotionJourneyVideo.jsx
│   │   ├── TrustSafetySection.jsx
│   │   ├── TrustStrip.jsx
│   │   └── portals/                  [PORTALS] Portal UI management views
│   │       ├── AdminRoleManagement.jsx
│   │       ├── CandidateVerificationVault.jsx
│   │       ├── CompliancePartnerReview.jsx
│   │       ├── EmployerJobCreateModal.jsx
│   │       ├── FinanceRefundApprovalModal.jsx
│   │       ├── PortalManager.jsx
│   │       └── PortalNavigation.jsx
│   └── lib/                          [UTILITIES] Security & Auth helper stubs
│       ├── authMiddleware.js
│       ├── firebaseAuth.js
│       ├── firebaseClient.js
│       ├── paymentSecurity.js
│       ├── postgresClient.js
│       ├── storageSecurity.js
│       └── supabaseClient.js
├── storage.rules                     [SECURITY] Unused Firebase Storage security rules
├── supabase/                         [DATABASE] PostgreSQL database migrations
│   └── migrations/
│       ├── 20260724000001_security_schema.sql
│       ├── 20260724000002_rls_policies.sql
│       └── 20260724000003_seed_data.sql
└── vercel.json                       [DEPLOYMENT] Vercel SPA rewrite configuration
```
