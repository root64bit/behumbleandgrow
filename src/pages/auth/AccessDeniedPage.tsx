import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn, Home } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <AuthHeader />

      <div className="text-left space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Authorization Error 403
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            You don't have access to this area
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This section is restricted to authorized accounts with the required portal permission. If you believe this is an error, please contact your administrator or sign in with another account.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={() => navigate('/candidate')}
            className="btn btn-primary w-full py-3.5 text-base shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to My Dashboard</span>
          </button>

          <Link
            to="/login"
            className="btn btn-secondary w-full py-3 text-sm justify-center"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In with Another Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
