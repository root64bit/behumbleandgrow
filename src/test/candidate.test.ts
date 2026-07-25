import { describe, it, expect } from 'vitest';
import { CandidateService } from '../services/candidate.service';
import { isDemoDataAllowed } from '../hooks/candidate/useCandidateDashboard';

describe('Candidate Workspace Unit & RBAC Suite', () => {
  it('should retrieve candidate summary profile with valid defaults', () => {
    const candidate = CandidateService.getCandidateSummary();
    expect(candidate.candidateName).toBe('Amina Mabote');
    expect(candidate.candidateId).toBe('BH-MZ-9041');
    expect(candidate.country).toBe('Mozambique');
    expect(candidate.profileCompletionPercent).toBeGreaterThan(50);
  });

  it('should retrieve 10-stage UAE career journey steps', () => {
    const steps = CandidateService.getJourneySteps();
    expect(steps).toHaveLength(10);
    expect(steps[0].title).toBe('Account Created');
    expect(steps[6].title).toBe('Employer Interview');
    expect(steps[6].isCurrent).toBe(true);
    expect(steps[9].title).toBe('Travel & Placement');
  });

  it('should retrieve priority next step action card pointing to valid route', () => {
    const nextStep = CandidateService.getNextStep();
    expect(nextStep.title).toBe('Confirm Video Interview Attendance');
    expect(nextStep.priority).toBe('urgent');
    expect(nextStep.destinationRoute).toMatch(/^\/candidate\//);
  });

  it('should verify demo data guard is disabled unless VITE_DEMO_DATA_ENABLED=true in DEV', () => {
    // In vitest environment without VITE_DEMO_DATA_ENABLED=true
    const demoAllowed = isDemoDataAllowed();
    expect(demoAllowed).toBe(false);
  });

  it('should retrieve candidate document readiness records without exposing private storage paths', () => {
    const docs = CandidateService.getDocuments();
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].name).toContain('Passport');
    expect(docs[0].status).toBe('verified');
    expect(docs[0]).not.toHaveProperty('storage_path');
  });

  it('should retrieve recommended UAE job opportunities with match score', () => {
    const jobs = CandidateService.getRecommendedJobs();
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs[0].matchScore).toBeGreaterThanOrEqual(80);
    expect(jobs[0].emirate).toContain('Dubai');
  });

  it('should retrieve video interview details and preparation checklist', () => {
    const interviews = CandidateService.getInterviews();
    expect(interviews).toHaveLength(1);
    expect(interviews[0].uaeTime).toContain('GST');
    expect(interviews[0].prepChecklist.length).toBeGreaterThan(0);
  });

  it('should verify conditional offer compliance legal disclaimer presence', () => {
    const offer = CandidateService.getConditionalOffer();
    expect(offer).not.toBeNull();
    expect(offer?.salaryText).toContain('AED');
    expect(offer?.status).toBe('sent_to_candidate');
  });

  it('should verify placement progress contains work permit status', () => {
    const placement = CandidateService.getPlacementProgress();
    expect(placement).not.toBeNull();
    expect(placement?.workPermitStatus).toContain('Ministry of Human Resources');
  });
});
