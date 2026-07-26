# 09. In-App & Firebase Messaging Notification Report

## Delivery Channels Tested
- In-App Notifications: `NotificationService` dispatches events for account creation, email verification, document approval/rejection, application submission, and status changes.
- Firebase Cloud Messaging (FCM): Service Worker (`public/firebase-messaging-sw.js`) receives background notifications. FCM token registered and stored against authenticated Supabase user profile.
