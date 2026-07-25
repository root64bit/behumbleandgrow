import { supabase } from '../lib/supabase/client';

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_DOC_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB for backwards compatibility

export function getSensitivitySignedUrlDuration(docType: string): number {
  if (docType === 'candidate-identity' || docType.includes('passport') || docType.includes('national_id')) {
    return 300; // 5 minutes for Identity / Passport
  }
  if (docType === 'candidate-certificates' || docType.includes('certificate')) {
    return 600; // 10 minutes for Certificates
  }
  return 900; // 15 minutes for CV / default
}

export async function uploadPrivateDocument(
  bucketName: string,
  candidateId: string,
  file: File,
  docType: string
): Promise<{ path: string; error: string | null }> {
  try {
    const maxSize = docType === 'candidate-cv' ? MAX_CV_SIZE_BYTES : MAX_DOC_SIZE_BYTES;
    if (file.size > maxSize) {
      const maxMb = maxSize / (1024 * 1024);
      return { path: '', error: `File size exceeds maximum allowed limit of ${maxMb}MB.` };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return { path: '', error: 'Invalid file format. Allowed formats: PDF, JPEG, PNG, WebP.' };
    }

    // Object path: {candidateId}/{docType}/{timestamp}_{cleanFileName}
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

export async function deleteStorageObject(bucketName: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([path]);
    if (error) {
      console.error('Compensating storage object deletion failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error executing compensating object deletion:', err);
    return false;
  }
}

export async function getSignedDocumentUrl(
  bucketName: string,
  path: string,
  docType = 'default'
): Promise<{ signedUrl: string | null; error: string | null }> {
  try {
    const expiresInSeconds = getSensitivitySignedUrlDuration(docType);
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
