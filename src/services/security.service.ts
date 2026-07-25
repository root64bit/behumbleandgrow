import { supabase } from '../lib/supabase/client';

export type SecurityEventType = 
  | 'login_success' 
  | 'login_failed' 
  | 'logout' 
  | 'password_reset_requested' 
  | 'password_updated' 
  | 'role_changed' 
  | 'account_suspended' 
  | 'mfa_challenged' 
  | 'mfa_enabled' 
  | 'invitation_accepted';

export type SecuritySeverity = 'info' | 'warning' | 'critical';

export async function logSecurityEvent(
  eventType: SecurityEventType,
  severity: SecuritySeverity = 'info',
  details: Record<string, any> = {},
  userId?: string
): Promise<void> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const effectiveUserId = userId || sessionData?.session?.user?.id || null;

    const { error } = await supabase.from('security_events').insert({
      user_id: effectiveUserId,
      event_type: eventType,
      severity,
      details,
      created_at: new Date().toISOString(),
    } as any);

    if (error) {
      console.warn('Security event log notice:', error.message);
    }
  } catch (err: any) {
    console.warn('Failed to log security event:', err.message);
  }
}
