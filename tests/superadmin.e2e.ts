import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Super Admin Dashboard E2E', () => {
  test('should load Super Admin Platform Overview with KPI cards, Action Centre & Financial Ledger', async ({ page }) => {
    // Navigate directly to Super Admin Dashboard
    await page.goto('/superadmin/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify main executive header text
    await expect(page.locator('h1')).toContainText('Platform Executive Overview');

    // Verify PROD ENVIRONMENT badge
    await expect(page.getByText('PROD ENVIRONMENT')).toBeVisible();

    // Verify Executive Performance Indicators section header
    await expect(page.getByText('Executive Performance Indicators')).toBeVisible();

    // Verify Action Centre section header
    await expect(page.getByText('Action Centre')).toBeVisible();

    // Verify Candidate Acquisition & Conversion Funnel
    await expect(page.getByText('Candidate Acquisition & Conversion Funnel')).toBeVisible();

    // Verify Financial Visibility & Ledger
    await expect(page.getByText('Financial Visibility & Ledger')).toBeVisible();

    // Verify GBP and AED reporting totals
    await expect(page.getByText('£18,450.00')).toBeVisible();
    await expect(page.getByText('AED 86,400.00')).toBeVisible();

    // Verify Infrastructure Health
    await expect(page.getByText('System & Infrastructure Health')).toBeVisible();
  });
});
