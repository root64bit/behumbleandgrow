import { describe, it, expect } from 'vitest';
import { RecruiterService } from '../services/recruiter.service';
import { isRecruiterUser, RECRUITER_ROLES } from '../lib/permissions/rbac';

describe('Recruitment Partner Unit Suite', () => {
  it('should verify recruiter role permission helper', () => {
    expect(isRecruiterUser(['recruitment_partner_admin'])).toBe(true);
    expect(isRecruiterUser(['recruiter'])).toBe(true);
    expect(isRecruiterUser(['candidate'])).toBe(false);
    expect(RECRUITER_ROLES).toContain('recruitment_partner_admin');
  });

  it('should retrieve agency status card', () => {
    const card = RecruiterService.getOrganisationCard();
    expect(card.agencyName).toBe('Nairobi Global Placement Agency');
    expect(card.verificationStatus).toBe('approved');
    expect(card.activeRecruiters).toBe(8);
  });

  it('should retrieve 8 primary agency KPI metrics', () => {
    const metrics = RecruiterService.getKpiMetrics();
    expect(metrics).toHaveLength(8);
    expect(metrics[0].label).toBe('New Assigned Leads');
    expect(metrics[7].label).toBe('Overdue Actions');
  });

  it('should retrieve candidate lead records', () => {
    const leads = RecruiterService.getAssignedLeads();
    expect(leads.length).toBeGreaterThan(0);
    expect(leads[0].candidateName).toBeDefined();
    expect(leads[0].assignedJobTitle).toBeDefined();
  });

  it('should retrieve recruiter workload records', () => {
    const team = RecruiterService.getRecruiterWorkload();
    expect(team.length).toBeGreaterThan(0);
    expect(team[0].capacityPercentage).toBeLessThanOrEqual(100);
  });

  it('should retrieve agency SLA performance metrics', () => {
    const perf = RecruiterService.getPerformanceSla();
    expect(perf.acceptanceRate).toBeGreaterThan(90);
    expect(perf.slaStatus).toBe('performing');
  });
});
