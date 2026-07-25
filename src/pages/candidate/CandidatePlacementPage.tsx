import React from 'react';
import { PlaneTakeoff, CheckCircle2, Clock, MapPin, Building, FileCheck, ShieldCheck, HelpCircle } from 'lucide-react';
import { CandidateService } from '../../services/candidate.service';

export default function CandidatePlacementPage() {
  const placement = CandidateService.getPlacementProgress();

  const mobilityMilestones = [
    { step: 1, name: 'Employer Conditional Offer Acceptance', status: 'completed', date: '24 Jan 2026' },
    { step: 2, name: 'MOHRE Work Permit Application Submission', status: 'completed', date: '26 Jan 2026' },
    { step: 3, name: 'UAE Entry Permit Approval & Issue', status: 'in_progress', date: 'Processing with MOHRE' },
    { step: 4, name: 'Flight Ticket & Travel Itinerary Confirmation', status: 'upcoming', date: 'Est. 10 Aug 2026' },
    { step: 5, name: 'Dubai Arrival & Partner Reception', status: 'upcoming', date: 'Est. 15 Aug 2026' },
    { step: 6, name: 'Medical Fitness Test & Emirates ID Biometrics', status: 'upcoming', date: 'Post-Arrival' },
    { step: 7, name: 'Residency Visa Stamping & Employer Onboarding', status: 'upcoming', date: 'Post-Arrival' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-full text-xs font-bold mb-2">
          <PlaneTakeoff className="w-3.5 h-3.5 text-purple-600" />
          <span>UAE Mobility & Relocation Progress</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mobility & Placement Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Monitor your official UAE MOHRE work permit status, travel arrangements, and post-arrival onboarding milestones.
        </p>
      </div>

      {/* Primary Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Placement Employer</div>
            <h2 className="text-lg font-bold text-slate-900">{placement?.employerName || 'Premier Hospitality Group'}</h2>
          </div>

          <div className="sm:text-right">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Arrival Date</div>
            <div className="text-sm font-extrabold text-purple-700">{placement?.expectedArrival || '15 Aug 2026'}</div>
          </div>
        </div>

        <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-900">
            <Clock className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Current Stage: {placement?.currentStage || 'Work Permit Submitted'}</span>
          </div>
          <p className="text-xs text-slate-700">
            {placement?.visaStatus || 'Work Permit Application Submitted to UAE Ministry of Human Resources & Emiratisation (MOHRE)'}.
          </p>
        </div>
      </div>

      {/* Step by Step Milestones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-purple-600" />
          <span>7-Step Relocation Milestone Pathway</span>
        </h3>

        <div className="space-y-3">
          {mobilityMilestones.map((m) => (
            <div 
              key={m.step}
              className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
                m.status === 'completed'
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                  : m.status === 'in_progress'
                  ? 'bg-purple-50 border-purple-300 text-slate-900 ring-2 ring-purple-100'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  m.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : m.status === 'in_progress'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-300 text-slate-700'
                }`}>
                  {m.step}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{m.name}</div>
                  <div className="text-[11px] text-slate-500">{m.date}</div>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                m.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : m.status === 'in_progress'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {m.status === 'completed' ? 'Completed' : m.status === 'in_progress' ? 'In Progress' : 'Upcoming'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
