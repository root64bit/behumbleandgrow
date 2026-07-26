import React from 'react';

export function CandidateSupportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="space-y-2">
          <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="h-9 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>

      {/* Summary Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>

      {/* FAQ Skeleton */}
      <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      {/* Cards Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
