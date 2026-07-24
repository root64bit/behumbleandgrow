import { describe, it, expect } from 'vitest';
import { CandidateService } from '../services/candidate.service';

describe('Candidate Workspace Unit Suite', () => {
  it('should retrieve candidate summary profile', () => {
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

  it('should retrieve priority next step action card', () => {
    const nextStep = CandidateService.getNextStep();
    expect(nextStep.title).toBe('Confirm Video Interview Attendance');
    expect(nextStep.priority).toBe('urgent');
    expect(nextStep.estimatedMinutes).toBe(3);
  });

  it('should retrieve candidate document readiness records', () => {
    const docs = CandidateService.getDocuments();
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].name).toContain('Passport');
    expect(docs[0].status).toBe('verified');
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
});
