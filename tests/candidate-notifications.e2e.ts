import { test, expect } from '@playwright/test';

const mockUser = {
  id: 'usr-cand-101',
  email: 'alex.candidate@example.com',
  user_metadata: { full_name: 'Alex Johnson', role: 'candidate' },
};

const mockCandidate = {
  id: 'cand-101',
  user_id: 'usr-cand-101',
  headline: 'Customer Experience Lead',
};

const mockNotifications = [
  {
    id: 'notif-101',
    candidate_id: 'cand-101',
    category: 'application',
    title: 'Application Under Review',
    summary: 'Your application for Senior Healthcare Specialist at Dubai Central Hospital is being reviewed by Operations.',
    priority: 'normal',
    entity_type: 'application',
    entity_id: 'app-101',
    action_type: 'view_application',
    is_action_required: false,
    is_archivable: true,
    read_at: null,
    archived_at: null,
    expires_at: null,
    is_retracted: false,
    created_at: '2026-07-26T10:00:00Z',
    updated_at: '2026-07-26T10:00:00Z',
  },
  {
    id: 'notif-102',
    candidate_id: 'cand-101',
    category: 'interview',
    title: 'Employer Interview Scheduled',
    summary: 'Your interview with Dubai Central Hospital is confirmed for 28 July 2026 at 14:00 GST.',
    priority: 'urgent',
    entity_type: 'interview',
    entity_id: 'int-202',
    action_type: 'join_interview',
    is_action_required: true,
    is_archivable: true,
    read_at: null,
    archived_at: null,
    expires_at: null,
    is_retracted: false,
    created_at: '2026-07-26T09:30:00Z',
    updated_at: '2026-07-26T09:30:00Z',
  },
  {
    id: 'notif-103',
    candidate_id: 'cand-101',
    category: 'offer',
    title: 'Conditional Offer Received',
    summary: 'You have received a Conditional Offer of Employment for Senior Healthcare Specialist.',
    priority: 'important',
    entity_type: 'offer',
    entity_id: 'off-303',
    action_type: 'review_offer',
    is_action_required: true,
    is_archivable: true,
    read_at: '2026-07-26T09:00:00Z',
    archived_at: null,
    expires_at: null,
    is_retracted: false,
    created_at: '2026-07-26T08:00:00Z',
    updated_at: '2026-07-26T09:00:00Z',
  },
  {
    id: 'notif-104',
    candidate_id: 'cand-101',
    category: 'placement',
    title: 'Work Permit Issued',
    summary: 'MOHRE has issued your UAE Work Permit entry reference.',
    priority: 'important',
    entity_type: 'placement',
    entity_id: 'plc-404',
    action_type: 'view_placement',
    is_action_required: false,
    is_archivable: true,
    read_at: null,
    archived_at: null,
    expires_at: null,
    is_retracted: false,
    created_at: '2026-07-25T15:00:00Z',
    updated_at: '2026-07-25T15:00:00Z',
  },
  {
    id: 'notif-105',
    candidate_id: 'cand-101',
    category: 'document',
    title: 'Document Vault Verification Complete',
    summary: 'Your passport copy and qualification certificate have been verified.',
    priority: 'normal',
    entity_type: 'document',
    entity_id: 'doc-505',
    action_type: 'view_documents',
    is_action_required: false,
    is_archivable: true,
    read_at: '2026-07-25T12:00:00Z',
    archived_at: null,
    expires_at: null,
    is_retracted: false,
    created_at: '2026-07-25T11:00:00Z',
    updated_at: '2026-07-25T12:00:00Z',
  },
];

