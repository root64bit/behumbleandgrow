import { supabase } from '../lib/supabase/client';

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function uploadPrivateDocument(
  bucketName: string,
  candidateId: string,
  file: File,
  docType: string
): Promise<{ path: string; error: string | null }> {
  try {
    // Validate file size & type
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { path: '', error: 'File size exceeds 10MB limit.' };
    }
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { path: '', error: 'Invalid file format. Allowed formats: PDF, JPEG, PNG.' };
    }

    // Generate unique object path: {candidate_id}/{docType}/{timestamp}_{filename}
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${candidateId}/${docType}/${Date.now()}_${cleanFileName}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return { path: '', error: error.message };
    }

    return { path, error: null };
  } catch (err: any) {
    return { path: '', error: err.message || 'Storage upload error' };
  }
}

export async function getSignedDocumentUrl(
  bucketName: string,
  path: string,
  expiresInSeconds = 1800 // 30 mins
): Promise<{ signedUrl: string | null; error: string | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresInSeconds);

    if (error) {
      return { signedUrl: null, error: error.message };
    }

    return { signedUrl: data.signedUrl, error: null };
  } catch (err: any) {
    return { signedUrl: null, error: err.message || 'Signed URL generation failed' };
  }
}
