# 05 — Safe Deep-Link Routing & Stale Action Protection

## Route Allowlist Mapping
```ts
const notificationRoutes = {
  application: (id?: string) => id ? `/candidate/applications/${id}` : '/candidate/applications',
  document: () => '/candidate/documents',
  interview: (id?: string) => id ? `/candidate/interviews/${id}` : '/candidate/interviews',
  offer: (id?: string) => id ? `/candidate/offers/${id}` : '/candidate/offers',
  placement: () => '/candidate/placement',
  profile: () => '/candidate/profile',
  support: () => '/candidate/support',
  account: () => '/candidate/dashboard',
  system: () => '/candidate/dashboard',
};
```

## Security Rules
1. **Never Trust Raw `action_url`**: Navigation is derived strictly from `entity_type` + `entity_id`.
2. **Rejection of External Domains**: Arbitrary `https://` external URLs, `javascript:`, and path traversal (`..`) are stripped and default to `/candidate/dashboard`.
3. **Stale Action Handling**: Notification cards display stale state when `expires_at < NOW()`. The destination page revalidates entity ownership and state under RLS before executing any action.