test.describe('Be Humble & Grow — Candidate Notifications Centre E2E Suite', () => {
  test.setTimeout(45000);

  test.beforeEach(async ({ page }) => {
    // Inject auth session into localStorage
    await page.addInitScript((session) => {
      window.localStorage.setItem('sb-auth-token', JSON.stringify(session));
      window.localStorage.setItem('sb-localhost-auth-token', JSON.stringify(session));
    }, {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: mockUser,
    });

    await page.route('**/auth/v1/user*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUser),
      });
    });

    await page.route('**/auth/v1/token*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          user: mockUser,
        }),
      });
    });

    await page.route('**/rest/v1/profiles*', async (route) => {
      const acceptHeader = route.request().headers()['accept'] || '';
      const profileData = {
        id: 'usr-cand-101',
        email: 'alex.candidate@example.com',
        full_name: 'Alex Johnson',
        country_code: 'AE',
        status: 'active',
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(profileData) : JSON.stringify([profileData]),
      });
    });

    await page.route('**/rest/v1/user_roles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ role: 'candidate', profile_id: 'usr-cand-101' }]),
      });
    });

    await page.route('**/rest/v1/candidates*', async (route) => {
      const url = route.request().url();
      const acceptHeader = route.request().headers()['accept'] || '';

      if (url.includes('cand-empty')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify({ id: 'cand-empty' }) : JSON.stringify([{ id: 'cand-empty' }]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(mockCandidate) : JSON.stringify([mockCandidate]),
      });
    });

    await page.route('**/rest/v1/candidate_notifications*', async (route) => {
      const url = route.request().url();

      if (url.includes('cand-empty')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockNotifications),
      });
    });

    await page.route('**/rest/v1/rpc/mark_my_candidate_notification_read*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockNotifications[0],
          read_at: '2026-07-26T11:40:00Z',
          updated_at: '2026-07-26T11:40:00Z',
        }),
      });
    });

    await page.route('**/rest/v1/rpc/mark_all_my_candidate_notifications_read*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(3),
      });
    });

    await page.route('**/rest/v1/rpc/archive_my_candidate_notification*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockNotifications[0],
          archived_at: '2026-07-26T11:40:00Z',
          updated_at: '2026-07-26T11:40:00Z',
        }),
      });
    });
  });

  test('1. Render Notifications Centre header, bento metrics, tabs, and cards', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Notifications Centre').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Application Under Review').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Employer Interview Scheduled').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Conditional Offer Received').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Work Permit Issued').first()).toBeVisible({ timeout: 15000 });
  });

  test('2. Filter notifications by tab and search query', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    // Filter by Unread tab
    await page.getByRole('button', { name: 'Unread' }).first().click();
    await expect(page.getByText('Application Under Review').first()).toBeVisible({ timeout: 15000 });

    // Search query
    const searchInput = page.getByPlaceholder('Search notifications by title or text...');
    await searchInput.fill('Interview');
    await expect(page.getByText('Employer Interview Scheduled').first()).toBeVisible({ timeout: 15000 });
  });

  test('3. Mark one notification as read and mark all as read', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    // Click Mark read button on first notification
    const markReadBtn = page.getByRole('button', { name: 'Mark read' }).first();
    await expect(markReadBtn).toBeVisible({ timeout: 15000 });
    await markReadBtn.click();

    // Mark all as read button in header
    const markAllBtn = page.getByRole('button', { name: 'Mark all read' }).first();
    await expect(markAllBtn).toBeVisible({ timeout: 15000 });
    await markAllBtn.click();
  });

  test('4. Safe deep link navigation for Candidate Application', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    const appLink = page.getByRole('link', { name: 'View Application' }).first();
    await expect(appLink).toBeVisible({ timeout: 15000 });
    expect(await appLink.getAttribute('href')).toBe('/candidate/applications/app-101');
  });

  test('5. Safe deep link navigation for Candidate Interview', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    const intLink = page.getByRole('link', { name: 'View Interview' }).first();
    await expect(intLink).toBeVisible({ timeout: 15000 });
    expect(await intLink.getAttribute('href')).toBe('/candidate/interviews/int-202');
  });

  test('6. Safe deep link navigation for Conditional Offer', async ({ page }) => {
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    const offerLink = page.getByRole('link', { name: 'Review Conditional Offer' }).first();
    await expect(offerLink).toBeVisible({ timeout: 15000 });
    expect(await offerLink.getAttribute('href')).toBe('/candidate/offers/off-303');
  });

  test('7. Render empty state when candidate has no notifications', async ({ page }) => {
    await page.route('**/rest/v1/candidate_notifications*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('You have no notifications yet').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('link', { name: 'Return to Dashboard' }).first()).toBeVisible({ timeout: 15000 });
  });

  test('8. Mobile viewport layout responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/notifications', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Notifications Centre').first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Application Under Review').first()).toBeVisible({ timeout: 15000 });
  });
});
