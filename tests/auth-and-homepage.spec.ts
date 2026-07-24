import { test, expect } from '@playwright/test';

test.describe('Be Humble & Grow — Public Homepage E2E', () => {

  test('should load public homepage with official logo, hero section & navigation', async ({ page }) => {
    await page.goto('/');

    // 1. Verify Page Title
    await expect(page).toHaveTitle(/Be Humble & Grow/);

    // 2. Verify Official Logo Image
    const logo = page.locator('header img[alt="Be Humble & Grow Logo"]');
    await expect(logo).toBeVisible();

    // 3. Verify Hero Headline & Trust Badge
    await expect(page.locator('h1')).toContainText('Turn your experience into');
    await expect(page.getByText('Verified UAE Career Opportunities')).toBeVisible();

    // 4. Verify Primary & Secondary CTAs
    const checkEligibilityBtn = page.getByRole('link', { name: /Check Your Eligibility/i }).first();
    await expect(checkEligibilityBtn).toBeVisible();

    const exploreOpportunitiesBtn = page.getByRole('link', { name: /Explore UAE Opportunities/i }).first();
    await expect(exploreOpportunitiesBtn).toBeVisible();
  });

  test('should display 5-step candidate journey in How It Works section', async ({ page }) => {
    await page.goto('/');

    const howItWorksSection = page.locator('#how-it-works');
    await expect(howItWorksSection).toBeVisible();
    await expect(howItWorksSection.getByText('Your journey to a UAE opportunity')).toBeVisible();

    // Verify steps exist
    await expect(howItWorksSection.getByText('Check Your Eligibility')).toBeVisible();
    await expect(howItWorksSection.getByText('Create Your Profile')).toBeVisible();
    await expect(howItWorksSection.getByText('Upload & Verify Documents')).toBeVisible();
    await expect(howItWorksSection.getByText('Apply & Interview')).toBeVisible();
    await expect(howItWorksSection.getByText('Track Your Progress')).toBeVisible();
  });

  test('should render live featured opportunities and industry categories', async ({ page }) => {
    await page.goto('/');

    // Featured job cards section
    await page.locator('#opportunities').scrollIntoViewIfNeeded();
    await expect(page.getByText('Opportunities currently hiring in the UAE')).toBeVisible();
    await expect(page.getByText('Customer Service Representative').first()).toBeVisible();

    // Industry category cards
    await expect(page.getByText('Explore opportunities by industry')).toBeVisible();
    await expect(page.getByText('Hospitality & Tourism')).toBeVisible();
    await expect(page.getByText('Construction & Skilled Trades')).toBeVisible();
  });

  test('should display 4-column footer with official licensing disclaimer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/Licensed Recruitment Platform in the UAE/i).first()).toBeVisible();
  });

});

test.describe('Be Humble & Grow — Authentication Experience E2E', () => {

  test('Candidate Registration (/register) — 3-step form & validation', async ({ page }) => {
    await page.goto('/register');

    // Heading & Trust Badge
    await expect(page.getByRole('heading', { name: 'Create your candidate account' })).toBeVisible();
    await expect(page.getByText('Candidate Registration').first()).toBeVisible();

    // Fill form inputs
    await page.fill('input[id*="full-legal-name"]', 'Amina Mabote');
    await page.fill('input[type="email"]', 'amina.mabote@example.com');
    await page.fill('input[placeholder="712 345 678"]', '712345678');
    
    // Passwords & Strength meter check
    await page.fill('input[id="password-input"]', 'Password123!');
    await expect(page.getByText('Strong Password')).toBeVisible();

    // Check mandatory visa disclaimer
    const visaDisclaimer = page.locator('input[type="checkbox"]').first();
    await visaDisclaimer.check();
  });

  test('Candidate Login (/login) — Form inputs & portal switcher', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByText('Candidate Portal').first()).toBeVisible();

    // Form controls
    await page.fill('input[type="email"]', 'candidate@example.com');
    await page.fill('input[id="password-input"]', 'Secret123!');

    // Portal Switcher links
    await expect(page.getByRole('link', { name: /Recruiter Partner Login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Employer Login/i })).toBeVisible();
  });

  test('Email Verification (/verify-email) — Masked email & resend timer', async ({ page }) => {
    await page.goto('/verify-email');

    await expect(page.getByRole('heading', { name: 'Verify your email address' })).toBeVisible();
    await expect(page.getByText(/Resend Email in|Resend Verification Email/i)).toBeVisible();

    // Simulate verification click
    await page.click('button:has-text("I\'ve Verified My Email")');
    await expect(page.getByRole('heading', { name: 'Your email is verified' })).toBeVisible();
  });

  test('Forgot Password (/forgot-password) — Security reset request', async ({ page }) => {
    await page.goto('/forgot-password');

    await expect(page.getByRole('heading', { name: 'Reset your password' })).toBeVisible();
    await page.fill('input[type="email"]', 'user@example.com');
    await page.click('button:has-text("Send Password Reset Link")');

    // Non-enumerating success state check
    await expect(page.getByRole('heading', { name: 'Check your inbox' })).toBeVisible();
  });

  test('Recruitment Partner Login (/partner/login)', async ({ page }) => {
    await page.goto('/partner/login');

    await expect(page.getByRole('heading', { name: 'Recruitment Partner Portal' })).toBeVisible();
    await expect(page.getByText('Apply to Become a Partner')).toBeVisible();
  });

  test('Employer Portal Login (/employer/login)', async ({ page }) => {
    await page.goto('/employer/login');

    await expect(page.getByRole('heading', { name: 'Employer Portal' })).toBeVisible();
    await expect(page.getByText('Become an Employer Partner')).toBeVisible();
  });

  test('Operations Access Login (/operations/login)', async ({ page }) => {
    await page.goto('/operations/login');

    await expect(page.getByRole('heading', { name: 'Operations Access' })).toBeVisible();
    await expect(page.getByText('Authorized Personnel Only')).toBeVisible();
  });

  test('Invitation Acceptance (/invite/sample-token)', async ({ page }) => {
    await page.goto('/invite/sample-token');

    await expect(page.getByRole('heading', { name: 'Accept your invitation' })).toBeVisible();
    await expect(page.getByText('Jumeirah Talent Operations LLC').first()).toBeVisible();
  });

  test('Access Denied Screen (/access-denied)', async ({ page }) => {
    await page.goto('/access-denied');

    await expect(page.getByRole('heading', { name: "You don't have access to this area" })).toBeVisible();
    await expect(page.getByRole('button', { name: /Return to My Dashboard/i })).toBeVisible();
  });

});
