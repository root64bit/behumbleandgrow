import { supabase } from '../lib/supabase/client';
import { uploadPrivateDocument, getSignedDocumentUrl } from './storage.service';
import type { CandidateDocument } from '../lib/supabase/types';

export async function uploadAndSaveDocument(
  candidateId: string,
  docType: 'candidate-cv' | 'candidate-identity' | 'candidate-certificates',
  file: File,
  expiryDate?: string
): Promise<CandidateDocument> {
  const bucketName = docType;
  const { path, error: uploadErr } = await uploadPrivateDocument(
    bucketName,
    candidateId,
    file,
    docType
  );

  if (uploadErr || !path) {
    throw new Error(uploadErr || 'Document upload failed.');
  }

  const { data: docRecord, error: dbErr } = await supabase
    .from('candidate_documents')
    .insert({
      candidate_id: candidateId,
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
    .select()
    .single();

  if (dbErr || !docRecord) {
    throw new Error(dbErr?.message || 'DB document record creation failed');
  }

  await supabase.from('status_history').insert({
    entity_type: 'document_review',
    entity_id: (docRecord as any).id,
    previous_status: null,
    new_status: 'pending',
    changed_by: candidateId,
    user_role: 'candidate',
    candidate_message: `Document ${file.name} uploaded for verification.`,
  } as any);

  return docRecord as CandidateDocument;
}

export async function getCandidateDocuments(candidateId: string): Promise<CandidateDocument[]> {
  const { data, error } = await supabase
    .from('candidate_documents')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching candidate documents:', error);
    return [];
  }

  return (data || []) as CandidateDocument[];
}

export async function getDocumentSignedUrl(doc: CandidateDocument): Promise<string | null> {
  const bucketName = doc.document_type;
  const { signedUrl } = await getSignedDocumentUrl(bucketName, doc.storage_path);
  return signedUrl;
}
