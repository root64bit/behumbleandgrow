import React, { useState } from 'react';
import { Video, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { CandidateService } from '../../services/candidate.service';

export default function CandidateInterviewsPage() {
  const interviews = CandidateService.getInterviews();
  const [confirmed, setConfirmed] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 'prep-1', label: 'Review Job Description & Responsibilities', done: true },
    { id: 'prep-2', label: 'Research Employer Profile (Premier Hospitality Group)', done: true },
    { id: 'prep-3', label: 'Test Camera, Microphone & Internet Connection', done: false },
    { id: 'prep-4', label: 'Have Passport Identification Ready for Verification', done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold mb-2">
          <Video className="w-3.5 h-3.5 text-amber-600" />
          <span>Active Employer Interviews</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Video Interview Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Prepare for and join your live video interviews with verified UAE employers.
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
          <Video className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Upcoming Video Interviews</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            When a UAE employer shortlists your candidate profile, your interview invitation and preparation guide will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {interviews.map(interview => (
            <div key={interview.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {interview.interviewType}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{interview.jobTitle}</h2>
                  <p className="text-xs font-semibold text-slate-600">{interview.employerName}</p>
                </div>

                <div className="sm:text-right">
                  <span className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase ${
                    confirmed ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {confirmed ? 'Attendance Confirmed' : 'Action Required: Confirm Attendance'}
                  </span>
                </div>
              </div>

              {/* Time & Date Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">UAE Time (GST)</div>
                    <div className="text-xs font-bold text-slate-900">{interview.uaeTime}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Local Time</div>
                    <div className="text-xs font-bold text-slate-900">{interview.localTime}</div>
                  </div>
                </div>
              </div>

              {/* Attendance Action */}
              {!confirmed ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Please confirm your availability to secure your interview slot.</span>
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I Confirm Attendance for this Slot</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-900 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Attendance Confirmed! Your meeting link will activate 15 minutes before start time.</span>
                  </div>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                    <span>Launch Video Interview Room</span>
                  </a>
                </div>
              )}

              {/* Preparation Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Mandatory Preparation Checklist
                </h4>
                <div className="space-y-2">
                  {checklist.map(item => (
                    <label key={item.id} className="flex items-center space-x-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer border border-slate-200 transition-colors">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleCheck(item.id)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className={`text-xs font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
