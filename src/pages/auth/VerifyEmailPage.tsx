import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MailCheck, CheckCircle2, RefreshCw, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import { supabase } from '../../lib/supabase/client';

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state?.email || '';
  const maskedEmail = userEmail ? userEmail.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + '*'.repeat(gp3.length)) : 'your email address';

  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0 && !isVerified) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, isVerified]);

  // Check if session is already confirmed on mount
  useEffect(() => {
    async function checkInitialVerification() {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email_confirmed_at) {
        setIsVerified(true);
      }
    }
    checkInitialVerification();
  }, []);

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setErrorMessage('');

    try {
      // 1. Refresh Auth Session from Supabase
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
      const { data: userData } = await supabase.auth.getUser();

      const user = refreshData?.session?.user || userData?.user;

      if (user?.email_confirmed_at) {
        setIsVerified(true);
      } else {
        setErrorMessage('Verification incomplete: Your email address has not been confirmed yet. Please open the link in your email or click Resend.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to verify email status.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending || !userEmail) return;

    setIsResending(true);
    setErrorMessage('');
    setResendSuccess(false);

    try {
      const redirectUrl = `${window.location.origin}/login`;

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        console.warn('Resend verification email error:', error.message);
        if (error.message.includes('rate limit') || error.status === 429) {
          setErrorMessage('Email send rate limit reached. Please wait a few minutes before requesting another email.');
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      setResendSuccess(true);
      setCountdown(60);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader />

      {!isVerified ? (
        <>
          <div className="text-left space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <MailCheck className="w-6 h-6" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Verify your email address
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We sent a verification email to <span className="font-bold text-slate-900">{maskedEmail}</span>. Please open the email and click the confirmation link.
            </p>
          </div>

          {resendSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold text-left">
              Verification email resent successfully! Please check your inbox and spam folder.
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Verification Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleCheckVerification}
              disabled={isChecking}
              className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Checking Verification Status...</span>
                </>
              ) : (
                <>
                  <span>I've Verified My Email — Continue</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <button
              onClick={handleResend}
              disabled={countdown > 0 || isResending || !userEmail}
              className="btn btn-secondary w-full py-3 text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
              <span>
                {countdown > 0 ? `Resend Email in ${countdown}s` : 'Resend Verification Email'}
              </span>
            </button>
          </div>

          {/* Help Links */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 text-left space-y-1">
            <p>Didn't receive the email? Check your spam folder or click Resend above.</p>
            <p>Need to update your email? <Link to="/register" className="text-emerald-700 font-bold hover:underline">Re-register with correct address</Link>.</p>
          </div>
        </>
      ) : (
        /* Verified Success State */
        <div className="text-left space-y-6 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Account Active
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your email is verified!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Your candidate account is active. Continue with the preliminary eligibility assessment or view your dashboard.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate('/eligibility')}
              className="btn btn-primary w-full py-3.5 text-base shadow-md"
            >
              <span>Check My Eligibility</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate('/candidate')}
              className="btn btn-secondary w-full py-3 text-sm"
            >
              Go to Candidate Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
