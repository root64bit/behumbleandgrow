# Schema Data Mapping — Candidate Placement & Relocation

## Ownership Chain Resolution
```text
auth.uid()
→ profiles.id
→ candidates.id
→ applications.candidate_id (status = 'offer_accepted' / 'placement')
→ offers.application_id (status = 'accepted')
→ placements.offer_id / placements.candidate_id
```

## Schema Mapping Table

| Placement Concern | Primary Source Table | Ownership Filter | Candidate-Visible Projections | Security / RLS Rule |
|---|---|---|---|---|
| Placement Case | `placements` | `candidate_id = auth.uid()` | `id`, `placement_reference`, `status`, `relocation_stage`, `target_arrival_date` | RLS Read-only for Candidate |
| Accepted Offer | `offers` | `candidate_id = auth.uid()` | `id`, `offer_reference`, `position_title` | Safe projection |
| Employer Display | `employers` via `applications` | Disclosure check | `display_name` ("Approved UAE Employer" if not disclosed) | Authorization-governed |
| Placement Milestones | `placement_milestones` | `placement_id -> placements.candidate_id = auth.uid()` | `step_number`, `name`, `status`, `completed_at`, `date_display` | Operations-controlled update |
| Candidate Actions | `placement_candidate_actions` | `placement_id -> placements.candidate_id = auth.uid()` | `action_type`, `title`, `description`, `status`, `deadline` | Candidate-executable acknowledgement |
| Work Permit Status | `placements` | `candidate_id = auth.uid()` | `work_permit_status`, masked `work_permit_ref` (`WP-••••-4821`) | Server-controlled |
| Visa Status | `placements` | `candidate_id = auth.uid()` | `visa_status`, masked `visa_ref` (`VIS-••••-1905`) | Server-controlled |
| Medical & Biometrics | `placements` | `candidate_id = auth.uid()` | `medical_status`, `medical_clinic_name`, `medical_appointment_date`, `biometric_status` | Process-level only, no diagnoses |
| Flight & Accommodation | `placements` | `candidate_id = auth.uid()` | `flight_*`, `accommodation_*` (only when `flight_confirmed` / `accommodation_confirmed`) | Release-authorized |
| Candidate Acknowledgements | `placement_acknowledgements` | `candidate_id = auth.uid()` | `id`, `action_id`, `acknowledged_at`, `version` | Controlled Candidate mutation |
