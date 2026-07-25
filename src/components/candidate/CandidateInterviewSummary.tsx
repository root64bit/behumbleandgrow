import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Clock, ChevronRight } from 'lucide-react';
import type { CandidateInterview } from '../../types/candidate';

interface CandidateInterviewSummaryProps {
  interview: CandidateInterview | null;
}

export default function CandidateInterviewSummary({ interview }: CandidateInterviewSummaryProps) {
  if (!interview) return null;

  return (
    <section className="bg-[#0F2747] text-white rounded-xl p-5 shadow-[0px_4px_12px_rgba(15,39,71,0.15)] text-left space-y-4 border border-blue-900/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Upcoming Interview</span>
            <h2 className="text-base font-bold font-headline-md">{interview.jobTitle}</h2>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 capitalize">
          {interview.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Employer: <strong className="text-white">{interview.employerName}</strong> • Format: <strong className="text-white">{interview.interviewType}</strong>
      </p>

      {/* Dual Timing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">UAE Local Time</div>
            <div className="font-bold text-slate-100">{interview.uaeTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Your Local Time</div>
            <div className="font-bold text-slate-100">{interview.localTime}</div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to={`/candidate/interviews/${interview.id}`}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-xs"
        >
          <span>Confirm Attendance & View Prep Checklist</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
