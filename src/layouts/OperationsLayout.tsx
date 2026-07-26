import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth/AuthContext';
import { Building2, Users, FileText, LogOut, ShieldAlert } from 'lucide-react';

export default function OperationsLayout() {
  const { profile, userRoles, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              OPS
            </div>
            <div>
              <span className="font-bold text-white text-sm">Operations Console</span>
              <div className="text-[10px] text-indigo-400 font-mono">Global Management & Verification</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{profile?.full_name}</div>
              <div className="text-[10px] text-indigo-300 font-mono">Roles: {userRoles.join(', ')}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto py-2">
            <NavLink
              to="/operations"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Console Home</span>
            </NavLink>
            <NavLink
              to="/operations/candidates"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Users className="w-3.5 h-3.5" />
              <span>Candidate Pool</span>
            </NavLink>
            <NavLink
              to="/operations/applications"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Applications Queue</span>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
