import React from 'react';
import { 
  ShieldCheck, 
  UserRoundCheck, 
  Search, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Building2, 
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Video
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-50/50">
      <div className="hero-radial-glow"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Badge */}
            <div className="badge-trust">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified UAE Career Opportunities</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Turn your experience into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                your next UAE opportunity.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Build your professional profile, explore verified vacancies and receive structured recruitment support—from eligibility assessment and document preparation to interviews and placement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#eligibility" className="btn btn-primary text-base py-3.5 px-6 shadow-md">
                <UserRoundCheck className="w-5 h-5" />
                <span>Check Your Eligibility</span>
              </a>

              <a href="#opportunities" className="btn btn-secondary text-base py-3.5 px-6">
                <Search className="w-5 h-5 text-slate-500" />
                <span>Explore UAE Opportunities</span>
              </a>
            </div>

            {/* Compact Trust Information Row */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified vacancies</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Structured candidate screening</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent application tracking</span>
              </div>
            </div>

          </div>

          {/* Right Column Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Opportunity Card */}
              <div className="glass-card rounded-2xl p-6 shadow-xl border border-slate-200/80 bg-white/95 relative z-10 transition-all hover:shadow-2xl">
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified UAE Employer</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">Active Recruitment</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">Customer Service Representative</h3>
                    <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Premier Hospitality Group · Dubai, UAE</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      AED 4,000–5,000 / month
                    </span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      Full-time
                    </span>
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">
                      Accommodation Available
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600">Visa Support Provided</span>
                  </div>
                  
                  <a href="#opportunities" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                    <span>View Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Secondary Candidate Progress Micro Card */}
              <div className="mt-4 glass-card rounded-xl p-4 bg-slate-900 text-white shadow-lg border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-300">Your UAE Journey</p>
                    <p className="text-sm font-bold text-white">Profile Verification in Progress</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/50">
                    Step 2 of 5
                  </span>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white p-3 rounded-xl shadow-lg border border-slate-200 items-center gap-2.5 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Profile Verified</p>
                  <p className="text-[10px] text-slate-500">Qualifications Checked</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200 items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Interview Prep</p>
                  <p className="text-[10px] text-slate-500">Scheduled Support</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
