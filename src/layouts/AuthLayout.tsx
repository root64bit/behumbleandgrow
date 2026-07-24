import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AuthBrandPanel, { AuthContextRole } from '../components/auth/AuthBrandPanel';

export default function AuthLayout() {
  const location = useLocation();

  // Determine role based on route path
  let currentRole: AuthContextRole = 'candidate';
  if (location.pathname.startsWith('/partner')) {
    currentRole = 'partner';
  } else if (location.pathname.startsWith('/employer')) {
    currentRole = 'employer';
  } else if (location.pathname.startsWith('/operations')) {
    currentRole = 'operations';
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Form Content Side */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between max-w-xl mx-auto w-full">
            <Outlet />
          </div>

          {/* Supporting Brand Side-Panel (Desktop only) */}
          <div className="hidden lg:block lg:col-span-6">
            <AuthBrandPanel role={currentRole} />
          </div>

        </div>
      </main>

      {/* Footer Minimal Copyright */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white/50">
        <p>© 2026 Be Humble & Grow. Licensed International Recruitment Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
