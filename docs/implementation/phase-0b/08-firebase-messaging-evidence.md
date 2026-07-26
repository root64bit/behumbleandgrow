# 08. Firebase Cloud Messaging Integration Evidence

## Implementation Details
- Service Worker: `public/firebase-messaging-sw.js` handles background push notifications.
- Messaging Helper: `src/lib/firebase/messaging.ts` requests browser notification permission and retrieves FCM token via VAPID key.
- Profile Sync: FCM token stored against authenticated Supabase user profile for push notification dispatch.
- Scope: Firebase is strictly isolated to Cloud Messaging; Supabase remains the primary database, auth, and storage provider.
