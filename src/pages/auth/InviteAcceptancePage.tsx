import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, UserCheck, Loader2, Building2, CheckCircle2 } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';

export default function InviteAcceptancePage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // Mock invitation details resolved from token
  const inviteInfo = {
    organization: "Jumeirah Talent Operations LLC",
    roleName: "Senior Recruitment Specialist",
    email: "recruiter.invite@agency.com",
    expiresIn: "48 hours",
  };

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAccept = (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

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
              You have been invited to join <span className="font-bold text-slate-900">{inviteInfo.organization}</span> on Be Humble & Grow.
            </p>
          </div>

          {/* Invitation Details Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Invited Organization:</span>
              <span className="font-bold text-slate-900">{inviteInfo.organization}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Role:</span>
              <span className="font-semibold text-emerald-700">{inviteInfo.roleName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Invited Email:</span>
              <span className="font-mono text-slate-800">{inviteInfo.email}</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-left">
              {errorMessage}
            </div>
          )}

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
              Your account has been connected to <span className="font-bold text-slate-900">{inviteInfo.organization}</span>. You can now access your partner workspace.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/partner')}
              className="btn btn-primary w-full py-3.5 text-base shadow-md"
            >
              <span>Go to Partner Dashboard</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
