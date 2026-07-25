import { supabase } from '../lib/supabase/client';
import { logSecurityEvent } from './security.service';

export interface InvitationRecord {
  id: string;
  email: string;
  role: string;
  organisation_id: string | null;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  expires_at: string;
  invited_by: string | null;
  created_at: string;
}

export async function validateInvitationToken(rawToken: string): Promise<InvitationRecord | null> {
  try {
    console.warn('validateInvitationToken is a no-op (table missing)');
    return null;
  } catch (err) {
    console.error('Error validating invitation token:', err);
    return null;
  }
}

export async function acceptInvitation(
  invitation: InvitationRecord,
  userId: string
): Promise<boolean> {
  try {
    console.warn('acceptInvitation is a no-op (table missing)');
    return false;
  } catch (err: any) {
    console.error('Failed to accept invitation:', err);
    return false;
  }
}
