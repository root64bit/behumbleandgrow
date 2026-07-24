import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, LogIn, UsersRound, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';

export default function PartnerLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/recruiter');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <AuthHeader portalName="Recruitment Partner Portal" />

      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
          <UsersRound className="w-3.5 h-3.5 text-emerald-600" />
          <span>Recruiter & Agency Access</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Recruitment Partner Portal
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600">
          Access assigned candidate leads, recruiter workflows, employer submissions and placement progress.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Work Email Address"
          type="email"
          required
          icon={Mail}
          placeholder="recruiter@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span>Remember work session</span>
          </label>

          <Link to="/forgot-password" className="font-bold text-emerald-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating Partner Session...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Log In to Partner Console</span>
            </>
          )}
        </button>
      </form>

      {/* Partner Onboarding Callout */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900">Need a recruitment partner account?</p>
          <p className="text-[11px] text-slate-500">Partner accounts require agency verification & approval.</p>
        </div>
        <a href="#partners" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 shrink-0">
          <span>Apply to Become a Partner</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Switcher */}
      <PortalSwitcher currentRole="partner" />

    </div>
  );
}
