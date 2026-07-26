# 19 — Error Handling & Observability Audit

- **UI Error States**: Every candidate page implements modular loading skeletons (`Skeleton`), empty state callouts, conflict states, and error state retry buttons.
- **Error Message Sanitization**: Low-level database errors (SQLSTATE codes, PostgREST details, table names) are caught and mapped to user-friendly candidate error messages (e.g. `"Failed to update preferences. Please check your connection and try again."`).
- **No Sensitive Logging**: Console logging in production builds omits candidate tokens, passwords, signed storage URLs, and meeting credentials.
