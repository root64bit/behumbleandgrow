import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { UserRoleName } from '../supabase/types';
import { hasRole } from '../permissions/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerified?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireEmailVerified = true,
}) => {
  const { user, isLoading, isEmailVerified, isSuspended } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-300">Resolving security session...</p>
        </div>
      </div>
    );
  }

  // Enforce strict authentication requirement (No DEV bypasses permitted)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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

  if (requireEmailVerified && !isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
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
  const { userRoles, isLoading } = useAuth();

  if (isLoading) return null;

  const isAuthorized = hasRole(userRoles, allowedRoles);

  if (!isAuthorized) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
