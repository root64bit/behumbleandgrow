import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Bookmark, ChevronRight } from 'lucide-react';
import type { RecommendedJob } from '../../types/candidate';

interface CandidateRecommendedJobsProps {
  jobs: RecommendedJob[];
}

export default function CandidateRecommendedJobs({ jobs }: CandidateRecommendedJobsProps) {
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="space-y-4 text-left">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-lg font-bold font-headline-md text-[#00122B] dark:text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#006D44]" />
          <span>Recommended for You</span>
        </h2>
        <Link to="/candidate/jobs" className="text-xs font-bold text-[#006D44] hover:underline">
          View All Opportunities
        </Link>
      </div>

      {/* Responsive Horizontal Scroll on Mobile / Grid on Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
        {jobs.map((job) => {
          const isSaved = savedJobs[job.id];
          const targetRoute = job.slug ? `/candidate/jobs/${job.slug}` : `/candidate/jobs/${job.id}`;

          return (
            <div
              key={job.id}
              className="snap-center min-w-[280px] sm:min-w-0 flex-1 bg-white dark:bg-slate-900 border border-[#C4C6CF]/60 dark:border-slate-800 p-5 rounded-xl shadow-[0px_4px_12px_rgba(15,39,71,0.05)] flex flex-col justify-between space-y-4 hover:border-[#006D44] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-[#FAF9FC] dark:bg-slate-800 rounded-lg flex items-center justify-center border border-[#C4C6CF]/40 text-[#00122B] dark:text-emerald-400 font-bold">
                    {job.employerName.charAt(0)}
                  </div>
                  <span className="bg-[#EAF7F1] text-[#006D44] dark:bg-emerald-950 dark:text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-[#7DF7B6]/30">
                    {job.matchScore}% Match
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#00122B] dark:text-slate-100 group-hover:text-[#006D44] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#44474E] dark:text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#006D44] shrink-0" />
                    <span>{job.employerName} • {job.emirate}</span>
                  </p>
                </div>

                <p className="text-[11px] text-[#74777F] dark:text-slate-400 line-clamp-1 bg-[#FAF9FC] dark:bg-slate-800 p-1.5 rounded">
                  {job.matchReason}
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#C4C6CF]/30 dark:border-slate-800">
                <span className="text-xs font-bold text-[#00122B] dark:text-emerald-400">
                  {job.salaryText}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleSave(e, job.id)}
                    className="p-1.5 rounded-lg text-[#74777F] hover:text-[#006D44] hover:bg-[#EAF7F1] transition-colors"
                    title={isSaved ? "Saved" : "Save job"}
                    aria-label="Save job"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#006D44] text-[#006D44]' : ''}`} />
                  </button>

                  <Link
                    to={targetRoute}
                    className="p-1.5 rounded-lg bg-[#00122B] text-white hover:bg-[#006D44] transition-colors"
                    title="View details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
