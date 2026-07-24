import React, { useState, useEffect } from 'react';
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-header shadow-sm py-3' : 'bg-transparent py-4'}`}>
      <div className="container flex items-center justify-between">
        
        {/* Official Logo */}
        <a href="/" className="flex items-center gap-2 group text-decoration-none">
          <img 
            src="/assets/be-humble-grow/logo-primary-horizontal.webp" 
            alt="Be Humble & Grow Logo" 
            className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              // Fallback to PNG if webp fails
              e.currentTarget.src = "/assets/be-humble-grow/logo-primary-horizontal.png";
            }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors">How It Works</a>
          <a href="#opportunities" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors">Find Opportunities</a>
          <a href="#candidates" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors">For Candidates</a>
          <a href="#employers" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors">For Employers</a>
          <a href="#partners" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors">Partners</a>
          <a href="#safety" className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-1">
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

          <a href="#login" className="btn btn-secondary text-sm px-4 py-2">
            Log In
          </a>

          <a href="#eligibility" className="btn btn-primary text-sm px-4 py-2">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <a href="#login" className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-2 py-1">
            Log In
          </a>

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
                <img src="/assets/be-humble-grow/logo-primary-horizontal.webp" alt="Be Humble & Grow" className="h-8 w-auto" />
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">UAE Licensed</span>
              </div>

              <div className="flex flex-col space-y-4">
                <a href="#how-it-works" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#opportunities" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Find Opportunities</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#candidates" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>For Candidates</span>
                  <UserRoundCheck className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#employers" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>For Employers</span>
                  <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#partners" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>For Recruitment Partners</span>
                  <UsersRound className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#safety" onClick={() => setMobileDrawerOpen(false)} className="text-base font-semibold text-slate-800 hover:text-emerald-700 py-2 border-b border-slate-50 flex items-center justify-between">
                  <span>Recruitment Safety & Trust</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <a href="#eligibility" onClick={() => setMobileDrawerOpen(false)} className="btn btn-primary w-full py-3.5 text-base">
                <UserRoundCheck className="w-5 h-5" />
                <span>Check Your Eligibility</span>
              </a>
              <a href="#login" onClick={() => setMobileDrawerOpen(false)} className="btn btn-secondary w-full py-3 text-base">
                Log In
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
