import React from 'react';

export default function CandidateDashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse text-left" aria-label="Loading candidate workspace">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-80 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Profile Card Skeleton */}
      <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl" />

      {/* Bento Action Skeleton */}
      <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />

      {/* 2 Column Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="space-y-6">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
