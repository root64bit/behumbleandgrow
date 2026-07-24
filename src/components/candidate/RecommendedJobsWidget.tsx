import React from 'react';
import { RecommendedJob } from '../../types/candidate';
import { Briefcase, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedJobsWidgetProps {
  jobs: RecommendedJob[];
}

export default function RecommendedJobsWidget({ jobs }: RecommendedJobsWidgetProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Recommended UAE Opportunities</h2>
            <p className="text-xs text-slate-500">Verified vacancies matching your qualifications and profile experience.</p>
          </div>
        </div>
        <Link to="/jobs" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>Browse All Jobs</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-600 font-semibold">{job.employerName}</p>
                </div>

                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  {job.matchScore}% Match
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.emirate}</span>
                </span>
                <span className="font-bold text-slate-800">{job.salaryText}</span>
              </div>

              <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-100 font-medium">
                {job.matchReason}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Deadline: {job.deadline}</span>
              <Link to={`/jobs/${job.slug}`} className="btn btn-primary py-1.5 px-3 text-xs font-bold shadow-xs">
                View Opportunity
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
