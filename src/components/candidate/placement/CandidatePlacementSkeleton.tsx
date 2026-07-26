import React from 'react';

export const CandidatePlacementSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-48" />
        <div className="h-8 bg-slate-200 rounded w-72" />
        <div className="h-4 bg-slate-200 rounded w-96" />
      </div>

      <div className="h-40 bg-slate-200 rounded-2xl" />
      <div className="h-32 bg-slate-200 rounded-2xl" />
      <div className="h-80 bg-slate-200 rounded-2xl" />
    </div>
  );
};
