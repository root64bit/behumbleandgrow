import React from 'react';

export const CandidateSettingsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
      <div className="space-y-2">
        <div className="h-6 w-32 bg-slate-200 rounded-full" />
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="h-4 w-96 bg-slate-200 rounded" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-slate-100 rounded-xl" />
          <div className="h-10 bg-slate-100 rounded-xl" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="h-5 w-48 bg-slate-200 rounded" />
        <div className="h-12 bg-slate-100 rounded-xl" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="h-5 w-56 bg-slate-200 rounded" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};
