import React from 'react';

export const CandidateInterviewsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse text-left">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <div className="h-6 w-48 bg-slate-200 rounded-xl" />
        <div className="w-9 h-9 bg-slate-200 rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
        <div className="h-20 bg-slate-200 rounded-2xl" />
      </div>

      <div className="h-10 bg-slate-200 rounded-full w-full" />
      <div className="h-44 bg-slate-200 rounded-2xl" />
      <div className="h-44 bg-slate-200 rounded-2xl" />
    </div>
  );
};
