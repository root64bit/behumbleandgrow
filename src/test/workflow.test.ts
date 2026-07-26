import { describe, it, expect } from 'vitest';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from '../services/storage.service';

describe('Private Storage Security Policy Baseline', () => {
  it('enforces MIME type restrictions for private document vault', () => {
    expect(ALLOWED_MIME_TYPES).toContain('application/pdf');
    expect(ALLOWED_MIME_TYPES).toContain('image/jpeg');
    expect(ALLOWED_MIME_TYPES).toContain('image/png');
    expect(ALLOWED_MIME_TYPES).not.toContain('application/x-executable');
    expect(ALLOWED_MIME_TYPES).not.toContain('text/html');
  });

  it('enforces 10MB file size limit for candidate uploads', () => {
    expect(MAX_FILE_SIZE_BYTES).toBe(10 * 1024 * 1024);
  });
});
