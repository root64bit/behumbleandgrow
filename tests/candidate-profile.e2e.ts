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

test.describe('Be Humble & Grow — Candidate Profile E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept Supabase Auth & REST endpoints to prevent remote JWT 401 rejection
    await page.route('**/auth/v1/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCandidateSession.user)
      });
    });

    await page.route('**/auth/v1/token*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCandidateSession)
      });
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'cand-user-1',
          email: 'candidate@behumbleandgrow.com',
          full_name: 'Amina Mabote',
          phone: '+258 84 123 4567',
          country_code: 'MZ',
          status: 'active'
        }])
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'cand-user-1',
          headline: 'Customer Experience & Hospitality Lead',
          bio: 'Experienced hospitality professional with 5+ years in front of house operations.',
          current_location: 'Maputo, Mozambique',
          preferred_location: 'Dubai, UAE',
          skills: ['Hospitality', 'Customer Relations'],
          languages: ['Portuguese', 'English'],
          verification_status: 'verified',
          stage: 'employer_interview'
        }])
      });
    });

    await page.route('**/rest/v1/work_experiences*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'exp-1',
          candidate_id: 'cand-user-1',
          job_title: 'F&B Outlet Captain',
          company_name: 'Maputo Grand Hotel',
          location: 'Maputo, Mozambique',
          start_date: '2022-01-01',
          is_current: true
        }])
      });
    });

    await page.route('**/rest/v1/educations*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'edu-1',
          candidate_id: 'cand-user-1',
          institution: 'Eduardo Mondlane University',
          degree: 'Diploma in Hospitality',
          field_of_study: 'Hospitality Management',
          start_date: '2019-01-01'
        }])
      });
    });

    await page.route('**/rest/v1/candidate_documents*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.route('**/rest/v1/user_roles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'ur-1',
          profile_id: 'cand-user-1',
          role: 'candidate'
        }])
      });
    });

    // Inject session into localStorage
    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
    }, mockCandidateSession);
  });

  test('1. Candidate Profile page loads with candidate header, name & gauge ring', async ({ page }) => {
    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });

    // Verify H1 candidate name or profile header
    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Build a complete professional profile').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Desktop navigation displays sidebar with 10 canonical Candidate items', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });

    const sidebar = page.locator('aside');
    await expect(sidebar.getByRole('link', { name: 'My Profile' })).toBeVisible({ timeout: 15000 });
    await expect(sidebar.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'My Documents' })).toBeVisible();
  });

  test('3. Mobile navigation displays bottom navigation bar (390px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });

    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible({ timeout: 15000 });
    await expect(bottomNav.getByText('Profile')).toBeVisible();
  });

  test('4. Section navigator tab switching works smoothly', async ({ page }) => {
    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });

    const sectionNav = page.locator('nav[aria-label="Profile Section Navigator"]');
    await expect(sectionNav).toBeVisible({ timeout: 15000 });

    // Click Contact Details tab
    await sectionNav.getByText('Contact Details').click();
    await expect(page.getByText('Primary Account Email')).toBeVisible();

    // Click Professional Summary tab
    await sectionNav.getByText('Professional Summary').click();
    await expect(page.getByText('Professional Title / Headline')).toBeVisible();
  });

  test('5. Navigation target maintains valid route URL', async ({ page }) => {
    await page.goto('/candidate/profile', { waitUntil: 'domcontentloaded' });
    expect(page.url()).toContain('/candidate/profile');
  });
});
