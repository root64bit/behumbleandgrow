import React from 'react';
import { useCandidateOffers } from '../../hooks/candidate/useCandidateOffers';
import { CandidateOffersHeader } from '../../components/candidate/offers/CandidateOffersHeader';
import { CandidateOffersSummary } from '../../components/candidate/offers/CandidateOffersSummary';
import { CandidateOffersTabs } from '../../components/candidate/offers/CandidateOffersTabs';
import { CandidateOffersSearch } from '../../components/candidate/offers/CandidateOffersSearch';
import { CandidateOffersSort } from '../../components/candidate/offers/CandidateOffersSort';
import { CandidateOfferCard } from '../../components/candidate/offers/CandidateOfferCard';
import { CandidateOfferComplianceNotice } from '../../components/candidate/offers/CandidateOfferComplianceNotice';
import { CandidateOffersSkeleton } from '../../components/candidate/offers/CandidateOffersSkeleton';
import { CandidateOffersEmptyState } from '../../components/candidate/offers/CandidateOffersEmptyState';
import { CandidateOffersNoResults } from '../../components/candidate/offers/CandidateOffersNoResults';
import { CandidateOffersErrorState } from '../../components/candidate/offers/CandidateOffersErrorState';

export default function CandidateOffersPage() {
  const {
    offersState,
    summaryState,
    filters,
    updateFilters,
    clearFilters,
    refetch,
  } = useCandidateOffers();

  if (offersState.status === 'loading') {
    return <CandidateOffersSkeleton />;
  }

  if (offersState.status === 'error') {
    return <CandidateOffersErrorState message={offersState.message} onRetry={refetch} />;
  }

  const summary = summaryState.status === 'success' ? summaryState.data : undefined;
  const isGlobalEmpty = offersState.status === 'empty' && (!filters.searchQuery && filters.tab === 'all');
  const isFilteredEmpty = offersState.status === 'empty' && (!!filters.searchQuery || filters.tab !== 'all');

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24 text-left">
      {/* Header */}
      <CandidateOffersHeader />

      {/* Summary Metrics */}
      <CandidateOffersSummary summary={summary} loading={summaryState.status === 'loading'} />

      {/* Compliance Notice */}
      <CandidateOfferComplianceNotice />

      {/* Tabs */}
      <CandidateOffersTabs
        activeTab={filters.tab || 'all'}
        onTabChange={(tab) => updateFilters({ tab })}
      />

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <CandidateOffersSearch
          value={filters.searchQuery || ''}
          onChange={(searchQuery) => updateFilters({ searchQuery })}
        />
        <CandidateOffersSort
          sortBy={filters.sortBy || 'expiring_soonest'}
          onChange={(sortBy) => updateFilters({ sortBy })}
        />
      </div>

      {/* List / Empty / No-Results States */}
      {isGlobalEmpty ? (
        <CandidateOffersEmptyState />
      ) : isFilteredEmpty ? (
        <CandidateOffersNoResults onClearFilters={clearFilters} />
      ) : (
        <div className="space-y-4">
          {offersState.data.map((offer) => (
            <CandidateOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}
