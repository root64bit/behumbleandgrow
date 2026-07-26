import React from 'react';

export const CandidateApplicationsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse text-left">
      <div className="space-y-2">
        <div className="h-4 w-32 bg-slate-200 rounded-full" />
        <div className="h-7 w-48 bg-slate-200 rounded-xl" />
        <div className="h-3 w-80 bg-slate-200 rounded" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-2xl" />
        ))}
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-slate-200 rounded-full" />
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-44 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
