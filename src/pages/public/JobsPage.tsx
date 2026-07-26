import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedJobs } from '../../services/job.service';
import type { Job } from '../../lib/supabase/types';
import { Briefcase, MapPin, DollarSign, ArrowRight, Building2 } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
          Verified Opportunities
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Explore Overseas Vacancies</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Direct employer openings with zero illegal recruitment fees, housing allowances, and full visa sponsorship.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Published Jobs Currently Available</h3>
          <p className="text-xs text-slate-500">Check back soon as new verified employer requisitions are added daily.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[10px] uppercase">
                    Published
                  </span>
                  <div className="flex items-center text-xs text-slate-500 space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location || 'Dubai, UAE'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                {job.salary_range && (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold pt-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>{job.salary_range}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Employer Verified</span>
                <Link
                  to={`/jobs/${job.slug || job.id}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
                >
                  <span>View Vacancy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
