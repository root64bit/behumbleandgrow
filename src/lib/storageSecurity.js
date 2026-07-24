// src/lib/storageSecurity.js
// Storage Security & Signed URL Generator for Be Humble & Grow Platform

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

/**
 * Creates an upload intent for private document storage
 */
export function createUploadIntent({ userId, documentType, fileName, mimeType, fileSize }) {
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(`Security Violation: Disallowed file type [${mimeType}]`);
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    throw new Error(`Security Violation: File size exceeds maximum limit of 10MB`);
  }

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

  return {
    intent_id: `intent_${Math.random().toString(36).substr(2, 9)}`,
    user_id: userId,
    document_type: documentType,
    file_name: fileName,
    mime_type: mimeType,
    file_size: fileSize,
    expires_at: expiresAt.toISOString(),
    status: 'pending',
  };
}

/**
 * Generates a short-lived signed URL for reading private document content
 * @param {String} storagePath Path inside private storage vault
 * @param {Number} expiresInMinutes Expiration time (default: 15 minutes)
 */
export function generateSignedUrl(storagePath, expiresInMinutes = 15) {
  if (!storagePath) {
    throw new Error('Storage path is required');
  }

  const expiresAt = Math.floor(Date.now() / 1000) + expiresInMinutes * 60;
  // Simulated cryptographically signed URL token
  const token = `sig_${Buffer.from(`${storagePath}:${expiresAt}`).toString('base64url')}`;

  return {
    signed_url: `https://vault.behumbleandgrow.org/storage/v1/object/sign/${storagePath}?token=${token}`,
    expires_at: new Date(expiresAt * 1000).toISOString(),
    expires_in_seconds: expiresInMinutes * 60,
  };
}
