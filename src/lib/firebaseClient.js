// src/lib/firebaseClient.js
// Firebase SDK Initialization & Configuration for Be Humble & Grow Platform

export const FIREBASE_CONFIG = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyDvXvvPIfNZTZj0d-5-Q07FBAakvwqxCFw",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "behumbleandgrow.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "behumbleandgrow",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "behumbleandgrow.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "763967463806",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:763967463806:web:cb61766521c08beec4d32f",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-B8TRK0T3E2"
};

/**
 * Validates Firebase ID Token claims payload for required security attributes
 * @param {Object} claims Decoded Firebase Token Claims
 * @returns {Boolean}
 */
export function validateFirebaseClaims(claims) {
  if (!claims || (!claims.uid && !claims.sub)) {
    return false;
  }
  return true;
}
