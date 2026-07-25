import React from 'react';

export const CandidateInterviewDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-lg mx-auto animate-pulse text-left">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div className="h-6 w-40 bg-slate-200 rounded-xl" />
        <div className="w-9 h-9 bg-slate-200 rounded-full" />
      </div>

      <div className="h-56 bg-slate-200 rounded-2xl" />
      <div className="h-28 bg-slate-200 rounded-2xl" />
      <div className="h-44 bg-slate-200 rounded-2xl" />
      <div className="h-32 bg-slate-200 rounded-2xl" />
    </div>
  );
};
