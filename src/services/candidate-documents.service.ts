import { supabase } from '../lib/supabase/client';
import { uploadPrivateDocument, getSignedDocumentUrl, deleteStorageObject } from './storage.service';
import type { CandidateDocument } from '../lib/supabase/types';

export interface UploadDocumentParams {
  userId: string;
  docType: 'candidate-cv' | 'candidate-identity' | 'candidate-certificates';
  file: File;
  expiryDate?: string;
}

export interface ReplaceDocumentParams {
  userId: string;
  previousDoc: CandidateDocument;
  file: File;
  expiryDate?: string;
}

// Safe Candidate Select Columns (Excludes internal Operations review notes)
const SAFE_CANDIDATE_DOC_COLUMNS = `
  id,
  candidate_id,
  document_type,
  file_name,
  storage_path,
  mime_type,
  file_size,
  expiry_date,
  classification,
  verification_status,
  uploaded_at
`;

export async function uploadCandidateDocument(params: UploadDocumentParams): Promise<CandidateDocument> {
  const { userId, docType, file, expiryDate } = params;
  const bucketName = docType;

  // 1. Storage Upload
  const { path, error: uploadErr } = await uploadPrivateDocument(
    bucketName,
    userId,
    file,
    docType
  );

  if (uploadErr || !path) {
    throw new Error(uploadErr || 'Document upload to storage failed.');
  }

  // 2. Metadata Database Record Insertion
  const { data: docRecord, error: dbErr } = await supabase
    .from('candidate_documents')
    .insert({
      candidate_id: userId,
      document_type: docType,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type,
      file_size: file.size,
      expiry_date: expiryDate || null,
      classification: 'confidential',
      verification_status: 'pending',
      uploaded_at: new Date().toISOString(),
    } as any)
    .select(SAFE_CANDIDATE_DOC_COLUMNS)
    .single();

  // 3. Compensating Cleanup if Database Insert Fails
  if (dbErr || !docRecord) {
    await deleteStorageObject(bucketName, path);
    throw new Error(dbErr?.message || 'Database record creation failed. Compensating object cleanup executed.');
  }

  // 4. Audit Log Entry
  await supabase.from('status_history').insert({
    entity_type: 'document_review',
    entity_id: (docRecord as any).id,
    previous_status: null,
    new_status: 'pending',
    changed_by: userId,
    user_role: 'candidate',
    candidate_message: `Document ${file.name} uploaded for verification.`,
  } as any);

  return docRecord as CandidateDocument;
}

export async function replaceCandidateDocument(params: ReplaceDocumentParams): Promise<CandidateDocument> {
  const { userId, previousDoc, file, expiryDate } = params;
  const docType = previousDoc.document_type as UploadDocumentParams['docType'];

  // 1. Upload new version
  const newDoc = await uploadCandidateDocument({
    userId,
    docType,
    file,
    expiryDate,
  });

  // 2. Mark previous document version as superseded
  await supabase
    .from('candidate_documents')
    .update({
      verification_status: 'superseded',
    } as any)
    .eq('id', previousDoc.id)
    .eq('candidate_id', userId);

  return newDoc;
}

export async function loadCandidateDocuments(userId: string): Promise<CandidateDocument[]> {
  const { data, error } = await supabase
    .from('candidate_documents')
    .select(SAFE_CANDIDATE_DOC_COLUMNS)
    .eq('candidate_id', userId)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching candidate documents:', error);
    return [];
  }

  return (data || []) as CandidateDocument[];
}

export async function requestDocumentSignedUrl(doc: CandidateDocument): Promise<string | null> {
  const bucketName = doc.document_type;
  const { signedUrl } = await getSignedDocumentUrl(bucketName, doc.storage_path, doc.document_type);
  return signedUrl;
}
