import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, Loader2, Key } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PortalSwitcher from '../../components/auth/PortalSwitcher';

export default function OperationsLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/operations');
    }, 1000);
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
      </form>

      {/* Switcher */}
      <PortalSwitcher currentRole="operations" />

    </div>
  );
}
