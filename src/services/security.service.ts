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
    console.warn('Security event (no-op):', eventType, severity, details, userId);
  } catch (err: any) {
    console.warn('Failed to log security event:', err.message);
  }
}
