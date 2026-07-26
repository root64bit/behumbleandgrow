import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { firebaseApp } from "./client";

export async function requestFirebaseMessagingToken(): Promise<string | null> {
  if (!firebaseApp) {
    return null;
  }

  const messagingEnabled =
    import.meta.env.VITE_FIREBASE_MESSAGING_ENABLED === "true";

  if (!messagingEnabled || !(await isSupported())) {
    return null;
  }

  if (typeof window === "undefined" || !("Notification" in window)) {
    return null;
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return null;
  }

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

  if (!vapidKey) {
    console.warn("Firebase Messaging VAPID key is not configured.");
    return null;
  }

  try {
    const messaging = getMessaging(firebaseApp);
    return await getToken(messaging, { vapidKey });
  } catch (err) {
    console.error("Error retrieving Firebase Messaging token:", err);
    return null;
  }
}
