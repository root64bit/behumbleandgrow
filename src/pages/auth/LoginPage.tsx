import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, LogIn, ShieldCheck, Loader2, UserRoundCheck } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate Candidate Login
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to candidate dashboard route
      navigate('/candidate');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <AuthHeader />

      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
          <UserRoundCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Candidate Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Log in to manage your candidate profile, applications, interviews and placement progress.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-left">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email Address */}
        <AuthInput
          label="Email Address"
          type="email"
          required
          icon={Mail}
          placeholder="amina.mabote@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {/* Password Input */}
        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span>Remember me on this device</span>
          </label>

          <Link to="/forgot-password" className="font-bold text-emerald-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in securely...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Log In to Candidate Dashboard</span>
            </>
          )}
        </button>
      </form>

      {/* Trust Notice */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 text-left flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Your account credentials and documents are protected through encrypted access controls.</span>
      </div>

      {/* Register Link */}
      <div className="pt-1 text-center text-xs text-slate-600">
        <span>Don't have a candidate account yet? </span>
        <Link to="/register" className="font-bold text-emerald-700 hover:underline">
          Create Account Here
        </Link>
      </div>

      {/* Portal Switcher */}
      <PortalSwitcher currentRole="candidate" />

    </div>
  );
}
