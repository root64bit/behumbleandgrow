import React from 'react';

interface Props {
  page: number;
  hasMore: boolean;
  onPageChange: (newPage: number) => void;
  loading?: boolean;
}

export const CandidateApplicationsPagination: React.FC<Props> = ({
  page,
  hasMore,
  onPageChange,
  loading,
}) => {
  if (page === 1 && !hasMore) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1 || loading}
        className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-bold rounded-xl shadow-xs"
      >
        Previous
      </button>

      <span className="text-slate-500 font-medium">Page {page}</span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasMore || loading}
        className="px-3.5 py-2 bg-[#006D44] hover:bg-[#005232] disabled:opacity-40 text-white font-bold rounded-xl shadow-xs"
      >
        Next Page
      </button>
    </div>
  );
};
