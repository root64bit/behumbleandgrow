import { CandidateNotificationCategory } from './notificationCategory';

export function resolveCandidateNotificationRoute(params: {
  category?: CandidateNotificationCategory | string | null;
  entityType?: string | null;
  entityId?: string | null;
  rawActionUrl?: string | null;
}): { route: string; label: string; isSupported: boolean } {
  const { category, entityType, entityId, rawActionUrl } = params;

  // Rule #5 & Rule #6: Strict entity-type allowlist route derivation.
  // Never trust raw arbitrary action_url or external URLs.
  const resolvedCategory = (entityType || category || '').toLowerCase().trim();

  // Validate entity identifier format (UUID or alphanumeric ID)
  const isValidId = entityId && /^[a-zA-Z0-9_-]{8,64}$/.test(entityId);

  switch (resolvedCategory) {
    case 'application':
      return {
        route: isValidId ? `/candidate/applications/${entityId}` : '/candidate/applications',
        label: 'View Application',
        isSupported: true,
      };

    case 'document':
      return {
        route: '/candidate/documents',
        label: 'Review Document Vault',
        isSupported: true,
      };

    case 'interview':
      return {
        route: isValidId ? `/candidate/interviews/${entityId}` : '/candidate/interviews',
        label: 'View Interview',
        isSupported: true,
      };

    case 'offer':
      return {
        route: isValidId ? `/candidate/offers/${entityId}` : '/candidate/offers',
        label: 'Review Conditional Offer',
        isSupported: true,
      };

    case 'placement':
      return {
        route: '/candidate/placement',
        label: 'View Placement Process',
        isSupported: true,
      };

    case 'profile':
      return {
        route: '/candidate/profile',
        label: 'View Profile',
        isSupported: true,
      };

    case 'support':
      return {
        route: '/candidate/support',
        label: 'Open Support',
        isSupported: true,
      };

    case 'account':
    case 'system':
      return {
        route: '/candidate/dashboard',
        label: 'View Workspace',
        isSupported: true,
      };

    default:
      // If raw action URL starts with safe candidate path, allow ONLY relative candidate paths
      if (rawActionUrl && rawActionUrl.startsWith('/candidate/') && !rawActionUrl.includes('..') && !rawActionUrl.includes(':')) {
        return {
          route: rawActionUrl,
          label: 'View Update',
          isSupported: true,
        };
      }
      return {
        route: '/candidate/dashboard',
        label: 'View Update',
        isSupported: false,
      };
  }
}
