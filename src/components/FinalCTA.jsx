import React from 'react';
import { UserRoundCheck, Search, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#102A4C] via-[#0B2342] to-emerald-950 text-white relative overflow-hidden">
      
      {/* Decorative Light Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10 text-center max-w-4xl mx-auto space-y-8">
        
        <div className="badge-trust bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 mx-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Transparent International Recruitment</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to take the next step toward a UAE career?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Start with a free eligibility assessment and discover opportunities that match your experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <a href="#eligibility" className="btn btn-primary text-base py-4 px-8 shadow-xl">
            <UserRoundCheck className="w-5 h-5" />
            <span>Check Your Eligibility</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <a href="#opportunities" className="btn btn-secondary text-base py-4 px-8 bg-white/10 hover:bg-white/20 text-white border-white/20">
            <Search className="w-5 h-5 text-slate-300" />
            <span>Browse Opportunities</span>
          </a>
        </div>

        <p className="text-xs text-slate-400 max-w-xl mx-auto pt-4 leading-normal">
          No employment or visa outcome is guaranteed. Final decisions remain subject to employer selection and official UAE government approval.
        </p>

      </div>
    </section>
  );
}
