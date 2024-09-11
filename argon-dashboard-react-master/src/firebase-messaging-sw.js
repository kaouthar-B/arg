importScripts('https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.3/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCjPoksEsMVw4L_V9aX7slEbOnDqbxwuz0",
  authDomain: "bcp-3bc5b.firebaseapp.com",
  projectId: "bcp-3bc5b",
  storageBucket: "bcp-3bc5b.appspot.com",
  messagingSenderId: "1029231541168",
  appId: "1:1029231541168:web:bb1e8a82ab3160230bb475",
  measurementId: "G-YTMK3TDKQC"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
