import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { UserRoleName } from '../supabase/types';
import { hasRole, SUPER_ADMIN_ROLES, OPERATIONS_ROLES, getRoleDefaultRoute } from '../permissions/rbac';
import { getMfaAssuranceLevel } from '../../services/mfa.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerified?: boolean;
  requireMfa?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireEmailVerified = true,
  requireMfa = false,
}) => {
  const { user, isLoading, isEmailVerified, isSuspended, userRoles } = useAuth();
  const location = useLocation();
  const [mfaVerified, setMfaVerified] = useState<boolean | null>(null);

  const isPrivilegedUser = hasRole(userRoles, [...SUPER_ADMIN_ROLES, ...OPERATIONS_ROLES]);
  const mfaRequiredForUser = requireMfa || isPrivilegedUser;

  useEffect(() => {
    async function checkMfa() {
      if (user && mfaRequiredForUser) {
        const assurance = await getMfaAssuranceLevel();
        if (assurance && assurance.nextLevel === 'aal2' && assurance.currentLevel !== 'aal2') {
          setMfaVerified(false);
        } else {
          setMfaVerified(true);
        }
      } else {
        setMfaVerified(true);
      }
    }

    if (!isLoading) {
      checkMfa();
    }
  }, [user, isLoading, mfaRequiredForUser]);

  if (isLoading || mfaVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-300">Resolving security session & assurance level...</p>
        </div>
      </div>
    );
  }

  // Require authenticated session (Strict RBAC security)
  if (!user) {
    let loginTarget = '/login';
    if (location.pathname.startsWith('/operations')) loginTarget = '/operations/login';
    else if (location.pathname.startsWith('/partner') || location.pathname.startsWith('/recruiter')) loginTarget = '/partner/login';
    else if (location.pathname.startsWith('/employer')) loginTarget = '/employer/login';

    return <Navigate to={loginTarget} state={{ from: location }} replace />;
  }

  if (isSuspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="max-w-md bg-slate-900 p-8 rounded-2xl border border-red-500/30 text-center space-y-4 shadow-xl">
          <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full uppercase">Account Suspended</span>
          <h2 className="text-xl font-bold text-white">Access Temporarily Suspended</h2>
          <p className="text-xs text-slate-400">Your account has been suspended by platform compliance officers. Please contact support@behumbleandgrow.com.</p>
        </div>
      </div>
    );
  }

  if (requireEmailVerified && !isEmailVerified && user) {
    return <Navigate to="/verify-email" replace />;
  }

  if (mfaRequiredForUser && mfaVerified === false && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="max-w-md bg-slate-900 p-8 rounded-2xl border border-amber-500/30 text-center space-y-4 shadow-xl">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full uppercase">MFA Challenge Required</span>
          <h2 className="text-xl font-bold text-white">Two-Factor Authentication Required</h2>
          <p className="text-xs text-slate-400">Access to privileged administration portals requires multi-factor authenticator (TOTP) verification. Please complete MFA challenge.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRoleName[];
  fallbackPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallbackPath = '/access-denied',
}) => {
  const { user, userRoles, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAuthorized = hasRole(userRoles, allowedRoles);

  if (!isAuthorized) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
