import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  loginSchema,
  candidateDocumentUploadSchema,
  applicationSubmissionSchema,
} from '../lib/validation/schemas';

describe('Zod Input Validation Schemas', () => {
  it('validates candidate registration input', () => {
    const valid = registerSchema.safeParse({
      fullName: 'Amina Mabote',
      email: 'amina@example.com',
      password: 'password123',
      countryCode: 'MOZ',
    });
    expect(valid.success).toBe(true);

    const invalidEmail = registerSchema.safeParse({
      fullName: 'Amina Mabote',
      email: 'invalid-email',
      password: 'password123',
      countryCode: 'MOZ',
    });
    expect(invalidEmail.success).toBe(false);
  });

  it('validates document upload file metadata', () => {
    const valid = candidateDocumentUploadSchema.safeParse({
      documentType: 'candidate-identity',
      fileName: 'passport.pdf',
      mimeType: 'application/pdf',
      fileSize: 2 * 1024 * 1024,
    });
    expect(valid.success).toBe(true);

    const oversize = candidateDocumentUploadSchema.safeParse({
      documentType: 'candidate-identity',
      fileName: 'large.pdf',
      mimeType: 'application/pdf',
      fileSize: 25 * 1024 * 1024, // 25MB > 10MB limit
    });
    expect(oversize.success).toBe(false);
  });

  it('enforces explicit candidate consent for application submission', () => {
    const valid = applicationSubmissionSchema.safeParse({
      jobId: '11111111-1111-1111-1111-111111111111',
      consentGiven: true,
    });
    expect(valid.success).toBe(true);

    const invalid = applicationSubmissionSchema.safeParse({
      jobId: '11111111-1111-1111-1111-111111111111',
      consentGiven: false,
    });
    expect(invalid.success).toBe(false);
  });
});
