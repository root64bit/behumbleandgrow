import React from 'react';
import { 
  CheckCircle2, 
  UserRoundCheck, 
  ShieldCheck, 
  FileLock, 
  Briefcase, 
  Video, 
  FileCheck, 
  Plane, 
  Headphones, 
  ArrowRight 
} from 'lucide-react';

export default function CandidateBenefits() {
  const benefits = [
    {
      title: "Personal Eligibility Guidance",
      desc: "Preliminary check aligned with UAE labor standards.",
      icon: UserRoundCheck
    },
    {
      title: "Professional Candidate Profile",
      desc: "Standardized digital resume optimized for employers.",
      icon: CheckCircle2
    },
    {
      title: "Secure Document Management",
      desc: "Encrypted storage for certificates, CV, and passport.",
      icon: FileLock
    },
    {
      title: "Verified Vacancy Discovery",
      desc: "Access legitimate positions from licensed UAE employers.",
      icon: Briefcase
    },
    {
      title: "Application & Interview Tracking",
      desc: "Real-time updates at every stage of your pipeline.",
      icon: Video
    },
    {
      title: "Conditional Offer Review",
      desc: "Clear visibility into terms, compensation, and benefits.",
      icon: FileCheck
    },
    {
      title: "Work-Permit & Visa Progress Updates",
      desc: "Track official authorization and visa processing stages.",
      icon: Plane
    },
    {
      title: "Dedicated Candidate Support",
      desc: "Guidance throughout your relocation journey.",
      icon: Headphones
    }
  ];

  return (
    <section id="candidates" className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Graphic */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="Candidate success story" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50 w-fit mb-2">
                    Global Career Partner
                  </span>
                  <h4 className="text-xl font-bold">Empowering Ambitious Professionals</h4>
                  <p className="text-xs text-slate-300 mt-1">Connecting verified international talent with thriving UAE enterprises.</p>
                </div>
              </div>

              {/* Floating Feature Micro Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Verified Employers</p>
                  <p className="text-[11px] text-slate-500">Transparent Recruitment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              Built for International Candidates
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Everything you need to prepare and apply with confidence
            </h2>

            <p className="text-base text-slate-600 font-normal">
              Our structured platform eliminates uncertainty by providing step-by-step guidance from your initial eligibility evaluation to final placement.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <a href="#eligibility" className="btn btn-primary text-base py-3.5 px-6">
                <UserRoundCheck className="w-5 h-5" />
                <span>Create Your Candidate Profile</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
