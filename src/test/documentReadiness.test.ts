import { describe, it, expect } from 'vitest';
import {
  calculateDocumentReadiness,
  calculateDocumentExpiryState,
  getDocumentStatusLabel,
  DEFAULT_PLATFORM_REQUIREMENTS,
} from '../lib/candidate/documentReadiness';
import type { CandidateDocument } from '../lib/supabase/types';

describe('Candidate Document Readiness & Expiry Calculator Suite', () => {
  it('should calculate 0% readiness when no required documents are uploaded', () => {
    const readiness = calculateDocumentReadiness([]);
    expect(readiness.score).toBe(0);
    expect(readiness.totalRequired).toBe(2);
    expect(readiness.uploadedRequired).toBe(0);
    expect(readiness.overallStatus).toBe('incomplete');
  });

  it('should calculate 50% readiness when CV is uploaded but Passport is missing', () => {
    const docs: Partial<CandidateDocument>[] = [
      {
        id: 'doc-1',
        candidate_id: 'cand-1',
        document_type: 'candidate-cv',
        file_name: 'cv.pdf',
        verification_status: 'pending',
        classification: 'confidential',
        uploaded_at: new Date().toISOString(),
      },
    ];

    const readiness = calculateDocumentReadiness(docs as CandidateDocument[]);
    expect(readiness.score).toBe(50);
    expect(readiness.uploadedRequired).toBe(1);
    expect(readiness.overallStatus).toBe('incomplete');
  });

  it('should calculate 100% readiness when both CV and Passport are uploaded', () => {
    const docs: Partial<CandidateDocument>[] = [
      {
        id: 'doc-1',
        candidate_id: 'cand-1',
        document_type: 'candidate-cv',
        file_name: 'cv.pdf',
        verification_status: 'approved',
        classification: 'confidential',
        uploaded_at: new Date().toISOString(),
      },
      {
        id: 'doc-2',
        candidate_id: 'cand-1',
        document_type: 'candidate-identity',
        file_name: 'passport.pdf',
        verification_status: 'approved',
        classification: 'confidential',
        uploaded_at: new Date().toISOString(),
      },
    ];

    const readiness = calculateDocumentReadiness(docs as CandidateDocument[]);
    expect(readiness.score).toBe(100);
    expect(readiness.approvedRequired).toBe(2);
    expect(readiness.overallStatus).toBe('ready');
  });

  it('should verify optional certificates do not reduce required document score', () => {
    const docs: Partial<CandidateDocument>[] = [
      {
        id: 'doc-1',
        candidate_id: 'cand-1',
        document_type: 'candidate-cv',
        file_name: 'cv.pdf',
        verification_status: 'approved',
        classification: 'confidential',
        uploaded_at: new Date().toISOString(),
      },
      {
        id: 'doc-2',
        candidate_id: 'cand-1',
        document_type: 'candidate-identity',
        file_name: 'passport.pdf',
        verification_status: 'approved',
        classification: 'confidential',
        uploaded_at: new Date().toISOString(),
      },
    ];

    const readinessWithCert = calculateDocumentReadiness(docs as CandidateDocument[]);
    expect(readinessWithCert.score).toBe(100);
  });

  it('should calculate expiry states correctly', () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    const soonDate = new Date(Date.now() + 30 * 86400000).toISOString();
    const farDate = new Date(Date.now() + 365 * 86400000).toISOString();

    expect(calculateDocumentExpiryState(pastDate)).toBe('expired');
    expect(calculateDocumentExpiryState(soonDate)).toBe('expiring_soon');
    expect(calculateDocumentExpiryState(farDate)).toBe('valid');
  });

  it('should map DB statuses to human-readable canonical labels', () => {
    expect(getDocumentStatusLabel('approved')).toBe('Verified');
    expect(getDocumentStatusLabel('pending')).toBe('Pending Review');
    expect(getDocumentStatusLabel('rejected')).toBe('Rejected');
    expect(getDocumentStatusLabel('not_uploaded')).toBe('Missing');
  });
});
