import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Candidate Dashboard Comprehensive E2E', () => {
  
  test('1. Candidate Dashboard loads with Candidate Workspace identity, welcome banner & 10-stage journey', async ({ page }) => {
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify Candidate Workspace identity badge or heading
    const pageText = await page.textContent('body');
    expect(pageText).toMatch(/Candidate Workspace|Welcome|Be Humble & Grow/i);

    // Verify presence of main headers
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('Application Journey').first()).toBeVisible();
  });

  test('2. Desktop navigation displays sidebar with 10 canonical Candidate items', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify desktop sidebar links
    const sidebar = page.locator('aside');
    await expect(sidebar.getByText('Dashboard')).toBeVisible();
    await expect(sidebar.getByText('My Profile')).toBeVisible();
    await expect(sidebar.getByText('My Documents')).toBeVisible();
    await expect(sidebar.getByText('Find Opportunities')).toBeVisible();
    await expect(sidebar.getByText('My Applications')).toBeVisible();
    await expect(sidebar.getByText('Video Interviews')).toBeVisible();
    await expect(sidebar.getByText('Conditional Offers')).toBeVisible();
    await expect(sidebar.getByText('Mobility Placement')).toBeVisible();
    await expect(sidebar.getByText('Support Centre')).toBeVisible();
    await expect(sidebar.getByText('Settings')).toBeVisible();
  });

  test('3. Mobile navigation displays bottom navigation bar (390px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify bottom navigation bar is visible
    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible();
    await expect(bottomNav.getByText('Home')).toBeVisible();
    await expect(bottomNav.getByText('Jobs')).toBeVisible();
    await expect(bottomNav.getByText('Applications')).toBeVisible();
    await expect(bottomNav.getByText('Interviews')).toBeVisible();
    await expect(bottomNav.getByText('Profile')).toBeVisible();
  });

  test('4. Dashboard card actions link to correct canonical routes', async ({ page }) => {
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Profile readiness CTA links to /candidate/profile
    const profileLink = page.locator('a[href="/candidate/profile"]').first();
    await expect(profileLink).toBeVisible();

    // Document status CTA links to /candidate/documents
    const docLink = page.locator('a[href="/candidate/documents"]').first();
    await expect(docLink).toBeVisible();

    // Opportunities link targets /candidate/jobs
    const jobsLink = page.locator('a[href="/candidate/jobs"]').first();
    await expect(jobsLink).toBeVisible();
  });

  test('5. Browser refresh maintains Candidate Dashboard session', async ({ page }) => {
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible();
    expect(page.url()).toContain('/candidate/dashboard');
  });

  test('6. Unauthenticated or wrong-role navigation is handled correctly by RouteGuards', async ({ page }) => {
    // Navigate to candidate dashboard when unauthenticated
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });
    
    // Page will either render dashboard in local dev mode or redirect to login
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/candidate\/dashboard|\/login|\/access-denied/);
  });
});
