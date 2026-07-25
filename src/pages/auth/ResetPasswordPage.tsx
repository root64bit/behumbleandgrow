import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, CheckCircle2, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import { supabase } from '../../lib/supabase/client';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password fields.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader />

      {!isSuccess ? (
        <>
          <div className="text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <KeyRound className="w-6 h-6" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create a new password
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600">
              Choose a strong password that you have not used for this account before.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput
              label="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />

            <PasswordStrength password={newPassword} />

            <PasswordInput
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Password Updated Success State */
        <div className="text-left space-y-5 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Password updated successfully
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Your account password has been reset. You can now log in using your new credentials.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary w-full py-3.5 text-base shadow-md"
            >
              <span>Log In Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
