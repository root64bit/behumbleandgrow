import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, LogIn, Building2, Loader2, AlertCircle } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';
import { supabase } from '../../lib/supabase/client';
import { useAuth } from '../../lib/auth/AuthContext';
import { EMPLOYER_ROLES, SUPER_ADMIN_ROLES, hasRole, getRoleDefaultRoute } from '../../lib/permissions/rbac';
import { logSecurityEvent } from '../../services/security.service';
import type { UserRoleName } from '../../lib/supabase/types';

export default function EmployerLoginPage() {
  const navigate = useNavigate();
  const { user, userRoles } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user && userRoles.length > 0) {
      const dest = getRoleDefaultRoute(userRoles);
      navigate(dest, { replace: true });
    }
  }, [user, userRoles, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        await logSecurityEvent('login_failed', 'warning', { portal: 'employer', email, reason: error.message });
        setErrorMessage(error.message.includes('Invalid login credentials') 
          ? 'Invalid corporate credentials. Please verify your email and password.' 
          : error.message);
        return;
      }

      if (data.session?.user) {
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('profile_id', data.session.user.id);

        const rolesList = (rolesData || []).map((r: any) => r.role) as UserRoleName[];
        const allowed = hasRole(rolesList, [...EMPLOYER_ROLES, ...SUPER_ADMIN_ROLES]);

        if (!allowed) {
          await logSecurityEvent('login_failed', 'critical', { portal: 'employer', email, reason: 'unauthorized_role', roles: rolesList });
          setErrorMessage('Access Denied: Your account is not authorized as an Employer.');
          await supabase.auth.signOut();
          return;
        }

        await logSecurityEvent('login_success', 'info', { portal: 'employer', email }, data.session.user.id);
        const target = getRoleDefaultRoute(rolesList);
        navigate(target);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Employer authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader portalName="Employer Portal" />

      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>UAE Employer Access</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Employer Portal
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600">
          Review matched candidate profiles, coordinate video interviews and manage recruitment decisions.
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
          label="Corporate Work Email"
          type="email"
          required
          icon={Mail}
          placeholder="employer.test@behumbleandgrow.com"
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
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
            />
            <span>Remember session</span>
          </label>

          <Link to="/forgot-password" className="font-bold text-teal-700 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn text-white bg-slate-900 hover:bg-slate-800 w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating Employer Access...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Log In to Employer Workspace</span>
            </>
          )}
        </button>
      </form>

      {/* Switcher */}
      <PortalSwitcher currentRole="employer" />
    </div>
  );
}
