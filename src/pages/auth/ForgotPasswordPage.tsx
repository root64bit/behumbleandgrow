import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import { supabase } from '../../lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        console.warn('Supabase Password Reset Error:', error.message);
        setErrorMessage(error.message);
        return;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader />

      {!isSubmitted ? (
        <>
          <div className="text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <KeyRound className="w-6 h-6" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reset your password
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600">
              Enter the email address associated with your candidate, partner or employer account and we’ll send you a secure reset link.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="Email Address"
              type="email"
              required
              icon={Mail}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <span>Send Password Reset Link</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs">
            <Link to="/login" className="font-bold text-slate-600 hover:text-emerald-700 flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Login</span>
            </Link>
          </div>
        </>
      ) : (
        /* Non-enumerating Generic Success Message */
        <div className="text-left space-y-5 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Check your inbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If an account exists for <span className="font-bold text-slate-900">{email}</span>, a secure password reset link has been sent.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Didn't receive the email?</p>
            <p>1. Check your Spam or Junk folder for an email from Supabase / Be Humble & Grow.</p>
            <p>2. Default Supabase SMTP limit is 3 emails/hour. Check your Supabase Dashboard SMTP settings if testing repeatedly.</p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn btn-secondary w-full py-3 text-xs"
            >
              Try another email address
            </button>

            <Link to="/login" className="btn btn-ghost w-full py-2.5 text-xs text-center">
              Return to Login
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
