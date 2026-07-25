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

test.describe('Be Humble & Grow — Candidate Document Vault E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Intercept Supabase Auth & REST endpoints
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
          verification_status: 'verified',
          stage: 'employer_interview'
        }])
      });
    });

    await page.route('**/rest/v1/candidate_documents*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'doc-1',
            candidate_id: 'cand-user-1',
            document_type: 'candidate-cv',
            file_name: 'Amina_Mabote_CV.pdf',
            storage_path: 'cand-user-1/candidate-cv/cv.pdf',
            mime_type: 'application/pdf',
            file_size: 2450000,
            classification: 'confidential',
            verification_status: 'approved',
            uploaded_at: '2026-01-15T10:00:00Z'
          },
          {
            id: 'doc-2',
            candidate_id: 'cand-user-1',
            document_type: 'candidate-identity',
            file_name: 'Passport_Scan.pdf',
            storage_path: 'cand-user-1/candidate-identity/passport.pdf',
            mime_type: 'application/pdf',
            file_size: 4800000,
            expiry_date: '2029-08-20',
            classification: 'confidential',
            verification_status: 'under_review',
            uploaded_at: '2026-02-01T14:30:00Z'
          }
        ])
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

  test('1. Document Vault page loads with H1 title, readiness summary & document cards', async ({ page }) => {
    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('My Documents').first()).toBeVisible();
    await expect(page.getByText('Verification Progress').first()).toBeVisible();
  });

  test('2. Desktop navigation displays sidebar with canonical Candidate items', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });

    const sidebar = page.locator('aside');
    await expect(sidebar.getByRole('link', { name: 'My Documents' })).toBeVisible({ timeout: 15000 });
    await expect(sidebar.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('3. Mobile navigation displays bottom navigation bar (390px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });

    const bottomNav = page.locator('nav[aria-label="Mobile Bottom Navigation"]');
    await expect(bottomNav).toBeVisible({ timeout: 15000 });
    await expect(bottomNav.getByText('Profile')).toBeVisible();
  });

  test('4. Upload document dialog opens and allows document category selection', async ({ page }) => {
    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Upload Now' }).first().click();
    await expect(page.getByText('Upload Confidential Document')).toBeVisible();
  });

  test('5. Preview document triggers signed URL dialog', async ({ page }) => {
    await page.goto('/candidate/documents', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Preview' }).first().click();
    await expect(page.getByText('Sensitivity Signed URL')).toBeVisible();
  });
});
