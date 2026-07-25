import React from 'react';

export const CandidateDocumentSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div className="h-6 bg-slate-200 rounded w-48" />
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
      </div>

      {/* Summary card skeleton */}
      <div className="p-5 bg-slate-100 rounded-2xl space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full w-full" />
        <div className="h-3 bg-slate-200 rounded w-3/4" />
      </div>

      {/* Document cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 bg-slate-100 rounded-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-slate-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-36" />
                  <div className="h-3 bg-slate-200 rounded w-48" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-200">
              <div className="h-9 bg-slate-200 rounded-xl flex-1" />
              <div className="h-9 bg-slate-200 rounded-xl flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
