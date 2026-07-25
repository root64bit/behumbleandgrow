# 9. Candidate Workflow Audit

## 9.1 Candidate Journey Workflow Audit

| Workflow Step | Screen Component | Render Status | User Inputs | Data Persistence | Pipeline Status |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **1. Acquisition & Hero** | `HeroSection.jsx` | ✅ Renders | CTA buttons | None | `STATIC UI` |
| **2. Eligibility Check** | `CategoryGrid.jsx` | ✅ Renders | Category filter | None | `STATIC UI` |
| **3. Registration** | `PublicHeader.jsx` | ✅ Renders | Modal Trigger | None | `MOCK IMPLEMENTATION` |
| **4. Profile & Vault** | `PortalManager.jsx` | ✅ Renders | Hardcoded Data (`Amina`) | None | `MOCK IMPLEMENTATION` |
| **5. Document Verification** | `CandidateVerificationVault.jsx` | ✅ Renders | Status Buttons | Local Array State | `PARTIALLY IMPLEMENTED` |
| **6. Verification Payment**| `PortalManager.jsx:L84` | ✅ Renders | Static Text (`Paid`) | None | `MOCK IMPLEMENTATION` |
| **7. Job Application** | `FeaturedOpportunities.jsx` | ✅ Renders | Apply Button | None | `STATIC UI` |
| **8. Status Tracking** | `PortalManager.jsx:L50` | ✅ Renders | Stage (`Submitted`) | None | `MOCK IMPLEMENTATION` |

---

## 9.2 Candidate Experience Gaps
- **Breakdown Point**: A candidate attempting to register or apply for a job cannot save their application, upload a real PDF document, or view real application updates. Navigating away or refreshing resets the application state.
