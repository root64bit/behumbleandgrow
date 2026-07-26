import { describe, it, expect } from 'vitest';
import { SuperAdminService } from '../services/superadmin.service';
import { isSuperAdminUser, SUPER_ADMIN_ROLES } from '../lib/permissions/rbac';

describe('Super Admin Unit Suite', () => {
  it('should verify super_admin role permission helper', () => {
    expect(isSuperAdminUser(['super_admin'])).toBe(true);
    expect(isSuperAdminUser(['candidate'])).toBe(false);
    expect(SUPER_ADMIN_ROLES).toContain('super_admin');
  });

  it('should retrieve 8 primary executive KPI metrics', () => {
    const metrics = SuperAdminService.getKpiMetrics();
    expect(metrics).toHaveLength(8);
    expect(metrics[0].label).toBe('Total Active Candidates');
    expect(metrics[7].formattedValue).toContain('£');
  });

  it('should retrieve high-priority Action Centre items', () => {
    const items = SuperAdminService.getActionCentreItems();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].severity).toBeDefined();
    expect(items[0].queueRoute).toContain('/superadmin/');
  });

  it('should retrieve multi-currency financial summary', () => {
    const finance = SuperAdminService.getFinancialSummary();
    expect(finance.gbpCollected).toBe(18450);
    expect(finance.formattedGbpCollected).toBe('£18,450.00');
    expect(finance.formattedAedCollected).toBe('AED 86,400.00');
    expect(finance.recentTransactions.length).toBeGreaterThan(0);
  });

  it('should retrieve infrastructure health services', () => {
    const services = SuperAdminService.getPlatformHealth();
    expect(services.length).toBeGreaterThan(0);
    expect(services[0].uptimePercentage).toBeGreaterThan(99);
  });
});
