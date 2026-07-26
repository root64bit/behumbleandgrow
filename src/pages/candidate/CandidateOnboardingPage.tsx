import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, FileText, ArrowRight } from 'lucide-react';

export default function CandidateOnboardingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
          Step-by-Step Guidance
        </span>
        <h1 className="text-2xl font-bold text-slate-900">Candidate Onboarding Workflow</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          Complete the following required milestones to enable recruitment partner assignments and verified UAE employer submissions.
        </p>

        <div className="space-y-4 pt-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">1</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Account Registration & Email Verification</div>
                <div className="text-[11px] text-emerald-700">Completed</div>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-200 text-emerald-900 font-bold rounded-lg text-[10px]">DONE</span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">2</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Profile Details & Work Experience</div>
                <div className="text-[11px] text-slate-500">Provide legal name, current location, and skills</div>
              </div>
            </div>
            <Link to="/candidate/profile" className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700">
              Complete Profile
            </Link>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">3</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Upload Confidential Verification Documents</div>
                <div className="text-[11px] text-slate-500">Upload international passport and CV</div>
              </div>
            </div>
            <Link to="/candidate/documents" className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800">
              Upload Vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
