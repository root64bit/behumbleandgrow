import React from 'react';

export const CandidateOffersSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse text-left">
      <h1 className="sr-only">Conditional Offers</h1>
      <div className="h-10 bg-slate-200 rounded-xl w-64" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="h-10 bg-slate-200 rounded-xl" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
