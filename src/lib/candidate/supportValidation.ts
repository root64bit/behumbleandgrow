export interface SupportValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateSupportSubject(subject?: string | null): string | null {
  if (!subject || typeof subject !== 'string') return 'Subject is required.';
  const trimmed = subject.trim();
  if (trimmed.length < 5) return 'Subject must be at least 5 characters long.';
  if (trimmed.length > 160) return 'Subject cannot exceed 160 characters.';
  return null;
}

export function validateSupportDescription(description?: string | null): string | null {
  if (!description || typeof description !== 'string') return 'Description is required.';
  const trimmed = description.trim();
  if (trimmed.length < 20) return 'Description must be at least 20 characters long.';
  if (trimmed.length > 5000) return 'Description cannot exceed 5,000 characters.';
  return null;
}

export function validateSupportMessage(message?: string | null): string | null {
  if (!message || typeof message !== 'string') return 'Message cannot be empty.';
  const trimmed = message.trim();
  if (trimmed.length < 1) return 'Message text cannot be empty.';
  if (trimmed.length > 5000) return 'Message text cannot exceed 5,000 characters.';
  return null;
}

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateSupportAttachment(file: { name: string; size: number; type: string }): string | null {
  if (!file) return 'Attachment file is required.';
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File size exceeds the maximum limit of 5 MB.';
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return 'Only PDF, JPEG, PNG, and WebP files are allowed for support attachments.';
  }
  return null;
}

export function sanitizePlainText(input?: string | null): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Strip control characters
    .trim();
}
