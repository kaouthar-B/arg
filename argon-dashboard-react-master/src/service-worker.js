// service-worker.js

self.addEventListener('install', function(event) {
    console.log('Service worker installed.');
});

self.addEventListener('activate', function(event) {
    console.log('Service worker activated.');
});

self.addEventListener('fetch', function(event) {
    // Do something
});

self.addEventListener('notificationclick', function(event) {
    // Gérer les clics sur les notifications
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/path/to/page')
    );
});
