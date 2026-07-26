import React from 'react';

export const CandidateProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse text-left">
      {/* Hero Skeleton */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-200 rounded-md" />
            <div className="h-4 w-32 bg-slate-100 rounded-md" />
          </div>
          <div className="w-16 h-16 rounded-full bg-slate-200" />
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-md" />
        <div className="flex gap-2">
          <div className="h-10 flex-1 bg-slate-200 rounded-lg" />
          <div className="h-10 flex-1 bg-slate-100 rounded-lg" />
        </div>
      </div>

      {/* Nav Skeleton */}
      <div className="h-12 w-full bg-white rounded-xl border border-slate-200" />

      {/* Form Skeleton */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
        <div className="h-5 w-36 bg-slate-200 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-slate-100 rounded-xl" />
          <div className="h-10 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-24 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
};
