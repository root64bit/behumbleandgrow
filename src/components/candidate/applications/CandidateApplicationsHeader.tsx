import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CandidateApplicationsHeader: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-[#006D44] border border-emerald-200 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Candidate Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-[#00122B] mt-1">My Applications</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your vacancy dossiers, interview schedules, conditional offers and placement actions.
          </p>
        </div>

        <Link
          to="/candidate/jobs"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-extrabold rounded-xl shadow-sm transition-all flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Find Opportunities</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative group">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#006D44] transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title, reference ID or UAE location..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44] focus:ring-1 focus:ring-[#006D44] transition-all"
        />
      </div>
    </div>
  );
};
