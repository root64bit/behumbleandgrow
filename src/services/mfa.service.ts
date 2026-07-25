import { supabase } from '../lib/supabase/client';
import { logSecurityEvent } from './security.service';

export async function getMfaAssuranceLevel(): Promise<{ currentLevel: string; nextLevel: string } | null> {
  try {
    const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) return null;
    return {
      currentLevel: data.currentLevel || 'aal1',
      nextLevel: data.nextLevel || 'aal1',
    };
  } catch (err) {
    return null;
  }
}

export async function enrollTotpMfa(): Promise<{ factorId: string; qrCode: string; secret: string } | null> {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Be Humble & Grow Authenticator',
    });

    if (error || !data) {
      console.warn('MFA enrollment error:', error?.message);
      return null;
    }

    return {
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
    };
  } catch (err: any) {
    console.error('Failed to enroll TOTP MFA:', err);
    return null;
  }
}

export async function verifyTotpMfaCode(factorId: string, code: string): Promise<boolean> {
  try {
    const { data: challengeData, error: challengeErr } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeErr || !challengeData) return false;

    const { error: verifyErr } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code,
    });

    if (verifyErr) {
      await logSecurityEvent('mfa_challenged', 'warning', { factorId, status: 'failed' });
      return false;
    }

    await logSecurityEvent('mfa_challenged', 'info', { factorId, status: 'verified' });
    return true;
  } catch (err: any) {
    console.error('Failed to verify MFA code:', err);
    return false;
  }
}
