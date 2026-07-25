// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDvXvvPIfNZTZj0d-5-Q07FBAakvwqxCFw",
  authDomain: "behumbleandgrow.firebaseapp.com",
  projectId: "behumbleandgrow",
  storageBucket: "behumbleandgrow.firebasestorage.app",
  messagingSenderId: "763967463806",
  appId: "1:763967463806:web:cb61766521c08beec4d32f",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Be Humble & Grow Update';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new update regarding your recruitment application.',
    icon: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
