# 09. Notification Store & Delivery Delivery Results

## Delivery System Architecture
- Database Persistence: `PlatformNotification` records stored in database for account creation, email verification, document approval/rejection, application submission, and status changes.
- FCM Push Delivery: Service Worker (`public/firebase-messaging-sw.js`) active for push delivery with fallback to in-app notifications.
