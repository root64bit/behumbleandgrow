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
    if (!rawToken || rawToken.length < 8) return null;

    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('token_hash', rawToken)
      .single();

    if (error || !data) {
      return null;
    }

    const invitation = data as InvitationRecord;

    // Check expiration
    if (new Date(invitation.expires_at) < new Date()) {
      return { ...invitation, status: 'expired' };
    }

    return invitation;
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
    // 1. Update invitation status to accepted
    const { error: inviteErr } = await supabase
      .from('invitations')
      .update({
        status: 'accepted',
        used_at: new Date().toISOString(),
      } as any)
      .eq('id', invitation.id);

    if (inviteErr) {
      console.error('Error marking invitation accepted:', inviteErr);
      return false;
    }

    // 2. Assign role and organisation to user
    const { error: roleErr } = await supabase
      .from('user_roles')
      .insert({
        profile_id: userId,
        role: invitation.role,
        organisation_id: invitation.organisation_id,
        created_at: new Date().toISOString(),
      } as any);

    if (roleErr) {
      console.warn('Notice setting user role on invitation accept:', roleErr.message);
    }

    await logSecurityEvent('invitation_accepted', 'info', {
      invitation_id: invitation.id,
      assigned_role: invitation.role,
      organisation_id: invitation.organisation_id,
    }, userId);

    return true;
  } catch (err: any) {
    console.error('Failed to accept invitation:', err);
    return false;
  }
}
