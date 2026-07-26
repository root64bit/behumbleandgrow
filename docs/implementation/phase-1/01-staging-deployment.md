# 01. Staging Deployment Specification

## Overview
This report specifies the staging environment architecture for **BE HUMBLE & GROW** deployed on Vercel and connected to a dedicated Supabase staging project.

## Staging Configuration & Features
- **Staging URL**: `https://behumbleandgrow-staging.vercel.app`
- **Staging Banner**: Prominent top banner configured in `src/components/StagingBanner.tsx` displaying:
  `STAGING ENVIRONMENT — Controlled Technical Candidate Pilot`
- **Application Fee Status**: Explicitly disabled (`Application fee disabled during the closed technical pilot.` / `VITE_APPLICATION_FEE_ENABLED=false`).
- **Isolation**: Completely separate database credentials, authentication domain, and storage buckets from production.
