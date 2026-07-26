import { describe, it, expect } from 'vitest';
import { validateSupportAttachment } from '../lib/candidate/supportValidation';

describe('Candidate Support Attachment Security Helper', () => {
  it('accepts valid PDF, JPEG, PNG, and WebP attachments under 5MB', () => {
    expect(validateSupportAttachment({ name: 'document.pdf', size: 1024 * 1024, type: 'application/pdf' })).toBeNull();
    expect(validateSupportAttachment({ name: 'photo.jpg', size: 2 * 1024 * 1024, type: 'image/jpeg' })).toBeNull();
    expect(validateSupportAttachment({ name: 'screen.png', size: 500 * 1024, type: 'image/png' })).toBeNull();
    expect(validateSupportAttachment({ name: 'image.webp', size: 800 * 1024, type: 'image/webp' })).toBeNull();
  });

  it('rejects oversized files exceeding 5 MB limit', () => {
    const err = validateSupportAttachment({ name: 'large.pdf', size: 6 * 1024 * 1024, type: 'application/pdf' });
    expect(err).toBe('File size exceeds the maximum limit of 5 MB.');
  });

  it('rejects executable, script, or unsupported MIME types', () => {
    expect(validateSupportAttachment({ name: 'script.exe', size: 1000, type: 'application/x-msdownload' })).toBe('Only PDF, JPEG, PNG, and WebP files are allowed for support attachments.');
    expect(validateSupportAttachment({ name: 'payload.js', size: 1000, type: 'text/javascript' })).toBe('Only PDF, JPEG, PNG, and WebP files are allowed for support attachments.');
    expect(validateSupportAttachment({ name: 'archive.zip', size: 1000, type: 'application/zip' })).toBe('Only PDF, JPEG, PNG, and WebP files are allowed for support attachments.');
  });
});
