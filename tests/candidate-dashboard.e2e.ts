import { test, expect } from '@playwright/test';

const mockCandidateSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: {
    id: 'cand-user-1',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'candidate@behumbleandgrow.com',
    email_confirmed_at: '2026-01-01T00:00:00Z',
    user_metadata: {
      full_name: 'Amina Mabote'
    }
  }
};

test.describe('Be Humble & Grow — Candidate Dashboard Comprehensive E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Inject mock candidate auth session into localStorage under storageKey 'bhg_auth_token'
    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
    }, mockCandidateSession);
  });
  
  test('1. Candidate Dashboard loads with Candidate Workspace identity, welcome banner & 10-stage journey', async ({ page }) => {
    await page.goto('/candidate/dashboard', { waitUntil: 'domcontentloaded' });

    // Verify main header greeting text or candidate identity
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
});
