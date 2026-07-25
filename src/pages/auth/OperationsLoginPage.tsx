import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, Loader2, Key, AlertCircle, ArrowRight } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';
import { supabase } from '../../lib/supabase/client';
import { OPERATIONS_ROLES, SUPER_ADMIN_ROLES, hasRole } from '../../lib/permissions/rbac';
import { logSecurityEvent } from '../../services/security.service';

export default function OperationsLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        await logSecurityEvent('login_failed', 'warning', { portal: 'operations', email, reason: error.message });
        setErrorMessage(error.message.includes('Invalid login credentials') 
          ? 'Invalid operations credentials. Access denied.' 
          : error.message);
        return;
      }

      if (data.session?.user) {
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('profile_id', data.session.user.id);

        const rolesList = (rolesData || []).map((r: any) => r.role);
        const allowed = hasRole(rolesList as any, [...OPERATIONS_ROLES, ...SUPER_ADMIN_ROLES]);

        if (!allowed) {
          await logSecurityEvent('login_failed', 'critical', { portal: 'operations', email, reason: 'unauthorized_role', roles: rolesList });
          setErrorMessage('Access Denied: Your account does not possess operations clearance.');
          await supabase.auth.signOut();
          return;
        }

        await logSecurityEvent('login_success', 'info', { portal: 'operations', email }, data.session.user.id);
        navigate('/operations');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Operations authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    navigate('/operations');
  };

  return (
    <div className="space-y-6">
      <AuthHeader portalName="Operations Access" />

      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <span>Internal System Authorization</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Operations Access
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600">
          Secure access for authorized Be Humble & Grow operations and verification personnel.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium text-left flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">Authorized Personnel Only</p>
          <p className="text-[11px] text-amber-800">All authentication attempts, IP addresses, and operational actions are audited for security compliance.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Authorized Staff Email"
          type="email"
          required
          icon={Mail}
          placeholder="ops.staff@behumbleandgrow.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <PasswordInput
          label="Security Credentials"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn text-white bg-slate-950 hover:bg-slate-900 w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Operations Clearance...</span>
            </>
          ) : (
            <>
              <Key className="w-5 h-5 text-amber-400" />
              <span>Authenticate Operations Session</span>
            </>
          )}
        </button>

        {/* Instant Test Access Button */}
        <button
          type="button"
          onClick={handleDemoAccess}
          className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-200"
        >
          <span>Instant Test Access (Operations Control)</span>
          <ArrowRight className="w-4 h-4 text-emerald-600" />
        </button>
      </form>

      {/* Switcher */}
      <PortalSwitcher currentRole="operations" />
    </div>
  );
}
