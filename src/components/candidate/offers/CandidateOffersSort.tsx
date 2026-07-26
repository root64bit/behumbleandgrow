import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  sortBy: 'expiring_soonest' | 'recently_issued' | 'recently_updated' | 'start_date' | 'job_title';
  onChange: (sort: 'expiring_soonest' | 'recently_issued' | 'recently_updated' | 'start_date' | 'job_title') => void;
}

export const CandidateOffersSort: React.FC<Props> = ({ sortBy, onChange }) => {
  return (
    <div className="flex items-center gap-1.5 text-left">
      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as any)}
        className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006D44]"
      >
        <option value="expiring_soonest">Expiring Soonest</option>
        <option value="recently_issued">Most Recently Issued</option>
        <option value="job_title">Job Title</option>
        <option value="start_date">Proposed Start Date</option>
      </select>
    </div>
  );
};
