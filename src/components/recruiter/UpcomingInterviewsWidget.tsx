import React from 'react';
import { UpcomingInterviewRecord } from '../../types/recruiter';
import { Video, Calendar, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpcomingInterviewsWidgetProps {
  interviews: UpcomingInterviewRecord[];
}

export default function UpcomingInterviewsWidget({ interviews }: UpcomingInterviewsWidgetProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Upcoming Video Interviews</h2>
            <p className="text-xs text-slate-500">Scheduled employer video screenings with dual time-zone display.</p>
          </div>
        </div>
        <Link to="/recruiter/interviews" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>Schedule</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {interviews.map((int) => (
          <div key={int.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{int.candidateName}</h3>
                <p className="text-[11px] text-slate-600">{int.jobTitle} • <span className="font-semibold text-slate-800">{int.employerName}</span></p>
              </div>

              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                int.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {int.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800">{int.uaeTime}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{int.localTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
