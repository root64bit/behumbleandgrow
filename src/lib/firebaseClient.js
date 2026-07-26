// src/lib/firebaseClient.js
// Firebase SDK Initialization & Configuration for Be Humble & Grow Platform

export const FIREBASE_CONFIG = {
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || "",
  authDomain: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || "",
  projectId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || "",
  storageBucket: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || "",
  messagingSenderId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || "",
  appId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_APP_ID) || "",
  measurementId: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) || ""
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
