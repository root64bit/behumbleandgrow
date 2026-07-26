import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Loader2, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import { supabase } from '../../lib/supabase/client';
import { validateInvitationToken, acceptInvitation, type InvitationRecord } from '../../services/invitation.service';

export default function InviteAcceptancePage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState<InvitationRecord | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function checkToken() {
      if (!token) {
        setErrorMessage('Invalid or missing invitation token.');
        setIsValidating(false);
        return;
      }

      const inv = await validateInvitationToken(token);
      if (!inv) {
        setErrorMessage('This invitation link is invalid or has already been used.');
      } else if (inv.status === 'expired') {
        setErrorMessage('This invitation link has expired. Please request a new invitation.');
      } else if (inv.status === 'revoked') {
        setErrorMessage('This invitation has been revoked by the issuing organisation.');
      } else {
        setInvitation(inv);
      }
      setIsValidating(false);
    }

    checkToken();
  }, [token]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please check both fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!invitation) {
      setErrorMessage('Invitation token validation failed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Sign up user via Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: invitation.email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: invitation.role,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.user) {
        // 2. Mark invitation accepted and record user role in DB
        await acceptInvitation(invitation, data.user.id);
        setIsSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process invitation acceptance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="space-y-6">
        <AuthHeader portalName="Organization Invitation" />
        <div className="min-h-[300px] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-sm font-medium text-slate-600">Validating secure invitation token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuthHeader portalName="Organization Invitation" />

      {!isSuccess ? (
        <>
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authorized Team Invite</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Accept your invitation
            </h1>

            <p className="text-xs sm:text-sm text-slate-600">
              You have been invited to join <span className="font-bold text-slate-900">{invitation?.organisation_id ? 'your organization' : 'Be Humble & Grow'}</span>.
            </p>
          </div>

          {/* Invitation Details Summary Box */}
          {invitation && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Role:</span>
                <span className="font-semibold text-emerald-700 capitalize">{invitation.role.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Invited Email:</span>
                <span className="font-mono text-slate-800">{invitation.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Token Status:</span>
                <span className="font-bold text-emerald-600 uppercase">{invitation.status}</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {invitation && invitation.status === 'pending' && (
            <form onSubmit={handleAccept} className="space-y-4">
              <AuthInput
                label="Full Legal Name"
                required
                placeholder="e.g. Sarah Kamau"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />

              <PasswordInput
                label="Create Account Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <PasswordStrength password={password} />

              <PasswordInput
                label="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Invitation...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-5 h-5" />
                      <span>Accept Invitation & Join Team</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="btn btn-ghost w-full py-2.5 text-xs text-slate-500"
                >
                  Decline Invitation
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        /* Invitation Success State */
        <div className="text-left space-y-5 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Invitation accepted!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Your account has been created and connected to your organization. You can now log in to access your portal.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary w-full py-3.5 text-base shadow-md"
            >
              <span>Log In to Account</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
