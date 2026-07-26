import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, LogIn, UserRoundCheck, Loader2, AlertCircle } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../../lib/auth/AuthContext';
import { getRoleDefaultRoute } from '../../lib/permissions/rbac';
import type { UserRoleName } from '../../lib/supabase/types';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, userRoles } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [unconfirmedEmail, setUnconfirmedEmail] = useState(false);

  // If already authenticated, redirect to default role route
  useEffect(() => {
    if (user && userRoles.length > 0) {
      const dest = getRoleDefaultRoute(userRoles);
      navigate(dest, { replace: true });
    }
  }, [user, userRoles, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setUnconfirmedEmail(false);
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.warn('Supabase Auth Sign In Notice:', error.message);
        
        if (error.message.includes('Email not confirmed')) {
          setUnconfirmedEmail(true);
          setErrorMessage('Your email address has not been verified yet. Please check your inbox for the confirmation link.');
        } else if (error.message.includes('Invalid login credentials')) {
          setErrorMessage('Invalid email address or password. Please verify your credentials.');
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      if (data.session?.user) {
        // Resolve authoritative role from database
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('profile_id', data.session.user.id);

        const rolesList = (rolesData || []).map((r: any) => r.role) as UserRoleName[];
        const targetRoute = getRoleDefaultRoute(rolesList);
        navigate(targetRoute);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          {unconfirmedEmail && (
            <div className="pt-1">
              <Link 
                to="/verify-email" 
                state={{ email }}
                className="text-xs font-bold text-rose-900 underline hover:text-rose-950"
              >
                Go to Verification Page to Resend Email
              </Link>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <AuthInput
          label="Email Address"
          type="email"
          required
          icon={Mail}
          placeholder="candidate.test@behumbleandgrow.com"
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
            <span>Remember session</span>
          </label>

          <Link to="/forgot-password" className="font-bold text-emerald-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Log In to Candidate Portal</span>
            </>
          )}
        </button>
      </form>

      {/* Switcher & Registration */}
      <PortalSwitcher currentRole="candidate" />
    </div>
  );
}
