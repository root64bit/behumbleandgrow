export interface PlacementCandidateAction {
  id: string;
  placementId: string;
  actionType:
    | 'upload_document'
    | 'replace_document'
    | 'confirm_personal_info'
    | 'confirm_availability'
    | 'book_medical'
    | 'review_itinerary'
    | 'confirm_travel_readiness'
    | 'review_accommodation'
    | 'acknowledge_onboarding'
    | 'contact_support';
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'skipped';
  deadline?: string | null;
  version: number;
}

export function resolveNextActionPriority(actions: PlacementCandidateAction[]): PlacementCandidateAction | null {
  const pendingActions = actions.filter((a) => a.status === 'pending');
  if (pendingActions.length === 0) return null;

  const priorityMap: Record<PlacementCandidateAction['actionType'], number> = {
    replace_document: 1,
    upload_document: 2,
    confirm_personal_info: 3,
    confirm_availability: 4,
    book_medical: 5,
    review_itinerary: 6,
    confirm_travel_readiness: 7,
    review_accommodation: 8,
    acknowledge_onboarding: 9,
    contact_support: 10,
  };

  return [...pendingActions].sort((a, b) => {
    const prioA = priorityMap[a.actionType] ?? 99;
    const prioB = priorityMap[b.actionType] ?? 99;
    return prioA - prioB;
  })[0];
}
