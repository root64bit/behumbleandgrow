import { requestFirebaseMessagingToken } from '../lib/firebase/messaging';

export interface PlatformNotification {
  id: string;
  userId: string;
  type: 
    | 'account_created'
    | 'email_verified'
    | 'document_approved'
    | 'document_rejected'
    | 'replacement_requested'
    | 'application_submitted'
    | 'information_requested'
    | 'status_changed';
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export class NotificationService {
  private static mockNotifications: PlatformNotification[] = [
    {
      id: 'notif-1',
      userId: 'user-cand-a',
      type: 'status_changed',
      title: 'Interview Attendance Scheduled',
      body: 'Your employer video interview for F&B Outlet Captain has been scheduled.',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'notif-2',
      userId: 'user-cand-a',
      type: 'document_approved',
      title: 'Passport Verification Approved',
      body: 'Your passport bio-page scan has been verified by the compliance team.',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  static async getUserNotifications(userId: string): Promise<PlatformNotification[]> {
    return this.mockNotifications.filter((n) => n.userId === userId || userId.startsWith('user-cand'));
  }

  static async markAsRead(notificationId: string): Promise<boolean> {
    const notif = this.mockNotifications.find((n) => n.id === notificationId);
    if (notif) {
      notif.isRead = true;
      return true;
    }
    return false;
  }

  static async registerPushNotifications(userId: string): Promise<string | null> {
    try {
      const token = await requestFirebaseMessagingToken();
      if (token) {
        console.log(`[NotificationService] FCM token registered for user ${userId}:`, token);
      }
      return token;
    } catch (err) {
      console.warn('[NotificationService] FCM registration fallback used:', err);
      return null;
    }
  }
}
