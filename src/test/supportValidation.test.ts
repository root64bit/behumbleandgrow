import { describe, it, expect } from 'vitest';
import {
  validateSupportSubject,
  validateSupportDescription,
  validateSupportMessage,
  sanitizePlainText,
} from '../lib/candidate/supportValidation';

describe('Candidate Support Validation Helper', () => {
  it('validates subject length bounds (5-160 chars)', () => {
    expect(validateSupportSubject('Hi')).toBe('Subject must be at least 5 characters long.');
    expect(validateSupportSubject('Valid Subject Example')).toBeNull();
    expect(validateSupportSubject('A'.repeat(161))).toBe('Subject cannot exceed 160 characters.');
  });

  it('validates description length bounds (20-5000 chars)', () => {
    expect(validateSupportDescription('Short message')).toBe('Description must be at least 20 characters long.');
    expect(validateSupportDescription('This is a valid detailed description explaining the candidate support inquiry.')).toBeNull();
    expect(validateSupportDescription('A'.repeat(5001))).toBe('Description cannot exceed 5,000 characters.');
  });

  it('validates message text cannot be empty', () => {
    expect(validateSupportMessage('')).toBe('Message cannot be empty.');
    expect(validateSupportMessage('Thank you for the update.')).toBeNull();
  });

  it('sanitizes HTML tags and control characters to plain text', () => {
    const raw = '<script>alert(1)</script>Hello <b>world</b>!\x00';
    const clean = sanitizePlainText(raw);
    expect(clean).toBe('alert(1)Hello world!');
  });
});
