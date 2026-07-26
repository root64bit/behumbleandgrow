import React from 'react';
import { Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  interview: any | null;
}

export const CandidateApplicationInterviewSummary: React.FC<Props> = ({ interview }) => {
  if (!interview) return null;

  const targetRoute = `/candidate/interviews/${interview.id || ''}`;

  return (
    <div className="p-5 bg-white border border-purple-200 rounded-2xl shadow-sm space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-purple-600" />
          <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
            Scheduled Interview
          </h3>
        </div>
        <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold rounded-full">
          {interview.status || 'Scheduled'}
        </span>
      </div>

      <div className="text-xs space-y-1">
        <p className="font-bold text-slate-900">Format: {interview.format || 'Video Interview'}</p>
        {interview.scheduled_at && (
          <p className="text-slate-600">
            Date: {new Date(interview.scheduled_at).toLocaleDateString()} at{' '}
            {new Date(interview.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-purple-100 flex justify-end">
        <Link
          to={targetRoute}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs"
        >
          <span>View Interview Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
