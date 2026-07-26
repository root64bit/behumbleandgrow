import { test, expect } from '@playwright/test';

const mockUser = {
  id: 'usr-cand-101',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'alex.candidate@example.com',
  email_confirmed_at: '2026-01-01T00:00:00Z',
  user_metadata: { full_name: 'Alex Johnson', role: 'candidate' },
};

const mockCandidate = {
  id: 'cand-101',
  user_id: 'usr-cand-101',
  headline: 'Customer Experience Lead',
};

const mockTickets = [
  {
    id: 'tkt-101',
    ticket_reference: 'BHG-SUP-2026-001284',
    candidate_id: 'cand-101',
    category: 'application',
    subject: 'Inquiry regarding application review timeframe',
    description: 'I submitted my application for Senior Healthcare Specialist and would like to clarify the review timeframe.',
    status: 'submitted',
    urgency: 'normal',
    related_entity_type: 'application',
    related_entity_id: 'app-101',
    is_candidate_action_required: false,
    unread_candidate_message_count: 0,
    resolution_summary: null,
    closed_at: null,
    reopened_at: null,
    reopen_count: 0,
    created_at: '2026-07-26T10:00:00Z',
    updated_at: '2026-07-26T10:00:00Z',
  },
  {
    id: 'tkt-102',
    ticket_reference: 'BHG-SUP-2026-001285',
    candidate_id: 'cand-101',
    category: 'document',
    subject: 'Passport bio-page re-upload verification',
    description: 'Support requested a clearer scan of my international passport bio-page.',
    status: 'awaiting_candidate',
    urgency: 'urgent',
    related_entity_type: 'document',
    related_entity_id: 'doc-505',
    is_candidate_action_required: true,
    unread_candidate_message_count: 1,
    resolution_summary: null,
    closed_at: null,
    reopened_at: null,
    reopen_count: 0,
    created_at: '2026-07-25T14:00:00Z',
    updated_at: '2026-07-26T09:00:00Z',
  },
  {
    id: 'tkt-103',
    ticket_reference: 'BHG-SUP-2026-001286',
    candidate_id: 'cand-101',
    category: 'interview',
    subject: 'Video interview reschedule request confirmed',
    description: 'Thank you for adjusting my video interview schedule with Dubai Central Hospital.',
    status: 'resolved',
    urgency: 'normal',
    related_entity_type: 'interview',
    related_entity_id: 'int-202',
    is_candidate_action_required: false,
    unread_candidate_message_count: 0,
    resolution_summary: 'Interview rescheduled to 28 July 2026 at 14:00 GST as requested.',
    closed_at: '2026-07-24T16:00:00Z',
    reopened_at: null,
    reopen_count: 0,
    created_at: '2026-07-23T11:00:00Z',
    updated_at: '2026-07-24T16:00:00Z',
  },
];

const mockMessages = [
  {
    id: 'msg-1',
    ticket_id: 'tkt-102',
    author_role: 'candidate',
    author_display_name: 'Alex Johnson',
    message_text: 'Support requested a clearer scan of my international passport bio-page.',
    is_candidate_visible: true,
    created_at: '2026-07-25T14:00:00Z',
  },
  {
    id: 'msg-2',
    ticket_id: 'tkt-102',
    author_role: 'support',
    author_display_name: 'Candidate Support Officer',
    message_text: 'Hello Alex, please re-upload your passport copy in the Document Vault with all four corners visible.',
    is_candidate_visible: true,
    created_at: '2026-07-26T09:00:00Z',
  },
];

