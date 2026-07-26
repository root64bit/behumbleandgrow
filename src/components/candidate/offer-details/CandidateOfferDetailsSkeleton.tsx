import React from 'react';

export const CandidateOfferDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-pulse text-left">
      <h1 className="sr-only">Conditional Offer Details</h1>
      <div className="h-6 bg-slate-200 rounded-lg w-40" />
      <div className="h-48 bg-slate-800 rounded-3xl" />
      <div className="h-32 bg-slate-200 rounded-2xl" />
      <div className="h-40 bg-slate-200 rounded-2xl" />
      <div className="h-40 bg-slate-200 rounded-2xl" />
    </div>
  );
};
