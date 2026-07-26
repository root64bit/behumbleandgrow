import React from 'react';
import { Loader2, ArrowDown } from 'lucide-react';

interface CandidateSupportPaginationProps {
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  error?: string;
}

export function CandidateSupportPagination({
  hasMore,
  isLoadingMore,
  onLoadMore,
  error,
}: CandidateSupportPaginationProps) {
  if (!hasMore && !isLoadingMore && !error) return null;

  return (
    <div className="pt-4 flex flex-col items-center justify-center gap-2">
      {error && (
        <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}

      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
        >
          {isLoadingMore ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Loading more support requests...</span>
            </>
          ) : (
            <>
              <ArrowDown className="w-4 h-4 text-slate-500" />
              <span>Load More Support Requests</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
