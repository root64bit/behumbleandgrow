# Phase A12 — Stitch Screen Analysis: Candidate Support Centre

## Stitch Project Context
- **Stitch Project Name**: Be Humble & Grow Portal
- **Stitch Project ID**: `projects/13654249462666228786`
- **Target Screen Title**: Support Ticket Management
- **Stitch Screen ID**: `1eefb7abb6404e6bb200854fa1f8042b` (Width: 780px, Height: 3536px, Device: MOBILE)
- **Canonical Route**: `/candidate/support`

## Visual & Structural Audit of Stitch Screen
The Stitch support layout contains key interface patterns adapted for the Candidate Support Centre:
1. **Summary Metrics (Bento-lite)**:
   - Summary cards displaying ticket count statistics (Active Requests, Action Required, Awaiting Support, Resolved).
2. **Support Ticket List Section**:
   - Header with title "Active Tickets" and "Create Support Request" action CTA.
   - Ticket cards displaying ticket reference, category label, escaped plain-text subject and description preview, status badge, action-required badge, and relative timestamps.
3. **Candidate FAQs Section**:
   - Frequently Asked Questions accordion explaining MOHRE zero candidate fee policy, work permit timelines, mandatory document verification, and video interview preparation.
4. **Create Support Request Modal**:
   - Form controls for category selection, subject input, description textarea, and optional related topic selection.

## Security Adaptation
- Stitch Screen `1eefb7abb6404e6bb200854fa1f8042b` contains operational management mockups (such as unassigned tickets count or internal notes). For the Candidate Support Centre, all internal staff assignment, internal notes, operations staff identities, and internal SLA fields are strictly stripped server-side. Candidates interact exclusively with candidate-owned support requests and candidate-visible messages.
