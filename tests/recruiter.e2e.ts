import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Recruitment Partner Dashboard E2E', () => {
  test('should load Recruitment Partner Dashboard with agency status card, KPIs, action centre & lead cards', async ({ page }) => {
    // Navigate directly to Recruiter Dashboard
    await page.goto('/recruiter/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify main header text
    await expect(page.locator('h1')).toContainText('Recruitment Partner Dashboard');

    // Verify APPROVED PARTNER badge
    await expect(page.getByText('APPROVED PARTNER').first()).toBeVisible();

    // Verify Agency Name
    await expect(page.getByText('Nairobi Global Placement Agency').first()).toBeVisible();

    // Verify Agency Performance Indicators section
    await expect(page.getByText('Agency Performance Indicators')).toBeVisible();

    // Verify Priority Action Queue section
    await expect(page.getByText('Priority Action Queue')).toBeVisible();

    // Verify New Assigned Candidate Leads section
    await expect(page.getByText('New Assigned Candidate Leads')).toBeVisible();

    // Verify Accept Lead button
    await expect(page.getByRole('button', { name: 'Accept Lead' }).first()).toBeVisible();

    // Verify Recruiter Team Workload section
    await expect(page.getByText('Agency Recruiter Team Workload')).toBeVisible();

    // Verify Agency SLA & Quality Metrics section
    await expect(page.getByText('Agency SLA & Quality Metrics')).toBeVisible();
  });
});
