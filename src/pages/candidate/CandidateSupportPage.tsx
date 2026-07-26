import React from 'react';
import { useCandidateSupport } from '../../hooks/candidate/useCandidateSupport';
import { CandidateSupportHeader } from '../../components/candidate/support/CandidateSupportHeader';
import { CandidateSupportSummaryCards } from '../../components/candidate/support/CandidateSupportSummary';
import { CandidateSupportTabs } from '../../components/candidate/support/CandidateSupportTabs';
import { CandidateSupportSearch } from '../../components/candidate/support/CandidateSupportSearch';
import { CandidateSupportFaqSection } from '../../components/candidate/support/CandidateSupportFaqSection';
import { CandidateSupportTicketCard } from '../../components/candidate/support/CandidateSupportTicketCard';
import { CandidateSupportCreateDialog } from '../../components/candidate/support/CandidateSupportCreateDialog';
import { CandidateSupportTicketDetailsModal } from '../../components/candidate/support/CandidateSupportTicketDetailsModal';
import { CandidateSupportPagination } from '../../components/candidate/support/CandidateSupportPagination';
import { CandidateSupportSkeleton } from '../../components/candidate/support/CandidateSupportSkeleton';
import { CandidateSupportEmptyState } from '../../components/candidate/support/CandidateSupportEmptyState';
import { CandidateSupportNoResults } from '../../components/candidate/support/CandidateSupportNoResults';
import { CandidateSupportSectionError } from '../../components/candidate/support/CandidateSupportSectionError';
import { CandidateSupportConflictState } from '../../components/candidate/support/CandidateSupportConflictState';
import { CandidateSupportErrorState } from '../../components/candidate/support/CandidateSupportErrorState';

export default function CandidateSupportPage() {
  const {
    ticketsState,
    summaryState,
    selectedTicket,
    messagesState,
    activeTab,
    activeCategory,
    searchQuery,
    pagination,
    createModal,
    mutation,
    setActiveTab,
    setActiveCategory,
    setSearchQuery,
    setSelectedTicketId,
    openCreateModal,
    closeCreateModal,
    refreshSupportData,
    loadMoreTickets,
    createTicket,
    replyToTicket,
    closeTicket,
    reopenTicket,
  } = useCandidateSupport();

  // Fatal Error state
  if (ticketsState.status === 'error') {
    return (
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <CandidateSupportErrorState
          message={ticketsState.message}
          onRetry={refreshSupportData}
        />
      </main>
    );
  }

  // Initial Loading state
  if (ticketsState.status === 'loading' && summaryState.status === 'loading') {
    return (
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <CandidateSupportSkeleton />
      </main>
    );
  }

  const tickets = ticketsState.status === 'success' ? ticketsState.data : [];
  const summary = summaryState.status === 'success' ? summaryState.data : { openCount: 0, actionRequiredCount: 0, awaitingSupportCount: 0, resolvedCount: 0 };
  const messages = messagesState.status === 'success' ? messagesState.data : [];
  const isInboxEmpty = ticketsState.status === 'empty' && activeTab === 'all' && !activeCategory && !searchQuery;

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 text-left">
      {/* Header */}
      <CandidateSupportHeader onOpenCreate={openCreateModal} />

      {/* Bento Summary Metrics */}
      <CandidateSupportSummaryCards summary={summary} />

      {/* FAQ Section */}
      <CandidateSupportFaqSection />

      {/* Concurrency Conflict Alert */}
      {mutation.status === 'conflict' && (
        <CandidateSupportConflictState onRefresh={refreshSupportData} />
      )}

      {/* Section Mutation Error Notice */}
      {mutation.status === 'error' && (
        <CandidateSupportSectionError
          message={mutation.error}
          onRetry={refreshSupportData}
        />
      )}

      {/* Tabs & Search controls */}
      <div className="space-y-3 pt-2">
        <CandidateSupportTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          openCount={summary.openCount}
          actionRequiredCount={summary.actionRequiredCount}
        />

        <CandidateSupportSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Genuine Empty State */}
      {isInboxEmpty ? (
        <CandidateSupportEmptyState onCreateRequest={openCreateModal} />
      ) : tickets.length === 0 ? (
        /* No Filter Matches State */
        <CandidateSupportNoResults
          onClearFilters={() => {
            setActiveTab('all');
            setActiveCategory(undefined);
            setSearchQuery('');
          }}
        />
      ) : (
        /* Support Ticket Cards List */
        <div className="space-y-3">
          {tickets.map((t) => (
            <CandidateSupportTicketCard
              key={t.id}
              ticket={t}
              onSelect={setSelectedTicketId}
            />
          ))}

          {/* Cursor Pagination */}
          <CandidateSupportPagination
            hasMore={pagination.hasMore}
            isLoadingMore={pagination.isLoadingMore}
            onLoadMore={loadMoreTickets}
            error={pagination.error}
          />
        </div>
      )}

      {/* Create Support Request Dialog */}
      <CandidateSupportCreateDialog
        isOpen={createModal.isOpen}
        onClose={closeCreateModal}
        onSubmit={createTicket}
        isSubmitting={createModal.isSubmitting}
        serverError={createModal.error}
      />

      {/* Ticket Details & Conversation Modal */}
      <CandidateSupportTicketDetailsModal
        ticket={selectedTicket}
        messages={messages}
        isLoadingMessages={messagesState.status === 'loading'}
        onClose={() => setSelectedTicketId(null)}
        onReply={replyToTicket}
        onCloseTicket={closeTicket}
        onReopenTicket={reopenTicket}
        isMutating={mutation.status === 'submitting'}
        mutationError={mutation.status === 'error' ? mutation.error : undefined}
      />
    </main>
  );
}