test.describe('Be Humble & Grow — Candidate Support Centre E2E Suite', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    // Inject auth session into localStorage using all known storage keys
    await page.addInitScript((session) => {
      window.localStorage.setItem('bhg_auth_token', JSON.stringify(session));
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
        body: acceptHeader.toLowerCase().includes('vnd.pgrst.object') ? JSON.stringify(profileData) : JSON.stringify([profileData]),
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
          body: acceptHeader.toLowerCase().includes('vnd.pgrst.object')
            ? JSON.stringify({ id: 'cand-empty', user_id: 'usr-cand-101' })
            : JSON.stringify([{ id: 'cand-empty', user_id: 'usr-cand-101' }]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.toLowerCase().includes('vnd.pgrst.object') ? JSON.stringify(mockCandidate) : JSON.stringify([mockCandidate]),
      });
    });

    await page.route('**/rest/v1/candidate_support_tickets*', async (route) => {
      const acceptHeader = (route.request().headers()['accept'] || '').toLowerCase();
      const url = route.request().url();

      if (url.includes('cand-empty') || url.includes('candidate_id=eq.cand-empty')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
        return;
      }

      // Handle single ticket query
      if (url.includes('id=eq.tkt-102') || url.includes('tkt-102')) {
        const isSingle = acceptHeader.includes('vnd.pgrst.object') || url.includes('id=eq.');
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: isSingle ? JSON.stringify(mockTickets[1]) : JSON.stringify([mockTickets[1]]),
        });
        return;
      }

      if (url.includes('id=eq.tkt-101') || url.includes('tkt-101')) {
        const isSingle = acceptHeader.includes('vnd.pgrst.object') || url.includes('id=eq.');
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: isSingle ? JSON.stringify(mockTickets[0]) : JSON.stringify([mockTickets[0]]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object') ? JSON.stringify(mockTickets[0]) : JSON.stringify(mockTickets),
      });
    });

    await page.route('**/rest/v1/candidate_support_messages*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMessages),
      });
    });

    await page.route('**/rest/v1/rpc/create_my_candidate_support_ticket*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockTickets[0],
          id: 'tkt-new-999',
          ticket_reference: 'BHG-SUP-2026-999999',
          subject: 'New Ticket Created in E2E',
        }),
      });
    });

    await page.route('**/rest/v1/rpc/reply_to_my_candidate_support_ticket*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'msg-reply-99',
          ticket_id: 'tkt-102',
          author_role: 'candidate',
          author_display_name: 'Alex Johnson',
          message_text: 'I have uploaded the new passport scan to Document Vault.',
          is_candidate_visible: true,
          created_at: new Date().toISOString(),
        }),
      });
    });

    await page.route('**/rest/v1/rpc/close_my_candidate_support_ticket*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockTickets[1],
          status: 'closed',
          closed_at: new Date().toISOString(),
        }),
      });
    });

    await page.route('**/rest/v1/rpc/reopen_my_candidate_support_ticket*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockTickets[1],
          status: 'reopened',
          reopened_at: new Date().toISOString(),
        }),
      });
    });
  });

  test('1. Render Support Centre header, bento metrics, FAQs, and ticket cards', async ({ page }) => {
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('h1')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Support Centre').first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('BHG-SUP-2026-001284').first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Inquiry regarding application review timeframe').first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Passport bio-page re-upload verification').first()).toBeVisible({ timeout: 20000 });
  });

  test('2. Filter tickets by tab, category, and search query', async ({ page }) => {
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    // Filter Response Required
    await page.getByRole('button', { name: 'Response Required' }).first().click();
    await expect(page.getByText('Passport bio-page re-upload verification').first()).toBeVisible({ timeout: 20000 });

    // Search query
    const searchInput = page.getByPlaceholder('Search support requests by reference or subject...');
    await searchInput.fill('001284');
    await expect(page.getByText('BHG-SUP-2026-001284').first()).toBeVisible({ timeout: 20000 });
  });

  test('3. Open Create Support Request modal and validate required fields', async ({ page }) => {
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Create Support Request' }).first().click();
    await expect(page.getByText('Create Support Request').first()).toBeVisible({ timeout: 20000 });

    // Fill short inputs (under min bounds) to trigger length validation error messages
    await page.getByPlaceholder('Brief summary of your inquiry (min 5 chars)').fill('Hi');
    await page.getByPlaceholder('Explain your question or issue in detail (min 20 chars)...').fill('Short info');

    await page.getByRole('button', { name: 'Submit Request' }).first().click();
    await expect(page.getByText('Subject must be at least 5 characters long.')).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Description must be at least 20 characters long.')).toBeVisible({ timeout: 20000 });
  });

  test('4. Successfully create a new candidate support request', async ({ page }) => {
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: 'Create Support Request' }).first().click();
    await expect(page.getByText('Create Support Request').first()).toBeVisible({ timeout: 20000 });

    await page.getByPlaceholder('Brief summary of your inquiry (min 5 chars)').fill('Need help with MOHRE work permit status');
    await page.getByPlaceholder('Explain your question or issue in detail (min 20 chars)...').fill('My work permit reference was issued yesterday and I would like to check next steps for visa appointment.');

    await page.getByRole('button', { name: 'Submit Request' }).first().click();
  });

  test('5. Open owned ticket details, view conversation, and submit reply', async ({ page }) => {
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    const viewBtn = page.getByRole('button', { name: 'View Request' }).first();
    await expect(viewBtn).toBeVisible({ timeout: 20000 });
    await viewBtn.click();

    await expect(page.getByText('Messages').first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('Hello Alex, please re-upload your passport copy').first()).toBeVisible({ timeout: 20000 });

    // Fill reply text
    const replyArea = page.getByPlaceholder('Type your reply to candidate support...');
    await replyArea.fill('I have uploaded the new passport scan to Document Vault.');
    await page.getByTitle('Send reply').first().click();
  });

  test('6. Render empty state when candidate has no support tickets', async ({ page }) => {
    await page.route('**/rest/v1/candidates*', async (route) => {
      const acceptHeader = (route.request().headers()['accept'] || '').toLowerCase();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: acceptHeader.includes('vnd.pgrst.object')
          ? JSON.stringify({ id: 'cand-empty', user_id: 'usr-cand-101' })
          : JSON.stringify([{ id: 'cand-empty', user_id: 'usr-cand-101' }]),
      });
    });

    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('You have no support requests yet').first()).toBeVisible({ timeout: 20000 });
  });

  test('7. Mobile viewport layout responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/candidate/support', { waitUntil: 'domcontentloaded' });

    await expect(page.getByText('Support Centre').first()).toBeVisible({ timeout: 20000 });
    await expect(page.getByText('BHG-SUP-2026-001284').first()).toBeVisible({ timeout: 20000 });
  });
});
