import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Candidate Dashboard E2E', () => {
  test('should load Candidate Dashboard with personalized greeting, 10-stage journey, priority next step, profile readiness & interview card', async ({ page }) => {
    // Navigate directly to Candidate Dashboard
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify main header greeting text
    await expect(page.locator('h1')).toContainText('Welcome back, Amina Mabote');

    // Verify CANDIDATE VERIFIED badge & Candidate ID
    await expect(page.getByText('CANDIDATE VERIFIED').first()).toBeVisible();
    await expect(page.getByText('BH-MZ-9041').first()).toBeVisible();

    // Verify Your UAE Career Journey 10-stage section
    await expect(page.getByText('Your UAE Career Journey')).toBeVisible();
    await expect(page.getByText('Account Created')).toBeVisible();

    // Verify Priority Next Step card
    await expect(page.getByText('PRIORITY REQUIRED ACTION')).toBeVisible();
    await expect(page.getByText('Confirm Video Interview Attendance').first()).toBeVisible();

    // Verify Profile & Document Readiness sections
    await expect(page.getByText('Profile Readiness')).toBeVisible();
    await expect(page.getByText('Document Readiness')).toBeVisible();

    // Verify Recommended UAE Opportunities
    await expect(page.getByText('Recommended UAE Opportunities')).toBeVisible();

    // Verify Active Applications
    await expect(page.getByText('Your Active Applications')).toBeVisible();

    // Verify Upcoming Video Interview card
    await expect(page.getByText('Upcoming Video Interview')).toBeVisible();

    // Verify Conditional Offer card
    await expect(page.getByText('Conditional Job Offer')).toBeVisible();
  });
});
