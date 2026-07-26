import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Globe2, 
  ShieldCheck, 
  BriefcaseBusiness, 
  UsersRound, 
  UserRoundCheck, 
  ArrowRight 
} from 'lucide-react';

export default function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-header shadow-md py-3' : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-4'}`}>
      <div className="container flex items-center justify-between">
        
        {/* Prominent High-Visibility Official Logo */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none shrink-0 py-1">
          <img 
            src="/assets/be-humble-grow/logo-primary-horizontal.webp" 
            alt="Be Humble & Grow Logo" 
            className="h-11 sm:h-13 md:h-15 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.src = "/assets/be-humble-grow/logo-primary-horizontal.png";
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/jobs" className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors">Find Opportunities</Link>
          <Link to="/eligibility" className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors">Check Eligibility</Link>
          <Link to="/candidate" className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors">Candidate Portal</Link>
          <Link to="/operations" className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors">Internal Ops</Link>
          <a href="/#safety" className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Safety
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors">
            <Globe2 className="w-4 h-4 text-slate-500" />
            <span>EN</span>
          </button>

          <Link to="/login" className="btn btn-secondary text-sm px-4 py-2 font-bold">
            Log In
          </Link>

          <Link to="/register" className="btn btn-primary text-sm px-5 py-2.5 font-bold shadow-md">
            <span>Register Candidate</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <Link to="/login" className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-2 py-1">
            Log In
          </Link>

          <button 
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} 
            className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 top-[4.5rem] bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in" onClick={() => setMobileDrawerOpen(false)}>
          <div className="bg-white w-full max-w-md ml-auto h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <img src="/assets/be-humble-grow/logo-primary-horizontal.webp" alt="Be Humble & Grow" className="h-10 w-auto" />
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">UAE Licensed</span>
              </div>

              <div className="flex flex-col space-y-4">
                <Link to="/jobs" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Find Opportunities</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link to="/eligibility" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link to="/candidate" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Candidate Portal</span>
                  <UserRoundCheck className="w-4 h-4 text-slate-400" />
                </Link>
                <Link to="/operations" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Internal Ops Console</span>
                  <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link to="/eligibility" onClick={() => setMobileDrawerOpen(false)} className="btn btn-primary w-full py-3.5 text-base">
                <UserRoundCheck className="w-5 h-5" />
                <span>Check Your Eligibility</span>
              </Link>
              <Link to="/login" onClick={() => setMobileDrawerOpen(false)} className="btn btn-secondary w-full py-3 text-base">
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
