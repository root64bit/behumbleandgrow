import React from 'react';
import { Building2, UsersRound, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PartnerAudienceSection() {
  return (
    <section id="employers" className="py-20 bg-slate-50">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Multi-Stakeholder Architecture
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            One platform connecting candidates, employers and recruitment partners
          </h2>

          <p className="text-base text-slate-600 font-normal">
            Streamlined recruitment workflows built to deliver transparency, efficiency and compliant hiring across international borders.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Employer Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Building2 className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">For UAE Businesses & Enterprises</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                Hire qualified international candidates
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Access structured candidate profiles, verified documents, interview coordination and transparent recruitment pipelines designed for seamless global hiring.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pre-screened candidate credentials & verified CVs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Integrated video interview scheduling & feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>End-to-end conditional offer and visa tracking</span>
                </li>
              </ul>
            </div>

            <a href="#for-employers" className="btn btn-secondary text-sm py-3 px-6 w-full justify-between">
              <span>For Employers</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Recruitment Partner Card */}
          <div id="partners" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors">
                <UsersRound className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">For Licensed Agencies & Agencies</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                Receive and process qualified candidate leads
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Accept assigned leads, manage recruiter workloads, submit candidates to employers and track interviews, offers and placements in real time.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Automated candidate lead distribution & management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Structured document verification workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Direct submission to verified UAE employers</span>
                </li>
              </ul>
            </div>

            <a href="#for-recruiters" className="btn btn-primary text-sm py-3 px-6 w-full justify-between">
              <span>For Recruitment Partners</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
