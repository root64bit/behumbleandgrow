import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import type { CandidateDocument } from '../../lib/supabase/types';
import {
  loadCandidateDocuments,
  uploadCandidateDocument,
  replaceCandidateDocument,
  requestDocumentSignedUrl,
} from '../../services/candidate-documents.service';
import {
  calculateDocumentReadiness,
  DocumentReadinessResult,
  DEFAULT_PLATFORM_REQUIREMENTS,
} from '../../lib/candidate/documentReadiness';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export function isDemoDataAllowed(): boolean {
  return (
    import.meta.env.DEV &&
    import.meta.env.VITE_DEMO_DATA_ENABLED === 'true'
  );
}

export function useCandidateDocuments() {
  const { user } = useAuth();

  const [documentsState, setDocumentsState] = useState<ResourceState<CandidateDocument[]>>({ status: 'loading' });
  const [readiness, setReadiness] = useState<DocumentReadinessResult>(calculateDocumentReadiness([]));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const [previewDoc, setPreviewDoc] = useState<CandidateDocument | null>(null);
  const [previewSignedUrl, setPreviewSignedUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!user) {
      if (isDemoDataAllowed()) {
        const demoDocs: CandidateDocument[] = [
          {
            id: 'demo-doc-1',
            candidate_id: 'demo-cand-1',
            document_type: 'candidate-cv',
            file_name: 'Amina_Mabote_Hospitality_CV.pdf',
            storage_path: 'demo-cand-1/candidate-cv/cv.pdf',
            mime_type: 'application/pdf',
            file_size: 2450000,
            classification: 'confidential',
            verification_status: 'verified',
            uploaded_at: '2026-01-15T10:00:00Z',
          },
          {
            id: 'demo-doc-2',
            candidate_id: 'demo-cand-1',
            document_type: 'candidate-identity',
            file_name: 'Passport_Scan_Mozambique.pdf',
            storage_path: 'demo-cand-1/candidate-identity/passport.pdf',
            mime_type: 'application/pdf',
            file_size: 4800000,
            expiry_date: '2029-08-20',
            classification: 'confidential',
            verification_status: 'under_review',
            uploaded_at: '2026-02-01T14:30:00Z',
          },
        ];

        setDocumentsState({ status: 'success', data: demoDocs });
        setReadiness(calculateDocumentReadiness(demoDocs));
        return;
      }

      setDocumentsState({ status: 'error', message: 'Unauthenticated user session.' });
      return;
    }

    try {
      const docs = await loadCandidateDocuments(user.id);
      const activeDocs = docs.filter((d) => d.verification_status !== 'superseded' && d.verification_status !== 'archived');

      if (activeDocs.length === 0) {
        setDocumentsState({ status: 'empty', data: [] });
      } else {
        setDocumentsState({ status: 'success', data: activeDocs });
      }

      setReadiness(calculateDocumentReadiness(activeDocs));
    } catch (err: any) {
      setDocumentsState({ status: 'error', message: err.message || 'Failed to fetch candidate documents.' });
    }
  }, [user]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDoc = async (
    docType: 'candidate-cv' | 'candidate-identity' | 'candidate-certificates',
    file: File,
    expiryDate?: string
  ) => {
    if (!user && !isDemoDataAllowed()) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    try {
      if (isDemoDataAllowed()) {
        const mockDoc: CandidateDocument = {
          id: `demo-doc-${Date.now()}`,
          candidate_id: 'demo-cand-1',
          document_type: docType,
          file_name: file.name,
          storage_path: `demo-cand-1/${docType}/${file.name}`,
          mime_type: file.type,
          file_size: file.size,
          expiry_date: expiryDate || null,
          classification: 'confidential',
          verification_status: 'pending',
          uploaded_at: new Date().toISOString(),
        };

        const currentDocs = documentsState.status === 'success' ? documentsState.data : [];
        const updated = [mockDoc, ...currentDocs];
        setDocumentsState({ status: 'success', data: updated });
        setReadiness(calculateDocumentReadiness(updated));
        setUploadSuccessMsg(`Document ${file.name} uploaded successfully.`);
        return;
      }

      await uploadCandidateDocument({
        userId: user!.id,
        docType,
        file,
        expiryDate,
      });

      setUploadSuccessMsg(`Document ${file.name} uploaded successfully to private storage.`);
      await fetchDocuments();
    } catch (err: any) {
      setUploadError(err.message || 'Document upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const replaceDoc = async (previousDoc: CandidateDocument, file: File, expiryDate?: string) => {
    if (!user && !isDemoDataAllowed()) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccessMsg(null);

    try {
      if (isDemoDataAllowed()) {
        const mockDoc: CandidateDocument = {
          id: `demo-doc-${Date.now()}`,
          candidate_id: 'demo-cand-1',
          document_type: previousDoc.document_type,
          file_name: file.name,
          storage_path: `demo-cand-1/${previousDoc.document_type}/${file.name}`,
          mime_type: file.type,
          file_size: file.size,
          expiry_date: expiryDate || null,
          classification: 'confidential',
          verification_status: 'pending',
          uploaded_at: new Date().toISOString(),
        };

        const currentDocs = documentsState.status === 'success' ? documentsState.data : [];
        const filtered = currentDocs.filter((d) => d.id !== previousDoc.id);
        const updated = [mockDoc, ...filtered];
        setDocumentsState({ status: 'success', data: updated });
        setReadiness(calculateDocumentReadiness(updated));
        setUploadSuccessMsg(`Replacement document ${file.name} uploaded.`);
        return;
      }

      await replaceCandidateDocument({
        userId: user!.id,
        previousDoc,
        file,
        expiryDate,
      });

      setUploadSuccessMsg(`Replacement document ${file.name} uploaded successfully.`);
      await fetchDocuments();
    } catch (err: any) {
      setUploadError(err.message || 'Document replacement failed.');
    } finally {
      setUploading(false);
    }
  };

  const generatePreview = async (doc: CandidateDocument) => {
    setPreviewDoc(doc);
    setPreviewSignedUrl(null);
    setPreviewLoading(true);

    try {
      if (isDemoDataAllowed()) {
        setPreviewSignedUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
        setPreviewLoading(false);
        return;
      }

      const url = await requestDocumentSignedUrl(doc);
      setPreviewSignedUrl(url);
    } catch (err: any) {
      console.error('Signed URL preview error:', err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewDoc(null);
    setPreviewSignedUrl(null); // Clear signed URL from state on modal close
  };

  return {
    documentsState,
    readiness,
    uploading,
    uploadError,
    uploadSuccessMsg,
    previewDoc,
    previewSignedUrl,
    previewLoading,
    uploadDoc,
    replaceDoc,
    generatePreview,
    closePreview,
    refetch: fetchDocuments,
  };
}
