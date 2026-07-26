import { describe, it, expect } from 'vitest';
import { ALLOWED_MIME_TYPES, MAX_CV_SIZE_BYTES, MAX_DOC_SIZE_BYTES, getSensitivitySignedUrlDuration } from '../services/storage.service';

describe('Document Upload Validation & Security Suite', () => {
  it('should validate allowed MIME types (PDF, JPEG, PNG, WebP)', () => {
    expect(ALLOWED_MIME_TYPES).toContain('application/pdf');
    expect(ALLOWED_MIME_TYPES).toContain('image/jpeg');
    expect(ALLOWED_MIME_TYPES).toContain('image/png');
    expect(ALLOWED_MIME_TYPES).toContain('image/webp');
    expect(ALLOWED_MIME_TYPES).not.toContain('application/x-msdownload');
  });

  it('should enforce 5MB size limit for CV and 10MB for documents', () => {
    expect(MAX_CV_SIZE_BYTES).toBe(5 * 1024 * 1024);
    expect(MAX_DOC_SIZE_BYTES).toBe(10 * 1024 * 1024);
  });

  it('should enforce sensitivity-based signed URL durations', () => {
    expect(getSensitivitySignedUrlDuration('candidate-identity')).toBe(300); // 5 mins
    expect(getSensitivitySignedUrlDuration('candidate-certificates')).toBe(600); // 10 mins
    expect(getSensitivitySignedUrlDuration('candidate-cv')).toBe(900); // 15 mins
  });
});
