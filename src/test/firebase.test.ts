import { describe, it, expect } from 'vitest';
import { firebaseConfig } from '../lib/firebase/client';
import { validateFirebaseClaims } from '../lib/firebaseClient';

describe('Firebase Security & Config Baseline', () => {
  it('contains valid project credentials in configuration', () => {
    expect(firebaseConfig.projectId).toBe('behumbleandgrow');
    expect(firebaseConfig.authDomain).toContain('behumbleandgrow.firebaseapp.com');
  });

  it('validates Firebase ID token claims format', () => {
    expect(validateFirebaseClaims({ uid: 'user_123' })).toBe(true);
    expect(validateFirebaseClaims({ sub: 'user_456' })).toBe(true);
    expect(validateFirebaseClaims(null)).toBe(false);
  });
});
