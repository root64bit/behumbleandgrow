import React from 'react';
import { Search, X } from 'lucide-react';
import { CandidateSupportCategory, CANONICAL_SUPPORT_CATEGORIES } from '../../../lib/candidate/supportCategory';

interface CandidateSupportSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory?: CandidateSupportCategory;
  onCategoryChange: (category?: CandidateSupportCategory) => void;
}

export function CandidateSupportSearch({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: CandidateSupportSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search support requests by reference or subject..."
          className="w-full pl-9 pr-9 py-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          aria-label="Search support requests"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      <select
        value={activeCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value ? (e.target.value as CandidateSupportCategory) : undefined)}
        className="w-full sm:w-48 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shrink-0"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {Object.values(CANONICAL_SUPPORT_CATEGORIES).map((cat) => (
          <option key={cat.key} value={cat.key}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
