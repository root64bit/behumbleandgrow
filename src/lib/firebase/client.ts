import { getApp, getApps, initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDvXvvPIfNZTZj0d-5-Q07FBAakvwqxCFw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "behumbleandgrow.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "behumbleandgrow",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "behumbleandgrow.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "763967463806",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:763967463806:web:cb61766521c08beec4d32f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-B8TRK0T3E2",
};

const requiredFirebaseValues = [
  firebaseConfig.apiKey,
  firebaseConfig.projectId,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

const firebaseConfigured = requiredFirebaseValues.every(Boolean);

export const firebaseApp = firebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;
