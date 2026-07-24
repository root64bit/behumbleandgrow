import React from 'react';
import { ShieldCheck, Lock, ListChecks, Scale, ArrowRight } from 'lucide-react';

export default function TrustSafetySection() {
  const pillars = [
    {
      title: "Verified Opportunities",
      desc: "Vacancies are reviewed before being published on the platform.",
      icon: ShieldCheck
    },
    {
      title: "Secure Documents",
      desc: "Candidate documents are handled through controlled and private access.",
      icon: Lock
    },
    {
      title: "Clear Application Status",
      desc: "Candidates can see what stage their application has reached and whether action is required.",
      icon: ListChecks
    },
    {
      title: "No False Guarantees",
      desc: "Employer selection, work-permit decisions and visa approvals remain subject to relevant organisations and authorities.",
      icon: Scale
    }
  ];

  return (
    <section id="safety" className="py-20 bg-white">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Safety, Security & Compliance
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent recruitment at every stage
          </h2>

          <p className="text-base text-slate-600 font-normal">
            We prioritize ethical recruitment, data privacy, and realistic expectations for every candidate and employer on our platform.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-600/50 transition-all hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a href="#safety-guide" className="btn btn-secondary text-sm px-6 py-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Read Our Recruitment Safety Guide</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
