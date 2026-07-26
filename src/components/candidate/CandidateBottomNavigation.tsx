import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Send, 
  Video, 
  User 
} from 'lucide-react';

export default function CandidateBottomNavigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/candidate/dashboard', icon: Home },
    { label: 'Jobs', path: '/candidate/jobs', icon: Briefcase },
    { label: 'Applications', path: '/candidate/applications', icon: Send, badge: 1 },
    { label: 'Interviews', path: '/candidate/interviews', icon: Video, badge: 1 },
    { label: 'Profile', path: '/candidate/profile', icon: User }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/candidate/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-[#C4C6CF]/40 h-16 px-2 flex items-center justify-around lg:hidden rounded-t-xl shadow-[0px_-4px_12px_rgba(15,39,71,0.05)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all duration-200 active:scale-90 relative ${
              active 
                ? 'text-[#006D44] dark:text-emerald-400 font-bold' 
                : 'text-[#44474E] dark:text-slate-400 hover:text-slate-900 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${active ? 'text-[#006D44] dark:text-emerald-400 scale-105' : 'text-[#44474E]'}`} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-1 font-label-sm leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
