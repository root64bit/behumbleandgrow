import React, { useState } from 'react';
import { CandidateInterview } from '../../types/candidate';
import { Video, Clock, Calendar, CheckCircle2, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CandidateInterviewCardProps {
  interview: CandidateInterview;
}

export default function CandidateInterviewCard({ interview }: CandidateInterviewCardProps) {
  const [checklist, setChecklist] = useState(interview.prepChecklist);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Upcoming Video Interview</h2>
            <p className="text-xs text-slate-500">Employer video screening with dual time-zone display.</p>
          </div>
        </div>

        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
          isConfirmed ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
        }`}>
          {isConfirmed ? 'ATTENDANCE CONFIRMED' : 'CONFIRMATION REQUIRED'}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{interview.jobTitle}</h3>
          <p className="text-xs text-slate-600 font-semibold">{interview.employerName}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{interview.uaeTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{interview.localTime}</span>
          </div>
        </div>

        {!isConfirmed && (
          <button
            onClick={() => setIsConfirmed(true)}
            className="w-full btn btn-primary py-2 text-xs font-bold shadow-xs mt-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Attendance Now</span>
          </button>
        )}
      </div>

      {/* Preparation Checklist */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900">Interview Preparation Checklist</h4>
        <div className="space-y-1.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                item.done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
              }`}>
                {item.done && <Check className="w-3 h-3" />}
              </div>
              <span className={`text-xs ${item.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
